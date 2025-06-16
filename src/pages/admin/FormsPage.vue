<template>
    <q-page class="q-pa-md">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
            <q-breadcrumbs-el icon="list_alt" label="Formulários" to="/admin" exact />
        </q-breadcrumbs>

        <!-- Cabeçalho -->
        <div class="w100 row justify-between items-center q-my-md">
            <div class="text-h6">Formulários</div>
        </div>

        <!-- Tabela -->
        <q-table :rows="formsRows" :columns="columns" row-key="id" class="my-sticky-table shadow-2" flat bordered
            :rows-per-page-options="[5, 10, 20]">
            <!-- Ações -->
            <template #body-cell-actions="props">
                <q-td align="center">
                    <q-btn @click="openForm(props.row.title)" dense flat round color="green" icon="visibility">
                        <q-tooltip>Visualizar Template</q-tooltip>
                    </q-btn>
                </q-td>
            </template>
        </q-table>

        <!-- Diálogo com respostas -->
        <q-dialog v-model="dialog" full-width>
            <q-card style="max-width: 800px">
                <q-card-section class="text-h6 text-primary">
                    {{ formHandleName }}
                </q-card-section>

                <q-separator />

                <q-card-section class="q-pt-none scroll" style="max-height: 70vh;">
                    <div v-for="(q, idx) in perguntasRespostas" :key="idx" class="q-mb-md">
                        <div class="text-subtitle1 text-weight-bold">{{ idx + 1 }}. {{ q.question }}</div>
                        <q-option-group :model-value="q.resposta" :options="q.options.map(o => ({
                            label: o.option + ' - ' + (o.points !== undefined ? o.points + ' pts' : o.tag),
                            value: o.option
                        }))" type="radio" color="primary" readonly />

                    </div>
                </q-card-section>
                <div class="results q-px-md q-pb-md rounded-borders" style="border-top: 1px solid #dfe2e9;">
                    <div class="text-h6 text-primary q-mt-md q-mb-sm">Resultados</div>
                    <q-separator />
                    <div class="q-mt-md" v-html="resultado.replace(/\n/g, '<br>')"></div>
                </div>
                <q-separator />
                <q-card-actions align="right">
                    <q-btn flat label="Fechar" color="primary" v-close-popup />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios';
import { ref } from 'vue';

const dialog = ref(false);
const perguntasRespostas = ref([]);
const resultado = ref('')
const formHandleName = ref('')

const formsRows = ref([
    { id: 1, title: 'Cronótipo', createdAt: '04/04/2025', respostas: 10 },
    { id: 2, title: 'Forma de Aprendizado', createdAt: '04/04/2025', respostas: 20 },
    { id: 3, title: 'Estilo de Aprendizado', createdAt: '04/04/2025', respostas: 50 },
]);

const columns = ref([
    {
        name: 'title',
        label: 'Título',
        align: 'left',
        field: row => row.title,
        classes: 'sticky-col bg-blue text-bold text-white',
        headerClasses: 'sticky-col bg-grey-2',
    },
    {
        name: 'actions',
        label: 'Ações',
        align: 'center',
        field: () => '',
        sortable: false,
    },
]);

async function getForm(formUrl) {
    try {
        const response = await api.post(formUrl);
        perguntasRespostas.value = response.data;
        dialog.value = true;
    } catch (error) {
        console.error(error);
    }
}

async function verRespostas(title) {
    switch (title) {
        case 'Cronótipo':
            await getForm('/form/cronotipo');
            break;
        case 'Forma de Aprendizado':
            await getForm('/form/forma_aprendizado');
            break;
        case 'Estilo de Aprendizado':
            await getForm('/form/estilo_aprendizado');
            break;
        default:
            console.warn('Formulário desconhecido:', title);
    }
}

async function openForm(title) {
    formHandleName.value = title;
    switch (title) {
        case 'Cronótipo':
            resultado.value = 'De 16 a 30 pontos – <strong>Vespertino Típico</strong>\nDe 31 a 41 pontos – <strong>Moderadamente Vespertino</strong>\nDe 42 a 58 pontos – <strong>Intermediário</strong>\nDe 56 a 69 pontos – <strong>Moderadamente Matutino</strong>'
            await getForm('/form/cronotipo');
            break;
        case 'Forma de Aprendizado':
            resultado.value = 'Maioria A – <strong>Visual</strong>\nMaioria B – <strong>Auditivo</strong>\nMaioria C – <strong>Cinestésico</strong>'
            await getForm('/form/forma_aprendizado');
            break;
        case 'Estilo de Aprendizado':
            resultado.value = '2 a 5 resposta A – <strong>Ativo</strong>\n2 a 5 resposta B – <strong>Passivo</strong>\n2 a 5 resposta C – <strong>Teórico</strong>\n2 a 5 resposta D – <strong>Prático</strong>'
            await getForm('/form/estilo_aprendizado');
            break;
        default:
            break;
    }
}

</script>

<style scoped>
.q-page {
    background: #dfe2e9;
}

.my-sticky-table ::v-deep(.sticky-col) {
    position: sticky;
    left: 0;
    z-index: 1;
}
</style>