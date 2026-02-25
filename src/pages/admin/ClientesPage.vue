<template>
  <q-page class="page q-pa-md column q-gutter-y-md full-height">
    <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
      <q-breadcrumbs-el icon="group" label="Clientes" exact />
    </q-breadcrumbs>

    <div class="row justify-between items-center">
      <div class="text-h6 text-weight-bold safe-text">Clientes</div>
      <q-chip outline class="chip">
        {{ clientesRows.length }} registros
      </q-chip>
    </div>

    <div class="table-container">
      <q-table
        :rows="clientesRows"
        :columns="columns"
        row-key="name"
        class="tbl"
        :pagination="{ rowsPerPage: 10 }"
        flat
        bordered
        wrap-cells
        dark
      >
        <template v-slot:body-cell-actions="props">
          <q-td :props="props">
            <q-btn dense flat icon="account_circle" class="act act-primary" @click="visualizarCliente(props.row)">
              <q-tooltip>Visualizar Cliente</q-tooltip>
            </q-btn>
            <q-btn dense flat icon="paid" class="act act-money" @click="visualizarCliente(props.row)">
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
    classes: 'sticky-col',
    headerClasses: 'sticky-col'
  },
  {
    name: 'perfil',
    label: 'Perfil',
    field: row => row.perfil,
    align: 'left'
  },
  {
    name: 'planoAtual',
    label: 'Plano',
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

function visualizarCliente (cliente) {
  console.log('Visualizar cliente:', cliente)
}
</script>

<style scoped>
:global(html), :global(body), :global(#q-app) { overflow-x: clip; }
:global(.row > [class*="col-"]) { min-width: 0; }
.safe-text { overflow-wrap: anywhere; word-break: break-word; }

.page{
  background: transparent;
  color: rgba(255,255,255,.92);
}

.crumbs{
  background: rgba(255,255,255,.04);
  border: 1px solid rgba(255,255,255,.08);
  padding: 10px 12px;
  border-radius: 14px;
}

.chip{
  color: rgba(255,255,255,.90);
  border-color: rgba(124,58,237,.35);
  background: rgba(124,58,237,.10);
}

.table-container{
  overflow-x: auto;
  max-width: 100%;
}

.tbl{
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
}

.tbl :deep(.q-table__top),
.tbl :deep(.q-table__bottom){
  background: rgba(255,255,255,.02);
}

.tbl :deep(th){
  color: rgba(255,255,255,.86);
  background: rgba(255,255,255,.02);
}

.tbl :deep(td){
  color: rgba(255,255,255,.86);
}

.tbl :deep(.q-table__grid-item){
  background: rgba(255,255,255,.03);
}

/* sticky primeira coluna */
.tbl :deep(.sticky-col){
  position: sticky;
  left: 0;
  z-index: 2;
  background: rgba(12,12,18,.96);
}

/* botões */
.act{
  border-radius: 12px;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
  margin-right: 6px;
}

.act-primary{ color: #c4b5fd; }
.act-money{ color: #99f6e4; }
</style>