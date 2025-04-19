<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-grad-2 text-white">
      <q-toolbar >
        <q-toolbar-title>
          Aplicativo
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <div style="font-size: 1.3rem;" class="q-pr-sm q-py-sm w100 text-right">
        MENU
      </div>
      <q-separator />
      <q-list>
        <q-item v-for="(option, index) in menuOptions" :key="index" :to="option.to">
          <q-item-section avatar>
            <q-icon :name="option.icon" color="blue"/>
          </q-item-section>
          <q-item-section class="text-bold text-grey-14">
            {{ option.label }}
          </q-item-section>
        </q-item>
      </q-list>
      <q-separator />
      <q-list>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="account_circle" color="blue-14"/>
          </q-item-section>
          <q-item-section>
            Meu Perfil
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="help" color="blue-14"/>
          </q-item-section>
          <q-item-section>
            Ajuda
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="logout" color="blue-14" />
          </q-item-section>
          <q-item-section>
            Sair
          </q-item-section>
        </q-item>
        </q-list>
    </q-drawer>

    <q-page-container class="bg-grey-4">
      <router-view />
      <footer class="q-py-md bg-grey-2">
        <div class="text-center text-grey-8">
          © 2025 - Todos os direitos reservados - Flávia Kamila
        </div>
        <div class="text-center text-grey-8">
          👨🏼‍💻 Development: <a href="https://samuelvictorol.github.io/portfolio/" target="_blank" class="text-primary">Samuel Victor</a>
        </div>
      </footer>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const rightDrawerOpen = ref(false)
const menuOptions = ref([
  { icon: 'home', to: '/app', label: 'Início' },
  { icon: 'list_alt', to: '/app/forms', label: 'Formulários' },
  { icon: 'task_alt', to: '/app/results', label: 'Resultados' },
])
function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
<style scoped>
</style>