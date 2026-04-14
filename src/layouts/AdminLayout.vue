<template>
  <q-layout view="hHh lpR fFf" class="admin">
    <q-header elevated class="header">
      <q-toolbar class="toolbar">
        <q-toolbar-title class="title safe-text">
          <q-icon name="admin_panel_settings" size="22px" class="q-mr-sm" />
          Administrador
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" class="icon-btn" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      elevated
      class="drawer"
      :width="290"
    >
      <div class="drawer-head">
        <div class="text-subtitle1 text-weight-bold drawer-title">Menu</div>
        <div class="text-caption drawer-subtitle">Painel administrativo</div>
      </div>

      <q-separator />

      <q-list class="q-pt-sm">
        <q-item
          v-for="(option, index) in menuOptions"
          :key="index"
          :to="option.to"
          clickable
          class="menu-item"
          active-class="menu-active"
        >
          <q-item-section avatar>
            <q-icon :name="option.icon" size="22px" class="menu-icon" />
          </q-item-section>
          <q-item-section class="text-weight-bold safe-text menu-label">
            {{ option.label }}
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator class="q-my-sm" />

      <q-list>
        <q-item clickable class="menu-item" @click="logout()">
          <q-item-section avatar>
            <q-icon name="logout" size="22px" class="menu-icon-alt" />
          </q-item-section>
          <q-item-section class="safe-text menu-label">Sair</q-item-section>
        </q-item>
      </q-list>

      <div class="drawer-footer">
        <div class="text-caption drawer-footer-text">
          © 2026 • Desenvolvido por
          <a href="https://aitosoftwares.com" target="_blank" class="footer-link">AitoSoftwares</a>
        </div>
      </div>
    </q-drawer>

    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

onMounted(() => {
  const password = window.prompt('Digite a senha de acesso ao painel administrativo:')
  if (password !== 'flaviakamila-app@123' && password !== 'Flaviakamila-app@123') {
    window.alert('Senha incorreta! Redirecionando para a página inicial.')
    window.location.href = '/'
  }
})

const router = useRouter()
const rightDrawerOpen = ref(true)

const menuOptions = ref([
  { icon: 'home', to: '/admin', label: 'Início' },
  { icon: 'list_alt', to: '/admin/forms', label: 'Formulários' },
  { icon: 'group', to: '/admin/clientes', label: 'Clientes' },
  { icon: 'paid', to: '/admin/vendas', label: 'Pagamentos' },
])

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function logout() {
  const ok = window.confirm('Você tem certeza que deseja sair?')
  if (!ok) return
  router.push('/')
}
</script>

<style scoped>
:global(html), :global(body), :global(#q-app) { overflow-x: clip; }
:global(.row > [class*="col-"]) { min-width: 0; }
.safe-text { overflow-wrap: anywhere; word-break: break-word; }

.admin {
  background:
    radial-gradient(900px 500px at 10% 0%, rgba(255, 107, 87, 0.10), transparent 60%),
    radial-gradient(800px 480px at 90% 20%, rgba(217, 59, 43, 0.08), transparent 60%),
    linear-gradient(180deg, #fff9f8 0%, #fff5f3 100%);
  min-height: 100vh;
}

.header {
  background: rgba(255, 250, 249, 0.86);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(217, 59, 43, 0.10);
  color: #241717;
}

.toolbar {
  min-height: 60px;
}

.title {
  font-weight: 900;
  letter-spacing: .3px;
  color: #241717;
}

.icon-btn {
  color: #c43728;
}

.drawer {
  background: rgba(255, 252, 251, 0.98);
  color: #241717;
  backdrop-filter: blur(12px);
  border-left: 1px solid rgba(217, 59, 43, 0.10);
}

.drawer-head {
  padding: 16px 16px 10px;
}

.drawer-title {
  color: #b13224;
}

.drawer-subtitle {
  color: #7b6360;
}

.menu-item {
  border-radius: 14px;
  margin: 6px 10px;
  background: rgba(255, 255, 255, 0.68);
  border: 1px solid rgba(217, 59, 43, 0.08);
  transition: transform .16s ease, background .16s ease, border-color .16s ease;
}

.menu-item:hover {
  transform: translateY(-1px);
  background: rgba(255, 248, 246, 0.96);
  border-color: rgba(217, 59, 43, 0.18);
}

.menu-active {
  background: linear-gradient(90deg, rgba(255, 107, 87, 0.14), rgba(217, 59, 43, 0.08));
  border-color: rgba(217, 59, 43, 0.25);
}

.menu-icon {
  color: #d24d3c;
}

.menu-icon-alt {
  color: #c43728;
}

.menu-label {
  color: #2a1d1d;
}

.drawer-footer {
  padding: 16px;
}

.drawer-footer-text {
  color: #7b6360;
}

.footer-link {
  color: #c43728;
  font-weight: 800;
  text-decoration: none;
}

.container {
  background: transparent;
}
</style>