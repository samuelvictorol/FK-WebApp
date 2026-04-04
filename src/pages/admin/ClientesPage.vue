<template>
  <q-page class="page q-pa-md column q-gutter-y-md full-height">
    <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
      <q-breadcrumbs-el icon="group" label="Clientes" exact />
    </q-breadcrumbs>

    <div class="row justify-between items-center q-col-gutter-sm">
      <div class="col-12 col-sm-auto">
        <div class="text-h6 text-weight-bold safe-text">Clientes</div>
      </div>

      <div class="col-12 col-sm-auto row justify-end">
        <q-chip outline class="chip">
          {{ clientesRows.length }} registros
        </q-chip>
      </div>
    </div>

    <div class="table-container">
      <q-table
        :rows="clientesRows"
        :columns="columns"
        row-key="_id"
        class="tbl"
        :pagination="{ rowsPerPage: 10 }"
        flat
        bordered
        wrap-cells
        dark
        :loading="loading"
        no-data-label="Nenhum cliente encontrado"
        loading-label="Carregando clientes..."
      >
        <template #top-right>
          <q-btn
            unelevated
            icon="refresh"
            label="Atualizar"
            class="act act-primary"
            :loading="loading"
            @click="buscarClientes"
          />
        </template>

        <template #body-cell-lucro="props">
          <q-td :props="props">
            <q-chip
              dense
              :color="Number(props.row.lucro || 0) > 0 ? 'positive' : 'grey-7'"
              text-color="white"
            >
              {{ formatMoney(props.row.lucro) }}
            </q-chip>
          </q-td>
        </template>

        <template #body-cell-planoAtual="props">
          <q-td :props="props">
            <q-chip
              dense
              :color="getPlanoColor(props.row.planoAtual)"
              text-color="white"
            >
              {{ props.row.planoAtual || '-' }}
            </q-chip>
          </q-td>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense flat icon="account_circle" class="act act-primary" @click="visualizarCliente(props.row)">
              <q-tooltip>Visualizar Cliente</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </div>

    <q-dialog v-model="dialogCliente">
      <q-card class="detail-card">
        <q-card-section class="row items-center justify-between">
          <div class="text-h6 text-weight-bold">Detalhes do Cliente</div>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section v-if="clienteSelecionado">
          <div class="detail-grid">
            <div class="detail-item">
              <div class="detail-label">Nome</div>
              <div class="detail-value">{{ clienteSelecionado.name || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">E-mail</div>
              <div class="detail-value">{{ clienteSelecionado.email || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Telefone</div>
              <div class="detail-value">{{ clienteSelecionado.phone || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Perfil</div>
              <div class="detail-value">{{ clienteSelecionado.perfil || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Plano</div>
              <div class="detail-value">{{ clienteSelecionado.planoAtual || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Lucro</div>
              <div class="detail-value">{{ formatMoney(clienteSelecionado.lucro) }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">ID</div>
              <div class="detail-value break-all">{{ clienteSelecionado._id || '-' }}</div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()

const loading = ref(false)
const dialogCliente = ref(false)
const clienteSelecionado = ref(null)

const clientesRows = ref([])

const columns = ref([
  {
    name: 'name',
    label: 'Nome',
    field: row => row.name,
    align: 'left',
    classes: 'sticky-col',
    headerClasses: 'sticky-col'
  },
  {
    name: 'perfil',
    label: 'Perfil',
    field: row => row.perfil,
    align: 'left'
  },
  {
    name: 'planoAtual',
    label: 'Plano',
    field: row => row.planoAtual,
    align: 'left'
  },
  {
    name: 'lucro',
    label: 'Lucro',
    field: row => row.lucro,
    align: 'left'
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'center'
  }
])

onMounted(() => {
  buscarClientes()
})

async function buscarClientes() {
  loading.value = true

  try {
    const { data } = await api.post('/admin/get-users')

    clientesRows.value = Array.isArray(data)
      ? data.map(mapUserToRow)
      : []
  } catch (error) {
    console.error('[ADMIN_GET_USERS_ERROR]', error)

    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || 'Erro ao buscar usuários',
      icon: 'mdi-alert-circle-outline',
      position: 'top',
      progress: true,
      actions: [{ icon: 'mdi-close', color: 'white', round: true }]
    })
  } finally {
    loading.value = false
  }
}

function mapUserToRow(user) {
  const role = String(user?.role || '').trim()

  return {
    _id: user?._id || '',
    name: user?.name || user?.nome || '-',
    email: user?.email || '-',
    phone: user?.phone || user?.telefone || '-',
    perfil: extractPerfil(user),
    planoAtual: role || 'Sem plano',
    lucro: Number(user?.lucro || 0)
  }
}

function extractPerfil(user) {
  if (user?.email) {
    return user.email
  }

  if (user?.phone) {
    return user.phone
  }

  return user?._id || '-'
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function getPlanoColor(plano) {
  const normalized = String(plano || '').toLowerCase()

  if (normalized.includes('premium')) return 'amber-10'
  if (normalized.includes('free')) return 'grey-7'
  if (normalized.includes('básico') || normalized.includes('basico')) return 'warning'
  return 'primary'
}

function visualizarCliente(cliente) {
  clienteSelecionado.value = cliente
  dialogCliente.value = true
}

</script>

<style scoped>
:global(html), :global(body), :global(#q-app) { overflow-x: clip; }
:global(.row > [class*="col-"]) { min-width: 0; }
.safe-text { overflow-wrap: anywhere; word-break: break-word; }

.page {
  background: transparent;
  color: rgba(255,255,255,.92);
}

.crumbs {
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  padding: 10px 12px;
  border-radius: 14px;
}

.chip {
  color: rgba(255,255,255,.90);
  border-color: rgba(124,58,237,.35);
  background: rgba(124,58,237,.10);
}

.table-container {
  overflow-x: auto;
  max-width: 100%;
}

.tbl {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
}

.tbl :deep(.q-table__top),
.tbl :deep(.q-table__bottom) {
  background: rgba(255,255,255,.02);
}

.tbl :deep(th) {
  color: rgba(255,255,255,.86);
  background: rgba(255,255,255,.02);
}

.tbl :deep(td) {
  color: rgba(255,255,255,.86);
}

.tbl :deep(.q-table__grid-item) {
  background: rgba(255,255,255,.03);
}

.tbl :deep(.sticky-col) {
  position: sticky;
  left: 0;
  z-index: 2;
  background: rgba(12,12,18,.96);
}

.act {
  border-radius: 12px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
  margin-right: 6px;
}

.act-primary { color: #c4b5fd; }
.act-money { color: #99f6e4; }

.detail-card {
  width: min(92vw, 620px);
  background: #111318;
  color: #fff;
  border-radius: 18px;
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.detail-item {
  padding: 12px;
  border-radius: 12px;
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
}

.detail-label {
  font-size: .75rem;
  color: rgba(255,255,255,.62);
  margin-bottom: 4px;
}

.detail-value {
  font-weight: 700;
  color: rgba(255,255,255,.92);
}

.break-all {
  word-break: break-word;
}

@media (max-width: 768px) {
  .detail-grid {
    grid-template-columns: 1fr;
  }
}
</style>