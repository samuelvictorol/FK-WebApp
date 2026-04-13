<template>
  <q-layout view="hHh lpR fFf" class="auth-page">
    <q-header elevated class="topbar">
      <q-toolbar class="toolbar container">
        <q-btn flat round icon="arrow_back" to="/" class="q-mr-sm btn-back" />
        <q-avatar square size="34px" class="q-mr-sm rounded-borders brand-avatar">
          <img src="/logo.png" alt="Logo" />
        </q-avatar>

        <q-toolbar-title class="title">
          <div class="brand-main">Flávia Kamila</div>
          <div class="subtitle">Registre-se ou faça login</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="auth-wrapper">
        <div class="container">
          <div class="row q-col-gutter-xl items-center">
            <div class="col-12 col-md-6 order-2-mobile">
              <q-card class="auth-card animate__animated animate__fadeInUp" bordered>
                <q-card-section class="q-pb-sm">
                  <div class="row items-center justify-between q-col-gutter-md">
                    <div class="col">
                      <div class="card-title">
                        {{ isLogin ? 'Login' : 'Criar conta' }}
                      </div>
                      <div class="card-subtitle">
                        {{ isLogin ? 'Área do usuário' : 'Cadastre-se para acessar a plataforma.' }}
                      </div>
                    </div>

                    <div class="col-auto">
                      <q-btn
                        flat
                        class="mode-switch"
                        :label="isLogin ? 'Registrar' : 'Já tenho conta'"
                        @click="toggleMode"
                      />
                    </div>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                  <q-form @submit.prevent="handleSubmit" class="q-gutter-md">
                    <q-input
                      v-if="!isLogin"
                      v-model.trim="form.name"
                      label="Nome"
                      outlined
                      bg-color="white"
                      class="input-modern"
                      :rules="[v => !!v || 'Informe seu nome']"
                    >
                      <template #prepend>
                        <q-icon name="mdi-account-outline" color="red-5" />
                      </template>
                    </q-input>

                    <q-input
                      v-model.trim="form.email"
                      label="E-mail"
                      type="email"
                      outlined
                      bg-color="white"
                      class="input-modern"
                      :rules="[emailRule]"
                    >
                      <template #prepend>
                        <q-icon name="mdi-email-outline" color="red-5" />
                      </template>
                    </q-input>

                    <q-input
                      v-if="!isLogin"
                      v-model.trim="form.phone"
                      label="Telefone"
                      outlined
                      bg-color="white"
                      class="input-modern"
                      mask="(##) #####-####"
                      unmasked-value
                      :rules="[v => (v?.length >= 10) || 'Informe um telefone válido']"
                    >
                      <template #prepend>
                        <q-icon name="mdi-phone-outline" color="red-5" />
                      </template>
                    </q-input>

                    <q-input
                      v-model="form.password"
                      :type="showPassword ? 'text' : 'password'"
                      label="Senha"
                      outlined
                      bg-color="white"
                      class="input-modern"
                      :rules="[v => (v?.length >= 6) || 'Mínimo 6 caracteres']"
                    >
                      <template #prepend>
                        <q-icon name="mdi-lock-outline" color="red-5" />
                      </template>

                      <template #append>
                        <q-btn
                          flat
                          round
                          dense
                          color="grey-7"
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
                      outlined
                      bg-color="white"
                      class="input-modern"
                      :rules="[v => v === form.password || 'As senhas não conferem']"
                    >
                      <template #prepend>
                        <q-icon name="mdi-lock-check-outline" color="red-5" />
                      </template>

                      <template #append>
                        <q-btn
                          flat
                          round
                          dense
                          color="grey-7"
                          :icon="showConfirmPassword ? 'mdi-eye-off-outline' : 'mdi-eye-outline'"
                          @click="showConfirmPassword = !showConfirmPassword"
                        />
                      </template>
                    </q-input>

                    <div v-if="!isLogin" class="terms-wrap">
                      <q-toggle
                        v-model="form.acceptTerms"
                        label="Li e aceito os termos de uso"
                        color="red-6"
                      />
                      <q-btn
                        flat
                        label="Ver termos"
                        color="red-5"
                        class="q-px-none"
                        @click="$q.dialog({
                          title: 'Termos de Uso',
                          message: termosDeUso,
                          ok: { label: 'Fechar', color: 'red-6' }
                        })"
                      />
                    </div>

                    <div class="row items-center justify-between q-gutter-sm q-pt-sm">
                      <q-btn flat label="Início" to="/" class="btn-link-home" />

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

            <div class="col-12 col-md-6 order-1-mobile">
              <div class="hero-copy animate__animated animate__fadeInLeft">
                <div class="eyebrow">
                  <q-icon name="verified_user" size="16px" class="q-mr-xs" />
                  Acesso rápido e seguro
                </div>

                <div class="kicker">Entrar ou criar conta</div>

                <h1 class="headline safe-text">
                  Tenha seu <span class="grad">acesso liberado</span> em poucos segundos.
                </h1>

                <p class="sub safe-text">
                  Faça login ou crie sua conta para entrar na área do aplicativo, acessar seus recursos
                  e continuar sua jornada com mais praticidade.
                </p>

                <div class="row q-col-gutter-md q-mt-lg">
                  <div class="col-12 col-sm-6">
                    <q-card flat class="mini-card">
                      <q-card-section class="row items-center no-wrap">
                        <div class="icon-badge">
                          <q-icon name="mdi-shield-lock-outline" size="18px" />
                        </div>
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
                        <div class="icon-badge">
                          <q-icon name="mdi-lightning-bolt-outline" size="18px" />
                        </div>
                        <div>
                          <div class="mini-title">Rápido</div>
                          <div class="mini-sub">entre em instantes</div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>

                <div class="row q-col-gutter-md q-mt-sm">
                  <div class="col-12">
                    <q-card flat class="info-highlight">
                      <q-card-section class="row items-start no-wrap">
                        <div class="icon-badge soft q-mr-md">
                          <q-icon name="mdi-account-check-outline" size="18px" />
                        </div>
                        <div>
                          <div class="mini-title">Conta pronta para usar</div>
                          <div class="mini-sub larger">
                            Depois de entrar, você já segue direto para a área do app.
                          </div>
                        </div>
                      </q-card-section>
                    </q-card>
                  </div>
                </div>
              </div>
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
import { TermosDeUso } from 'src/TermosDeUso'

const termosDeUso = TermosDeUso
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

  if (!(emailRule(form.email) === true)) {
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
  background: #fff8f7;
}

:global(*),
:global(*::before),
:global(*::after) {
  box-sizing: border-box;
}

.auth-page {
  min-height: 100vh;
  background:
    radial-gradient(900px 420px at 10% 10%, rgba(255, 107, 87, 0.12), transparent 55%),
    radial-gradient(800px 420px at 90% 15%, rgba(217, 59, 43, 0.08), transparent 60%),
    linear-gradient(180deg, #fff9f8 0%, #fff5f3 100%);
  color: #251818;
}

.container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 clamp(14px, 2vw, 20px);
}

.auth-wrapper {
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  padding: 32px 0;
}

.topbar {
  background: rgba(255, 250, 249, 0.82);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(217, 59, 43, 0.10);
}

.toolbar {
  min-height: 72px;
}

.btn-back {
  color: #b33426;
}

.brand-avatar {
  border: 1px solid rgba(217, 59, 43, 0.10);
}

.title {
  line-height: 1.1;
}

.brand-main {
  font-size: 1.08rem;
  font-weight: 800;
  color: #2d1c1c;
}

.subtitle {
  font-size: 0.78rem;
  color: #7c6360;
  margin-top: 4px;
}

.hero-copy {
  padding-right: 12px;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  margin-bottom: 14px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(217, 59, 43, 0.10);
  color: #b13224;
  font-weight: 700;
  font-size: 0.84rem;
  box-shadow: 0 10px 24px rgba(130, 69, 61, 0.06);
}

.kicker {
  display: inline-block;
  font-weight: 900;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.76rem;
  color: #c43728;
  margin-bottom: 10px;
}

.headline {
  font-size: clamp(2rem, 2.7vw, 3.2rem);
  line-height: 1.06;
  margin: 0;
  color: #241717;
}

.grad {
  background: linear-gradient(135deg, #d93b2b, #ff6b57 75%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.sub {
  margin-top: 12px;
  color: #6f5653;
  line-height: 1.6;
  max-width: 58ch;
}

.safe-text {
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

.mini-card,
.info-highlight {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(217, 59, 43, 0.08);
  border-radius: 20px;
  color: #2a1e1e;
  box-shadow: 0 16px 40px rgba(125, 66, 58, 0.06);
}

.icon-badge {
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #c63729;
  background: linear-gradient(135deg, rgba(255, 107, 87, 0.18), rgba(217, 59, 43, 0.10));
  border: 1px solid rgba(217, 59, 43, 0.10);
}

.icon-badge.soft {
  background: linear-gradient(135deg, rgba(255, 107, 87, 0.12), rgba(217, 59, 43, 0.08));
}

.mini-title {
  font-weight: 800;
  color: #2b1d1d;
}

.mini-sub {
  font-size: 0.84rem;
  color: #6f5653;
}

.mini-sub.larger {
  font-size: 0.92rem;
  line-height: 1.5;
}

.auth-card {
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(217, 59, 43, 0.10);
  border-radius: 24px;
  backdrop-filter: blur(16px);
  box-shadow: 0 26px 70px rgba(121, 67, 60, 0.12);
}

.card-title {
  font-size: 1.35rem;
  font-weight: 800;
  color: #241717;
}

.card-subtitle {
  font-size: 0.94rem;
  color: #7b6360;
  margin-top: 4px;
}

.input-modern :deep(.q-field__control) {
  border-radius: 16px;
  min-height: 56px;
  box-shadow: none;
}

.input-modern :deep(.q-field__native),
.input-modern :deep(.q-field__input) {
  color: #2b1d1d;
}

.input-modern :deep(.q-field__label) {
  color: #816765;
}



.mode-switch {
  color: #b13224;
  border: 1px solid rgba(217, 59, 43, 0.12);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.68);
  font-weight: 700;
}

.terms-wrap {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.btn-link-home {
  color: #8b6a66;
  font-weight: 700;
}

.order-1-mobile {
  order: 1;
}

.order-2-mobile {
  order: 2;
}

@media (max-width: 1023px) {
  .container {
    padding-top: 10px;
  }

  .auth-wrapper {
    align-items: flex-start;
    padding: 20px 0 28px;
  }

  .hero-copy {
    padding-right: 0;
    margin-bottom: 8px;
  }

  .headline {
    font-size: clamp(1.8rem, 8vw, 2.6rem);
  }
}

@media (max-width: 767px) {
  .order-1-mobile {
    order: 1;
  }

  .order-2-mobile {
    order: 2;
  }
}
</style>