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
            <div class="row items-center no-wrap">
              <q-btn dense flat icon="account_circle" class="act act-primary" @click="visualizarCliente(props.row)">
                <q-tooltip>Visualizar Cliente</q-tooltip>
              </q-btn>

              <q-btn
                dense
                flat
                :icon="isPremium(props.row.planoAtual) ? 'workspace_premium' : 'toggle_off'"
                :class="isPremium(props.row.planoAtual) ? 'act act-premium' : 'act act-free'"
                :loading="updatingUserId === props.row._id"
                @click="alternarPlano(props.row)"
              >
                <q-tooltip>
                  {{ isPremium(props.row.planoAtual) ? 'Tornar Gratuito' : 'Tornar Premium' }}
                </q-tooltip>
              </q-btn>
            </div>
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
          <div class="detail-grid q-mb-md">
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

            <div class="detail-item detail-item-full">
              <div class="detail-label">ID</div>
              <div class="detail-value break-all">{{ clienteSelecionado._id || '-' }}</div>
            </div>
          </div>

          <q-separator class="q-my-md" />

          <div class="text-subtitle1 text-weight-bold q-mb-md">Alterar senha</div>

          <!-- <q-input
            v-model="passwordForm.currentPassword"
            filled
            dark
            color="primary"
            label="Senha atual"
            :type="showCurrentPassword ? 'text' : 'password'"
            class="q-mb-md"
          >
            <template #append>
              <q-icon
                :name="showCurrentPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showCurrentPassword = !showCurrentPassword"
              />
            </template>
          </q-input> -->

          <q-input
            v-model="passwordForm.newPassword"
            filled
            dark
            color="primary"
            label="Nova senha"
            :type="showNewPassword ? 'text' : 'password'"
            class="q-mb-md"
          >
            <template #append>
              <q-icon
                :name="showNewPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showNewPassword = !showNewPassword"
              />
            </template>
          </q-input>

          <q-input
            v-model="passwordForm.confirmPassword"
            filled
            dark
            color="primary"
            label="Confirmar nova senha"
            :type="showConfirmPassword ? 'text' : 'password'"
            class="q-mb-md"
          >
            <template #append>
              <q-icon
                :name="showConfirmPassword ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="showConfirmPassword = !showConfirmPassword"
              />
            </template>
          </q-input>

          <div class="row q-col-gutter-sm">
            <div class="col-12 col-sm-6">
              <q-btn
                unelevated
                class="full-width act act-save"
                icon="lock_reset"
                label="Salvar nova senha"
                :loading="changingPassword"
                @click="alterarSenhaCliente"
              />
            </div>

            <div class="col-12 col-sm-6">
              <q-btn
                unelevated
                class="full-width act act-danger"
                icon="delete_forever"
                label="Remover usuário"
                :loading="deletingUser"
                @click="removerCliente"
              />
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
const updatingUserId = ref('')
const changingPassword = ref(false)
const deletingUser = ref(false)

const dialogCliente = ref(false)
const clienteSelecionado = ref(null)

const showCurrentPassword = ref(false)
const showNewPassword = ref(false)
const showConfirmPassword = ref(false)

const passwordForm = ref({
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
})

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
    planoAtual: normalizePlano(role),
    lucro: Number(user?.lucro || 0)
  }
}

function extractPerfil(user) {
  if (user?.email) return user.email
  if (user?.phone) return user.phone
  return user?._id || '-'
}

function normalizePlano(role) {
  const normalized = String(role || '').toLowerCase()

  if (normalized.includes('premium')) return 'Plano Premium'
  if (normalized.includes('free') || normalized.includes('gratuito')) return 'Plano Gratuito'
  return role || 'Sem plano'
}

function isPremium(plano) {
  return String(plano || '').toLowerCase().includes('premium')
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
  if (normalized.includes('free') || normalized.includes('gratuito')) return 'grey-7'
  if (normalized.includes('básico') || normalized.includes('basico')) return 'warning'
  return 'primary'
}

function resetPasswordForm() {
  passwordForm.value = {
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  }

  showCurrentPassword.value = false
  showNewPassword.value = false
  showConfirmPassword.value = false
}

function visualizarCliente(cliente) {
  clienteSelecionado.value = { ...cliente }
  resetPasswordForm()
  dialogCliente.value = true
}

async function alternarPlano(cliente) {
  const nextRole = isPremium(cliente.planoAtual) ? 'Plano Gratuito' : 'Plano Premium'
  const acao = isPremium(cliente.planoAtual) ? 'tornar gratuito' : 'tornar premium'

  try {
    const confirmed = await abrirConfirmacao(cliente, nextRole, acao)
    if (!confirmed) return

    updatingUserId.value = cliente._id

    const { data } = await api.post(`/admin/give-role/${cliente._id}/${encodeURIComponent(nextRole)}`)

    const novoEhPremium = nextRole.toLowerCase().includes('premium')
    cliente.planoAtual = nextRole
    cliente.lucro = novoEhPremium ? 49.9 : 0

    const index = clientesRows.value.findIndex(item => item._id === cliente._id)
    if (index !== -1) {
      clientesRows.value[index] = { ...cliente }
    }

    if (clienteSelecionado.value?._id === cliente._id) {
      clienteSelecionado.value = { ...cliente }
    }

    $q.notify({
      type: 'positive',
      message: `Plano do Usuário atualizado com sucesso.`,
      icon: 'mdi-check-circle-outline',
      position: 'top',
      progress: true,
      actions: [{ icon: 'mdi-close', color: 'white', round: true }]
    })
  } catch (error) {
    if (error === 'cancelled') return

    console.error('[ADMIN_GIVE_ROLE_ERROR]', error)

    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || 'Erro ao atualizar plano do usuário',
      icon: 'mdi-alert-circle-outline',
      position: 'top',
      progress: true,
      actions: [{ icon: 'mdi-close', color: 'white', round: true }]
    })
  } finally {
    updatingUserId.value = ''
  }
}

async function alterarSenhaCliente() {
  if (!clienteSelecionado.value) return

  // if (!passwordForm.value.currentPassword?.trim()) {
  //   return notifyNegative('Informe a senha atual')
  // }

  if (!passwordForm.value.newPassword?.trim()) {
    return notifyNegative('Informe a nova senha')
  }

  if (passwordForm.value.newPassword.trim().length < 4) {
    return notifyNegative('A nova senha deve ter pelo menos 4 caracteres')
  }

  if (passwordForm.value.newPassword.trim() !== passwordForm.value.confirmPassword.trim()) {
    return notifyNegative('A confirmação da senha não confere')
  }

  try {
    changingPassword.value = true

    const payload = {
      currentPassword: passwordForm.value.currentPassword.trim(),
      newPassword: passwordForm.value.newPassword.trim()
    }

    if (clienteSelecionado.value.email && clienteSelecionado.value.email !== '-') {
      payload.email = clienteSelecionado.value.email.trim()
    } else if (clienteSelecionado.value.phone && clienteSelecionado.value.phone !== '-') {
      payload.phone = clienteSelecionado.value.phone.trim()
    } else {
      return notifyNegative('Usuário sem e-mail ou telefone para localizar a conta')
    }

    const { data } = await api.put('/auth/change-password', payload)

    resetPasswordForm()

    $q.notify({
      type: 'positive',
      message: data?.message || 'Senha alterada com sucesso',
      icon: 'mdi-check-circle-outline',
      position: 'top',
      progress: true,
      actions: [{ icon: 'mdi-close', color: 'white', round: true }]
    })
  } catch (error) {
    console.error('[AUTH_CHANGE_PASSWORD_ERROR]', error)
    notifyNegative(error?.response?.data?.message || 'Erro ao alterar senha')
  } finally {
    changingPassword.value = false
  }
}

async function removerCliente() {
  if (!clienteSelecionado.value?._id) return

  try {
    const confirmed = await abrirConfirmacaoExclusao(clienteSelecionado.value)
    if (!confirmed) return

    deletingUser.value = true

    const payload = {}

    if (clienteSelecionado.value.email && clienteSelecionado.value.email !== '-') {
      payload.email = clienteSelecionado.value.email.trim()
    } else if (clienteSelecionado.value.phone && clienteSelecionado.value.phone !== '-') {
      payload.phone = clienteSelecionado.value.phone.trim()
    } else {
      payload.userId = clienteSelecionado.value._id
    }

    const { data } = await api.delete('/auth/delete-acc', { data: payload })

    clientesRows.value = clientesRows.value.filter(item => item._id !== clienteSelecionado.value._id)

    dialogCliente.value = false
    clienteSelecionado.value = null
    resetPasswordForm()

    $q.notify({
      type: 'positive',
      message: data?.message || 'Usuário removido com sucesso',
      icon: 'mdi-check-circle-outline',
      position: 'top',
      progress: true,
      actions: [{ icon: 'mdi-close', color: 'white', round: true }]
    })
  } catch (error) {
    if (error === 'cancelled') return

    console.error('[AUTH_DELETE_ACC_ERROR]', error)
    notifyNegative(error?.response?.data?.message || 'Erro ao remover usuário')
  } finally {
    deletingUser.value = false
  }
}

function abrirConfirmacao(cliente, nextRole, acao) {
  return new Promise((resolve, reject) => {
    $q.dialog({
      title: 'Alterar plano',
      message: `Deseja ${acao} o usuário ${cliente.name || 'selecionado'} para ${nextRole}?`,
      cancel: true,
      persistent: true,
      ok: {
        label: 'Confirmar',
        color: 'primary',
        unelevated: true
      },
      cancel: {
        label: 'Cancelar',
        flat: true
      }
    })
      .onOk(() => resolve(true))
      .onCancel(() => reject('cancelled'))
  })
}

function abrirConfirmacaoExclusao(cliente) {
  return new Promise((resolve, reject) => {
    $q.dialog({
      title: 'Remover usuário',
      message: `Deseja remover permanentemente o usuário ${cliente.name || 'selecionado'}?`,
      cancel: true,
      persistent: true,
      ok: {
        label: 'Remover',
        color: 'negative',
        unelevated: true
      },
      cancel: {
        label: 'Cancelar',
        flat: true
      }
    })
      .onOk(() => resolve(true))
      .onCancel(() => reject('cancelled'))
  })
}

function notifyNegative(message) {
  $q.notify({
    type: 'negative',
    message,
    icon: 'mdi-alert-circle-outline',
    position: 'top',
    progress: true,
    actions: [{ icon: 'mdi-close', color: 'white', round: true }]
  })
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
.act-premium { color: #fcd34d; }
.act-free { color: #93c5fd; }

.act-save {
  color: #86efac;
  border-color: rgba(134, 239, 172, .35);
  background: rgba(134, 239, 172, .08);
}

.act-danger {
  color: #fca5a5;
  border-color: rgba(252, 165, 165, .35);
  background: rgba(239, 68, 68, .08);
}

.detail-card {
  width: min(94vw, 720px);
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

.detail-item-full {
  grid-column: 1 / -1;
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

  .detail-item-full {
    grid-column: auto;
  }
}
</style>