<template>
    <q-page class="q-pa-md q-gutter-y-md animate__animated animate__fadeIn column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" exact />
        </q-breadcrumbs>

        <!-- Cabeçalho -->
        <div class="text-h4" style="overflow:hidden">Início</div>
        <div class="text-subtitle1 text-grey-14  q-mb-md"> <strong>{{ userRole }}</strong></div>
        <div class="w100 row rounded-borders justify-center align-start">
            <div class="w100 row no-wrap">
                <q-btn to="/app/#" class="w100 q-py-xl q-mt-md q-mr-md" label="Meu Perfil"
                    icon-right="account_circle" color="accent" glossy></q-btn>
                <q-btn class="w100 q-py-xl" label="Formulários" to="/app/forms" icon-right="list_alt" color="blue-14"
                    glossy></q-btn>
            </div>
            <div class="w100 row no-wrap">
                <q-btn to="/app/#" class="q-mr-md w100 q-py-xl q-mt-md" label="Resultados"
                    icon-right="task_alt" color="purple-14" glossy></q-btn>
                <q-btn to="/app/#" class="w100 q-py-xl q-mt-md" label="Histórico de Compras" icon-right="paid"
                    color="orange-14" glossy></q-btn>
            </div>
        </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';

const userRole = ref('🌱 Plano Gratuito');
</script>

<style scoped>
.hoverable-card {
    transition: transform 0.2s;
    min-height: 150px;
    /* altura mínima para mobile */
}

.hoverable-card:hover {
    transform: scale(1.03);
}
</style>