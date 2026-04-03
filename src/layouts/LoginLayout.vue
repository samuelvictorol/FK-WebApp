<template>
  <q-layout view="hHh lpR fFf" class="auth-page">
    <q-header elevated class="topbar">
      <q-toolbar class="q-px-md">
        <q-btn flat round icon="arrow_back" to="/" class="q-mr-sm" />
        <q-toolbar-title class="title">
          Flávia Kamila
          <div class="subtitle">Acesso Exclusivo</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-pa-md flex flex-center">
        <div class="container">
          <div class="row q-col-gutter-xl items-center">
            <div class="col-12 col-md-6">
              <div class="kicker">Entrar ou criar conta</div>
              <h1 class="headline safe-text">
                Tenha seu <span class="grad">acesso liberado</span> em poucos segundos.
              </h1>
              <p class="sub safe-text">
                Faça login ou crie sua conta para entrar na área do aplicativo.
              </p>

              <div class="row q-col-gutter-sm q-mt-md">
                <div class="col-12 col-sm-6">
                  <q-card flat class="mini-card">
                    <q-card-section class="row items-center no-wrap">
                      <q-icon name="mdi-shield-lock-outline" size="20px" class="q-mr-sm" />
                      <div>
                        <div class="mini-title">Acesso seguro</div>
                        <div class="mini-sub">seus dados protegidos</div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="col-12 col-sm-6">
                  <q-card flat class="mini-card">
                    <q-card-section class="row items-center no-wrap">
                      <q-icon name="mdi-lightning-bolt-outline" size="20px" class="q-mr-sm" />
                      <div>
                        <div class="mini-title">Rápido</div>
                        <div class="mini-sub">entre em instantes</div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-6">
              <q-card class="auth-card" bordered>
                <q-card-section class="q-pb-sm">
                  <div class="row items-center justify-between">
                    <div>
                      <div class="text-h6 text-weight-bold">
                        {{ isLogin ? 'Login' : 'Criar conta' }}
                      </div>
                      <div class="text-body2 text-grey-5">
                        {{ isLogin ? 'Entre para continuar.' : 'Cadastre-se para acessar a plataforma.' }}
                      </div>
                    </div>

                    <q-btn
                      flat
                      class="mode-switch"
                      :label="isLogin ? 'Registrar' : 'Login'"
                      @click="toggleMode"
                    />
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                  <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
                    <q-input
                      v-if="!isLogin"
                      v-model.trim="form.name"
                      label="Nome"
                      filled
                      class="bg-grey-3 rounded-borders"
                      :rules="[v => !!v || 'Informe seu nome']"
                    >
                      <template #prepend>
                        <q-icon name="mdi-account-outline" color="deep-purple-4" />
                      </template>
                    </q-input>

                    <q-input
                      v-model.trim="form.email"
                      label="E-mail"
                      type="email"
                      filled
                      class="bg-grey-3 rounded-borders"
                      :rules="[emailRule]"
                    >
                      <template #prepend>
                        <q-icon name="mdi-email-outline" color="deep-purple-4" />
                      </template>
                    </q-input>

                    <q-input
                      v-if="!isLogin"
                      v-model.trim="form.phone"
                      label="Telefone"
                      filled
                      class="bg-grey-3 rounded-borders"
                      mask="(##) #####-####"
                      unmasked-value
                      :rules="[v => (v?.length >= 10) || 'Informe um telefone válido']"
                    >
                      <template #prepend>
                        <q-icon name="mdi-phone-outline" color="deep-purple-4" />
                      </template>
                    </q-input>

                    <q-input
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      label="Senha"
                      filled
                      class="bg-grey-3 rounded-borders"
                      :rules="[v => (v?.length >= 6) || 'Mínimo 6 caracteres']"
                    >
                      <template #prepend>
                        <q-icon name="mdi-lock-outline" color="deep-purple-4" />
                      </template>

                      <template #append>
                        <q-btn
                          flat
                          round
                          dense
                          :icon="showPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                          @click="showPassword = !showPassword"
                        />
                      </template>
                    </q-input>

                    <q-input
                      v-if="!isLogin"
                      v-model="form.confirmPassword"
                      :type="showConfirmPassword ? 'text' : 'password'"
                      label="Confirmar senha"
                      filled
                      class="bg-grey-3 rounded-borders"
                      :rules="[v => v === form.password || 'As senhas não conferem']"
                    >
                      <template #prepend>
                        <q-icon name="mdi-lock-check-outline" color="deep-purple-4" />
                      </template>

                      <template #append>
                        <q-btn
                          flat
                          round
                          dense
                          :icon="showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                          @click="showConfirmPassword = !showConfirmPassword"
                        />
                      </template>
                    </q-input>

                    <q-toggle
                      v-if="!isLogin"
                      v-model="form.acceptTerms"
                      label="Li e aceito os termos de uso"
                      color="deep-purple-6"
                    />

                    <div class="row items-center justify-between q-gutter-sm">
                      <q-btn flat label="Voltar" to="/" />
                      <q-btn
                        type="submit"
                        class="btn-primary"
                        unelevated
                        :loading="loading"
                        :label="isLogin ? 'Entrar' : 'Criar conta'"
                        :icon-right="isLogin ? 'mdi-arrow-right' : 'mdi-account-plus-outline'"
                      />
                    </div>
                  </q-form>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { reactive, ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'
import { api } from 'boot/axios'

const router = useRouter()
const $q = useQuasar()

const mode = ref('login')
const loading = ref(false)
const showPassword = ref(false)
const showConfirmPassword = ref(false)

const form = reactive({
  name: '',
  email: '',
  phone: '',
  password: '',
  confirmPassword: '',
  acceptTerms: false
})

const isLogin = computed(() => mode.value === 'login')

onMounted(() => {
  const savedUser = localStorage.getItem('auth_user')
  if (savedUser) {
    router.replace('/app')
  }
})

function toggleMode() {
  mode.value = isLogin.value ? 'register' : 'login'
  resetFields()
}

function resetFields() {
  form.password = ''
  form.confirmPassword = ''
  showPassword.value = false
  showConfirmPassword.value = false
}

function emailRule(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(value || '').toLowerCase()) || 'Informe um e-mail válido'
}

function normalizePhone(phone) {
  return String(phone || '').replace(/\D/g, '')
}

function saveUserSession(user) {
  localStorage.setItem('auth_user', JSON.stringify({
    id: user?.id || '',
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    role: user?.role || '',
    token: user?.token || ''
  }))
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
    message: message || 'Operação realizada',
    icon: iconMap[type] || 'mdi-information-outline',
    position: 'top',
    timeout: 2500,
    progress: true,
    actions: [{ icon: 'mdi-close', color: 'white', round: true }]
  })
}

function extractErrorMessage(error) {
  return error?.response?.data?.message || error?.message || 'Erro ao processar solicitação'
}

async function doLogin() {
  const payload = {
    email: form.email?.trim() || '',
    phone: normalizePhone(form.phone),
    password: form.password?.trim() || ''
  }

  const { data } = await api.post('/auth/login', payload)

  if (!data?.user) {
    throw new Error('Resposta inválida no login')
  }

  saveUserSession(data.user)
  notifyTop(data?.message || 'Bem Vindo(a)!', 'positive')
  await router.push('/app')
}

async function doRegister() {
  if (!form.name?.trim()) {
    throw new Error('Informe seu nome')
  }

  if (!emailRule(form.email) === true) {
    throw new Error('Informe um e-mail válido')
  }

  if ((form.phone || '').length < 10) {
    throw new Error('Informe um telefone válido')
  }

  if ((form.password || '').length < 6) {
    throw new Error('A senha deve ter no mínimo 6 caracteres')
  }

  if (form.password !== form.confirmPassword) {
    throw new Error('As senhas não conferem')
  }

  if (!form.acceptTerms) {
    throw new Error('É necessário aceitar os termos de uso')
  }

  const payload = {
    name: form.name?.trim(),
    email: form.email?.trim(),
    phone: normalizePhone(form.phone),
    password: form.password?.trim(),
    cpf: ''
  }

  const { data } = await api.post('/auth/register', payload)

  if (!data?.user) {
    throw new Error('Resposta inválida no cadastro')
  }

  saveUserSession(data.user)
  notifyTop(data?.message || 'Usuário registrado com sucesso', 'positive')
  await router.push('/app')
}

async function handleSubmit() {
  loading.value = true

  try {
    if (isLogin.value) {
      await doLogin()
    } else {
      await doRegister()
    }
  } catch (error) {
    console.error('[AUTH ERROR]', error)
    notifyTop(extractErrorMessage(error), 'negative')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
:global(html),
:global(body),
:global(#q-app) {
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
}

:global(*),
:global(*::before),
:global(*::after) {
  box-sizing: border-box;
}

.auth-page {
  min-height: 100vh;
  background:
    radial-gradient(900px 420px at 20% 25%, rgba(124, 58, 237, .26), transparent 60%),
    radial-gradient(800px 400px at 80% 40%, rgba(20, 184, 166, .16), transparent 55%),
    #07070a;
  color: #f4f4f5;
}

.container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 clamp(14px, 2vw, 18px);
}

.topbar {
  background: linear-gradient(90deg, rgba(124, 58, 237, .22), rgba(20, 184, 166, .14));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, .08);
}

.title {
  line-height: 1.1;
}

.subtitle {
  font-size: .78rem;
  opacity: .85;
}

.kicker {
  display: inline-block;
  font-weight: 900;
  letter-spacing: .16em;
  text-transform: uppercase;
  font-size: .78rem;
  opacity: .9;
  margin-bottom: 10px;
}

.headline {
  font-size: clamp(2rem, 2.6vw, 3rem);
  line-height: 1.06;
  margin: 0;
}

.grad {
  background: linear-gradient(90deg, #a78bfa, #5eead4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.sub {
  margin-top: 10px;
  color: rgba(255, 255, 255, .86);
  line-height: 1.45;
  max-width: 60ch;
}

.safe-text {
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

.mini-card {
  background: rgba(255, 255, 255, .08);
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 16px;
  color: #fff;
}

.mini-title {
  font-weight: 800;
}

.mini-sub {
  font-size: .83rem;
  opacity: .9;
}

.auth-card {
  background: rgba(16, 16, 22, .78);
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 18px;
  backdrop-filter: blur(10px);
}

.btn-primary {
  background: linear-gradient(90deg, #7c3aed, #14b8a6);
  color: #f5f5f5;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 18px;
}

.mode-switch {
  color: rgba(255, 255, 255, .9);
  border: 1px solid rgba(255, 255, 255, .16);
  border-radius: 14px;
}

@media (max-width: 1023px) {
  .container {
    padding-top: 12px;
  }
}
</style>