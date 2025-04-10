<template>
    <q-page class="q-pa-md">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" to="/admin" />
            <q-breadcrumbs-el icon="sell" label="Gerenciar Tags" exact />
        </q-breadcrumbs>
        <q-card class="q-pa-md q-mx-auto q-mt-lg" style="max-width: 600px; width: 100%;">
            <q-card-section>
                <div class="text-h5">
                    <div class="row ">
                        Gerenciar Tags
                    </div>
                    <q-btn class="q-mt-lg full-width" glossy color="accent" icon="add" label="Nova Tag"
                        @click="showDialog = true" />
                </div>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="row q-col-gutter-md q-gutter-y-md">
                    <div v-for="(tag, index) in tags" :key="index">
                        <q-card class="bg-grey-2 row items-center q-pa-xs justify-between q-ma-xs">
                            <q-btn flat dense icon="delete" color="grey" @click="removeTag(index)" />
                            <div class="row items-center">
                                <span class="text-subtitle1">{{ tag.label }}</span>
                                <div class="tag-dot q-ml-sm" :style="{ backgroundColor: tag.color }"></div>
                            </div>
                        </q-card>
                    </div>
                </div>

            </q-card-section>
        </q-card>

        <!-- Dialog de Nova Tag -->
        <q-dialog v-model="showDialog">
            <q-card style="min-width: 300px;">
                <q-card-section>
                    <div class="text-h6">Nova Tag</div>
                </q-card-section>

                <q-card-section>
                    <q-input v-model="newTag.label" label="Título da Tag" outlined class="q-mb-md" />
                    <q-color v-model="newTag.color" format-model="hex" :default-view="'palette'" />
                </q-card-section>

                <q-card-actions align="right">
                    <q-btn flat label="Cancelar" color="primary" v-close-popup />
                    <q-btn flat label="Salvar" color="primary" @click="createTag"
                        :disable="!newTag.label || !newTag.color" />
                </q-card-actions>
            </q-card>
        </q-dialog>
    </q-page>
</template>

<script setup>
import { ref } from 'vue'

const showDialog = ref(false)

const tags = ref([
    { label: 'Ativo', color: '#3F8BED' },
    { label: 'Visual', color: '#919EE9' },
    { label: 'Leitor', color: '#83CDE7' },
    { label: 'Editor', color: '#A2D6B4' },
    { label: 'Revisor', color: '#F9C7C7' },
])

const newTag = ref({
    label: '',
    color: '#000000',
})

function createTag() {
    tags.value.push({ ...newTag.value })
    newTag.value = { label: '', color: '#000000' }
    showDialog.value = false
}

function removeTag(index) {
    tags.value.splice(index, 1)
}
</script>

<style scoped>
.q-page {
    background: #f5f6fa;
}

.tag-dot {
    width: 16px;
    height: 16px;
    border-radius: 50%;
}
</style>