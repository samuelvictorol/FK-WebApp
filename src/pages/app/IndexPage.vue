<template>
  <q-page class="q-pa-md flex flex-center bg-grey-1">
    <q-card class="q-pa-md" style="max-width: 700px; width: 100%;">
      <q-card-section>
        <div class="text-h5 text-accent text-bold">Descubra o Método Ideal de Aprendizado para você</div>
        <div class="text-subtitle2 text-grey">
          Responda as perguntas para que possamos montar um plano de estudo personalizado.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="q-gutter-md">

        <!-- Pergunta 1 -->
        <div>
          <div class="text-subtitle1">1. Qual das opções mais representa como você aprende melhor?</div>
          <q-option-group
            type="radio"
            v-model="respostas.estiloAprendizagem"
            :options="[
              { label: 'Assistindo vídeos ou demonstrações visuais', value: 'visual' },
              { label: 'Ouvindo explicações em áudio ou podcasts', value: 'auditivo' },
              { label: 'Lendo textos e escrevendo resumos', value: 'leitura_escrita' },
              { label: 'Praticando com exercícios ou simulações', value: 'cinestesico' }
            ]"
            color="primary"
          />
        </div>

        <!-- Pergunta 2 -->
        <div>
          <div class="text-subtitle1">2. Em quais momentos do dia você sente mais foco e energia para estudar?</div>
          <q-option-group
            type="radio"
            v-model="respostas.momentoPreferido"
            :options="[
              { label: 'Manhã (antes das 12h)', value: 'manha' },
              { label: 'Tarde (12h às 18h)', value: 'tarde' },
              { label: 'Noite (após as 18h)', value: 'noite' },
              { label: 'Depende do dia', value: 'variavel' }
            ]"
            color="primary"
          />
        </div>

        <!-- Pergunta 3 -->
        <div>
          <div class="text-subtitle1">3. Qual é sua principal dificuldade ao estudar?</div>
          <q-option-group
            type="checkbox"
            v-model="respostas.dificuldades"
            :options="[
              { label: 'Falta de concentração', value: 'concentracao' },
              { label: 'Ansiedade ou bloqueio', value: 'ansiedade' },
              { label: 'Falta de organização ou rotina', value: 'organizacao' },
              { label: 'Não entender o conteúdo', value: 'compreensao' }
            ]"
            color="primary"
          />
        </div>

        <!-- Pergunta 4 -->
        <div>
          <div class="text-subtitle1">4. Quanto tempo por dia você está disposto a se dedicar aos estudos?</div>
          <q-select
            v-model="respostas.tempoDisponivel"
            :options="[
              '30 minutos', '1 hora', '2 horas', 'Mais de 2 horas'
            ]"
            label="Selecione uma opção"
            outlined
            color="primary"
          />
        </div>

        <!-- Pergunta 5 -->
        <div>
          <q-input
            v-model="respostas.objetivo"
            label="5. Qual é seu principal objetivo com os estudos no momento?"
            type="textarea"
            outlined
            color="primary"
          />
        </div>

      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Avançar" icon="arrow_forward" color="primary" @click="avancar" />
      </q-card-actions>
    </q-card>
  </q-page>
</template>

<script setup>
import { ref } from 'vue'

const respostas = ref({
  estiloAprendizagem: '',
  momentoPreferido: '',
  dificuldades: [],
  tempoDisponivel: '',
  objetivo: ''
})

function avancar () {
  console.log('Respostas parciais para plano personalizado:', respostas.value)
  // Essa função pode redirecionar ou salvar no backend posteriormente
}
</script>

<style scoped>
.text-subtitle1 {
  font-weight: bold;
  margin-bottom: 6px;
}
</style>
