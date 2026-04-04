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
      class="drawer bg-dark text-white"
      :width="290"
    >
      <div class="drawer-head">
        <div class="text-subtitle1 text-weight-bold">Menu</div>
        <div class="text-caption text-grey-5">Painel administrativo</div>
      </div>

      <q-separator dark />

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
          <q-item-section class="text-weight-bold safe-text">
            {{ option.label }}
          </q-item-section>
        </q-item>
      </q-list>

      <q-separator dark class="q-my-sm" />

      <q-list>
        <!-- <q-item clickable class="menu-item">
          <q-item-section avatar>
            <q-icon name="help" size="22px" class="menu-icon-alt" />
          </q-item-section>
          <q-item-section class="safe-text">Ajuda</q-item-section>
        </q-item> -->

        <q-item clickable class="menu-item" @click="logout()">
          <q-item-section avatar>
            <q-icon name="logout" size="22px" class="menu-icon-alt" />
          </q-item-section>
          <q-item-section class="safe-text">Sair</q-item-section>
        </q-item>
      </q-list>

      <div class="drawer-footer">
        <div class="text-caption text-grey-6">
          © 2026 • Admin Panel
        </div>
      </div>
    </q-drawer>

    <q-page-container class="container">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'

onBeforeMount(() => {
  const password = window.prompt('Digite a senha de acesso ao painel administrativo:')
  if (password !== 'flaviakamila-app@123') {
    window.alert('Senha incorreta! Redirecionando para a página de login.')
    window.location.href = '/login'
  } 
})

const router = useRouter()
const rightDrawerOpen = ref(false)

const menuOptions = ref([
  { icon: 'home', to: '/admin', label: 'Início' },
  { icon: 'list_alt', to: '/admin/forms', label: 'Formulários' },
  { icon: 'group', to: '/admin/clientes', label: 'Clientes' },
  // { icon: 'paid', to: '/admin/vendas', label: 'Vendas' }
])

function toggleRightDrawer () {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function logout () {
  const ok = window.confirm('Você tem certeza que deseja sair?')
  if (!ok) return
  router.push('/')
}
</script>

<style scoped>
/* anti overflow global */
:global(html), :global(body), :global(#q-app) { overflow-x: clip; }
:global(.row > [class*="col-"]) { min-width: 0; }
.safe-text { overflow-wrap: anywhere; word-break: break-word; }

.admin{
  background: radial-gradient(900px 500px at 10% 0%, rgba(124,58,237,.25), transparent 60%),
              radial-gradient(800px 480px at 90% 20%, rgba(20,184,166,.18), transparent 60%),
              #0b0b10;
  min-height: 100vh;
}

.header{
  background: linear-gradient(90deg, rgba(124,58,237,.65), rgba(20,184,166,.35));
  backdrop-filter: blur(10px);
}

.toolbar{
  min-height: 60px;
}

.title{
  font-weight: 900;
  letter-spacing: .3px;
}

.icon-btn{
  color: rgba(255,255,255,.95);
}

.drawer{
  background: rgba(12, 12, 18, .96);
  color: rgba(255,255,255,.92);
  backdrop-filter: blur(10px);
}

.drawer-head{
  padding: 16px 16px 10px;
}

.menu-item{
  border-radius: 14px;
  margin: 6px 10px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.06);
  transition: transform .16s ease, background .16s ease, border-color .16s ease;
}

.menu-item:hover{
  transform: translateY(-1px);
  background: rgba(255,255,255,.05);
  border-color: rgba(124,58,237,.30);
}

.menu-active{
  background: linear-gradient(90deg, rgba(124,58,237,.26), rgba(20,184,166,.14));
  border-color: rgba(124,58,237,.40);
}

.menu-icon{
  color: #c4b5fd; /* lilás claro */
}

.menu-icon-alt{
  color: #99f6e4; /* teal claro */
}

.drawer-footer{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  padding: 12px 16px;
  border-top: 1px solid rgba(255,255,255,.06);
  background: rgba(255,255,255,.02);
}

.container{
  background: transparent;
}
</style>