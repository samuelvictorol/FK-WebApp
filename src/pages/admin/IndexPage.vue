<template>
    <q-page class="q-pa-md q-gutter-y-md animate__animated animate__fadeIn column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" exact />
        </q-breadcrumbs>

        <!-- Cabeçalho -->
        <div class="text-h4" style="overflow:hidden">Início</div>
        <div class="text-subtitle1   q-mb-md">Olá, <strong>{{ userName }}</strong></div>
        <q-card class="q-mx-xl q-mb-md">
            <q-card-section class="">
                <div class="text-subtitle2">💰 Saldo Atual: R$ 2850,00 <br>📈 Lucro Total: R$ 63021,94</div>
            </q-card-section>
        </q-card>
        <div class="w100 row rounded-borders justify-center align-start">
            <div class="w100 row no-wrap">
                <q-btn class="w100 q-py-xl q-mr-md" label="Formulários" to="/admin/forms" icon-right="list_alt" color="purple-14" glossy></q-btn>
                <q-btn to="/admin/clientes" class="w100 q-py-xl q-mt-md" label="Clientes" icon-right="group" color="blue-14" glossy></q-btn>
            </div>
            <div class="w100">
                <q-btn to="/admin/vendas" class="w100 q-py-xl q-mt-md" label="Painel de Vendas" icon-right="paid" color="green" glossy></q-btn>
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