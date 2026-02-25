<template>
  <q-page class="page q-pa-md column q-gutter-y-md full-height">
    <!-- Breadcrumb -->
    <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" label="Início" exact />
    </q-breadcrumbs>

    <!-- Header -->
    <div class="hero">
      <div class="row items-start justify-between q-col-gutter-md">
        <div class="col-12 col-md-8">
          <div class="text-h4 text-weight-bold safe-text">
            Painel do Admin
          </div>
          <div class="text-subtitle1 q-mt-xs text-grey-4 safe-text">
            Olá, <strong class="text-white">{{ userName }}</strong>. Aqui está um resumo rápido do dia.
          </div>
        </div>

        <div class="col-12 col-md-4">
          <q-card class="mini-card" flat bordered>
            <q-card-section class="row items-center justify-between">
              <div>
                <div class="text-caption text-grey-5">Status</div>
                <div class="text-subtitle2 text-weight-bold safe-text">
                  Sistema online
                </div>
              </div>
              <q-badge rounded class="badge-ok">OK</q-badge>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </div>

    <!-- KPI Cards -->
    <div class="row q-col-gutter-md">
      <div class="col-12 col-md-6">
        <q-card class="kpi-card kpi-purple" flat bordered>
          <q-card-section class="row items-center justify-between">
            <div>
              <div class="text-caption text-grey-4">Saldo Atual</div>
              <div class="kpi-value safe-text">R$ 2.850,00</div>
              <div class="text-caption text-grey-5 q-mt-xs">Atualizado agora</div>
            </div>
            <q-icon name="account_balance_wallet" size="34px" class="kpi-icon" />
          </q-card-section>
        </q-card>
      </div>

      <div class="col-12 col-md-6">
        <q-card class="kpi-card kpi-teal" flat bordered>
          <q-card-section class="row items-center justify-between">
            <div>
              <div class="text-caption text-grey-4">Lucro Total</div>
              <div class="kpi-value safe-text">R$ 63.021,94</div>
              <div class="text-caption text-grey-5 q-mt-xs">Acumulado</div>
            </div>
            <q-icon name="trending_up" size="34px" class="kpi-icon" />
          </q-card-section>
        </q-card>
      </div>
    </div>

    <!-- Quick Actions -->
    <q-card class="actions-card" flat bordered>
      <q-card-section class="row items-center justify-between">
        <div>
          <div class="text-subtitle1 text-weight-bold safe-text">Ações rápidas</div>
          <div class="text-caption text-grey-5 safe-text">Acesse as áreas principais em 1 clique.</div>
        </div>
        <q-icon name="bolt" size="22px" class="actions-ic" />
      </q-card-section>

      <q-separator dark />

      <q-card-section>
        <div class="row q-col-gutter-md">
          <div class="col-12 col-md-4">
            <q-btn
              class="action-btn btn-purple full-width"
              unelevated
              icon-right="list_alt"
              label="Formulários"
              to="/admin/forms"
            />
          </div>

          <div class="col-12 col-md-4">
            <q-btn
              class="action-btn btn-blue full-width"
              unelevated
              icon-right="group"
              label="Clientes"
              to="/admin/clientes"
            />
          </div>

          <div class="col-12 col-md-4">
            <q-btn
              class="action-btn btn-teal full-width"
              unelevated
              icon-right="paid"
              label="Painel de Vendas"
              to="/admin/vendas"
            />
          </div>
        </div>
      </q-card-section>
    </q-card>

    <!-- Bottom Info -->
    <q-card class="note-card" flat bordered>
      <q-card-section class="row items-center no-wrap">
        <q-icon name="info" size="20px" class="q-mr-sm note-ic" />
        <div class="text-caption text-grey-4 safe-text">
          Dica: você pode abrir o menu no canto superior direito para navegar rapidamente.
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const userName = ref('Flávia Kamila')
</script>

<style scoped>
/* anti overflow */
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

.hero{
  padding: 10px 2px 0;
}

.mini-card{
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
}

.badge-ok{
  background: rgba(34,197,94,.18);
  color: rgba(187,247,208,.98);
  border: 1px solid rgba(34,197,94,.25);
}

.kpi-card{
  border-radius: 18px;
  overflow: hidden;
  border: 1px solid rgba(255,255,255,.08);
}

.kpi-purple{
  background: radial-gradient(900px 500px at 0% 0%, rgba(124,58,237,.32), transparent 60%),
              rgba(255,255,255,.03);
}

.kpi-teal{
  background: radial-gradient(900px 500px at 100% 0%, rgba(20,184,166,.24), transparent 60%),
              rgba(255,255,255,.03);
}

.kpi-value{
  font-size: 1.9rem;
  font-weight: 900;
  letter-spacing: .3px;
  color: rgba(255,255,255,.96);
  margin-top: 2px;
}

.kpi-icon{
  color: rgba(255,255,255,.92);
  opacity: .9;
}

.actions-card{
  border-radius: 18px;
  overflow: hidden;
  background: rgba(255,255,255,.03);
  border: 1px solid rgba(255,255,255,.08);
}

.actions-ic{
  color: #c4b5fd;
  opacity: .95;
}

.action-btn{
  border-radius: 16px;
  padding: 14px 14px;
  font-weight: 900;
  text-transform: none;
  letter-spacing: .2px;
  border: 1px solid rgba(255,255,255,.10);
}

.btn-purple{
  background: linear-gradient(90deg, rgba(124,58,237,.65), rgba(124,58,237,.25));
  color: rgba(255,255,255,.95);
}

.btn-blue{
  background: linear-gradient(90deg, rgba(59,130,246,.55), rgba(59,130,246,.22));
  color: rgba(255,255,255,.95);
}

.btn-teal{
  background: linear-gradient(90deg, rgba(20,184,166,.55), rgba(20,184,166,.22));
  color: rgba(255,255,255,.95);
}

.note-card{
  border-radius: 16px;
  overflow: hidden;
  background: rgba(255,255,255,.02);
  border: 1px solid rgba(255,255,255,.08);
}

.note-ic{
  color: #99f6e4;
}
</style>    