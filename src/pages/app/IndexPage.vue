<template>
  <q-page class="q-pa-md page">
    <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" label="Início" exact />
    </q-breadcrumbs>

    <div class="top row items-start justify-between q-mt-sm">
      <div>
        <div class="text-h4 text-weight-bold safe-text page-title q-py-md">Início</div>
      </div>
    </div>

    <q-card class="hero" bordered>
      <div class="hero-bg"></div>
      <div class="hero-overlay"></div>

      <q-card-section class="hero-content">
        <div class="grid text-dark">
          <q-card class="action-card" bordered clickable v-ripple @click="router.push('/app/forms')">
            <q-card-section class="row items-start justify-between">
              <div>
                <div class="text-h6 text-weight-bold safe-text">Formulários</div>
                <div class="text-body2 card-subtext safe-text">
                  Cronotipo, Forma e Estilo — Descubra a forma ideal para você.
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
                <div class="text-body2 card-subtext safe-text q-pb-xl">
                  Veja os dados do seu perfil.
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

        <div class="text-body2 hero-sub q-mt-lg safe-text">
          Um caminho mais claro, com método e constância. Se você quer estudar com estratégia, esse é o próximo passo.
        </div>

        <div class="row q-col-gutter-sm q-mt-md">
          <div class="col-12 col-sm-auto">
            <q-btn
              label="PDF Grátis"
              icon-right="arrow_forward"
              class="btn-cta full-width text-white"
              unelevated
              @click="irParaCurso"
            />
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn
              label="Acesso Premium"
              icon-right="verified"
              class="btn-cta-green full-width text-white"
              unelevated
              @click="togglePaymentDialog"
            />
          </div>
          <div class="col-12 col-sm-auto">
            <q-btn
              label="Descubra seu estilo"
              icon="list_alt"
              class="btn-ghost full-width"
              unelevated
              to="/app/forms"
            />
          </div>
        </div>

        <div class="row q-col-gutter-sm q-mt-lg">
          <div class="col-12 col-sm-4">
            <q-card flat class="mini">
              <q-card-section class="row items-center no-wrap">
                <q-icon name="chat_bubble" size="20px" class="q-mr-sm mini-icon" />
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
                <q-icon name="description" size="20px" class="q-mr-sm mini-icon" />
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
                <q-icon name="schedule" size="20px" class="q-mr-sm mini-icon" />
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
import PaymentComponent from 'src/components/PaymentComponent.vue'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const dialog = ref(false)
const router = useRouter()

function irParaCurso() {
  window.open('https://flaviakamila.com.br', '_blank')
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

.page-title {
  color: #2b1d1d;
}

.crumbs {
  background: rgba(255, 255, 255, 0.92);
  border: 1px solid rgba(217, 59, 43, 0.08);
  padding: 10px 12px;
  border-radius: 14px;
  color: #7a5e5a;
}

.top {
  gap: 12px;
}

.hero {
  position: relative;
  overflow: hidden;
  border-radius: 22px;
  border: 1px solid rgba(217, 59, 43, 0.08);
  background: linear-gradient(180deg, #fffefe 0%, #fff7f5 100%);
  color: #2a1e1e;
  box-shadow: 0 24px 54px rgba(126, 73, 65, 0.10);
}

.hero-bg {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(900px 420px at 20% 25%, rgba(255, 107, 87, 0.14), transparent 60%),
    radial-gradient(800px 400px at 80% 40%, rgba(217, 59, 43, 0.10), transparent 55%);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.10), rgba(255, 255, 255, 0.35));
}

.hero-content {
  position: relative;
  z-index: 2;
}

.hero-sub {
  max-width: 70ch;
  color: #6f5653;
  line-height: 1.6;
}

.btn-cta {
  background: linear-gradient(135deg, #d93b2b, #ff6b57);
  color: #fff;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 18px;
}

.btn-ghost {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(217, 59, 43, 0.10);
  color: #b13224;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 18px;
}

.mini {
  background: rgba(255, 255, 255, 0.86);
  border: 1px solid rgba(217, 59, 43, 0.08);
  border-radius: 16px;
}

.mini-icon {
  color: #d24d3c;
}

.mini-title {
  font-weight: 900;
  color: #2b1d1d;
}

.mini-sub {
  font-size: 0.83rem;
  color: #7a5e5a;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 14px;
}

.action-card {
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(217, 59, 43, 0.08);
  transition: transform 0.18s ease, box-shadow 0.18s ease;
  cursor: pointer;
  box-shadow: 0 14px 34px rgba(126, 73, 65, 0.08);
}

.action-card:hover {
  transform: translateY(-3px);
}

.action-card.muted {
  background: rgba(255, 255, 255, 0.90);
}

.card-subtext {
  color: #b13224;
  font-weight: 700;
}

.icon-pill {
  width: 42px;
  height: 42px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, rgba(255, 107, 87, 0.14), rgba(217, 59, 43, 0.08));
  border: 1px solid rgba(217, 59, 43, 0.08);
  color: #d24d3c;
}

.go {
  font-weight: 900;
  color: #b13224;
}

.btn-cta-green {
  background: linear-gradient(90deg, rgba(41, 202, 1, 0.90), rgba(0, 168, 112, 0.90));
  color: #fff;
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