<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-grad-1 text-black">
      <q-toolbar>
        <q-toolbar-title>
          Administrador
        </q-toolbar-title>

        <q-btn dense flat round icon="menu" @click="toggleRightDrawer" />
      </q-toolbar>
    </q-header>

    <q-drawer show-if-above v-model="rightDrawerOpen" side="right" bordered>
      <q-list class="bg-white text-black">
        <q-item-label class="text-h6 q-pl-md q-my-md">Menu</q-item-label>
        <q-separator />
        <q-item v-for="(option, index) in menuOptions" :key="index" :to="option.to" clickable>
          <q-item-section avatar>
            <q-icon :name="option.icon" size="2em" color="primary" />
          </q-item-section>
          <q-item-section>{{ option.label }}</q-item-section>
        </q-item>
        <q-separator />
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="help" size="2em" color="grey-14" />
          </q-item-section>
          <q-item-section>Ajuda</q-item-section>
        </q-item>
        <q-item clickable>
          <q-item-section avatar>
            <q-icon name="logout" size="2em" color="grey-14" />
          </q-item-section>
          <q-item-section>Sair</q-item-section>
        </q-item>
        <q-separator />
        <q-separator />
        </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue'

const rightDrawerOpen = ref(false)
const menuOptions = ref([
  { icon: 'home', to: '/#', label: 'Inicio' },
  { icon: 'add_circle', to: '/#', label: 'Novo Formulário' },
  { icon: 'group  ', to: '/#', label: 'Usuários' },

])

function toggleRightDrawer() {
  rightDrawerOpen.value = !rightDrawerOpen.value
}
</script>
<style scoped>
</style>
