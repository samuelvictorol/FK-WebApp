<template>
    <q-page class="q-pa-md">
        <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
            <q-breadcrumbs-el icon="home" label="Início" to="/app" />
            <q-breadcrumbs-el icon="list_alt" label="Formulários" to="/app/forms" />
            <q-breadcrumbs-el icon="article" label="Estilo" exact />
        </q-breadcrumbs>
        <q-card class="q-px-sm q-mx-auto bg-grey-1 q-mt-lg q-pb-sm" style="border:2px solid white;max-width: 700px">
            <q-card-section>
                <div class="text-h5 text-blue text-bold">Estilo de Aprendizado</div>
                <div class="text-subtitle2 text-grey">
                    Responda as perguntas para descobrir seu estilo de aprendizado ideal e otimizar os pontos que são
                    eficazes para seu perfil.
                </div>
            </q-card-section>

            <q-separator />

            <q-card-section class="q-gutter-md">
                <div v-for="(pergunta, index) in perguntasAtuais" :key="pergunta.id">
                    <div class="text-subtitle1">{{ getNumero(index) }} {{ pergunta.question }}</div>
                    <q-option-group v-model="respostas[pergunta.id]" type="radio"
                        :options="pergunta.options.map(opt => ({ label: opt.option, value: opt.tag }))" color="blue" />
                </div>
            </q-card-section>

            <q-card-actions align="between">
                <q-btn flat label="Voltar" @click="voltar" :disable="etapaAtual === 1" />
                <q-btn label="Avançar" icon-right="arrow_forward" glossy color="green" @click="avancar"
                    :disable="!etapaCompleta" />
            </q-card-actions>
        </q-card>

        <!-- Barra de Progresso fixa -->
        <q-footer class="bg-white text-blue q-pa-sm shadow-2" style="position: fixed; bottom: 0; width: 100%">
            <q-linear-progress :value="progresso" color="blue" track-color="grey-3" />
            <div class="text-center text-caption q-mt-xs">
                {{ respondidas }} de {{ totalPerguntas }} respondidas
            </div>
        </q-footer>
    </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { api } from 'boot/axios'

const etapaAtual = ref(1)
const respostas = ref({})
const perguntas = ref([])

const totalEtapas = 3

// Requisição para buscar perguntas
api.post('/form/estilo_aprendizado')
    .then(res => {
        perguntas.value = res.data
    })
    .catch(err => {
        console.error('Erro ao buscar perguntas:', err)
    })

// Divide perguntas em etapas
const perguntasPorEtapa = computed(() => {
    const chunk = Math.ceil(perguntas.value.length / totalEtapas)
    return Array.from({ length: totalEtapas }, (_, i) =>
        perguntas.value.slice(i * chunk, (i + 1) * chunk)
    )
})

const perguntasAtuais = computed(() => perguntasPorEtapa.value[etapaAtual.value - 1] || [])

const etapaCompleta = computed(() =>
    perguntasAtuais.value.every(p => respostas.value[p.id] !== undefined)
)

function avancar() {
    if (etapaAtual.value < totalEtapas) {
        etapaAtual.value++
    } else {
        enviar()
    }
}

function voltar() {
    if (etapaAtual.value > 1) etapaAtual.value--
}

function enviar() {
    const respostasDetalhadas = perguntas.value
        .filter(p => respostas.value[p.id] !== undefined)
        .map(p => {
            const respostaSelecionada = p.options.find(o => o.tag === respostas.value[p.id])
            return {
                id: p.id,
                question: p.question,
                resposta: respostaSelecionada?.option || '',
                tag: respostaSelecionada?.tag || ''
            }
        })

    console.log('Enviando respostas:', JSON.stringify(respostasDetalhadas))

    api.post('http://localhost:5000/send_cronotype_answers', respostasDetalhadas)
        .then(res => {
            console.log('Resposta do backend:', res.data)
        })
        .catch(err => {
            console.error('Erro ao enviar respostas:', err)
        })
}

function getNumero(index) {
    const base = perguntasPorEtapa.value
        .slice(0, etapaAtual.value - 1)
        .reduce((acc, cur) => acc + cur.length, 0)
    return `${base + index + 1}.`
}

// Barra de progresso
const totalPerguntas = computed(() => perguntas.value.length)
const respondidas = computed(() =>
    Object.keys(respostas.value).filter(id => respostas.value[id] !== undefined).length
)
const progresso = computed(() => (respondidas.value / totalPerguntas.value))
</script>

<style scoped>
.text-subtitle1 {
    font-weight: bold;
    margin-bottom: 6px;
}
</style>