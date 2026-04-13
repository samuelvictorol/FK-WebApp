<template>
  <q-page class="page q-pa-md column q-gutter-y-md full-height">
    <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" label="Início" exact />
    </q-breadcrumbs>

    <div class="hero">
      <div class="row items-start justify-between q-col-gutter-md">
        <div class="col-12 col-md-8">
          <div class="text-h4 text-weight-bold safe-text hero-title">
            Painel do Admin
          </div>
          <div class="text-subtitle1 q-mt-xs hero-sub safe-text">
            Olá, <strong class="hero-user">{{ userName }}</strong>. Aqui está um resumo rápido do dia.
          </div>
        </div>

        <div class="col-12 col-md-4">
          <q-card class="mini-card" flat bordered>
            <q-card-section class="row items-center justify-between">
              <div>
                <div class="text-caption mini-label">Status</div>
                <div class="text-subtitle2 text-weight-bold safe-text mini-value">
                  Sistema online
                </div>
              </div>
              <q-badge rounded class="badge-ok">OK</q-badge>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <div class="row q-col-gutter-md">
      <div class="col-12">
        <q-card class="kpi-card kpi-main" flat bordered>
          <q-card-section class="row items-center justify-between">
            <div>
              <div class="text-caption kpi-label">Faturamento Total</div>
              <div class="kpi-value safe-text">{{ formatMoney(totalPaymentsValue) }}</div>
              <div class="text-caption kpi-sub q-mt-xs">
                {{ paymentsCount }} pagamento(s) aprovado(s)
              </div>
            </div>
            <q-icon name="trending_up" size="34px" class="kpi-icon" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <q-card class="actions-card" flat bordered>
      <q-card-section class="row items-center justify-between">
        <div>
          <div class="text-subtitle1 text-weight-bold safe-text section-title">Ações rápidas</div>
          <div class="text-caption section-sub safe-text">Acesse as áreas principais em 1 clique.</div>
        </div>
        <div class="row items-center q-gutter-sm">
          <q-chip outline class="chip">
            {{ paymentsCount }} pagamentos
          </q-chip>

          <q-btn
            dense
            unelevated
            icon="refresh"
            label="Atualizar"
            class="refresh-btn"
            :loading="loading"
            @click="buscarPagamentos"
          />
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-btn
              class="action-btn btn-main full-width"
              unelevated
              icon-right="list_alt"
              label="Formulários"
              to="/admin/forms"
            />
          </div>

          <div class="col-12 col-md-4">
            <q-btn
              class="action-btn btn-soft full-width"
              unelevated
              icon-right="group"
              label="Usuários"
              to="/admin/clientes"
            />
          </div>

          <div class="col-12 col-md-4">
            <q-btn
              class="action-btn btn-paid full-width"
              unelevated
              icon-right="paid"
              label="Pagamentos"
              to="/admin/vendas"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="premium-card" flat bordered>
      <q-card-section class="row items-center justify-between">
        <div>
          <div class="text-subtitle1 text-weight-bold safe-text section-title">Resumo financeiro</div>
          <div class="text-caption section-sub safe-text">
            Baseado na collection de pagamentos aprovados.
          </div>
        </div>

        <q-icon name="payments" size="22px" class="premium-ic" />
      </q-card-section>

      <q-separator />

      <q-card-section>
        <div v-if="loading" class="row items-center q-gutter-sm loading-text">
          <q-spinner color="red-5" />
          <span>Carregando pagamentos...</span>
        </div>

        <div v-else class="row q-col-gutter-md">
          <div class="col-12 col-sm-6 col-md-4">
            <div class="stat-box">
              <div class="stat-label">Pagamentos aprovados</div>
              <div class="stat-value">{{ paymentsCount }}</div>
            </div>
          </div>

          <div class="col-12 col-sm-6 col-md-4">
            <div class="stat-box">
              <div class="stat-label">Faturamento total</div>
              <div class="stat-value">{{ formatMoney(totalPaymentsValue) }}</div>
            </div>
          </div>

          <div class="col-12 col-sm-6 col-md-4">
            <div class="stat-box">
              <div class="stat-label">Faturamento hoje</div>
              <div class="stat-value">{{ formatMoney(todayPaymentsValue) }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="note-card" flat bordered>
      <q-card-section class="row items-center no-wrap">
        <q-icon name="info" size="20px" class="q-mr-sm note-ic" />
        <div class="text-caption note-text safe-text">
          Dica: o total agora considera apenas pagamentos aprovados, sem depender de privilégios manuais.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const $q = useQuasar()

const loading = ref(false)
const payments = ref([])

const userName = computed(() => {
  try {
    const raw = localStorage.getItem('auth_user')
    const user = raw ? JSON.parse(raw) : {}
    return user?.name || 'Administrador'
  } catch {
    return 'Administrador'
  }
})

const approvedPayments = computed(() => {
  return payments.value.filter(payment =>
    String(payment?.status || '').toLowerCase().includes('paid')
  )
})

const paymentsCount = computed(() => approvedPayments.value.length)

const totalPaymentsValue = computed(() => {
  return approvedPayments.value.reduce((total, payment) => {
    return total + Number(payment?.paid_amount || payment?.amount || 0)
  }, 0)
})

const todayPaymentsValue = computed(() => {
  const hoje = new Date()

  return approvedPayments.value.reduce((total, payment) => {
    const paidAt = new Date(payment?.paidAt || payment?.createdAt || 0)

    const isToday =
      paidAt.getDate() === hoje.getDate() &&
      paidAt.getMonth() === hoje.getMonth() &&
      paidAt.getFullYear() === hoje.getFullYear()

    return total + (isToday ? Number(payment?.paid_amount || payment?.amount || 0) : 0)
  }, 0)
})

onMounted(() => {
  buscarPagamentos()
})

async function buscarPagamentos() {
  loading.value = true

  try {
    const { data } = await api.post('/pay/get-payments', {
      page: 1,
      limit: 500
    })

    payments.value = Array.isArray(data?.data) ? data.data : []
  } catch (error) {
    console.error('[ADMIN_PAYMENTS_ERROR]', error)

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

function formatMoney(value) {
  return Number(value || 0).toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  })
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

.hero {
  padding: 10px 2px 0;
}

.hero-title {
  color: #241717;
}

.hero-sub {
  color: #755c58;
}

.hero-user {
  color: #c43728;
}

.mini-card {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,.82);
  border: 1px solid rgba(217,59,43,.08);
  box-shadow: 0 14px 30px rgba(125,66,58,.06);
}

.mini-label {
  color: #8a6a67;
}

.mini-value {
  color: #241717;
}

.badge-ok {
  background: rgba(34,197,94,.16);
  color: #166534;
  border: 1px solid rgba(34,197,94,.18);
}

.kpi-card {
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(217,59,43,.08);
}

.kpi-main {
  background:
    radial-gradient(900px 500px at 100% 0%, rgba(255, 107, 87, 0.14), transparent 60%),
    rgba(255,255,255,.82);
  box-shadow: 0 16px 36px rgba(125,66,58,.08);
}

.kpi-label {
  color: #8a6a67;
}

.kpi-value {
  font-size: 1.9rem;
  font-weight: 900;
  letter-spacing: .3px;
  color: #241717;
  margin-top: 2px;
}

.kpi-sub {
  color: #7b6360;
}

.kpi-icon {
  color: #d93b2b;
  opacity: .9;
}

.actions-card {
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,.82);
  border: 1px solid rgba(217,59,43,.08);
  box-shadow: 0 16px 36px rgba(125,66,58,.08);
}

.section-title {
  color: #241717;
}

.section-sub {
  color: #7b6360;
}

.action-btn {
  border-radius: 16px;
  padding: 14px 14px;
  font-weight: 900;
  text-transform: none;
  letter-spacing: .2px;
  border: 1px solid rgba(217,59,43,.10);
}

.btn-main {
  background: linear-gradient(135deg, #d93b2b, #ff6b57);
  color: #ffffff;
}

.btn-soft {
  background: linear-gradient(135deg, rgba(255,107,87,.16), rgba(217,59,43,.08));
  color: #b13224;
}

.btn-paid {
  background: linear-gradient(135deg, rgba(217,59,43,.18), rgba(255,107,87,.12));
  color: #b13224;
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

.premium-card {
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,.82);
  border: 1px solid rgba(217,59,43,.08);
  box-shadow: 0 16px 36px rgba(125,66,58,.08);
}

.premium-ic {
  color: #d97706;
}

.loading-text {
  color: #7b6360;
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
  font-size: 1.4rem;
  font-weight: 900;
  color: #241717;
}

.note-card {
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,.74);
  border: 1px solid rgba(217,59,43,.08);
}

.note-ic {
  color: #c43728;
}

.note-text {
  color: #7b6360;
}
</style>