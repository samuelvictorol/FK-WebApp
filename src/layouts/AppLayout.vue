<template>
  <q-layout view="hHh lpR fFf" class="app-shell">
    <q-header elevated class="app-header">
      <q-toolbar class="q-px-md">
        <q-toolbar-title class="brand">
          <div class="brand-top">
            <div class="brand-text">
              <div class="brand-name">FláviaKamila</div>
              <div class="brand-sub">Seu diagnóstico de aprendizagem</div>
            </div>
          </div>
        </q-toolbar-title>

        <div class="user-pill desktop-only">
          <q-icon name="account_circle" class="q-mr-xs" />
          <span class="ellipsis">usuario123</span>
        </div>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" aria-label="Abrir menu" />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="rightDrawerOpen"
      side="right"
      class="app-drawer bg-deep-purple-10"
    >
      <div class="drawer-head">
        <div class="drawer-title text-grey-3">MENU</div>
        <q-btn flat round icon="close" @click="rightDrawerOpen = false" />
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

      <q-list class="q-py-sm text-grey">
        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="account_circle" class="drawer-icon" />
          </q-item-section>
          <q-item-section>Meu Perfil</q-item-section>
        </q-item>

        <q-item clickable v-ripple>
          <q-item-section avatar>
            <q-icon name="help" class="drawer-icon" />
          </q-item-section>
          <q-item-section>Ajuda</q-item-section>
        </q-item>

        <q-item clickable v-ripple @click="logout()">
          <q-item-section avatar>
            <q-icon name="logout" class="drawer-icon" />
          </q-item-section>
          <q-item-section>Sair</q-item-section>
        </q-item>
      </q-list>

    </q-drawer>

    <q-page-container class="app-container">
      <router-view />

      <footer class="app-footer">
        <div class="text-center text-grey-7">
          © 2026 - Todos os direitos reservados <br />
          <strong>Flávia Kamila</strong>
        </div>
        <q-separator class="q-my-md" />
        <div class="text-center text-grey-7 q-pb-lg">
          👨🏼‍💻 Development:
          <a
            href="https://aitosoftwares.com/"
            target="_blank"
            class="devlink"
          >AitoSoftwares</a>
        </div>
      </footer>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const rightDrawerOpen = ref(false)

const menuOptions = ref([
  { icon: 'home', to: '/app', label: 'Início' },
  { icon: 'list_alt', to: '/app/forms', label: 'Formulários' }
])

function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function logout () {
  const confirmLogout = confirm('Você tem certeza que deseja sair?')
  if (confirmLogout) router.push('/')
}
</script>

<style scoped>
:global(html), :global(body), :global(#q-app) { overflow-x: clip; }
:global(.row > [class*="col-"]) { min-width: 0; }

.app-shell {
  background: radial-gradient(900px 420px at 20% 25%, rgba(124,58,237,.18), transparent 60%),
              radial-gradient(800px 400px at 80% 40%, rgba(20,184,166,.12), transparent 55%),
              #0b0b10;
}

.app-header {
  background: linear-gradient(90deg, rgba(124,58,237,.22), rgba(20,184,166,.14));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,.08);
  color: #fff;
}

.brand-top { display: flex; align-items: center; gap: 10px; }
.brand-avatar { border: 1px solid rgba(255,255,255,.18); }
.brand-name { font-weight: 900; line-height: 1.05; }
.brand-sub { font-size: .78rem; opacity: .85; }

.user-pill {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 7px 10px;
  border-radius: 999px;
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  margin-right: 10px;
  max-width: 240px;
}

.app-drawer {
  background: rgba(12,12,18,.98);
  color: #fff;
  border-left: 1px solid rgba(255,255,255,.08);
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

.drawer-icon { color: #a78bfa; }
.drawer-label { font-weight: 800; color: rgba(255,255,255,.92); }

.drawer-active {
  background: linear-gradient(90deg, rgba(124,58,237,.18), rgba(20,184,166,.10));
  border-left: 3px solid rgba(167,139,250,.9);
}

.drawer-footer {
  margin-top: auto;
  padding: 12px;
  border-top: 1px solid rgba(255,255,255,.08);
}

.devlink {
  color: #835eea;
  font-weight: 900;
  text-decoration: none;
  border-bottom: 1px dashed rgba(94,234,212,.35);
}

.app-container {
  background: transparent;
  min-height: 100vh;
}

.app-footer {
  background: rgba(255,255,255,.92);
  border-top: 1px solid rgba(15,23,42,.08);
  padding: 18px 14px 0;
}

.desktop-only { display: block; }
@media (max-width: 1023px) {
  .desktop-only { display: none !important; }
}
</style>