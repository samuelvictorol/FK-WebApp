<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-secondary text-white">
      <q-toolbar >
        <q-toolbar-title>
          Aplicativo
        </q-toolbar-title>
        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-btn label="Página Inicial" icon="home" to="/" color="secondary" class="q-mx-md q-mt-xl"></q-btn>
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

const rightDrawerOpen = ref(false)

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
