<template>
  <q-page class="page q-pa-md">
    <q-breadcrumbs class="crumbs q-mb-md" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
      <q-breadcrumbs-el icon="paid" label="Vendas" exact />
    </q-breadcrumbs>

    <q-card class="card hero" flat bordered>
      <q-card-section>
        <div class="row items-center justify-between">
          <div>
            <div class="text-overline hero-kicker">Resumo</div>
            <div class="text-h5 text-weight-bold safe-text hero-title">Vendas Totais do Dia</div>
            <div class="text-caption hero-sub q-mt-xs safe-text">
              Este é o valor total arrecadado com os pagamentos aprovados hoje.
            </div>
          </div>

          <q-icon name="insights" size="34px" class="ic" />
        </div>

        <div class="value q-mt-md">
          {{ formatMoney(vendasHojeTotal) }}
        </div>

        <div class="row q-col-gutter-md q-mt-md">
          <div class="col-12 col-sm-4">
            <div class="stat-box">
              <div class="stat-label">Pagamentos hoje</div>
              <div class="stat-value">{{ pagamentosHoje.length }}</div>
            </div>
          </div>

          <div class="col-12 col-sm-4">
            <div class="stat-box">
              <div class="stat-label">Total geral</div>
              <div class="stat-value">{{ formatMoney(totalGeral) }}</div>
            </div>
          </div>

          <div class="col-12 col-sm-4">
            <div class="stat-box">
              <div class="stat-label">Registros</div>
              <div class="stat-value">{{ pagination.rowsNumber }}</div>
            </div>
          </div>
        </div>

        <div class="q-mt-md">
          <q-btn
            unelevated
            icon="mdi-whatsapp"
            label="Solicitar saque pendente"
            class="whats-btn"
            @click="irParaWhatsapp"
          />
        </div>
      </q-card-section>
    </q-card>

    <q-card class="card q-mt-lg" flat bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-weight-bold safe-text section-title">Últimos Pagamentos</div>
        <div class="row items-center q-gutter-sm">
          <q-chip outline class="chip">{{ pagination.rowsNumber }} itens</q-chip>

          <q-btn
            dense
            unelevated
            icon="refresh"
            label="Atualizar"
            class="refresh-btn"
            :loading="loading"
            @click="buscarPagamentos()"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-table
        :rows="paymentsRows"
        :columns="columns"
        row-key="_id"
        class="tbl"
        flat
        bordered
        wrap-cells
        :loading="loading"
        v-model:pagination="pagination"
        no-data-label="Nenhum pagamento encontrado"
        loading-label="Carregando pagamentos..."
        @request="onTableRequest"
      >
        <template #body-cell-status="props">
          <q-td :props="props">
            <q-chip dense :color="getStatusColor(props.row.status)" text-color="white">
              {{ props.row.status || '-' }}
            </q-chip>
          </q-td>
        </template>

        <template #body-cell-paid_amount="props">
          <q-td :props="props">
            <span class="money">{{ formatMoney(props.row.paid_amount) }}</span>
          </q-td>
        </template>

        <template #body-cell-paidAt="props">
          <q-td :props="props">
            {{ formatDate(props.row.paidAt) }}
          </q-td>
        </template>

        <template #body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense flat icon="visibility" class="act act-primary" @click="visualizarPagamento(props.row)">
              <q-tooltip>Visualizar pagamento</q-tooltip>
            </q-btn>
          </q-td>
        </template>
      </q-table>
    </q-card>

    <q-dialog v-model="dialogPagamento">
      <q-card class="detail-card">
        <q-card-section class="row items-center justify-between">
          <div class="text-h6 text-weight-bold">Detalhes do Pagamento</div>
          <q-btn flat round dense icon="close" v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section v-if="pagamentoSelecionado">
          <div class="detail-grid q-mb-md">
            <div class="detail-item">
              <div class="detail-label">Cliente</div>
              <div class="detail-value">{{ pagamentoSelecionado.userName || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">E-mail</div>
              <div class="detail-value">{{ pagamentoSelecionado.email || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Status</div>
              <div class="detail-value">{{ pagamentoSelecionado.status || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Método</div>
              <div class="detail-value">{{ pagamentoSelecionado.capture_method || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Valor pago</div>
              <div class="detail-value">{{ formatMoney(pagamentoSelecionado.paid_amount) }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Plano</div>
              <div class="detail-value">{{ pagamentoSelecionado.planoName || '-' }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Pago em</div>
              <div class="detail-value">{{ formatDate(pagamentoSelecionado.paidAt) }}</div>
            </div>

            <div class="detail-item">
              <div class="detail-label">Provider</div>
              <div class="detail-value">{{ pagamentoSelecionado.provider || '-' }}</div>
            </div>

            <div class="detail-item detail-item-full">
              <div class="detail-label">Order NSU</div>
              <div class="detail-value break-all">{{ pagamentoSelecionado.order_nsu || '-' }}</div>
            </div>

            <div class="detail-item detail-item-full">
              <div class="detail-label">Transaction NSU</div>
              <div class="detail-value break-all">{{ pagamentoSelecionado.transaction_nsu || '-' }}</div>
            </div>

            <div class="detail-item detail-item-full" v-if="pagamentoSelecionado.receipt_url">
              <div class="detail-label">Recibo</div>
              <div class="detail-value break-all">
                <a :href="pagamentoSelecionado.receipt_url" target="_blank" class="receipt-link">
                  Abrir recibo
                </a>
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { api } from 'boot/axios'
import { useQuasar } from 'quasar'

const $q = useQuasar()

const loading = ref(false)
const paymentsRows = ref([])
const allPaymentsToday = ref([])
const dialogPagamento = ref(false)
const pagamentoSelecionado = ref(null)

const pagination = ref({
  sortBy: 'paidAt',
  descending: true,
  page: 1,
  rowsPerPage: 10,
  rowsNumber: 0
})

const columns = ref([
  {
    name: 'userName',
    label: 'Cliente',
    field: row => row.userName,
    align: 'left',
    classes: 'sticky-col',
    headerClasses: 'sticky-col'
  },
  {
    name: 'email',
    label: 'E-mail',
    field: row => row.email,
    align: 'left'
  },
  {
    name: 'status',
    label: 'Status',
    field: row => row.status,
    align: 'left'
  },
  {
    name: 'paid_amount',
    label: 'Valor',
    field: row => row.paid_amount,
    align: 'left'
  },
  {
    name: 'paidAt',
    label: 'Data',
    field: row => row.paidAt,
    align: 'left'
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'center'
  }
])

const pagamentosHoje = computed(() => {
  const hoje = new Date()

  return allPaymentsToday.value.filter(payment => {
    const paidAt = new Date(payment.paidAt || payment.createdAt || 0)

    return (
      paidAt.getDate() === hoje.getDate() &&
      paidAt.getMonth() === hoje.getMonth() &&
      paidAt.getFullYear() === hoje.getFullYear()
    )
  })
})

const vendasHojeTotal = computed(() => {
  return pagamentosHoje.value.reduce((total, payment) => {
    return total + normalizeMoneyValue(payment.paid_amount ?? payment.amount)
  }, 0)
})

const totalGeral = computed(() => {
  return allPaymentsToday.value.reduce((total, payment) => {
    return total + normalizeMoneyValue(payment.paid_amount ?? payment.amount)
  }, 0)
})

onMounted(() => {
  buscarPagamentos()
  buscarResumoCompleto()
})

function onTableRequest(props) {
  pagination.value = {
    ...pagination.value,
    page: props.pagination.page,
    rowsPerPage: props.pagination.rowsPerPage,
    sortBy: props.pagination.sortBy,
    descending: props.pagination.descending
  }

  buscarPagamentos()
}

async function buscarPagamentos() {
  loading.value = true

  try {
    const { data } = await api.post('/pay/get-payments', {
      page: pagination.value.page,
      limit: pagination.value.rowsPerPage
    })

    paymentsRows.value = Array.isArray(data?.data)
      ? data.data.map(mapPaymentRow)
      : []

    pagination.value.rowsNumber = Number(data?.pagination?.total || 0)
    pagination.value.page = Number(data?.pagination?.page || 1)
    pagination.value.rowsPerPage = Number(data?.pagination?.limit || 10)
  } catch (error) {
    console.error('[PAYMENTS_PAGE_ERROR]', error)

    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || 'Erro ao buscar pagamentos',
      icon: 'mdi-alert-circle-outline',
      position: 'top',
      progress: true,
      actions: [{ icon: 'mdi-close', color: 'white', round: true }]
    })
  } finally {
    loading.value = false
  }
}

async function buscarResumoCompleto() {
  try {
    const { data } = await api.post('/pay/get-payments', {
      page: 1,
      limit: 500
    })

    allPaymentsToday.value = Array.isArray(data?.data)
      ? data.data.map(mapPaymentRow)
      : []
  } catch (error) {
    console.error('[PAYMENTS_SUMMARY_ERROR]', error)
  }
}

function mapPaymentRow(payment) {
  return {
    _id: payment?._id || '',
    userId: payment?.userId?._id || payment?.userId || '',
    userName: payment?.userId?.name || payment?.email || '-',
    email: payment?.email || payment?.userId?.email || '-',
    provider: payment?.provider || '-',
    status: payment?.status || '-',
    order_nsu: payment?.order_nsu || '-',
    transaction_nsu: payment?.transaction_nsu || '-',
    receipt_url: payment?.receipt_url || '',
    capture_method: payment?.capture_method || '-',
    amount: normalizeMoneyValue(payment?.amount),
    paid_amount: normalizeMoneyValue(payment?.paid_amount ?? payment?.amount),
    planoName: payment?.planoName || '-',
    paidAt: payment?.paidAt || payment?.createdAt || ''
  }
}

function visualizarPagamento(payment) {
  pagamentoSelecionado.value = { ...payment }
  dialogPagamento.value = true
}

function normalizeMoneyValue(value) {
  const numericValue = Number(value || 0)

  if (!numericValue) return 0

  return numericValue >= 100 ? numericValue / 100 : numericValue
}

function formatMoney(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
}

function formatDate(value) {
  if (!value) return '-'

  try {
    return new Date(value).toLocaleString('pt-BR')
  } catch {
    return value
  }
}

function getStatusColor(status) {
  const normalized = String(status || '').toLowerCase()

  if (normalized.includes('paid')) return 'green-7'
  if (normalized.includes('pending')) return 'orange-7'
  if (normalized.includes('cancel')) return 'red-6'
  return 'grey-6'
}

function irParaWhatsapp() {
  const message = 'Olá Samuel, gostaria de sacar o valor pendente do FlaviaKamila-App'
  const url = `https://wa.me/5561981748795?text=${encodeURIComponent(message)}`
  window.open(url, '_blank')
}
</script>

<style scoped>
:global(html), :global(body), :global(#q-app) { overflow-x: clip; }
:global(.row > [class*="col-"]) { min-width: 0; }
.safe-text { overflow-wrap: anywhere; word-break: break-word; }

.page {
  background: transparent;
  color: #2a1d1d;
}

.crumbs {
  background: rgba(255,255,255,.88);
  border: 1px solid rgba(217,59,43,.08);
  padding: 10px 12px;
  border-radius: 14px;
}

.card {
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,.82);
  border: 1px solid rgba(217,59,43,.08);
  box-shadow: 0 14px 34px rgba(125,66,58,.06);
}

.hero {
  background:
    radial-gradient(900px 500px at 0% 0%, rgba(255,107,87,.14), transparent 55%),
    radial-gradient(900px 500px at 100% 30%, rgba(217,59,43,.08), transparent 55%),
    rgba(255,255,255,.82);
}

.hero-kicker {
  color: #8a6a67;
}

.hero-title {
  color: #241717;
}

.hero-sub {
  color: #7b6360;
}

.ic {
  color: #d93b2b;
  opacity: .95;
}

.value {
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: .3px;
  color: #c43728;
}

.section-title {
  color: #241717;
}

.chip {
  color: #b13224;
  border-color: rgba(217,59,43,.20);
  background: rgba(255,107,87,.08);
}

.refresh-btn {
  border-radius: 12px;
  background: rgba(255,255,255,.84);
  color: #c43728;
  border: 1px solid rgba(217,59,43,.10);
}

.whats-btn {
  border-radius: 14px;
  background: #25d366;
  color: white;
  font-weight: 800;
  text-transform: none;
}

.tbl {
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,.82);
  border: 1px solid rgba(217,59,43,.08);
  box-shadow: 0 14px 34px rgba(125,66,58,.06);
}

.tbl :deep(.q-table__top),
.tbl :deep(.q-table__bottom) {
  background: rgba(255,255,255,.70);
  color: #2a1d1d;
}

.tbl :deep(th) {
  color: #6f5653;
  background: rgba(255,248,246,.96);
  font-weight: 800;
}

.tbl :deep(td) {
  color: #2a1d1d;
}

.tbl :deep(.sticky-col) {
  position: sticky;
  left: 0;
  z-index: 2;
  background: rgba(255,250,249,.98);
}

.act {
  border-radius: 12px;
  background: rgba(255,255,255,.86);
  border: 1px solid rgba(217,59,43,.08);
}

.act-primary {
  color: #c43728;
}

.money {
  color: #c43728;
  font-weight: 800;
}

.stat-box {
  border-radius: 16px;
  padding: 16px;
  background: rgba(255,248,246,.92);
  border: 1px solid rgba(217,59,43,.08);
  height: 100%;
}

.stat-label {
  font-size: .78rem;
  color: #8a6a67;
  margin-bottom: 6px;
}

.stat-value {
  font-size: 1.2rem;
  font-weight: 900;
  color: #241717;
}

.detail-card {
  width: min(94vw, 720px);
  background: #fffdfc;
  color: #241717;
  border-radius: 20px;
  border: 1px solid rgba(217,59,43,.10);
}

.detail-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

.detail-item {
  padding: 12px;
  border-radius: 12px;
  background: rgba(255,248,246,.90);
  border: 1px solid rgba(217,59,43,.08);
}

.detail-item-full {
  grid-column: 1 / -1;
}

.detail-label {
  font-size: .75rem;
  color: #8a6a67;
  margin-bottom: 4px;
}

.detail-value {
  font-weight: 700;
  color: #2a1d1d;
}

.receipt-link {
  color: #c43728;
  font-weight: 800;
  text-decoration: none;
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