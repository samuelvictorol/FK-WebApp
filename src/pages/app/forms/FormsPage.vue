<template>
    <q-page class="q-pa-md q-gutter-y-md animate__animated animate__fadeIn column items-stretch full-height">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" to="/app" />
            <q-breadcrumbs-el icon="home" label="Formulários" exact />
        </q-breadcrumbs>

        <div class="text-h4" style="overflow:hidden">Formulários</div>
        <div>
            <q-separator class="q-mb-md" color="grey-4" />
            <div class="w100 row q-gutter-md justify-center items-start">
                <q-card v-for="form in forms" :key="form.id" class="hoverable-card w45  q-mb-md" @click="router.push(form.to)" style="cursor: pointer; border-bottom: 4px solid #4F89D0;">
                    <q-card-section class="q-pa-sm flex flex-center column items-center">
                        <div class="text-h6 text-center q-my-sm text-blue text-bold">{{ form.name }}</div>
                        <img :src="form.img_url" alt="imagem" width="100%" height="100%" class="rounded-borders" style="object-fit: cover; border-radius: 10px;" />
                        <div class="text-subtitle2 text-center q-mb-xs q-px-sm q-mt-sm">{{ form.description }}</div>
                    </q-card-section>
                </q-card>
            </div>
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
        img_url: 'https://images.unsplash.com/photo-1490724500206-cd5482e02b9e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 2,
        name: 'Forma de Aprendizado',
        description: 'Com este formulário, você poderá descobrir sua forma de aprendizado ideal e otimizar os pontos que são eficazes para seu perfil.',
        icon: 'feedback',
        color: 'secondary',
        to: '/app/form/forma-aprendizado',
        img_url: 'https://images.unsplash.com/photo-1686516922889-e807f392b373?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    },
    {
        id: 3,
        name: 'Estilo de Aprendizado',
        description: 'Aqui você poderá identificar o estilo de aprendizado mais adequado e como isso pode influenciar na absorção de conteúdos.',
        icon: 'contact_mail',
        color: 'accent',
        to: '/app/form/estilo-aprendizado',
        img_url: 'https://plus.unsplash.com/premium_photo-1661761077411-d50cba031848?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
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
    transform: scale(1.03);
}

@media (max-width: 800px) {
    .q-card {
        width: 90vw;
    }
}

</style>