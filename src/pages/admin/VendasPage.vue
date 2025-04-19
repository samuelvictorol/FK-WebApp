<template>
    <q-page class="q-pa-md">
        <!-- Breadcrumb -->
        <q-breadcrumbs class=" text-grey-8 rounded-borders q-mb-md" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
            <q-breadcrumbs-el icon="paid" label="Vendas" to="/admin" exact />
        </q-breadcrumbs>
        <q-card class="q-pa-sm q-mx-auto q-mt-lg" style="max-width: 600px">
            <q-card-section>
                <div class="text-h5 text-primary text-bold">Resumo de Vendas</div>
                <div class="q-mt-sm">
                    <div class="text-subtitle1">{{ vendas.titulo }}</div>
                    <div class="text-body2 text-grey">{{ vendas.descricao }}</div>
                    <div class="text-h6 text-positive q-mt-sm">R$ {{ vendas.valor.toFixed(2) }}</div>
                </div>
            </q-card-section>
        </q-card>

        <div class="q-mt-xl q-pb-lg">
            <q-card class="q-pa-md q-mx-auto" style="max-width: 600px">
                <q-card-section>
                    <div class="text-h6 text-dark">Últimas Vendas</div>
                </q-card-section>

                <q-separator />

                <q-list separator>
                    <q-item v-for="(venda, index) in ultimasVendas" :key="index">
                        <q-item-section>
                            <q-item-label>{{ venda.cliente }}</q-item-label>
                            <q-item-label caption>{{ venda.data }}</q-item-label>
                        </q-item-section>
                        <q-item-section side>
                            <q-item-label class="text-bold text-positive">R$ {{ venda.valor.toFixed(2) }}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card>
        </div>
    </q-page>
</template>

<script setup>
const vendas = {
    titulo: 'Vendas Totais do Dia',
    descricao: 'Este é o valor total arrecadado com as vendas de hoje.',
    valor: 1894.50
}

const ultimasVendas = [
    { cliente: 'João Silva', data: '14/04/2025 09:45', valor: 89.90 },
    { cliente: 'Maria Oliveira', data: '14/04/2025 09:30', valor: 120.00 },
    { cliente: 'Carlos Souza', data: '14/04/2025 08:50', valor: 75.50 },
    { cliente: 'Ana Paula', data: '14/04/2025 08:10', valor: 110.00 }
]
</script>

<style scoped>
.q-page {
    background: #dfe2e9
}
.text-h5 {
    font-weight: bold;
}

.text-h6 {
    font-weight: 600;
}
</style>