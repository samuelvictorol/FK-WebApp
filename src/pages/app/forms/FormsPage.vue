<template>
    <q-page class="q-pa-md page">
        <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" class="text-deep-purple-10" label="Início" to="/app" />
            <q-breadcrumbs-el icon="list_alt" label="Formulários" exact />
        </q-breadcrumbs>

        <div class="head">
            <div class="text-h4 text-weight-bold safe-text text-grey-3">Formulários</div>
        </div>

        <div class="grid">
            <q-card v-for="form in forms" :key="form.id" class="form-card cursor-pointer relative" bordered clickable v-ripple
                @click="router.push(form.to)">
                <div class="img-wrap">
                    <div class="row no-wrap w100 items-center justify-center q-pa-sm bg-dark">
                        <q-icon name="verified" size="16px" class="q-mr-xs" :color="form.isFree ? 'green-14' : 'amber-10'" />
                        <div :class="['text-xs', form.isFree ? 'text-green-14' : 'text-amber-10', 'font-bold']" class="text-bold">
                            {{ form.isFree ? 'Gratuito' : 'Premium' }}</div>
                    </div>
                    <img :src="form.img_url" alt="imagem" class="img" />
                    <div class="img-overlay"></div>
                    <div class="badge">
                        <q-icon name="chat_bubble" size="16px" class="q-mr-xs" />
                        Chat
                    </div>
                </div>

                <q-card-section class=" q-pb-xl q-mb-md">
                    <div class="text-h6 text-weight-bold safe-text">{{ form.name }}</div>
                    <div class="text-body2 text-purple-14 text-bold q-mt-xs safe-text">{{ form.description }}</div>
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
import { is } from 'quasar';
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

.crumbs {
    background: rgba(255, 255, 255, .92);
    border: 1px solid rgba(15, 23, 42, .08);
    padding: 10px 12px;
    border-radius: 14px;
}

.head {
    margin-top: 14px;
    margin-bottom: 14px;
}

.grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
}

.form-card {
    border-radius: 18px;
    overflow: hidden;
    background: rgba(255, 255, 255, .92);
    border: 1px solid rgba(15, 23, 42, .08);
    transition: transform .18s ease, box-shadow .18s ease;
}

.form-card:hover {
    transform: translateY(-3px);
}

.img-wrap {
    position: relative;
    height: 180px;
    overflow: hidden;
}

.img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
}

.img-overlay {
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, .0), rgba(0, 0, 0, .55));
}

.badge {
    position: absolute;
    left: 12px;
    bottom: 12px;
    display: inline-flex;
    align-items: center;
    padding: 8px 10px;
    border-radius: 999px;
    background: rgba(16, 16, 22, .78);
    border: 1px solid rgba(255, 255, 255, .18);
    color: #fff;
    font-weight: 900;
    font-size: .85rem;
    backdrop-filter: blur(8px);
}

.chip {
    background: rgba(124, 58, 237, .10);
    border: 1px solid rgba(124, 58, 237, .18);
    font-weight: 800;
}

.go {
    font-weight: 900;
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
        height: 160px;
    }
}
</style>