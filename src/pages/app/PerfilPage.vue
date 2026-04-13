<template>
  <q-page class="q-pa-md app-home-page">
    <div class="page-container">
      <div class="row q-col-gutter-md">
        <div class="col-12">
          <q-card class="page-hero-card" flat bordered>
            <q-card-section class="row items-center q-col-gutter-md">
              <div class="col-12 col-md-auto flex flex-center">
                <q-avatar size="90px" class="hero-avatar">
                  <q-icon name="person" size="52px" color="white" />
                </q-avatar>
              </div>

              <div class="col-12 col-md">
                <div class="text-overline hero-overline">ÁREA DO USUÁRIO</div>
                <div class="text-h4 text-weight-bold title-1 ellipsis text-grey-9">
                  {{ user.name || 'Usuário' }}
                </div>
                <div class="text-subtitle1 hero-subtitle q-mt-xs">
                  Bem-vindo(a), {{ firstName }}
                </div>

                <div class="row q-col-gutter-sm q-mt-md">
                  <div class="col-auto">
                    <q-chip class="chip-light" text-color="white" icon="badge">
                      ID: {{ user.id || '-' }}
                    </q-chip>
                  </div>

                  <div class="col-auto">
                    <q-chip class="chip-green" text-color="white" icon="verified_user">
                      {{ user.role || 'Sem perfil' }}
                    </q-chip>
                  </div>

                  <div class="col-auto" v-if="user.token">
                    <q-chip class="chip-token" text-color="white" icon="vpn_key">
                      Token ativo
                    </q-chip>
                  </div>
                </div>
              </div>

              <div class="col-12 col-md-auto">
                <q-btn
                  unelevated
                  class="btn-logout"
                  icon="logout"
                  label="Encerrar sessão"
                  @click="logout"
                />
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card class="info-card full-height" flat bordered>
            <q-card-section>
              <div class="text-h6 text-weight-bold text-grey-9">
                Dados pessoais
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-gutter-md">
              <div class="info-row">
                <div class="info-label">Nome completo</div>
                <div class="info-value">{{ user.name || '-' }}</div>
              </div>

              <div class="info-row">
                <div class="info-label">E-mail</div>
                <div class="info-value">{{ user.email || '-' }}</div>
              </div>

              <div class="info-row">
                <div class="info-label">Telefone</div>
                <div class="info-value">{{ user.phone || '-' }}</div>
              </div>

              <div class="info-row">
                <div class="info-label">Perfil</div>
                <div class="info-value">{{ user.role || '-' }}</div>
              </div>

              <div class="info-row">
                <div class="info-label">ID do usuário</div>
                <div class="info-value">{{ user.id || '-' }}</div>
              </div>
            </q-card-section>
          </q-card>
        </div>

        <div class="col-12 col-md-6">
          <q-card class="info-card full-height" flat bordered>
            <q-card-section>
              <div class="text-h6 text-weight-bold text-grey-9">
                Sessão atual
              </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-gutter-md">
              <div class="info-row">
                <div class="info-label">Token</div>
                <div class="info-value break-all">
                  {{ user.token || '-' }}
                </div>
              </div>

              <div class="info-row">
                <div class="info-label">Status</div>
                <div class="info-value">
                  {{ hasSession ? 'Autenticado' : 'Sem sessão' }}
                </div>
              </div>

              <div class="info-row">
                <div class="info-label">Primeiro nome</div>
                <div class="info-value">{{ firstName }}</div>
              </div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar, copyToClipboard } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const user = ref({
  id: '',
  name: '',
  email: '',
  phone: '',
  role: '',
  token: ''
})

const hasSession = computed(() => !!user.value?.id || !!user.value?.email)

const firstName = computed(() => {
  const fullName = String(user.value?.name || '').trim()
  return fullName ? fullName.split(' ')[0] : 'Usuário'
})

const formattedUser = computed(() => {
  return JSON.stringify(user.value, null, 2)
})

onMounted(() => {
  loadUser()
})

function loadUser() {
  try {
    const rawUser = localStorage.getItem('auth_user')

    if (!rawUser) {
      notifyTop('Sessão não encontrada. Faça login novamente.', 'warning')
      router.replace('/login')
      return
    }

    const parsedUser = JSON.parse(rawUser)

    user.value = {
      id: parsedUser?.id || '',
      name: parsedUser?.name || '',
      email: parsedUser?.email || '',
      phone: parsedUser?.phone || '',
      role: parsedUser?.role || '',
      token: parsedUser?.token || ''
    }
  } catch (error) {
    console.error('[APP HOME] erro ao carregar usuário:', error)
    notifyTop('Erro ao carregar dados da sessão', 'negative')
    router.replace('/login')
  }
}

async function copyUserJson() {
  try {
    await copyToClipboard(formattedUser.value)
    notifyTop('JSON do usuário copiado com sucesso', 'positive')
  } catch (error) {
    console.error('[APP HOME] erro ao copiar JSON:', error)
    notifyTop('Não foi possível copiar os dados', 'negative')
  }
}

function clearBrowserSession() {
  try {
    localStorage.removeItem('auth_user')
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    sessionStorage.clear()

    if (window.caches && typeof window.caches.keys === 'function') {
      window.caches.keys().then((keys) => {
        keys.forEach((key) => window.caches.delete(key))
      }).catch(() => {})
    }
  } catch (error) {
    console.error('[APP HOME] erro ao limpar sessão:', error)
  }
}

function logout() {
  $q.dialog({
    title: 'Sair',
    message: 'Deseja realmente encerrar sua sessão?',
    cancel: true,
    persistent: true,
    ok: {
      label: 'Sair',
      color: 'negative',
      unelevated: true
    },
    cancel: {
      label: 'Cancelar',
      flat: true
    }
  }).onOk(() => {
    clearBrowserSession()
    notifyTop('Logout realizado com sucesso', 'positive')
    router.replace('/login')
  })
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
    timeout: 2500,
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
.app-home-page {
  min-height: 100vh;
}

.page-container {
  max-width: 1200px;
  margin: 0 auto;
}

.page-hero-card {
  border-radius: 20px;
  border: 1px solid rgba(217, 59, 43, 0.08);
  background: linear-gradient(180deg, #fffefe 0%, #fff7f5 100%);
  box-shadow: 0 20px 48px rgba(126, 73, 65, 0.10);
}

.hero-avatar {
  background: linear-gradient(135deg, #d93b2b, #ff6b57);
  box-shadow: 0 10px 30px rgba(217, 59, 43, 0.22);
}

.hero-overline {
  color: #b13224;
  font-weight: 800;
}

.hero-subtitle {
  color: #7a5e5a;
}

.chip-light {
  background: linear-gradient(135deg, #d93b2b, #ff6b57);
}

.chip-green {
  background: linear-gradient(135deg, #16a34a, #22c55e);
}

.chip-token {
  background: linear-gradient(135deg, #0ea5e9, #38bdf8);
}

.btn-logout {
  background: linear-gradient(135deg, #dc2626, #ef4444);
  color: white;
  font-weight: 800;
  border-radius: 14px;
}

.info-card {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.96);
  border: 1px solid rgba(217, 59, 43, 0.08);
  box-shadow: 0 14px 34px rgba(126, 73, 65, 0.08);
}

.info-row {
  padding: 10px 12px;
  border-radius: 12px;
  background: rgba(255, 107, 87, 0.08);
  border: 1px solid rgba(217, 59, 43, 0.10);
}

.info-label {
  font-size: 0.78rem;
  font-weight: 700;
  color: #7a5e5a;
  margin-bottom: 4px;
}

.info-value {
  font-size: 0.98rem;
  font-weight: 700;
  color: #2b1d1d;
}

.json-box {
  margin: 0;
  padding: 14px;
  border-radius: 14px;
  background: #111827;
  color: #f9fafb;
  overflow-x: auto;
  white-space: pre-wrap;
  word-break: break-word;
  font-size: 0.88rem;
  line-height: 1.45;
}

.break-all {
  word-break: break-word;
}

@media (max-width: 768px) {
  .page-hero-card :deep(.q-card__section) {
    text-align: left;
  }
}
</style>