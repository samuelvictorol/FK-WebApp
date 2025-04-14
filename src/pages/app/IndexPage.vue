<template>
  <q-page class="q-pa-md bg-grey-1">
    <q-card class="q-pa-md q-mx-auto" style="max-width: 700px">
      <q-card-section>
        <div class="text-h5 text-accent text-bold">Descubra seu Cronotipo</div>
        <div class="text-subtitle2 text-grey">
          Responda as perguntas para entender melhor seu padrão de energia e foco ao longo do dia.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-md">
        <div v-for="(pergunta, index) in perguntasAtuais" :key="pergunta.id">
          <div class="text-subtitle1">{{ getNumero(index) }} {{ pergunta.question }}</div>
          <q-option-group
            v-model="respostas[pergunta.id]"
            type="radio"
            :options="pergunta.options.map(opt => ({ label: opt.option, value: opt.points }))"
            color="accent"
          />
        </div>
      </q-card-section>

      <q-card-actions align="between">
        <q-btn flat label="Voltar" @click="voltar" :disable="etapaAtual === 1" />
        <q-btn
          label="Avançar"
          icon-right="arrow_forward"
          glossy
          color="green"
          @click="avancar"
          :disable="!etapaCompleta"
        />
      </q-card-actions>
    </q-card>

    <!-- Barra de Progresso fixa -->
    <q-footer class="bg-white text-accent q-pa-sm shadow-2" style="position: fixed; bottom: 0; width: 100%">
      <q-linear-progress :value="progresso" color="accent" track-color="grey-3" />
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

api.post('http://localhost:5000/get_cronotype_form')
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

function avancar () {
  if (etapaAtual.value < totalEtapas) {
    etapaAtual.value++
  } else {
    enviar()
  }
}

function voltar () {
  if (etapaAtual.value > 1) etapaAtual.value--
}

function enviar () {
  // Monta as respostas detalhadas
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

  console.log('Enviando respostas:', JSON.stringify(respostasDetalhadas))

  api.post('http://localhost:5000/send_cronotype_answers', respostasDetalhadas)
    .then(res => {
      console.log('Resposta do backend:', res.data)
    })
    .catch(err => {
      console.error('Erro ao enviar respostas:', err)
    })
}

function getNumero (index) {
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
