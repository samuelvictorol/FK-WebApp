<template>
  <q-page class="q-pa-md">
    <q-breadcrumbs class="text-grey-8 rounded-borders q-mb-sm" separator-icon="chevron_right">
      <q-breadcrumbs-el class="text-purple-14" icon="home" label="Início" to="/app" />
      <q-breadcrumbs-el class="text-purple-14" icon="list_alt" label="Formulários" to="/app/forms" />
      <q-breadcrumbs-el icon="article" label="Cronótipo" exact />
    </q-breadcrumbs>

    <q-card class="q-px-sm q-mx-auto bg-grey-1 q-mt-lg q-pb-sm" style="border:2px solid white;max-width: 700px">
      <q-card-section>
        <div class="text-h5 text-purple text-bold">Descubra seu Cronotipo</div>
        <div ref="topoPerguntas"></div>
        <div class="text-subtitle2 text-grey-14 q-pt-sm">
          Responda as perguntas para entender melhor seu padrão de energia e foco ao longo do dia.
        </div>
      </q-card-section>
      <q-separator />

      <q-card-section class="q-gutter-md">
        <div v-for="(pergunta, index) in perguntasAtuais" :key="pergunta.id">
          <div class="text-subtitle1">{{ getNumero(index) }} {{ pergunta.question }}</div>
          <q-option-group v-model="respostas[pergunta.id]" type="radio"
            :options="pergunta.options.map(opt => ({ label: opt.option, value: opt.points }))" color="purple" />
        </div>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn flat label="Voltar" @click="voltar" v-if="etapaAtual != 1" />
        <q-btn :label=" etapaAtual != 3 ? 'Avançar' : 'Finalizar'" :icon-right="etapaAtual != 3 ? 'arrow_forward' : 'check'" glossy color="purple" @click="avancar"
          :disable="!etapaCompleta" />
      </q-card-actions>

    </q-card>
    <div class="w100" style="height: 20vh;"></div>

    <q-dialog v-model="dialogResultado" persistent>
      <q-card style="max-width: 500px; width: 90vw">
        <q-card-section>
          <div class="text-h6">✅ Resultado do Cronotipo</div>
        </q-card-section>

        <q-separator />

        <q-card-section>
          <div v-if="resultado">
            <div class="text-subtitle1 text-bold q-mb-sm">{{ resultado.titulo }}</div>
            <div class="text-body2" v-html="resultado.descricao"></div>
          </div>
          <div v-else>
            <q-spinner color="blue" />
          </div>
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="Fechar"  v-close-popup />
          <q-btn color="green" label="Baixar PDF" icon-right="download" glossy
            @click="Utils.gerarPDF(resultado.titulo, descricaoResultado, 'cronotipo')" />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <!-- Barra de Progresso fixa -->
    <q-footer class="bg-white text-purple-14 q-pa-sm shadow-2" style="position: fixed; bottom: 0; width: 100%">
      <q-linear-progress :value="progresso" color="purple" track-color="grey-3" />
      <div class="text-center text-caption q-mt-xs">
        {{ respondidas }} de {{ totalPerguntas }} respondidas
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, computed } from 'vue'
import { api } from 'boot/axios'
import { Utils } from '../Utils'

const etapaAtual = ref(1)
const respostas = ref({})
const perguntas = ref([])
const topoPerguntas = ref(null)
const descricaoResultado = ref('')
const dialogResultado = ref(false)
const resultado = ref(null)

const totalEtapas = 3

api.post('/form/cronotipo')
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
    scrollParaTopo()
  } else {
    enviar()
  }
}

function scrollParaTopo() {
  setTimeout(() => {
    topoPerguntas.value?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }, 50) // pequeno delay para garantir renderização
}

function voltar() {
  if (etapaAtual.value > 1) etapaAtual.value--
}

async function enviar() {
  const respostasDetalhadas = perguntas.value
    .filter(p => respostas.value[p.id] !== undefined)
    .map(p => {
      const respostaSelecionada = p.options.find(o => o.points === respostas.value[p.id])
      return {
        id: p.id,
        question: p.question,
        resposta: respostaSelecionada?.option || '',
        valor: respostaSelecionada?.points || 0
      }
    })

  const pontuacaoTotal = respostasDetalhadas.reduce((acc, r) => acc + r.valor, 0)

  const payload = {
    formContent: pontuacaoTotal, // agora envia apenas a pontuação total
    formType: 'cronotipo'
  }

  console.log('Enviando para /form/resultados:', JSON.stringify(payload, null, 2))

  try {
    dialogResultado.value = true
    resultado.value = null
    const res = await api.post('/form/resultados', payload)
    descricaoResultado.value = res.data.cronotype
    resultado.value = {
      titulo: res.data.result,
      descricao: res.data.cronotype.replace(/\n/g, '<br>')
    }
    console.log('Resultado recebido:', res.data)
  } catch (err) {
    resultado.value = {
      titulo: 'Erro',
      descricao: 'Não foi possível obter seu resultado. Tente novamente mais tarde.'
    }
    console.error('Erro ao obter resultado:', err)
  }
}

function getNumero(index) {
  const base = perguntasPorEtapa.value
    .slice(0, etapaAtual.value - 1)
    .reduce((acc, cur) => acc + cur.length, 0)
  return `${base + index + 1}.`
}

// Progress bar
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
