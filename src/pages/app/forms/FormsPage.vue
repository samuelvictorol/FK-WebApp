<template>
  <q-page class="q-pa-md q-pb-xl q-mb-xl page">
    <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
      <q-breadcrumbs-el icon="home" class="crumb-link" label="Início" to="/app" />
      <q-breadcrumbs-el icon="list_alt" label="Formulários" exact />
    </q-breadcrumbs>

    <div class="head">
      <div class="text-h4 text-weight-bold safe-text page-title">Formulários</div>
      <div class="page-subtitle">
        Escolha o formulário ideal para descobrir mais sobre seu ritmo e sua forma de aprender.
      </div>
    </div>

    <div class="grid">
      <q-card
        v-for="form in forms"
        :key="form.id"
        class="form-card cursor-pointer relative"
        bordered
        clickable
        v-ripple
        @click="router.push(form.to)"
      >
        <div class="img-wrap">
          <div class="top-status row no-wrap w100 items-center justify-center q-pa-sm bg-dark">
            <q-icon
              name="verified"
              size="16px"
              class="q-mr-xs"
              :color="form.isFree ? 'green-7' : 'orange-8'"
            />
            <div
              :class="[
                'text-xs',
                form.isFree ? 'text-green-7' : 'text-orange-8',
                'text-bold'
              ]"
            >
              {{ form.isFree ? 'Gratuito' : 'Premium' }}
            </div>
          </div>

          <img :src="form.img_url" alt="imagem" class="img" />
          <div class="img-overlay"></div>

          <div class="badge">
            <q-icon name="chat_bubble" size="16px" class="q-mr-xs" />
            Chat
          </div>
        </div>

        <q-card-section class="q-pb-xl q-mb-md">
          <div class="text-h6 text-weight-bold safe-text card-title">
            {{ form.name }}
          </div>

          <div
            class="text-body2 text-bold q-mt-xs safe-text"
            :class="form.isFree ? 'text-green-7' : 'text-orange-8'"
          >
            {{ form.description }}
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none absolute-bottom">
          <div class="w100 row no-wrap items-center justify-between">
            <q-chip dense class="chip">
              <q-icon name="schedule" size="16px" class="q-mr-xs" />
              {{ form.tempo }}
            </q-chip>

            <q-btn flat class="go" label="Iniciar" icon-right="arrow_forward" />
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const forms = ref([
  {
    id: 1,
    name: 'Cronotipo',
    description: 'Descubra seu padrão de energia ao longo do dia e como estudar no seu melhor horário.',
    to: '/app/form/cronotipo',
    img_url: '/cron.avif',
    tempo: '5-10 min',
    isFree: true
  },
  {
    id: 2,
    name: 'Forma de Aprendizado',
    description: 'Entenda sua forma predominante (visual/auditiva/cinestésica) e otimize seus estudos.',
    to: '/app/form/forma-aprendizado',
    img_url: '/forma.avif',
    tempo: '10-15 min',
    isFree: false
  },
  {
    id: 3,
    name: 'Estilo de Aprendizado',
    description: 'Identifique seu estilo ideal e como isso influencia sua absorção e retenção de conteúdo.',
    to: '/app/form/estilo-aprendizado',
    img_url: '/est.avif',
    tempo: '3-7 min',
    isFree: false
  }
])
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
  max-width: 1200px;
  margin: 0 auto;
}

.safe-text {
  overflow-wrap: anywhere;
  word-break: break-word;
}

.page-title {
  color: #241717;
}

.page-subtitle {
  color: #755c58;
  margin-top: 6px;
  font-size: 0.98rem;
}

.crumbs {
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(217, 59, 43, 0.08);
  padding: 10px 12px;
  border-radius: 14px;
  box-shadow: 0 12px 28px rgba(125, 66, 58, 0.05);
}

.crumb-link {
  color: #c43728;
}

.head {
  margin-top: 14px;
  margin-bottom: 18px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.form-card {
  border-radius: 22px;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.94);
  border: 1px solid rgba(217, 59, 43, 0.08);
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  box-shadow: 0 18px 44px rgba(125, 66, 58, 0.07);
}

.form-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 24px 56px rgba(125, 66, 58, 0.11);
}

.img-wrap {
  position: relative;
  height: 190px;
  overflow: hidden;
}

.top-status {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 3;
  background: rgba(255, 250, 249, 0.92);
  border-bottom: 1px solid rgba(217, 59, 43, 0.08);
  backdrop-filter: blur(8px);
}

.img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transform: scale(1.01);
}

.img-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(0, 0, 0, 0), rgba(45, 15, 12, 0.52));
}

.badge {
  position: absolute;
  left: 12px;
  bottom: 12px;
  display: inline-flex;
  align-items: center;
  padding: 8px 10px;
  border-radius: 999px;
  background: rgba(255, 251, 250, 0.88);
  border: 1px solid rgba(217, 59, 43, 0.10);
  color: #b13224;
  font-weight: 900;
  font-size: 0.85rem;
  backdrop-filter: blur(10px);
}

.card-title {
  color: #281919;
}

.chip {
  background: rgba(255, 107, 87, 0.10);
  border: 1px solid rgba(217, 59, 43, 0.12);
  color: #aa3325;
  font-weight: 800;
}

.go {
  font-weight: 900;
  color: #c43728;
}

@media (max-width: 1023px) {
  .grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 600px) {
  .grid {
    grid-template-columns: 1fr;
  }

  .img-wrap {
    height: 168px;
  }
}
</style>