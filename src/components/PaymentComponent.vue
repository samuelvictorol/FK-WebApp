<template>
  <q-card class="payment-modal">
    <q-card-section class="payment-head">
      <div>
        <div class="payment-kicker">Acesso premium</div>
        <div class="text-h5 text-weight-bold safe-text payment-title">
          Libere o Acesso Completo
        </div>
      </div>

      <q-btn flat round dense icon="close" class="btn-close-head" @click="emit('close')" />
    </q-card-section>

    <q-separator />

    <div class="payment-scroll">
      <q-card-section class="q-pa-md">
        <q-card flat bordered class="summary-card q-mb-md">
          <q-card-section>
            <div class="text-subtitle1 text-weight-bold summary-title">
              Resumo da cobrança
            </div>

            <div class="summary-row q-mt-sm">
              <span>Produto</span>
              <strong>Acesso Premium Forms</strong>
            </div>

            <div class="summary-row">
              <span>E-mail</span>
              <strong class="ellipsis">{{ user.email || '-' }}</strong>
            </div>

            <div class="summary-row">
              <span>Preço</span>
              <strong class="price-highlight">R$ 49,90</strong>
            </div>
          </q-card-section>
        </q-card>

        <div class="cards-grid q-mb-md">
          <q-card flat bordered class="mini-card">
            <q-card-section class="row items-start no-wrap">
              <q-icon name="bolt" size="22px" class="card-icon q-mr-sm" />
              <div>
                <div class="mini-title">Aprovação mais rápida</div>
                <div class="mini-sub">
                  Otimize seu tempo com processos de aprovação mais eficientes.
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card flat bordered class="mini-card">
            <q-card-section class="row items-start no-wrap">
              <q-icon name="verified" size="22px" class="card-icon q-mr-sm" />
              <div>
                <div class="mini-title">Acesso Premium</div>
                <div class="mini-sub">
                  Receba todos os resultados do Forms com análises personalizadas para o seu perfil.
                </div>
              </div>
            </q-card-section>
          </q-card>

          <q-card flat bordered class="mini-card">
            <q-card-section class="row items-start no-wrap">
              <q-icon name="description" size="22px" class="card-icon q-mr-sm" />
              <div>
                <div class="mini-title">Rotina de Estudos</div>
                <div class="mini-sub">
                  Melhore seu aprendizado com uma rotina de estudos personalizada, baseada no seu desempenho e necessidades.
                </div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <q-input
          v-model.trim="email"
          outlined
          bg-color="white"
          label="E-mail do pagamento"
          type="email"
          class="input-modern q-mb-md"
          readonly
        >
          <template #prepend>
            <q-icon name="mail" color="red-5" />
          </template>
        </q-input>

        <q-banner v-if="user.email" inline-actions rounded class="info-banner q-mb-md">
          <template #avatar>
            <q-icon name="mail" color="red-5" />
          </template>
          O link será criado para a conta:
          <strong>{{ user.email }}</strong>
        </q-banner>

        <q-banner inline-actions rounded class="info-banner q-mb-md">
          <template #avatar>
            <q-icon name="refresh" color="red-5" />
          </template>
          Caso não atualize seu plano premium automaticamente após o pagamento, encerre a sessão e faça login novamente.
        </q-banner>

        <q-banner
          v-if="payment.status === 'paid'"
          inline-actions
          rounded
          class="success-banner q-mb-md"
        >
          <template #avatar>
            <q-icon name="verified" color="green-7" />
          </template>
          Pagamento identificado com sucesso. Seu acesso premium já foi liberado.
        </q-banner>

        <div v-if="payment.payment_url" class="result-box q-mb-md">
          <div class="text-subtitle2 text-weight-bold q-mb-xs result-title">
            Link gerado com sucesso
          </div>

          <div class="link-box">
            {{ payment.payment_url }}
          </div>

          <div class="row q-col-gutter-sm q-mt-sm">
            <div class="col-12 col-sm-auto">
              <q-btn
                unelevated
                class="btn-open full-width"
                icon="open_in_new"
                label="Abrir link"
                @click="openPaymentLink"
              />
            </div>

            <div class="col-12 col-sm-auto">
              <q-btn
                outline
                class="btn-copy full-width"
                icon="content_copy"
                label="Copiar link"
                @click="copyPaymentLink"
              />
            </div>
          </div>
        </div>
      </q-card-section>
    </div>

    <q-separator />

    <q-card-actions align="right" class="q-pa-md payment-actions">
      <q-btn flat label="Fechar" class="btn-close" @click="emit('close')" />
      <q-btn
        unelevated
        class="btn-payment"
        icon="credit_card"
        :label="payment.payment_url ? 'Gerar novo link' : 'Quero acesso premium'"
        :loading="loading"
        :disable="!email"
        @click="criarLinkPagamento"
      />
    </q-card-actions>
  </q-card>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useQuasar, copyToClipboard } from 'quasar'
import { useRoute, useRouter } from 'vue-router'
import { api } from 'boot/axios'

const emit = defineEmits(['close', 'premium-activated'])
const $q = useQuasar()
const route = useRoute()
const router = useRouter()

const loading = ref(false)
const email = ref('')
const payment = ref({
  payment_url: '',
  status: '',
  order_nsu: '',
  transaction_nsu: '',
  receipt_url: '',
  capture_method: ''
})

const user = computed(() => {
  try {
    const raw = localStorage.getItem('auth_user')
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
})

onMounted(() => {
  email.value = user.value?.email || ''
  handleInfinitePayReturn()
})

async function criarLinkPagamento() {
  if (!email.value?.trim()) {
    notifyTop('Informe um e-mail para gerar o link', 'warning')
    return
  }

  loading.value = true

  try {
    const { data } = await api.post('/pay/criar-link', {
      email: email.value.trim().toLowerCase()
    })

    payment.value = {
      ...payment.value,
      payment_url: data?.payment_url || '',
      status: data?.status || 'pending',
      order_nsu: data?.order_nsu || email.value.trim().toLowerCase()
    }

    if (!payment.value.payment_url) {
      throw new Error('O backend não retornou a URL de pagamento')
    }

    notifyTop('Link de pagamento criado com sucesso', 'positive')
    window.open(payment.value.payment_url, '_blank', 'noopener,noreferrer')
  } catch (error) {
    console.error('[PAYMENT_COMPONENT] erro ao criar link:', error)
    notifyTop(
      error?.response?.data?.error ||
      error?.response?.data?.message ||
      error?.message ||
      'Erro ao criar link de pagamento',
      'negative'
    )
  } finally {
    loading.value = false
  }
}

function handleInfinitePayReturn() {
  const orderNsu = route.query.order_nsu || ''
  const transactionNsu = route.query.transaction_nsu || ''
  const receiptUrl = route.query.receipt_url || ''
  const captureMethod = route.query.capture_method || ''
  const slug = route.query.slug || ''

  if (!orderNsu && !transactionNsu && !slug) return

  payment.value = {
    ...payment.value,
    status: transactionNsu ? 'paid' : 'processing',
    order_nsu: String(orderNsu),
    transaction_nsu: String(transactionNsu),
    receipt_url: String(receiptUrl),
    capture_method: String(captureMethod)
  }

  if (
    orderNsu &&
    user.value?.email &&
    String(orderNsu).toLowerCase().trim() === String(user.value.email).toLowerCase().trim()
  ) {
    updateLocalUserPremium()
    emit('premium-activated')
    notifyTop('Pagamento retornou com sucesso. Estamos liberando seu premium.', 'positive')
  } else {
    notifyTop('Retorno de pagamento identificado.', 'info')
  }

  clearPaymentQueryParams()
}

function updateLocalUserPremium() {
  try {
    const raw = localStorage.getItem('auth_user')
    if (!raw) return

    const parsed = JSON.parse(raw)
    parsed.role = 'Plano Premium'
    localStorage.setItem('auth_user', JSON.stringify(parsed))
  } catch (error) {
    console.error('[PAYMENT_COMPONENT] erro ao atualizar auth_user local:', error)
  }
}

function clearPaymentQueryParams() {
  const newQuery = { ...route.query }

  delete newQuery.order_nsu
  delete newQuery.transaction_nsu
  delete newQuery.receipt_url
  delete newQuery.capture_method
  delete newQuery.slug

  router.replace({ query: newQuery }).catch(() => {})
}

function openPaymentLink() {
  if (!payment.value.payment_url) {
    notifyTop('Nenhum link disponível para abrir', 'warning')
    return
  }

  window.open(payment.value.payment_url, '_blank', 'noopener,noreferrer')
}

async function copyPaymentLink() {
  if (!payment.value.payment_url) {
    notifyTop('Nenhum link disponível para copiar', 'warning')
    return
  }

  try {
    await copyToClipboard(payment.value.payment_url)
    notifyTop('Link copiado com sucesso', 'positive')
  } catch (error) {
    console.error('[PAYMENT_COMPONENT] erro ao copiar link:', error)
    notifyTop('Não foi possível copiar o link', 'negative')
  }
}

function notifyTop(message, type = 'positive') {
  const iconMap = {
    positive: 'mdi-check-circle-outline',
    negative: 'mdi-alert-circle-outline',
    warning: 'mdi-alert-outline',
    info: 'mdi-information-outline'
  }

  $q.notify({
    type,
    message,
    icon: iconMap[type] || 'mdi-information-outline',
    position: 'top',
    progress: true,
    timeout: 3000,
    actions: [
      {
        icon: 'mdi-close',
        color: 'white',
        round: true
      }
    ]
  })
}
</script>

<style scoped>
.payment-modal {
  width: min(92vw, 760px);
  max-width: 760px;
  height: min(88vh, 820px);
  max-height: 88vh;
  border-radius: 24px;
  overflow: hidden;
  background:
    radial-gradient(900px 420px at 0% 0%, rgba(255, 107, 87, 0.08), transparent 55%),
    linear-gradient(180deg, #fffaf9 0%, #fff5f3 100%);
  color: #2a1d1d;
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(217, 59, 43, 0.10);
  box-shadow: 0 24px 60px rgba(125, 66, 58, 0.16);
}

.payment-head {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  padding: 22px 22px 18px;
  background:
    radial-gradient(700px 280px at 15% 20%, rgba(255, 107, 87, 0.18), transparent 60%),
    linear-gradient(135deg, #fff8f7, #fff2ef);
  flex-shrink: 0;
}

.payment-title {
  color: #241717;
}

.btn-close-head {
  color: #b13224;
}

.payment-scroll {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

.payment-actions {
  flex-shrink: 0;
  background: rgba(255, 252, 251, 0.92);
}

.payment-kicker {
  display: inline-block;
  font-size: 0.74rem;
  font-weight: 900;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: #c43728;
  margin-bottom: 8px;
}

.safe-text {
  overflow-wrap: anywhere;
  word-break: break-word;
}

.input-modern :deep(.q-field__control) {
  border-radius: 16px;
  min-height: 56px;
}

.info-banner {
  background: rgba(255, 107, 87, 0.10);
  color: #6b4844;
  border: 1px solid rgba(217, 59, 43, 0.10);
}

.success-banner {
  background: rgba(34, 197, 94, 0.10);
  color: #245a34;
  border: 1px solid rgba(34, 197, 94, 0.16);
}

.cards-grid {
  display: grid;
  gap: 12px;
}

.mini-card {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(217, 59, 43, 0.08);
  color: #2a1d1d;
  box-shadow: 0 14px 30px rgba(125, 66, 58, 0.05);
}

.card-icon {
  color: #7e2319;
  margin-top: 2px;
}

.mini-title {
  font-weight: 900;
  line-height: 1.2;
  color: #241717;
}

.mini-sub {
  font-size: 0.87rem;
  color: #735956;
  line-height: 1.45;
}

.summary-card {
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(217, 59, 43, 0.08);
  color: #2a1d1d;
  box-shadow: 0 14px 30px rgba(125, 66, 58, 0.05);
}

.summary-title {
  color: #241717;
}

.summary-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 8px 0;
  border-bottom: 1px solid rgba(217, 59, 43, 0.08);
  color: #6a514e;
}

.summary-row strong {
  color: #241717;
}

.summary-row:last-child {
  border-bottom: 0;
}

.price-highlight {
  font-size: 1rem;
  color: #c43728;
}

.result-box {
  border-radius: 20px;
  padding: 16px;
  background: rgba(255, 255, 255, 0.84);
  border: 1px solid rgba(217, 59, 43, 0.08);
}

.result-title {
  color: #241717;
}

.link-box {
  word-break: break-word;
  padding: 10px 12px;
  border-radius: 12px;
  background: #fff8f7;
  color: #6b4844;
  border: 1px solid rgba(217, 59, 43, 0.08);
  font-size: 0.92rem;
  line-height: 1.45;
}

.btn-payment {
  background: linear-gradient(135deg, #7e2319, #ff1e00);
  color: #ffffff;
  font-weight: 900;
  border-radius: 14px;
  padding: 10px 16px;
  box-shadow: 0 16px 34px rgba(217, 59, 43, 0.18);
}

.btn-open {
  background: linear-gradient(135deg, #7e2319, #ff1e00);
  color: #ffffff;
  font-weight: 800;
  border-radius: 12px;
}

.btn-copy {
  color: #b13224;
  border-color: rgba(217, 59, 43, 0.18);
  border-radius: 12px;
}

.btn-close {
  color: #8b6a66;
  font-weight: 700;
}

@media (min-width: 781px) {
  .cards-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 780px) {
  .payment-modal {
    width: 96vw;
    height: 92vh;
    max-height: 92vh;
    border-radius: 18px;
  }

  .cards-grid {
    grid-template-columns: 1fr;
  }

  .summary-row {
    flex-direction: column;
    align-items: flex-start;
  }

  .payment-head {
    padding: 18px 16px 14px;
  }

  .payment-actions {
    padding: 12px 16px 16px;
  }
}
</style>