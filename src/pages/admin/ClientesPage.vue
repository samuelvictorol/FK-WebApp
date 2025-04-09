<template>
    <q-page class="q-pa-md animate__animated animate__fadeIn">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
            <q-breadcrumbs-el icon="group" label="Clientes" exact />
        </q-breadcrumbs>

        <!-- Cabeçalho -->
        <div class="w100 row justify-between items-center q-my-md">
            <div class="text-h6">Clientes</div>
        </div>

        <!-- Tabela -->
        <q-table :rows="clientesRows" :columns="columns" row-key="name" class="my-sticky-table shadow-2"
            :pagination="{ rowsPerPage: 10 }" flat bordered>
            <!-- Ações por linha -->
            <template v-slot:body-cell-actions="props">
                <q-td :props="props">
                    <q-btn dense flat color="primary" icon="visibility" @click="visualizarCliente(props.row)"
                        title="Visualizar Cliente" />
                </q-td>
            </template>
        </q-table>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';

const clientesRows = ref([
    { name: 'João da Silva', perfil: 'Visual/Criativo', formulário: 'Formulário 1' },
    { name: 'Maria Oliveira', perfil: 'Visual/Criativo', formulário: 'Formulário 2' },
    { name: 'Carlos Santos', perfil: 'Visual/Criativo', formulário: 'Formulário 3' },
    { name: 'Ana Costa', perfil: 'Visual/Criativo', formulário: 'Formulário 4' },
    { name: 'Pedro Almeida', perfil: 'Visual/Criativo', formulário: 'Formulário 5' },
    { name: 'Luana Ferreira', perfil: 'Visual/Criativo', formulário: 'Formulário 6' },
    { name: 'Ricardo Lima', perfil: 'Visual/Criativo', formulário: 'Formulário 7' },
    { name: 'Fernanda Rocha', perfil: 'Visual/Criativo', formulário: 'Formulário 8' },
    { name: 'Bruno Martins', perfil: 'Visual/Criativo', formulário: 'Formulário 9' },
    { name: 'Juliana Mendes', perfil: 'Visual/Criativo', formulário: 'Formulário 10' }
]);

const columns = ref([
    {
        name: 'name',
        label: 'Nome',
        field: row => row.name,
        align: 'left',
        classes: 'sticky-col bg-white',
        headerClasses: 'sticky-col bg-grey-2 text-weight-bold'
    },
    {
        name: 'perfil',
        label: 'Perfil',
        field: row => row.perfil,
        align: 'left'
    },
    {
        name: 'formulário',
        label: 'Formulário',
        field: row => row.formulário,
        align: 'left'
    },
    {
        name: 'actions',
        label: 'Ações',
        align: 'center'
    }
]);

function visualizarCliente(cliente) {
    console.log('Visualizar cliente:', cliente);
    // ou redirecionar para uma rota ex: `/admin/clientes/${cliente.id}`
}
</script>

<style scoped>
.q-page {
    background: #dfe2e9;
}

/* Classe para tornar a primeira coluna sticky */
.my-sticky-table ::v-deep(.sticky-col) {
    position: sticky;
    left: 0;
    z-index: 1;
    background-color: white;
}
</style>