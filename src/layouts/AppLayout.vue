<template>
  <q-layout view="hHh lpR fFf" class="app-shell">
    <q-header elevated class="app-header">
      <q-toolbar class="q-px-md">
        <q-avatar square size="32px" class="q-mr-sm rounded-borders brand-avatar">
          <img src="/logo.png" alt="Logo" />
        </q-avatar>

        <q-toolbar-title class="brand">
          <div class="brand-top">
            <div class="brand-text">
              <div class="brand-sub" v-if="user.name">
                Olá, {{ firstName[0].toUpperCase() + firstName.slice(1).toLowerCase() }}
              </div>
            </div>
          </div>
        </q-toolbar-title>

        <div class="user-pill">
          <span class="ellipsis">
            {{ user.role }}
          </span>
          <q-icon
            name="verified"
            class="q-ml-xs"
            :color="user.role.includes('Premium') ? 'green-7' : 'grey-7'"
          />
        </div>

        <q-btn dense flat round icon="menu" class="menu-btn" @click="toggleRightDrawer" aria-label="Abrir menu" />
      </q-toolbar>
    </q-header>

    <q-drawer v-model="rightDrawerOpen" side="right" class="app-drawer">
      <div class="drawer-head">
        <div class="drawer-title">MENU</div>
        <q-btn flat round icon="close" color="grey-8" @click="rightDrawerOpen = false" />
      </div>

      <q-separator />

      <div class="user-card q-pa-md">
        <div class="text-h6 text-weight-bold text-grey-9 ellipsis">
          {{ user.name || 'Usuário' }}
        </div>

        <div class="text-caption text-grey-7 q-mt-xs ellipsis">
          {{ user.email || 'Sem e-mail cadastrado' }}
        </div>

        <div class="text-caption text-grey-8 q-mt-sm">
          <div><strong>{{ user.role || '-' }}</strong></div>
        </div>
      </div>

      <q-separator />

      <q-list class="q-py-sm">
        <q-item
          v-for="(option, index) in menuOptions"
          :key="index"
          clickable
          v-ripple
          :to="option.to"
          active-class="drawer-active"
          exact
        >
          <q-item-section avatar>
            <q-icon :name="option.icon" class="drawer-icon" />
          </q-item-section>
          <q-item-section class="drawer-label">
            {{ option.label }}
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator />

      <q-list class="q-py-sm">
        <q-item clickable v-ripple to="/app/perfil">
          <q-item-section avatar>
            <q-icon name="account_circle" class="drawer-icon" />
          </q-item-section>
          <q-item-section>
            <div class="text-grey-9">Meu Perfil</div>
          </q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="logout">
          <q-item-section avatar>
            <q-icon name="logout" class="drawer-icon" />
          </q-item-section>
          <q-item-section class="text-grey-9">Sair</q-item-section>
        </q-item>
      </q-list>

      <div class="drawer-footer">
        <div class="text-caption text-grey-7">
          © 2026 • Desenvolvido por
          <a href="https://aitosoftwares.com" target="_blank" class="footer-link">
            AitoSoftwares
          </a>
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
      }).catch(() => {})
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
  background: #fff8f7;
}

:global(.row > [class*="col-"]) {
  min-width: 0;
}

.app-shell {
  background:
    radial-gradient(900px 420px at 10% 10%, rgba(255, 107, 87, 0.08), transparent 55%),
    radial-gradient(800px 400px at 90% 15%, rgba(217, 59, 43, 0.07), transparent 58%),
    linear-gradient(180deg, #fff9f8 0%, #fff5f3 100%);
}

.app-header {
  background: rgba(255, 250, 249, 0.82);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(217, 59, 43, 0.10);
  color: #2a1e1e;
}

.brand-avatar {
  border: 1px solid rgba(217, 59, 43, 0.10);
}

.brand-top {
  display: flex;
  align-items: center;
  gap: 10px;
}

.brand-text {
  min-width: 0;
}

.brand-sub {
  font-size: 0.92rem;
  color: #7a5e5a;
  margin-top: 2px;
  font-weight: 700;
}

.user-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 12px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(217, 59, 43, 0.10);
  margin-right: 10px;
  max-width: 240px;
  color: #7a5e5a;
  font-weight: 700;
}

.menu-btn {
  color: #b13224;
}

.app-drawer {
  background: rgba(255, 252, 251, 0.98);
  color: #2a1e1e;
  border-left: 1px solid rgba(217, 59, 43, 0.10);
}

.drawer-head {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 12px 10px;
}

.drawer-title {
  font-weight: 900;
  letter-spacing: 0.14em;
  font-size: 0.85rem;
  color: #b13224;
}

.user-card {
  word-break: break-word;
}

.drawer-icon {
  color: #d24d3c;
}

.drawer-label {
  font-weight: 800;
  color: #2c1e1e;
}

.drawer-active {
  background: linear-gradient(90deg, rgba(255, 107, 87, 0.14), rgba(217, 59, 43, 0.08));
  border-left: 3px solid #d93b2b;
}

.app-container {
  background: transparent;
  min-height: 100vh;
}

.footer-link {
  color: #c43728;
  font-weight: 800;
  text-decoration: none;
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