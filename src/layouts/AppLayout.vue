<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-grad-1 text-white shadow-2">
      <q-toolbar >
        <q-toolbar-title>
          usuario123
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
            <q-icon :name="option.icon" color="purple-14"/>
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
            <q-icon name="account_circle" color="purple-14"/>
          </q-item-section>
          <q-item-section>
            Meu Perfil
          </q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="help" color="purple-14"/>
          </q-item-section>
          <q-item-section>
            Ajuda
          </q-item-section>
        </q-item>
        <q-item clickable @click="logout()">
          <q-item-section avatar>
            <q-icon name="logout" color="purple-14" />
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
          © 2025 - Todos os direitos reservados <br>Flávia Kamila
        </div>
        <q-separator class="q-my-md" />
        <div class="text-center text-grey-8 q-pb-lg">
          👨🏼‍💻 Development: <a href="https://samuelvictorol.github.io/portfolio/" target="_blank" class="text-primary">Samuel Victor</a>
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
  { icon: 'list_alt', to: '/app/forms', label: 'Formulários' },
])
function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
function logout() {
  const confirmLogout = confirm('Você tem certeza que deseja sair?')
  if (confirmLogout) {
    router.push('/')
  }
}

</script>
<style scoped>
</style>