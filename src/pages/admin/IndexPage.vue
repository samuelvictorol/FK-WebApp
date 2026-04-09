<template>
  <q-page class="page q-pa-md column q-gutter-y-md full-height">
    <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" label="Início" exact />
    </q-breadcrumbs>

    <div class="hero">
      <div class="row items-start justify-between q-col-gutter-md">
        <div class="col-12 col-md-8">
          <div class="text-h4 text-weight-bold safe-text">
            Painel do Admin
          </div>
          <div class="text-subtitle1 q-mt-xs text-grey-4 safe-text">
            Olá, <strong class="text-white">{{ userName }}</strong>. Aqui está um resumo rápido do dia.
          </div>
        </div>

        <div class="col-12 col-md-4">
          <q-card class="mini-card" flat bordered>
            <q-card-section class="row items-center justify-between">
              <div>
                <div class="text-caption text-grey-5">Status</div>
                <div class="text-subtitle2 text-weight-bold safe-text">
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
        <q-card class="kpi-card kpi-teal" flat bordered>
          <q-card-section class="row items-center justify-between">
            <div>
              <div class="text-caption text-grey-4">Lucro Total</div>
              <div class="kpi-value safe-text">{{ formatMoney(lucroTotal) }}</div>
              <div class="text-caption text-grey-5 q-mt-xs">
                {{ premiumUsersCount }} usuário(s) premium
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
          <div class="text-subtitle1 text-weight-bold safe-text">Ações rápidas</div>
          <div class="text-caption text-grey-5 safe-text">Acesse as áreas principais em 1 clique.</div>
        </div>
        <div class="row items-center q-gutter-sm">
          <q-chip outline class="chip">
            {{ premiumUsersCount }} premium
          </q-chip>

          <q-btn
            dense
            unelevated
            icon="refresh"
            label="Atualizar"
            class="refresh-btn"
            :loading="loading"
            @click="buscarPremiumUsers"
          />
        </div>
      </q-card-section>

      <q-separator dark />

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-btn
              class="action-btn btn-purple full-width"
              unelevated
              icon-right="list_alt"
              label="Formulários"
              to="/admin/forms"
            />
          </div>

          <div class="col-12 col-md-4">
            <q-btn
              class="action-btn btn-blue full-width"
              unelevated
              icon-right="group"
              label="Clientes"
              to="/admin/clientes"
            />
          </div>

          <div class="col-12 col-md-4">
            <q-btn
              class="action-btn btn-teal full-width"
              unelevated
              icon-right="paid"
              label="Painel de Vendas"
              to="/admin/vendas"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="premium-card" flat bordered>
      <q-card-section class="row items-center justify-between">
        <div>
          <div class="text-subtitle1 text-weight-bold safe-text">Resumo premium</div>
          <div class="text-caption text-grey-5 safe-text">
            Baseado no endpoint de usuários premium.
          </div>
        </div>

        <q-icon name="workspace_premium" size="22px" class="premium-ic" />
      </q-card-section>

      <q-separator dark />

      <q-card-section>
        <div v-if="loading" class="row items-center q-gutter-sm text-grey-4">
          <q-spinner />
          <span>Carregando dados premium...</span>
        </div>

        <div v-else class="row q-col-gutter-md">
          <div class="col-12 col-sm-6 col-md-4">
            <div class="stat-box">
              <div class="stat-label">Usuários Premium</div>
              <div class="stat-value">{{ premiumUsersCount }}</div>
            </div>
          </div>

          <div class="col-12 col-sm-6 col-md-4">
            <div class="stat-box">
              <div class="stat-label">Valor por Premium</div>
              <div class="stat-value">R$ 49,90</div>
            </div>
          </div>

          <div class="col-12 col-sm-6 col-md-4">
            <div class="stat-box">
              <div class="stat-label">Lucro Total</div>
              <div class="stat-value">{{ formatMoney(lucroTotal) }}</div>
            </div>
          </div>
        </div>
      </q-card-section>
    </q-card>

    <q-card class="note-card" flat bordered>
      <q-card-section class="row items-center no-wrap">
        <q-icon name="info" size="20px" class="q-mr-sm note-ic" />
        <div class="text-caption text-grey-4 safe-text">
          Dica: você pode abrir o menu no canto superior direito para navegar rapidamente.
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
const premiumUsers = ref([])

const userName = computed(() => {
  try {
    const raw = localStorage.getItem('auth_user')
    const user = raw ? JSON.parse(raw) : {}
    return user?.name || 'Administrador'
  } catch {
    return 'Administrador'
  }
})

const premiumUsersCount = computed(() => premiumUsers.value.length)

const lucroTotal = computed(() => {
  return premiumUsers.value.reduce((total, user) => {
    return total + Number(user?.lucro || 0)
  }, 0)
})

onMounted(() => {
  buscarPremiumUsers()
})

async function buscarPremiumUsers() {
  loading.value = true

  try {
    const { data } = await api.post('/admin/get-premium-users')
    premiumUsers.value = Array.isArray(data) ? data : []
  } catch (error) {
    console.error('[ADMIN_PREMIUM_USERS_ERROR]', error)

    $q.notify({
      type: 'negative',
      message: error?.response?.data?.message || 'Erro ao buscar usuários premium',
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

.page{
  background: transparent;
  color: rgba(255,255,255,.92);
}

.crumbs{
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  padding: 10px 12px;
  border-radius: 14px;
}

.hero{
  padding: 10px 2px 0;
}

.mini-card{
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
}

.badge-ok{
  background: rgba(34,197,94,.18);
  color: rgba(187,247,208,.98);
  border: 1px solid rgba(34,197,94,.25);
}

.kpi-card{
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.08);
}

.kpi-teal{
  background: radial-gradient(900px 500px at 100% 0%, rgba(132, 20, 184, 0.24), transparent 60%),
              rgba(255,255,255,.03);
}

.kpi-value{
  font-size: 1.9rem;
  font-weight: 900;
  letter-spacing: .3px;
  color: rgba(255,255,255,.96);
  margin-top: 2px;
}

.kpi-icon{
  color: rgba(255,255,255,.92);
  opacity: .9;
}

.actions-card{
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
}

.actions-ic{
  color: #c4b5fd;
  opacity: .95;
}

.action-btn{
  border-radius: 16px;
  padding: 14px 14px;
  font-weight: 900;
  text-transform: none;
  letter-spacing: .2px;
  border: 1px solid rgba(255,255,255,.10);
}

.btn-purple{
  background: linear-gradient(90deg, rgba(124,58,237,.65), rgba(124,58,237,.25));
  color: rgba(255,255,255,.95);
}

.btn-blue{
  background: linear-gradient(90deg, rgba(59,130,246,.55), rgba(59,130,246,.22));
  color: rgba(255,255,255,.95);
}

.btn-teal{
  background: linear-gradient(90deg, rgba(20,184,166,.55), rgba(20,184,166,.22));
  color: rgba(255,255,255,.95);
}

.chip{
  color: rgba(255,255,255,.90);
  border-color: rgba(124,58,237,.35);
  background: rgba(124,58,237,.10);
}

.refresh-btn{
  border-radius: 12px;
  background: rgba(255,255,255,.05);
  color: rgba(255,255,255,.95);
  border: 1px solid rgba(255,255,255,.10);
}

.premium-card{
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
}

.premium-ic{
  color: #fde68a;
}

.stat-box{
  border-radius: 16px;
  padding: 16px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
  height: 100%;
}

.stat-label{
  font-size: .78rem;
  color: rgba(255,255,255,.62);
  margin-bottom: 6px;
}

.stat-value{
  font-size: 1.4rem;
  font-weight: 900;
  color: rgba(255,255,255,.96);
}

.note-card{
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,.02);
  border: 1px solid rgba(255,255,255,.08);
}

.note-ic{
  color: #99f6e4;
}
</style>