<template>
  <q-layout view="hHh lpR fFf" class="app-shell">
    <q-header elevated class="app-header">
      <q-toolbar class="q-px-md">
        <q-avatar square size="32px" class="q-mr-sm rounded-borders">
          <img src="/logo.png" alt="Logo" />
        </q-avatar>
        <q-toolbar-title class="brand">
          <div class="brand-top">
            <div class="brand-text">
              <!-- <div class="brand-name">FláviaKamila</div> -->
              <div class="brand-sub" v-if="user.name">
                Olá, {{ firstName[0].toUpperCase() + firstName.slice(1).toLowerCase() }}
              </div>
            </div>
          </div>
        </q-toolbar-title>

        <div class="user-pill ">
          <span class="ellipsis">
            {{ user.role }}
          </span>
          <q-icon name="verified" class="q-ml-xs" :color="user.role.includes('Premium') ? 'green-14' : ''" />
        </div>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" aria-label="Abrir menu" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" class="app-drawer bg-black">
      <div class="drawer-head">
        <div class="drawer-title text-grey-3">MENU</div>
        <q-btn flat round icon="close" color="white" @click="rightDrawerOpen = false" />
      </div>

      <q-separator />

      <div class="user-card q-pa-md">
        <div class="text-h6 text-weight-bold text-white ellipsis">
          {{ user.name || 'Usuário' }}
        </div>

        <div class="text-caption text-grey-4 q-mt-xs ellipsis">
          {{ user.email || 'Sem e-mail cadastrado' }}
        </div>

        <div class="text-caption text-grey-5 q-mt-sm">
          <!-- <div><strong>ID:</strong> {{ user.id || '-' }}</div> -->
          <!-- <div><strong>Telefone:</strong> {{ user.phone || '-' }}</div> -->
          <div><strong> {{ user.role || '-' }}</strong></div>
          <!-- <div><strong>Token:</strong> {{ user.token ? 'Disponível' : '-' }}</div> -->
        </div>
      </div>

      <q-separator />

      <q-list class="q-py-sm">
        <q-item v-for="(option, index) in menuOptions" :key="index" clickable v-ripple :to="option.to"
          active-class="drawer-active" exact>
          <q-item-section avatar>
            <q-icon :name="option.icon" class="drawer-icon" />
          </q-item-section>
          <q-item-section class="drawer-label">
            {{ option.label }}
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator />

      <q-list class="q-py-sm text-white">
        <q-item clickable v-ripple to="/app/perfil">
          <q-item-section avatar>
            <q-icon name="account_circle" class="drawer-icon" />
          </q-item-section>
          <q-item-section>
            <div>Meu Perfil</div>
            <!-- <div class="text-caption text-grey-5 ellipsis">
              {{ user.email || user.phone || 'Dados do usuário' }}
            </div> -->
          </q-item-section>
        </q-item>

        <!-- <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="help" class="drawer-icon" />
          </q-item-section>
          <q-item-section>Ajuda</q-item-section>
        </q-item> -->

        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" class="drawer-icon" />
          </q-item-section>
          <q-item-section>Sair</q-item-section>
        </q-item>
      </q-list>
      <div class="drawer-footer">
        <div class="text-caption text-grey-6">
          © 2026 • Desenvolvido por <a href="https://aitosoftwares.com" target="_blank"
            class="text-primary">AitoSoftwares</a>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="app-container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()
const rightDrawerOpen = ref(false)
const user = ref({
  id: '',
  name: '',
  email: '',
  phone: '',
  role: '',
  token: ''
})

const menuOptions = ref([
  { icon: 'home', to: '/app', label: 'Início' },
  { icon: 'list_alt', to: '/app/forms', label: 'Formulários' }
])

const firstName = computed(() => {
  const fullName = String(user.value?.name || '').trim()
  return fullName ? fullName.split(' ')[0] : 'Usuário'
})

onMounted(() => {
  loadUser()
})

function loadUser() {
  try {
    const rawUser = localStorage.getItem('auth_user')

    if (!rawUser) {
      clearBrowserSession()
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
    console.error('[APP LAYOUT] erro ao carregar usuário:', error)
    clearBrowserSession()
    router.replace('/login')
  }
}

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
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
      }).catch(() => { })
    }
  } catch (error) {
    console.error('[APP LAYOUT] erro ao limpar sessão:', error)
  }
}

function logout() {
  $q.dialog({
    title: '🔴 Sair',
    message: 'Você tem certeza que deseja sair?',
    cancel: true,
    persistent: true,
    ok: {
      icon: 'logout',
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

    $q.notify({
      type: 'positive',
      message: 'Logout realizado com sucesso',
      icon: 'mdi-check-circle-outline',
      position: 'top',
      progress: true
    })

    router.replace('/login')
  })
}
</script>

<style scoped>
:global(html),
:global(body),
:global(#q-app) {
  overflow-x: clip;
}

:global(.row > [class*="col-"]) {
  min-width: 0;
}

.app-shell {
  background: radial-gradient(900px 420px at 20% 25%, rgba(0, 0, 0, 0.18), transparent 60%),
    radial-gradient(800px 400px at 80% 40%, rgba(138, 20, 184, 0.12), transparent 55%),
    #0b0b10;
}

.app-header {
  background: linear-gradient(90deg, rgba(112, 58, 237, 0.22), rgba(198, 148, 255, 0.603));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, .08);
  color: #fff;
}

.brand-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-text {
  min-width: 0;
}

.brand-name {
  font-weight: 800;
  line-height: 1.05;
}

.brand-sub {
  font-size: .9rem;
  opacity: .85;
  margin-top: 2px;
}

.user-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(255, 255, 255, .08);
  border: 1px solid rgba(255, 255, 255, .12);
  margin-right: 10px;
  max-width: 240px;
}

.app-drawer {
  background: rgba(12, 12, 18, .98);
  color: #fff;
  border-left: 1px solid rgba(255, 255, 255, .08);
}

.drawer-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 12px 10px;
}

.drawer-title {
  font-weight: 900;
  letter-spacing: .14em;
  font-size: .85rem;
  opacity: .9;
}

.user-card {
  word-break: break-word;
}

.drawer-icon {
  color: #caadff;
}

.drawer-label {
  font-weight: 800;
  color: rgba(255, 255, 255, .92);
}

.drawer-active {
  background: linear-gradient(90deg, rgba(124, 58, 237, .18), rgba(124, 20, 184, 0.1));
  border-left: 3px solid rgba(167, 139, 250, .9);
}

.app-container {
  background: transparent;
  min-height: 100vh;
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