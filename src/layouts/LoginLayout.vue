<template>
    <q-layout view="hHh lpR fFf" class="auth-page">
        <!-- Top bar simples (opcional) -->
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
            <q-page class="q-pa-md">
                <div class="container">
                    <div class="row q-col-gutter-xl items-center">
                        <!-- Lado esquerdo: copy -->
                        <div class="col-12 col-md-6">
                            <div class="kicker">Entrar ou criar conta</div>
                            <h1 class="headline safe-text">
                                Tenha seu <span class="grad">relatório personalizado</span> em minutos.
                            </h1>
                            <p class="sub safe-text">
                                Acesse com sua conta ou crie uma agora. Em seguida você será redirecionado para o
                                aplicativo.
                            </p>

                            <div class="row q-col-gutter-sm q-mt-md">
                                <div class="col-12 col-sm-6">
                                    <q-card flat class="mini-card">
                                        <q-card-section class="row items-center no-wrap">
                                            <q-icon name="lock" size="20px" class="q-mr-sm" />
                                            <div>
                                                <div class="mini-title">Seguro</div>
                                                <div class="mini-sub">dados protegidos</div>
                                            </div>
                                        </q-card-section>
                                    </q-card>
                                </div>
                                <div class="col-12 col-sm-6">
                                    <q-card flat class="mini-card">
                                        <q-card-section class="row items-center no-wrap">
                                            <q-icon name="schedule" size="20px" class="q-mr-sm" />
                                            <div>
                                                <div class="mini-title">Rápido</div>
                                                <div class="mini-sub">comece já</div>
                                            </div>
                                        </q-card-section>
                                    </q-card>
                                </div>
                            </div>
                        </div>

                        <!-- Lado direito: card form -->
                        <div class="col-12 col-md-6">
                            <q-card class="auth-card" bordered>
                                <q-card-section class="q-pb-sm">
                                    <div class="row items-center justify-between">
                                        <div>
                                            <div class="text-h6 text-weight-bold">
                                                {{ mode === 'login' ? 'Login' : 'Criar conta' }}
                                            </div>
                                            <div class="text-body2 text-grey-5">
                                                {{ mode === 'login'
                                                    ? 'Entre para continuar.'
                                                    : 'Preencha os dados para criar sua conta.' }}
                                            </div>
                                        </div>

                                        <q-btn flat class="mode-switch"
                                            :label="mode === 'login' ? 'Registrar' : 'Login'" @click="toggleMode" />
                                    </div>
                                </q-card-section>

                                <q-separator />

                                <q-card-section>
                                    <q-form @submit.prevent="submit" class="q-gutter-md">
                                        <!-- Nome (somente no registrar) -->
                                        <q-input v-if="mode === 'register'" v-model.trim="form.name" label="Nome" filled class="bg-grey-3 rounded-borders"
                                            :rules="[v => !!v || 'Informe seu nome']" autocomplete="name">
                                            <template #prepend>
                                                <q-icon name="person" color="deep-purple-4" />
                                            </template>
                                        </q-input>

                                        <!-- Email -->
                                        <q-input v-model.trim="form.email" label="E-mail" type="email" filled
                                            class="bg-grey-3 rounded-borders"
                                            :rules="[v => isValidEmail(v) || 'E-mail inválido']" autocomplete="email"
                                            style="overflow-y: hidden!important;">
                                            <template #prepend>
                                                <q-icon name="mail" color="deep-purple-4" />
                                            </template>
                                        </q-input>

                                        <!-- Telefone (somente no registrar) -->
                                        <q-input v-if="mode === 'register'" v-model.trim="form.phone" label="Telefone"
                                            filled class="bg-grey-3 rounded-borders" mask="(##) #####-####"
                                            unmasked-value
                                            :rules="[v => (v?.length >= 10) || 'Informe um telefone válido']"
                                            autocomplete="tel">
                                            <template #prepend>
                                                <q-icon name="phone" color="deep-purple-4" />
                                            </template>
                                        </q-input>

                                        <!-- Senha -->
                                        <q-input class="bg-grey-3 rounded-borders" v-model="form.password"
                                            :type="showPassword ? 'text' : 'password'" label="Senha" filled
                                            :rules="[v => (v?.length >= 6) || 'Mínimo 6 caracteres']"
                                            autocomplete="current-password">
                                            <template #prepend>
                                                <q-icon name="lock" color="deep-purple-4" />
                                            </template>
                                            <template #append>
                                                <q-btn flat round size="sm"
                                                    :icon="showPassword ? 'visibility_off' : 'visibility'"
                                                    @click="showPassword = !showPassword"
                                                    :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'" />
                                            </template>
                                        </q-input>

                                        <!-- Confirmar senha (somente no registrar) -->
                                        <q-input v-if="mode === 'register'" v-model="form.confirmPassword"
                                            :type="showConfirmPassword ? 'text' : 'password'" label="Confirmar senha"
                                            filled class="bg-grey-3 rounded-borders"
                                            :rules="[v => v === form.password || 'As senhas não conferem']"
                                            autocomplete="new-password">
                                            <template #prepend>
                                                <q-icon name="lock_reset" color="deep-purple-4" />
                                            </template>
                                            <template #append>
                                                <q-btn flat round size="sm"
                                                    :icon="showConfirmPassword ? 'visibility_off' : 'visibility'"
                                                    @click="showConfirmPassword = !showConfirmPassword"
                                                    :aria-label="showConfirmPassword ? 'Ocultar senha' : 'Mostrar senha'" />
                                            </template>
                                        </q-input>
                                        <q-toggle v-if="mode === 'register'" v-model="form.acceptTerms"
                                            label="Li e aceito os termos de uso" color="deep-purple-6"
                                            :rules="[v => !!v || 'É necessário aceitar os termos']" />
                                        <div class="row w100 no-wrap items-center justify-between q-pr-md">
                                            <q-btn flat label="Voltar" to="/"  class="q-mr-sm"/>
                                            <q-btn type="submit" class="btn-primary w100 text-grey-3 " unelevated
                                                :label="mode === 'login' ? 'Entrar' : 'Criar conta'" :loading="loading"
                                                :icon-right="mode === 'login' ? 'arrow_forward' : 'person_add'" />
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
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()

const mode = ref('login') // 'login' | 'register'
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

function toggleMode() {
    mode.value = mode.value === 'login' ? 'register' : 'login'
    resetSensitive()
}

function resetSensitive() {
    form.password = ''
    form.confirmPassword = ''
    showPassword.value = false
    showConfirmPassword.value = false
}

function isValidEmail(email) {
    if (!email) return false
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).toLowerCase())
}

async function submit() {
    // Aqui você vai integrar futuramente: POST /auth/login ou /auth/register
    // Por enquanto: validação já acontece via rules, então só redireciona.

    loading.value = true
    try {
        // Simula pequena latência pra UX (opcional)
        await new Promise(r => setTimeout(r, 350))

        $q.notify({
            type: 'positive',
            message: mode.value === 'login' ? 'Login OK (mock)' : 'Conta criada (mock)',
            caption: 'Redirecionando para o app…'
        })

        router.push('/app')
    } finally {
        loading.value = false
    }
}
</script>

<style scoped>
/* Anti-flash / anti-overflow */
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

:global(.row > [class*="col-"]) {
    min-width: 0;
}

.auth-page {
    min-height: 100vh;
    background: radial-gradient(900px 420px at 20% 25%, rgba(124, 58, 237, .26), transparent 60%),
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

.brand-avatar {
    border: 1px solid rgba(255, 255, 255, .2);
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
    font-size: clamp(2rem, 2.6vw, 3.0rem);
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
    color: #0b0b10;
    font-weight: 900;
    border-radius: 14px;
    padding: 12px 18px;
}

.btn-ghost {
    background: rgba(255, 255, 255, .08);
    border: 1px solid rgba(255, 255, 255, .12);
    color: #fff;
    border-radius: 14px;
}

.mode-switch {
    color: rgba(255, 255, 255, .9);
    border: 1px solid rgba(255, 255, 255, .16);
    border-radius: 14px;
}

.desktop-only {
    display: block;
}

@media (max-width: 1023px) {
    .desktop-only {
        display: none !important;
    }
}
</style>