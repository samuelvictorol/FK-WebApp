<template>
    <q-page class="q-pa-md q-gutter-y-md animate__animated animate__fadeIn column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" class="text-purple-14" label="Início" to="/app" />
            <q-breadcrumbs-el icon="home" label="Formulários" exact />
        </q-breadcrumbs>

        <div class="text-h4" style="overflow:hidden">Formulários</div>
        <div class="w100 row justify-center items-start">
            <q-card v-for="form in forms" :key="form.id" class="hoverable-card q-mb-md"
                @click="router.push(form.to)" style="cursor: pointer; border-bottom: 4px solid purple;">
                <q-card-section class="q-pa-sm flex flex-center column items-center">
                    <div class="text-h6 text-center q-my-sm text-purple text-bold">{{ form.name }}</div>
                    <img :src="form.img_url" alt="imagem" width="100%" height="100%" class="rounded-borders"
                        style="object-fit: cover; border-radius: 20px;" />
                    <div class="text-subtitle2 text-center q-mb-xs q-px-xs q-mt-md">{{ form.description }}</div>
                </q-card-section>
            </q-card>
        </div>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const forms = ref([
    {
        id: 1,
        name: 'Cronótipo',
        description: 'Neste formulário você poderá descobrir seu cronótipo e como isso pode afetar sua produtividade.',
        icon: 'person_add',
        color: 'primary',
        to: '/app/form/cronotipo',
        img_url: '/cron.avif',
    },
    {
        id: 2,
        name: 'Forma de Aprendizado',
        description: 'Com este formulário, você poderá descobrir sua forma de aprendizado ideal e otimizar os pontos que são eficazes para seu perfil.',
        icon: 'feedback',
        color: 'secondary',
        to: '/app/form/forma-aprendizado',
        img_url: '/forma.avif',
    },
    {
        id: 3,
        name: 'Estilo de Aprendizado',
        description: 'Aqui você poderá identificar o estilo de aprendizado mais adequado e como isso pode influenciar na absorção de conteúdos.',
        icon: 'contact_mail',
        color: 'accent',
        to: '/app/form/estilo-aprendizado',
        img_url: '/est.avif',
    },
]);

</script>

<style scoped>
.hoverable-card {
    transition: transform 0.2s;
    min-height: 150px;
    /* altura mínima para mobile */
}

.hoverable-card:hover {
    transform: scale(1.01);
}

.q-card {
    width: 300px;
    max-width: 100%;
    margin: 10px;
    cursor: pointer;
}

@media (max-width: 800px) {
    .q-card {
        width: 100%
    }
}
</style>