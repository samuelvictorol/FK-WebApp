<template>
  <q-page class="page q-pa-md">
    <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
      <q-breadcrumbs-el icon="list_alt" label="Formulários" exact />
    </q-breadcrumbs>

    <div class="w100 row justify-between items-center q-my-md">
      <div class="text-h6 text-weight-bold safe-text page-title">Formulários</div>
      <q-chip outline class="chip">read-only</q-chip>
    </div>

    <q-table
      :rows="formsRows"
      :columns="columns"
      row-key="id"
      class="tbl"
      flat
      bordered
      :rows-per-page-options="[5, 10, 20]"
    >
      <template #body-cell-actions="props">
        <q-td align="center">
          <q-btn
            @click="openForm(props.row.title)"
            dense
            flat
            round
            icon="visibility"
            class="act act-primary"
          >
            <q-tooltip>Visualizar Template</q-tooltip>
          </q-btn>
        </q-td>
      </template>
    </q-table>

    <q-dialog v-model="dialog" full-width>
      <q-card class="dlg" flat bordered>
        <q-card-section class="dlg-head row items-center justify-between">
          <div class="text-h6 text-weight-bold safe-text dlg-title">
            {{ formHandleName }}
          </div>
          <q-btn flat round icon="close" v-close-popup class="icon-btn" />
        </q-card-section>

        <q-separator />

        <q-card-section class="dlg-body scroll">
          <div v-for="(q, idx) in perguntasRespostas" :key="idx" class="q-mb-lg">
            <div class="text-subtitle1 text-weight-bold safe-text question-title">
              {{ idx + 1 }}. {{ q.question }}
            </div>

            <q-option-group
              :model-value="q.resposta"
              :options="q.options.map(o => ({
                label: o.option + ' — ' + (o.points !== undefined ? (o.points + ' pts') : o.tag),
                value: o.option
              }))"
              type="radio"
              color="red-5"
              readonly
              class="q-mt-sm opt"
            />
          </div>

          <div class="results q-mt-md">
            <div class="text-h6 text-weight-bold q-mb-sm safe-text">Resultados</div>
            <q-separator />
            <div class="q-mt-md safe-text result-text" v-html="resultado.replace(/\n/g, '<br>')"></div>
          </div>
        </q-card-section>

        <q-separator />

        <q-card-actions align="right">
          <q-btn flat label="Fechar" class="act act-primary" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { api } from 'src/boot/axios'
import { ref } from 'vue'

const dialog = ref(false)
const perguntasRespostas = ref([])
const resultado = ref('')
const formHandleName = ref('')

const formsRows = ref([
  { id: 1, title: 'Cronotipo', createdAt: '04/04/2025', respostas: 10 },
  { id: 2, title: 'Forma de Aprendizado', createdAt: '04/04/2025', respostas: 20 },
  { id: 3, title: 'Estilo de Aprendizado', createdAt: '04/04/2025', respostas: 50 }
])

const columns = ref([
  {
    name: 'title',
    label: 'Título',
    align: 'left',
    field: row => row.title,
    classes: 'sticky-col',
    headerClasses: 'sticky-col'
  },
  {
    name: 'createdAt',
    label: 'Criado em',
    align: 'left',
    field: row => row.createdAt
  },
  {
    name: 'respostas',
    label: 'Respostas',
    align: 'left',
    field: row => row.respostas
  },
  {
    name: 'actions',
    label: 'Ações',
    align: 'center',
    field: () => '',
    sortable: false
  }
])

async function getForm(formUrl) {
  try {
    const response = await api.post(formUrl)
    perguntasRespostas.value = response.data
    dialog.value = true
  } catch (error) {
    console.error(error)
  }
}

async function openForm(title) {
  formHandleName.value = title

  switch (title) {
    case 'Cronotipo':
      resultado.value =
        'De 16 a 30 pontos – <strong>Vespertino Típico</strong>\n' +
        'De 31 a 41 pontos – <strong>Moderadamente Vespertino</strong>\n' +
        'De 42 a 58 pontos – <strong>Intermediário</strong>\n' +
        'De 56 a 69 pontos – <strong>Moderadamente Matutino</strong>'
      await getForm('/form/cronotipo')
      break

    case 'Forma de Aprendizado':
      resultado.value =
        'Maioria A – <strong>Visual</strong>\n' +
        'Maioria B – <strong>Auditivo</strong>\n' +
        'Maioria C – <strong>Cinestésico</strong>'
      await getForm('/form/forma_aprendizado')
      break

    case 'Estilo de Aprendizado':
      resultado.value =
        '2 a 5 resposta A – <strong>Ativo</strong>\n' +
        '2 a 5 resposta B – <strong>Passivo</strong>\n' +
        '2 a 5 resposta C – <strong>Teórico</strong>\n' +
        '2 a 5 resposta D – <strong>Prático</strong>'
      await getForm('/form/estilo_aprendizado')
      break

    default:
      break
  }
}
</script>

<style scoped>
:global(html), :global(body), :global(#q-app) { overflow-x: clip; }
:global(.row > [class*="col-"]) { min-width: 0; }
.safe-text { overflow-wrap: anywhere; word-break: break-word; }

.page {
  background: transparent;
  color: #2a1d1d;
}

.page-title {
  color: #241717;
}

.crumbs {
  background: rgba(255,255,255,.88);
  border: 1px solid rgba(217,59,43,.08);
  padding: 10px 12px;
  border-radius: 14px;
}

.chip {
  color: #b13224;
  border-color: rgba(217,59,43,.20);
  background: rgba(255,107,87,.08);
}

.tbl {
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,.82);
  border: 1px solid rgba(217,59,43,.08);
  box-shadow: 0 14px 34px rgba(125,66,58,.06);
}

.tbl :deep(th) {
  color: #6f5653;
  background: rgba(255,248,246,.96);
  font-weight: 800;
}

.tbl :deep(td) {
  color: #2a1d1d;
}

.tbl :deep(.sticky-col) {
  position: sticky;
  left: 0;
  z-index: 2;
  background: rgba(255,250,249,.98);
}

.act {
  border-radius: 12px;
  background: rgba(255,255,255,.86);
  border: 1px solid rgba(217,59,43,.08);
}

.act-primary { color: #c43728; }
.icon-btn { color: #c43728; }

.dlg {
  max-width: 900px;
  margin: 0 auto;
  border-radius: 20px;
  overflow: hidden;
  background: #fffdfc;
  border: 1px solid rgba(217,59,43,.10);
}

.dlg-head {
  background: rgba(255,248,246,.96);
}

.dlg-title {
  color: #241717;
}

.dlg-body {
  max-height: 72vh;
}

.question-title {
  color: #2a1d1d;
}

.opt :deep(.q-radio__label) {
  color: #5f4947;
}

.results {
  border-radius: 14px;
  padding: 12px;
  background: rgba(255,248,246,.90);
  border: 1px solid rgba(217,59,43,.08);
}

.result-text {
  color: #5f4947;
}
</style>