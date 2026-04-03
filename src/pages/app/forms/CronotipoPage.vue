<template>
  <q-page class="q-pa-md page">
    <q-breadcrumbs class="crumbs" separator-icon="chevron_right">
      <q-breadcrumbs-el class="text-deep-purple-10" icon="home" label="Início" to="/app" />
      <q-breadcrumbs-el class="text-deep-purple-10" icon="list_alt" label="Formulários" to="/app/forms" />
      <q-breadcrumbs-el icon="article" label="Cronotipo" exact />
    </q-breadcrumbs>

    <q-card class="shell" bordered>
      <q-card-section class="head">
        <div class="text-h5 text-weight-bold text-deep-purple-10 safe-text">
          Descubra seu Cronotipo
        </div>
        <div class="text-subtitle2 text-grey-6 q-mt-xs safe-text">
          Entenda seus padrões naturais de sono e vigília para otimizar seu dia a dia.
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section class="chat">
        <div v-if="loadingPerguntas" class="row items-center q-gutter-sm q-pa-md">
          <q-spinner color="deep-purple-10" />
          <div class="text-grey-6">Carregando perguntas…</div>
        </div>

        <div v-else>
          <div v-for="(pergunta, idx) in perguntasVisiveis" :key="pergunta.id" class="chat-block">
            <!-- Pergunta (Kamila) -->
            <div class="msg-row left">
              <q-avatar size="34px" class="avatar">
                <img src="/kamila.png" alt="Kamila" />
              </q-avatar>

              <div class="bubble bubble-left">
                <div class="bubble-title">
                  {{ idx + 1 }}. <span class="text-weight-bold">Flávia Kamila</span>
                </div>
                <div class="bubble-text safe-text">{{ pergunta.question }}</div>
              </div>
            </div>

            <!-- Respostas -->
            <div class="msg-row right">
              <div class="answers">
                <q-btn
                  v-for="opt in pergunta.options"
                  :key="opt.points"
                  unelevated
                  class="bubble-option"
                  :class="{ selected: respostas[pergunta.id] === opt.points }"
                  :label="opt.option"
                  @click="selecionar(pergunta.id, opt.points)"
                />
              </div>
            </div>

            <!-- Resposta enviada -->
            <div v-if="respostas[pergunta.id] !== undefined" class="msg-row right sent">
              <div class="bubble bubble-right">
                <div class="bubble-title">Você</div>
                <div class="bubble-text safe-text">
                  {{ getSelectedLabelPoints(pergunta, respostas[pergunta.id]) }}
                </div>
              </div>
            </div>

            <div v-if="idx === perguntasVisiveis.length - 1 && !isCompleted" class="hint q-mt-sm">
              <q-icon name="info" size="16px" class="q-mr-xs" />
              Responda para aparecer a próxima pergunta.
            </div>
          </div>

          <div v-if="isCompleted" class="done-box q-mt-md">
            <q-icon name="check_circle" size="18px" class="q-mr-xs" />
            Concluído. Você pode editar respostas acima e recalcular quando quiser.
            <q-btn
              unelevated
              class="btn-recalc q-ml-sm"
              label="Recalcular"
              icon="refresh"
              :loading="loadingResultado"
              @click="enviar(true)"
            />
          </div>

          <!-- âncora pro scroll sempre cair no lugar certo -->
          <div ref="chatBottom" class="chat-bottom-anchor"></div>
        </div>
      </q-card-section>
    </q-card>

    <div style="height: 16vh;"></div>

    <!-- RESULTADO: estilo chat + só botão de PDF -->
    <q-dialog v-model="dialogResultado" persistent>
      <q-card class="result-card">
        <q-card-section class="result-head row items-center justify-between">
          <div class="text-h6">Resultado</div>
          <q-btn flat round icon="close" v-close-popup />
        </q-card-section>

        <q-separator />

        <q-card-section class="result-chat">
          <div class="msg-row left">
            <q-avatar size="34px" class="avatar">
              <img src="/kamila.png" alt="Kamila" />
            </q-avatar>

            <div class="bubble bubble-left">
              <div class="bubble-title">
                <span class="text-weight-bold">Flávia Kamila</span>
              </div>

              <div v-if="resultado" class="bubble-text safe-text">
                <div class="text-subtitle1 text-weight-bold q-mb-xs">
                  ✅ {{ resultado.titulo }}
                </div>
                <div v-html="resultado.descricao"></div>
              </div>

              <div v-else class="row items-center q-gutter-sm">
                <q-spinner color="deep-purple-10" />
                <div class="text-grey-6">Calculando…</div>
              </div>
            </div>
          </div>

          <div class="msg-row left q-mt-md">
            <q-avatar size="34px" class="avatar">
              <img src="/kamila.png" alt="Kamila" />
            </q-avatar>

            <div class="bubble bubble-left">
              <div class="bubble-title">
                <span class="text-weight-bold">Flávia Kamila</span>
              </div>
              <div class="bubble-text safe-text">
                Quer baixar o PDF com seu resultado e o histórico completo?
              </div>

              <div class="q-mt-sm">
                <q-btn
                  class="btn-pdf full-width text-grey-3"
                  unelevated
                  icon="download"
                  label="Baixar PDF com histórico"
                  :disable="!resultado"
                  @click="baixarPdfHistorico()"
                />
              </div>
            </div>
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Progresso fixo (pedido) -->
    <q-footer class="progress bg-grad">
      <q-linear-progress :value="progresso" color="white" track-color="deep-purple-8" />
      <div class="text-center text-caption q-mt-xs text-white">
        {{ respondidas }} de {{ totalPerguntas }} respondidas
      </div>
    </q-footer>
  </q-page>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { api } from 'boot/axios'
import { Utils } from '../Utils'

const respostas = ref({})
const perguntas = ref([])

const loadingPerguntas = ref(true)
const loadingResultado = ref(false)

const dialogResultado = ref(false)
const resultado = ref(null)
const descricaoResultado = ref('') // mantém compatibilidade

const autoSubmitted = ref(false)

// scroll âncora
const chatBottom = ref(null)

api.post('/form/cronotipo')
  .then(res => { perguntas.value = res.data || [] })
  .catch(err => { console.error('Erro ao buscar perguntas:', err) })
  .finally(() => { loadingPerguntas.value = false })

const totalPerguntas = computed(() => perguntas.value.length)

const respondidas = computed(() =>
  Object.keys(respostas.value).filter(id => respostas.value[id] !== undefined).length
)

const progresso = computed(() => totalPerguntas.value ? (respondidas.value / totalPerguntas.value) : 0)

const firstUnansweredIndex = computed(() => {
  for (let i = 0; i < perguntas.value.length; i++) {
    if (respostas.value[perguntas.value[i].id] === undefined) return i
  }
  return perguntas.value.length
})

const isCompleted = computed(() =>
  totalPerguntas.value > 0 && firstUnansweredIndex.value >= totalPerguntas.value
)

const perguntasVisiveis = computed(() => {
  if (!perguntas.value.length) return []
  const end = Math.min(firstUnansweredIndex.value + 1, perguntas.value.length)
  return perguntas.value.slice(0, end)
})

async function scrollToBottom(force = false) {
  await nextTick()
  setTimeout(() => {
    if (!chatBottom.value) return

    if (!force) {
      const el = document.scrollingElement || document.documentElement
      const distToBottom = el.scrollHeight - (el.scrollTop + el.clientHeight)
      if (distToBottom > 260) return
    }

    chatBottom.value.scrollIntoView({ behavior: 'smooth', block: 'end' })
  }, 40)
}

function selecionar(idPergunta, points) {
  respostas.value[idPergunta] = points
  scrollToBottom(true)
}

function getSelectedLabelPoints(pergunta, points) {
  const opt = pergunta.options?.find(o => o.points === points)
  return opt?.option || ''
}

// quando aparece nova pergunta -> scroll pro fim
watch(
  () => perguntasVisiveis.value.length,
  async (len, prev) => {
    if (len > prev) await scrollToBottom(true)
  }
)

watch(isCompleted, (done) => {
  if (!done) {
    autoSubmitted.value = false
    return
  }
  if (!autoSubmitted.value) {
    autoSubmitted.value = true
    enviar(false)
  }
})

async function enviar(forceOpenDialog) {
  if (loadingResultado.value) return
  if (!isCompleted.value) return

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
  const payload = { formContent: pontuacaoTotal, formType: 'cronotipo' }

  try {
    loadingResultado.value = true
    dialogResultado.value = true
    if (forceOpenDialog) dialogResultado.value = true

    resultado.value = null

    const res = await api.post('/form/resultados', payload)

    descricaoResultado.value = res.data.cronotype
    resultado.value = {
      titulo: res.data.result,
      descricao: String(res.data.cronotype || '').replace(/\n/g, '<br>')
    }

    await scrollToBottom(true)
  } catch (err) {
    resultado.value = {
      titulo: 'Erro',
      descricao: 'Não foi possível obter seu resultado. Tente novamente mais tarde.'
    }
    console.error('Erro ao obter resultado:', err)
  } finally {
    loadingResultado.value = false
  }
}

function buildHistoricoHtml() {
  const items = perguntas.value.map((p, idx) => {
    const points = respostas.value[p.id]
    const answer = points !== undefined ? getSelectedLabelPoints(p, points) : '(sem resposta)'
    return `
      <div style="margin: 10px 0;">
        <div><strong>${idx + 1}. ${escapeHtml(p.question)}</strong></div>
        <div>Resposta: ${escapeHtml(answer)}</div>
      </div>
    `
  }).join('')

  return `
    <h2>${escapeHtml(resultado.value?.titulo || 'Resultado')}</h2>
    <div>${resultado.value?.descricao || ''}</div>
    <hr />
    <h3>Histórico (Perguntas e Respostas)</h3>
    ${items}
  `
}

function baixarPdfHistorico() {
  Utils.gerarPDF({
  titulo: resultado.value?.titulo,
  descricao: resultado.value?.descricao,
  nomeFormulario: 'Estilo de Aprendizado',
  historico: perguntas.value.map((p) => ({
    pergunta: p.question,
    resposta: respostas.value[p.id] !== undefined
      ? getSelectedLabelTag(p, respostas.value[p.id])
      : '(sem resposta)'
  }))
}, 'estilo_aprendizado_historico')
}

// helper simples p/ evitar quebrar HTML no histórico
function escapeHtml(str) {
  return String(str || '')
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;')
}
</script>

<style scoped>
:global(html), :global(body), :global(#q-app) { overflow-x: clip; }
:global(.row > [class*="col-"]) { min-width: 0; }

.page { max-width: 900px; margin: 0 auto; }
.safe-text { overflow-wrap: anywhere; word-break: break-word; }

.crumbs { background: rgba(255,255,255,.92); border: 1px solid rgba(15,23,42,.08); padding: 10px 12px; border-radius: 14px; }
.shell { margin-top: 14px; border-radius: 18px; overflow: hidden; background: rgba(255,255,255,.94); border: 1px solid rgba(15,23,42,.08); }
.head { padding-bottom: 10px; }

.chat { background: linear-gradient(180deg, rgba(124,58,237,.04), rgba(20,184,166,.03)); }
.chat-block { padding: 14px 8px; border-bottom: 1px solid rgba(15,23,42,.06); }

.msg-row { display: flex; align-items: flex-end; gap: 10px; margin-bottom: 10px; }
.left { justify-content: flex-start; }
.right { justify-content: flex-end; }
.sent { margin-top: -4px; }

.avatar { border: 1px solid rgba(15,23,42,.10); background: #fff; }

.bubble { max-width: min(680px, 86%); padding: 10px 12px; border-radius: 16px; border: 1px solid rgba(15,23,42,.10); }
.bubble-left { background: #ffffff; border-top-left-radius: 10px; }
.bubble-right { background: linear-gradient(90deg, rgba(124,58,237,.16), rgba(20,184,166,.12)); border-top-right-radius: 10px; }

.bubble-title { font-size: .78rem; opacity: .85; margin-bottom: 4px; }
.bubble-text { line-height: 1.35; }

.answers { display: flex; flex-wrap: wrap; gap: 8px; justify-content: flex-end; max-width: min(680px, 92%); }
.bubble-option {
  border-radius: 999px;
  font-weight: 800;
  text-transform: none;
  background: rgba(255,255,255,.92);
  border: 1px solid rgba(15,23,42,.10);
  color: rgba(15,23,42,.92);
}
.bubble-option.selected {
  background: linear-gradient(90deg, rgba(124,58,237,.22), rgba(20,184,166,.16));
  border-color: rgba(124,58,237,.35);
}

.hint {
  display: inline-flex;
  align-items: center;
  font-size: .85rem;
  color: rgba(15,23,42,.72);
  padding-left: 44px;
}

.done-box {
  margin: 12px;
  padding: 12px;
  border-radius: 14px;
  background: rgba(16,16,22,.04);
  border: 1px solid rgba(15,23,42,.08);
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
}

.btn-recalc {
  background: linear-gradient(90deg, #7c3aed, #14b8a6);
  color: #ffffff;
  font-weight: 900;
  border-radius: 12px;
}

.chat-bottom-anchor { width: 100%; height: 1px; }

.progress {
  position: fixed;
  bottom: 0;
  width: 100%;
  border-top: 1px solid rgba(255,255,255,.12);
  padding: 10px 12px;
}

.result-card { max-width: 560px; width: 92vw; border-radius: 16px; overflow: hidden; }
.result-head { background: rgba(255,255,255,.96); }
.result-chat { background: linear-gradient(180deg, rgba(124,58,237,.04), rgba(20,184,166,.03)); }

.btn-pdf {
  background: linear-gradient(90deg, #7c3aed, #14b8a6);
  color: #0b0b10;
  font-weight: 900;
  border-radius: 14px;
}
</style>