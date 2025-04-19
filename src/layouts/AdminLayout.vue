<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-grad-1 text-white">
      <q-toolbar>
        <q-toolbar-title>
          Administrador
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-list class="bg-white text-grey-14 text-bold">
        <q-item-label class="text-h6 q-px-md q-my-md text-right">Menu</q-item-label>
        <q-separator />
        <q-item v-for="(option, index) in menuOptions" :key="index" :to="option.to" clickable>
          <q-item-section avatar>
            <q-icon :name="option.icon" size="2em" color="blue" />
          </q-item-section>
          <q-item-section>{{ option.label }}</q-item-section>
        </q-item>
      </q-list>
        <q-separator />
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="help" size="2em" color="blue-14" />
          </q-item-section>
          <q-item-section>Ajuda</q-item-section>
        </q-item>
        <q-item clickable @click="logout()">
          <q-item-section avatar>
            <q-icon name="logout" size="2em" color="blue-14" />
          </q-item-section>
          <q-item-section>Sair</q-item-section>
        </q-item>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const rightDrawerOpen = ref(false)
const menuOptions = ref([
  { icon: 'home', to: '/admin', label: 'Início' },
  { icon: 'list_alt', to: '/admin/forms', label: 'Formulários' },
  { icon: 'group', to: '/admin/clientes', label: 'Clientes' },
  { icon: 'paid', to: '/admin/vendas', label: 'Vendas' },

])

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}

function logout() {
  const confirm = window.confirm('Você tem certeza que deseja sair?')
  if (!confirm) return
  router.push('/')
}

</script>
<style scoped>
</style>
