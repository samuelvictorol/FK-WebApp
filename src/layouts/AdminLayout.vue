<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-secondary text-white">
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
            <q-icon :name="option.icon" size="2em" color="secondary" />
          </q-item-section>
          <q-item-section>{{ option.label }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="help" size="2em" color="primary" />
          </q-item-section>
          <q-item-section>Ajuda</q-item-section>
        </q-item>
        <q-item clickable @click="logout()">
          <q-item-section avatar>
            <q-icon name="logout" size="2em" color="primary" />
          </q-item-section>
          <q-item-section>Sair</q-item-section>
        </q-item>
        <q-separator />
        <q-separator />
        </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
      <footer class="q-py-md bg-grey-2">
        <div class="text-center text-grey-8">
          © 2025 - Todos os direitos reservados - Flávia Kamila
        </div>
        <div class="text-center text-grey-8">
          👨🏼‍💻 Development: <a href="https://samuelvictorol.github.io/portfolio/" target="_blank" class="text-primary">Samuel Victor - 59.905.708/0001-34</a>
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
  { icon: 'home', to: '/admin', label: 'Inicio' },
  { icon: 'sell', to: '/admin/tags', label: 'Criar Tags' },
  { icon: 'add_circle', to: '/admin/novo-form', label: 'Novo Formulário' },
  { icon: 'group', to: '/admin/clientes', label: 'Usuários' },

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
