<template>
  <q-page class="q-pa-md page">
    <!-- Breadcrumb -->
    <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" label="Início" exact />
    </q-breadcrumbs>

    <!-- Header -->
    <div class="top row items-start justify-between q-mt-sm">
      <div>
        <div class="text-h4 text-weight-bold safe-text text-grey-3 q-py-md">Início</div>
      </div>
    </div>

    <!-- Hero: Curso -->
    <q-card class="hero" bordered>
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>

      <q-card-section class="hero-content">
        <div class="text-h5 text-weight-bold safe-text hero-title">
          🎯 Conheça o curso que transforma sua preparação para concursos!
        </div>

        <div class="text-body2 text-grey-2 q-mt-xs safe-text hero-sub">
          Um caminho mais claro, com método e constância. Se você quer estudar com estratégia, esse é o próximo passo.
        </div>

        <div class="row q-col-gutter-sm q-mt-md">
          <div class="col-12 col-sm-auto">
            <q-btn label="curso completo" icon-right="arrow_forward" class="btn-cta full-width text-grey-3" unelevated
              @click="irParaCurso" />
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn label="Acesso Premium" icon-right="verified" class="btn-cta-green full-width text-grey-3" unelevated
              @click="togglePaymentDialog" />
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn label="Descubra seu estilo" icon="list_alt" class="btn-ghost full-width" unelevated to="/app/forms" />
          </div>
        </div>
        <!-- Ações principais -->
        <div class="grid q-mt-lg text-dark">
          <q-card class="action-card" bordered clickable v-ripple @click="router.push('/app/forms')">
            <q-card-section class="row items-start justify-between">
              <div>
                <div class="text-h6 text-weight-bold safe-text">Formulários</div>
                <div class="text-body2 text-purple-14 text-bold safe-text">
                  Cronotipo, forma e estilo — responda no modo chat e gere seu relatório.
                </div>
              </div>
              <div class="icon-pill absolute-top-right">
                <q-icon name="list_alt" size="22px" />
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              <q-btn flat class="go" label="Começar" icon-right="arrow_forward" to="/app/forms" />
            </q-card-section>
          </q-card>

          <q-card class="action-card muted" bordered clickable v-ripple @click="router.push('/app/perfil')">
            <q-card-section class="row items-start justify-between">
              <div>
                <div class="text-h6 text-weight-bold safe-text">Meu perfil</div>
                <div class="text-body2 text-purple-14 text-bold safe-text q-pb-xl">
                  Veja seu progresso, histórico e dados do seu diagnóstico.
                </div>
              </div>
              <div class="icon-pill absolute-top-right">
                <q-icon name="account_circle" size="22px" />
              </div>
            </q-card-section>

            <q-card-section class="q-pt-none absolute-bottom">
              <q-btn flat class="go" label="Abrir" icon-right="arrow_forward" to="/app/perfil" />
            </q-card-section>
          </q-card>
        </div>
        <div class="row q-col-gutter-sm q-mt-lg">
          <div class="col-12 col-sm-4">
            <q-card flat class="mini">
              <q-card-section class="row items-center no-wrap">
                <q-icon name="chat_bubble" size="20px" class="q-mr-sm" />
                <div>
                  <div class="mini-title">Modo chat</div>
                  <div class="mini-sub">rápido e leve</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-sm-4">
            <q-card flat class="mini">
              <q-card-section class="row items-center no-wrap">
                <q-icon name="description" size="20px" class="q-mr-sm" />
                <div>
                  <div class="mini-title">Relatório</div>
                  <div class="mini-sub">personalizado</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
          <div class="col-12 col-sm-4">
            <q-card flat class="mini">
              <q-card-section class="row items-center no-wrap">
                <q-icon name="schedule" size="20px" class="q-mr-sm" />
                <div>
                  <div class="mini-title">Aplicável</div>
                  <div class="mini-sub">na sua rotina</div>
                </div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </q-card-section>
    </q-card>
    <q-dialog v-model="dialog" maximized persistent>
      <payment-component @close="dialog = false" />
    </q-dialog>
  </q-page>
</template>

<script setup>
import PaymentComponent from 'src/components/PaymentComponent.vue';
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const dialog = ref(false)
const router = useRouter()

function irParaCurso() {
  // coloque aqui sua URL (quando tiver)
  window.open('https://exemplo.com', '_blank')
}

function togglePaymentDialog() {
  dialog.value = !dialog.value
}

</script>

<style scoped>
:global(html),
:global(body),
:global(#q-app) {
  overflow-x: clip;
}

:global(.row > [class*="col-"]) {
  min-width: 0;
}

.page {
  max-width: 1100px;
  margin: 0 auto;
}

.safe-text {
  overflow-wrap: anywhere;
  word-break: break-word;
}

.crumbs {
  background: rgba(255, 255, 255, .92);
  border: 1px solid rgba(15, 23, 42, .08);
  padding: 10px 12px;
  border-radius: 14px;
}

.top {
  gap: 12px;
}

.plan-chip {
  background: linear-gradient(90deg, rgba(124, 58, 237, .14), rgba(20, 184, 166, .10));
  border: 1px solid rgba(15, 23, 42, .10);
  font-weight: 900;
}

/* HERO */
.hero {
  position: relative;
  overflow: hidden;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, .08);
  background: rgba(16, 16, 22, .86);
  color: #fff;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(900px 420px at 20% 25%, rgba(124, 58, 237, .32), transparent 60%),
    radial-gradient(800px 400px at 80% 40%, rgba(110, 20, 184, 0.2), transparent 55%);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(8, 8, 12, .35), rgba(8, 8, 12, .75));
}

.hero-content {
  position: relative;
  z-index: 2;
}

.kicker {
  display: inline-block;
  font-weight: 900;
  letter-spacing: .16em;
  text-transform: uppercase;
  font-size: .78rem;
  opacity: .9;
  margin-bottom: 10px;
}

.hero-title {
  line-height: 1.12;
}

.hero-sub {
  max-width: 70ch;
  opacity: .92;
}

.btn-cta {
  background: linear-gradient(90deg, #7c3aed, #9c68f7);
  color: #0b0b10;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 18px;
}

.btn-ghost {
  background: rgba(255, 255, 255, .10);
  border: 1px solid rgba(255, 255, 255, .16);
  color: #fff;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 18px;
}

.mini {
  background: rgba(255, 255, 255, .08);
  border: 1px solid rgba(255, 255, 255, .12);
  border-radius: 16px;
}

.mini-title {
  font-weight: 900;
}

.mini-sub {
  font-size: .83rem;
  opacity: .9;
}

/* Actions grid */
.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.action-card {
  border-radius: 18px;
  background: rgba(255, 255, 255, .92);
  border: 1px solid rgba(15, 23, 42, .08);
  transition: transform .18s ease, box-shadow .18s ease;
  cursor: pointer;
}

.action-card:hover {
  transform: translateY(-3px);
}

.action-card.muted {
  background: rgba(255, 255, 255, .88);
}

.icon-pill {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, rgba(124, 58, 237, .14), rgba(151, 20, 184, 0.1));
  border: 1px solid rgba(15, 23, 42, .08);
}

.go {
  font-weight: 900;
}

.btn-cta-green {
  background: linear-gradient(90deg, rgba(41, 202, 1, 0.856), rgba(0, 168, 112, 0.836));
  color: #0b0b10;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 18px;
}

@media (max-width: 700px) {
  .grid {
    grid-template-columns: 1fr;
  }
}
</style>