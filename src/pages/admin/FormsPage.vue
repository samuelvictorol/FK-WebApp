<template>
    <q-page class="q-pa-md">
        <!-- Breadcrumb -->
        <q-breadcrumbs class=" text-grey-8 rounded-borders" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
            <q-breadcrumbs-el icon="list_alt" label="Formulários" to="/admin" exact />
        </q-breadcrumbs>

        <!-- Cabeçalho -->
        <div class="w100 row justify-between items-center q-my-md">
            <div class="text-h6">Formulários</div>
            <q-btn color="accent" label="Novo" icon-right="post_add" glossy to="/admin/novo-form" />
        </div>

        <!-- Tabela -->
        <q-table :rows="formsRows" :columns="columns" row-key="id" class="my-sticky-table shadow-2"
            flat bordered :rows-per-page-options="[5, 10, 20]">
            <!-- Ações -->
            <template #body-cell-actions="props">
                <q-td align="center">
                    <q-btn dense flat round color="primary" icon="visibility">
                        <q-tooltip>Visualizar Template</q-tooltip>
                    </q-btn>
                    <q-btn dense flat round icon="library_books" color="blue">
                        <q-tooltip>Visualizar Respostas</q-tooltip>
                    </q-btn>
                </q-td>
            </template>
        </q-table>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';

const formsRows = ref([
    { id: 1, title: 'Formulário 1', createdAt: '04/04/2025', respostas: 10 },
    { id: 2, title: 'Formulário 2', createdAt: '04/04/2025', respostas: 20 },
    { id: 3, title: 'Formulário 3', createdAt: '04/04/2025', respostas: 30 },
    { id: 4, title: 'Formulário 4', createdAt: '04/04/2025', respostas: 40 },
    { id: 5, title: 'Formulário 5', createdAt: '04/04/2025', respostas: 50 },
]);

const columns = ref([
    {
        name: 'title',
        label: 'Título',
        align: 'left',
        field: row => row.title,
        classes: 'sticky-col bg-accent text-bold text-white',
        headerClasses: 'sticky-col bg-grey-2',
    },
    {
        name: 'respostas',
        label: 'Respostas',
        align: 'left',
        field: row => row.respostas,
    },
    {
        name: 'createdAt',
        label: 'Criado em',
        align: 'left',
        field: row => row.createdAt,
    },
    {
        name: 'actions',
        label: 'Ações',
        align: 'center',
        field: () => '',
        sortable: false,
    },
]);
</script>

<style scoped>
.q-page {
    background: #dfe2e9
}

.my-sticky-table ::v-deep(.sticky-col) {
    position: sticky;
    left: 0;
    z-index: 1;
}
</style>