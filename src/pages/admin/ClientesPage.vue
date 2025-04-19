<template>
    <q-page class="q-pa-md column q-gutter-y-md full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
            <q-breadcrumbs-el icon="group" label="Clientes" exact />
        </q-breadcrumbs>

        <!-- Cabeçalho -->
        <div class="row justify-between items-center">
            <div class="text-h6">Clientes</div>
        </div>

        <!-- Wrapper para scroll horizontal -->
        <div class="q-mt-md q-pa-sm table-container">
            <q-table :rows="clientesRows" :columns="columns" row-key="name" class="my-sticky-table shadow-2 bg-white"
                :pagination="{ rowsPerPage: 10 }" flat bordered wrap-cells>
                <!-- Ações por linha -->
                <template v-slot:body-cell-actions="props">
                    <q-td :props="props">
                        <q-btn dense flat color="primary" icon="account_circle" @click="visualizarCliente(props.row)"
                            title="Visualizar Cliente">
                        <q-tooltip>Visualizar Cliente</q-tooltip>
                        </q-btn>
                        <q-btn dense flat color="orange" icon="paid" @click="visualizarCliente(props.row)"
                            title="Painel de Gastos">
                        <q-tooltip>Visualizar Compras</q-tooltip>
                        </q-btn>
                    </q-td>
                </template>
            </q-table>
        </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue'

const clientesRows = ref([
    { name: 'João da Silva', perfil: 'joao21', planoAtual: 'Plano Premium', lucro: 'R$ 420,00' },
    { name: 'Maria Oliveira', perfil: 'maria_oliveira', planoAtual: 'Plano Básico', lucro: 'R$ 150,00' },
    { name: 'Carlos Pereira', perfil: 'carlospereira', planoAtual: 'Plano Avançado', lucro: 'R$ 300,00' },
    { name: 'Ana Santos', perfil: 'anasantos', planoAtual: 'Plano Gratuito', lucro: 'R$ 00,00' },
    { name: 'Lucas Almeida', perfil: 'lucasalmeida', planoAtual: 'Plano Básico', lucro: 'R$ 200,00' },
    { name: 'Fernanda Costa', perfil: 'fernandacosta', planoAtual: 'Plano Avançado', lucro: 'R$ 350,00' },
    { name: 'Ricardo Lima', perfil: 'ricardolima', planoAtual: 'Plano Premium', lucro: 'R$ 600,00' },
    { name: 'Juliana Rocha', perfil: 'julianarocha', planoAtual: 'Plano Básico', lucro: 'R$ 180,00' },
    { name: 'Gabriel Martins', perfil: 'gabrielmartins', planoAtual: 'Plano Avançado', lucro: 'R$ 400,00' },
    { name: 'Patrícia Ferreira', perfil: 'patriciaferreira', planoAtual: 'Plano Premium', lucro: 'R$ 700,00' }
])

const columns = ref([
    {
        name: 'name',
        label: 'Nome',
        field: row => row.name,
        align: 'left',
        classes: 'sticky-col bg-blue text-white text-bold',
        headerClasses: 'sticky-col bg-grey-2 text-weight-bold'
    },
    {
        name: 'perfil',
        label: 'Perfil',
        field: row => row.perfil,
        align: 'left'
    },
    {
        name: 'planoAtual',
        label: 'Plano Atual',
        field: row => row.planoAtual,
        align: 'left'
    },
    {
        name: 'lucro',
        label: 'Lucro',
        field: row => row.lucro,
        align: 'left'
    },
    {
        name: 'actions',
        label: 'Ações',
        align: 'center'
    }
])

function visualizarCliente(cliente) {
    console.log('Visualizar cliente:', cliente)
}
</script>

<style scoped>
.q-page {
    background: #f2f3f5;
}

.table-container {
    overflow-x: auto;
    max-width: 100%;
}

/* Sticky para a primeira coluna */
.my-sticky-table ::v-deep(.sticky-col) {
    position: sticky;
    left: 0;
    z-index: 1;
    background-color: white;
}
</style>