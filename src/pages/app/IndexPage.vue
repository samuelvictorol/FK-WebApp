<template>
    <q-page class="q-pa-md q-gutter-y-md animate__animated animate__fadeIn column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" exact />
        </q-breadcrumbs>
        <!-- Hero Banner -->
        <div class="text-h4" style="overflow:hidden">Início</div>
        <div class="q-pa-lg q-mb-md bg-blue-1 rounded-borders column items-center text-center">
            <div class="text-h5 text-bold text-blue-10">
               🎯 Conheça o curso que transforma sua preparação para concursos!
            </div>
            <div class="text-subtitle1 q-mt-sm text-grey-9">

            </div>
            <q-btn label="🔗 Acesse agora o curso completo" color="primary" class="q-mt-md q-px-xl q-py-sm text-bold"
                rounded glossy size="md" @click="irParaCurso" />
        </div>
        <!-- Cabeçalho -->
        <div class="w100 row rounded-borders justify-center align-start q-pb-xl q-mb-xl">
            <div class="w100 column no-wrap">
                <q-btn class="w100 q-py-xl" label="Formulários e Perfil de Estudo" to="/app/forms" icon-right="list_alt" color="purple-14"
                    glossy></q-btn>
                <q-btn to="/app/#" class="w100 q-py-xl q-mr-md" label="Meu Perfil" icon-right="account_circle"
                color="purple-14" flat></q-btn>
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