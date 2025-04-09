<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-blue text-white">
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
