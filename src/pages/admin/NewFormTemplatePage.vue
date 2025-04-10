<template>
    <q-page class="q-pa-md">
        <!-- Breadcrumb -->
        <q-breadcrumbs class="text-grey-8 rounded-borders" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" to="/admin"  />
            <q-breadcrumbs-el icon="list_alt" label="Formulários" to="/admin/forms"  />
            <q-breadcrumbs-el icon="post_add" label="Criar Formulário" exact/>
        </q-breadcrumbs>
        <q-card class="q-pa-md q-mx-auto q-mt-lg" style="max-width: 700px; width: 100%;">
            <q-card-section>
                <div class="text-h5">Criar Formulário</div>
            </q-card-section>

            <q-card-section>
                <q-input color="accent" v-model="formTemplate.title" label="Título do Formulário" outlined>
                    <template v-slot:append>
                        <q-icon name="title" class="q-mr-xs" color="primary" />
                    </template>
                </q-input>
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="text-subtitle1 q-mb-sm">Nova Pergunta</div>
                <q-input color="accent" v-model="questionHandler.question" label="Pergunta" outlined class="q-mb-sm">
                    <template v-slot:append>
                        <q-icon name="help" class="q-mr-xs" color="primary" />
                    </template>
                </q-input>

                <!-- aqui usamos grid responsivo -->
                <div class="row items-start q-col-gutter-sm q-gutter-y-sm animate__animated animate__fadeIn"
                    v-if="questionHandler.question">
                    <!-- opção -->
                    <div class="col-12 col-sm-5">
                        <q-input color="accent" v-model="optionHandler.option" label="Opção" outlined>
                            <template v-slot:append>
                                <q-icon name="question_answer" class="q-mr-xs" color="primary" />
                            </template>
                        </q-input>
                    </div>

                    <!-- tag -->
                    <div class="col-12 col-sm-5">
                        <q-select v-model="optionHandler.tag" :options="tagsOptions" label="Tag" emit-value map-options
                            outlined option-label="label" option-value="label">
                            <template v-slot:append>
                                <q-icon name="label" class="q-mr-xs" color="primary" />
                            </template>

                            <template v-slot:option="scope">
                                <q-item v-bind="scope.itemProps">
                                    <q-item-section side class="row items-center">
                                        <div class="tag-dot" :style="{ backgroundColor: scope.opt.color }"></div>
                                    </q-item-section>
                                    <q-item-section>
                                        {{ scope.opt.label }}
                                    </q-item-section>
                                </q-item>
                            </template>

                            <template v-slot:selected-item="scope">
                                <q-item-section side class="row items-center">
                                    <div class="tag-dot" :style="{ backgroundColor: scope.opt.color }"></div>
                                </q-item-section>
                                <q-item-section>
                                    {{ scope.opt.label }}
                                </q-item-section>
                            </template>
                        </q-select>
                    </div>

                    <!-- botão adicionar opção -->
                    <div class="col-12 col-sm-2">
                        <q-btn class="w100" color="accent" icon="add" glossy @click="pushOption"
                            :disable="!optionHandler.option || !optionHandler.tag" />
                    </div>
                </div>

                <div v-if="questionHandler.options.length" class="q-mt-md">
                    <div class="text-caption">Opções:</div>
                    <ul>
                        <li v-for="(opt, i) in questionHandler.options" :key="i" class="row items-center q-my-xs">
                            <span>{{ opt.option }}</span>
                            <q-badge class="q-ml-sm" :style="{ backgroundColor: opt.color, color: '#fff' }"
                                :label="opt.tag" />
                            <q-btn dense flat icon="delete" color="negative" class="q-ml-sm" @click="removeOption(i)" />
                        </li>
                    </ul>
                </div>

                <q-btn class="q-mt-md full-width full-width-sm-auto" color="accent" glossy icon="add_circle"
                    label="Adicionar Pergunta" @click="pushQuestion"
                    :disable="!questionHandler.question || questionHandler.options.length === 0" />
            </q-card-section>

            <q-separator />

            <q-card-section>
                <div class="text-subtitle1">Perguntas do Formulário</div>
                <q-list bordered class="q-mt-sm">
                    <q-item v-for="(q, index) in formTemplate.questions" :key="index">
                        <q-item-section>
                            <div class="text-subtitle2">{{ q.question }}</div>
                            <ul>
                                <li v-for="(opt, i) in q.options" :key="i" class="row items-center q-my-xs">
                                    <span>{{ opt.option }}</span>
                                    <q-badge class="q-ml-sm" :style="{ backgroundColor: opt.color, color: '#fff' }"
                                        :label="opt.tag" />
                                </li>
                            </ul>
                        </q-item-section>
                        <q-item-section side>
                            <q-btn color="red" dense flat icon="delete" @click="removeQuestion(index)" />
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card-section>

            <q-card-actions align="right">
                <q-btn class="w100" color="primary" label="Enviar" icon-right="send" glossy @click="enviarFormulario"
                    :disable="formTemplate.questions.length === 0 || !formTemplate.title" />
            </q-card-actions>
        </q-card>
    </q-page>
</template>

<script setup>
import { ref } from 'vue';

const tagsOptions = ref([
    { value: 1, color: '#3F8BED', label: 'Ativo' },
    { value: 2, color: '#919EE9', label: 'Visual' },
    { value: 3, color: '#83CDE7', label: 'Leitor' },
    { value: 4, color: '#A2D6B4', label: 'Editor' },
    { value: 5, color: '#F9C7C7', label: 'Revisor' },
]);

const formTemplate = ref({
    title: '',
    questions: [],
});

const questionHandler = ref({
    question: '',
    options: [],
});

const optionHandler = ref({
    option: '',
    tag: '',
});

function pushOption() {
    if (optionHandler.value.option && optionHandler.value.tag) {
        const tagObj = tagsOptions.value.find(t => t.label === optionHandler.value.tag);
        questionHandler.value.options.push({
            option: optionHandler.value.option,
            tag: optionHandler.value.tag,
            color: tagObj?.color || '#000'
        });
        optionHandler.value = { option: '', tag: '' };
    }
}

function removeOption(idx) {
    questionHandler.value.options.splice(idx, 1);
}

function pushQuestion() {
    if (questionHandler.value.question && questionHandler.value.options.length > 0) {
        formTemplate.value.questions.push({ ...questionHandler.value });
        questionHandler.value = { question: '', options: [] };
    }
}

function removeQuestion(idx) {
    formTemplate.value.questions.splice(idx, 1);
}

function enviarFormulario() {
    const payload = { form: { ...formTemplate.value } };
    console.log(JSON.stringify(payload, null, 2));
}
</script>

<style scoped>
.q-page {
    background: #dfe2e9
}

.text-subtitle1 {
    font-weight: bold;
}

.tag-dot {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    margin-right: 8px;
}

.q-card {
    border: 2px solid white;
    border-radius: 4px;
}
</style>