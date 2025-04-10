<template>
    <q-page class="q-pa-md q-gutter-y-md animate__animated animate__fadeIn column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" exact />
        </q-breadcrumbs>

        <!-- Cabeçalho -->
        <div class="text-h4" style="overflow:hidden">Início</div>
        <div class="text-subtitle1   q-mb-md">Olá, <strong>{{ userName }}</strong></div>
        <q-card class="q-mx-xl">
            <q-card-section class="">
                <div class="text-subtitle2">💰 Saldo Atual: R$ 2850,00 <br>📈 Lucro Total: R$ 63021,94</div>
            </q-card-section>
        </q-card>
        <div class="w100 row rounded-borders justify-center align-start">
            <div class="column w45">
                <q-btn class="w100 q-py-xl" label="Minhas Tags" to="/admin/tags" icon-right="sell" color="blue-14" glossy></q-btn>
                <q-btn class="w100 q-py-xl q-mt-md" label="Meus Formulários" to="/admin/forms" icon-right="list_alt" color="purple-14" glossy></q-btn>
            </div>
            <div class="q-pa-xs"></div>
            <div class="column w45">
                <q-btn  class="w100 q-py-xl" label="Novo Formulário" icon-right="add_circle" to="/admin/novo-form" color="accent" glossy></q-btn>
                <q-btn to="/admin/clientes" class="w100 q-py-xl q-mt-md" label="Meus Clientes" icon-right="group" color="orange-14" glossy></q-btn>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';

const userName = ref('Flávia Kamila');
</script>

<style scoped>
.q-page{
    background: #dfe2e9
}
.hoverable-card {
    transition: transform 0.2s;
    min-height: 150px;
    /* altura mínima para mobile */
}

.hoverable-card:hover {
    transform: scale(1.03);
}
</style>