<template>
  <q-page class="page q-pa-md">
    <q-breadcrumbs class="crumbs q-mb-md" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
      <q-breadcrumbs-el icon="paid" label="Vendas" exact />
    </q-breadcrumbs>

    <q-card class="card hero" flat bordered>
      <q-card-section>
        <div class="row items-center justify-between">
          <div>
            <div class="text-overline text-grey-4">Resumo</div>
            <div class="text-h5 text-weight-bold safe-text">Vendas Totais do Dia</div>
            <div class="text-caption text-grey-4 q-mt-xs safe-text">
              Este é o valor total arrecadado com as vendas de hoje.
            </div>
          </div>

          <q-icon name="insights" size="34px" class="ic" />
        </div>

        <div class="value q-mt-md">
          R$ {{ vendas.valor.toFixed(2) }}
        </div>
      </q-card-section>
    </q-card>

    <q-card class="card q-mt-lg" flat bordered>
      <q-card-section class="row items-center justify-between">
        <div class="text-h6 text-weight-bold safe-text">Últimas Vendas</div>
        <q-chip outline class="chip">{{ ultimasVendas.length }} itens</q-chip>
      </q-card-section>

      <q-separator dark />

      <q-list separator class="list">
        <q-item v-for="(venda, index) in ultimasVendas" :key="index" class="list-item">
          <q-item-section>
            <q-item-label class="safe-text">{{ venda.cliente }}</q-item-label>
            <q-item-label caption class="text-grey-5">{{ venda.data }}</q-item-label>
          </q-item-section>

          <q-item-section side>
            <q-item-label class="text-weight-bold money">
              R$ {{ venda.valor.toFixed(2) }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-card>
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

.card{
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
}

.hero{
  background: radial-gradient(900px 500px at 0% 0%, rgba(124,58,237,.30), transparent 55%),
              radial-gradient(900px 500px at 100% 30%, rgba(20,184,166,.20), transparent 55%),
              rgba(255,255,255,.03);
}

.ic{
  color: #c4b5fd;
  opacity: .95;
}

.value{
  font-size: 2rem;
  font-weight: 900;
  letter-spacing: .3px;
  color: #99f6e4;
}

.chip{
  color: rgba(255,255,255,.90);
  border-color: rgba(124,58,237,.35);
  background: rgba(124,58,237,.10);
}

.list{
  background: transparent;
}

.list-item{
  background: rgba(255,255,255,.02);
}

.money{
  color: #99f6e4;
}
</style>