<template>
  <q-layout view="hHh lpR fFf" class="page">
    <q-header elevated class="topbar">
      <q-toolbar class="toolbar container">
        <q-toolbar-title class="brand-title">
          <div class="brand-main animate__animated animate__fadeInLeft animate__slow">
            <strong>Flávia</strong><strong>Kamila</strong>
          </div>
          <div v-if="!isMobile" class="brand-sub">
            Aprendizagem • Concursos • Estratégia
          </div>
        </q-toolbar-title>

        <div class="row items-center q-gutter-sm">
          <q-btn flat class="btn-nav desktop-only" label="Início" @click="scrollTo('inicio')" />
          <q-btn flat class="btn-nav desktop-only" label="Como funciona" @click="scrollTo('como')" />
          <q-btn flat class="btn-nav desktop-only" label="Sobre" @click="scrollTo('sobre')" />
          <q-btn flat class="btn-nav desktop-only" label="Planos" @click="scrollTo('planos')" />
          <q-btn flat class="btn-nav desktop-only" label="Contato" @click="scrollTo('contato')" />

          <q-btn
            dense
            unelevated
            class="btn-login q-px-md"
            icon="login"
            label="Entrar"
            to="/login"
          />

          <q-btn
            dense
            unelevated
            class="btn-primary q-px-md desktop-only"
            icon="person_add"
            label="Registrar"
            to="/login"
          />

          <q-btn dense flat round icon="menu" class="mobile-only btn-menu animate__animated animate__flipInY animate__slower animate__delay-1s">
            <q-menu class="menu-mobile" anchor="bottom right" self="top right">
              <q-list style="min-width: 220px">
                <q-item clickable v-close-popup @click="scrollTo('inicio')">
                  <q-item-section avatar><q-icon name="home" /></q-item-section>
                  <q-item-section>Início</q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="scrollTo('como')">
                  <q-item-section avatar><q-icon name="auto_awesome" /></q-item-section>
                  <q-item-section>Como funciona</q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="scrollTo('sobre')">
                  <q-item-section avatar><q-icon name="person" /></q-item-section>
                  <q-item-section>Sobre</q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="scrollTo('planos')">
                  <q-item-section avatar><q-icon name="sell" /></q-item-section>
                  <q-item-section>Planos</q-item-section>
                </q-item>

                <q-item clickable v-close-popup @click="scrollTo('contato')">
                  <q-item-section avatar><q-icon name="mail" /></q-item-section>
                  <q-item-section>Contato</q-item-section>
                </q-item>

                <q-separator />

                <q-item clickable v-close-popup to="/login">
                  <q-item-section avatar><q-icon name="login" /></q-item-section>
                  <q-item-section>Login</q-item-section>
                </q-item>

                <q-item clickable v-close-popup to="/registrar">
                  <q-item-section avatar><q-icon name="person_add" /></q-item-section>
                  <q-item-section>Registrar</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container class="page-container">
      <!-- HERO -->
      <section id="inicio" class="hero">
        <div class="hero-bg" />
        <div class="hero-overlay" />

        <div class="container hero-content relative">
          <div class="row items-center q-col-gutter-xl">
            <div class="col-12 col-md-7">
              <q-avatar v-if="isMobile" size="100px" class="q-mb-md absolute-top animate__animated animate__fadeInDown animate__slow" style="top:-92px;left: 35%;">
                <img src="/home.png" alt="Logo" />
              </q-avatar>
              <div
                class="eyebrow q-mt-md animate__animated animate__fadeInDown animate__faster"
              >
                <q-icon name="favorite" size="16px" class="q-mr-sm" />
                Aprenda com estratégia, leveza e clareza
              </div>

              <div
                class="hero-title text-h4 q-pa-sm rounded-borders safe-text animate__animated animate__fadeInLeft animate__slow"
              >
                Descubra o <span class="grad">Cronotipo</span>, o seu <span class="grad">Estilo</span> e a melhor
                <span class="grad">Forma de Aprendizado</span> para <span class="grad">você</span>.
              </div>

              <p
                class="hero-sub safe-text text-dark animate__animated animate__fadeInUp animate__slow"
              >
                Um diagnóstico prático e personalizado para estudar com mais foco, constância e inteligência,
                respeitando o seu ritmo.
              </p>

              <div class="row q-col-gutter-sm q-mt-lg">
                <div class="col-12 col-sm-auto">
                  <q-btn
                    class="btn-cta full-width text-white animate__animated animate__fadeInUp animate__delay-1s"
                    unelevated
                    icon-right="arrow_forward"
                    label="Começar agora"
                    to="/app"
                  />
                </div>

                <div class="col-12 col-sm-auto">
                  <q-btn
                    class="btn-soft full-width animate__animated animate__fadeInUp animate__delay-1s"
                    unelevated
                    icon-right="apps"
                    label="PDF grátis"
                    @click="openNewTab('https://flaviakamila.com.br')"
                  />
                </div>

                <div class="col-12 col-sm-auto">
                  <q-btn
                    class="btn-ghost-strong full-width animate__animated animate__fadeInUp animate__delay-2s"
                    unelevated
                    icon="play_circle"
                    label="Ver como funciona"
                    @click="scrollTo('como')"
                  />
                </div>
              </div>

              <div class="row q-col-gutter-md q-mt-xl">
                <div class="col-12 col-sm-4">
                  <q-card flat class="mini-card animate__animated animate__fadeInUp animate__delay-1s">
                    <q-card-section class="row items-center no-wrap">
                      <div class="icon-badge">
                        <q-icon name="schedule" size="18px" />
                      </div>
                      <div>
                        <div class="mini-title">Rápido</div>
                        <div class="mini-sub">Relatório em minutos</div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="col-12 col-sm-4">
                  <q-card flat class="mini-card animate__animated animate__fadeInUp animate__delay-1s">
                    <q-card-section class="row items-center no-wrap">
                      <div class="icon-badge">
                        <q-icon name="psychology" size="18px" />
                      </div>
                      <div>
                        <div class="mini-title">Personalizado</div>
                        <div class="mini-sub">Feito com base em você</div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>

                <div class="col-12 col-sm-4">
                  <q-card flat class="mini-card animate__animated animate__fadeInUp animate__delay-2s">
                    <q-card-section class="row items-center no-wrap">
                      <div class="icon-badge">
                        <q-icon name="done_all" size="18px" />
                      </div>
                      <div>
                        <div class="mini-title">Aplicável</div>
                        <div class="mini-sub">Plano prático real</div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-5">
              <q-card
                class="hero-card animate__animated animate__fadeInRight animate__slow"
                bordered
              >
                <q-card-section>
                  <div class="text-h6 text-weight-bold q-mb-xs">
                    Diagnóstico + Relatório
                  </div>
                  <div class="hero-card-sub q-mb-md">
                    Descubra seu perfil e saia com recomendações prontas para aplicar.
                  </div>

                  <div class="row items-end q-col-gutter-sm q-mb-md">
                    <div class="col">
                      <div class="price">
                        R$ <span class="price-big">49</span><span class="price-dec">,90</span>
                      </div>
                      <div class="price-note">Pagamento único • Acesso vitalício</div>
                    </div>

                    <div class="col-auto">
                      <q-badge class="badge-highlight" rounded>
                        Mais escolhido
                      </q-badge>
                    </div>
                  </div>

                  <div class="pack-title">Pacote incluído</div>

                  <div class="q-mt-md">
                    <div class="pack-row">
                      <q-icon name="check_circle" class="check" />
                      <div class="pack-item safe-text">Formulário de estilo de aprendizagem</div>
                    </div>

                    <div class="pack-row">
                      <q-icon name="check_circle" class="check" />
                      <div class="pack-item safe-text">Formulário de cronotipo</div>
                    </div>

                    <div class="pack-row">
                      <q-icon name="check_circle" class="check" />
                      <div class="pack-item safe-text">Relatório personalizado com recomendações práticas</div>
                    </div>

                    <div class="pack-row">
                      <q-icon name="check_circle" class="check" />
                      <div class="pack-item safe-text">Sugestão de rotina e método de estudo</div>
                    </div>
                  </div>

                  <q-btn
                    class="btn-cta q-mt-lg full-width text-white"
                    unelevated
                    label="Quero meu relatório"
                    icon-right="auto_awesome"
                    to="/app"
                  />

                  <q-btn
                    class="btn-outline-soft q-mt-sm full-width"
                    unelevated
                    label="Já tenho conta"
                    icon="login"
                    to="/login"
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

        <q-btn
          class="scroll-down desktop-only"
          round
          flat
          icon="keyboard_arrow_down"
          @click="scrollTo('como')"
        />
      </section>

      <!-- COMO FUNCIONA -->
      <section id="como" class="section section-soft">
        <div class="container">
          <div class="section-head">
            <div class="kicker">Como funciona</div>
            <h2 class="section-title safe-text">
              Você responde. O sistema interpreta. Você aplica.
            </h2>
            <p class="section-sub safe-text">
              Tudo foi pensado para ser simples, intuitivo e realmente útil no seu dia a dia.
            </p>
          </div>

          <div class="row q-col-gutter-lg q-mt-lg">
            <div class="col-12 col-md-4">
              <q-card class="feature-card animate__animated animate__fadeInUp" bordered>
                <q-card-section>
                  <div class="feature-icon">
                    <q-icon name="assignment" size="22px" />
                  </div>
                  <div class="text-h6 text-weight-bold q-mt-md">1) Formulários</div>
                  <div class="feature-text q-mt-sm safe-text">
                    Você responde perguntas objetivas sobre rotina, preferências e comportamento de estudo.
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-4">
              <q-card class="feature-card animate__animated animate__fadeInUp animate__delay-1s" bordered>
                <q-card-section>
                  <div class="feature-icon">
                    <q-icon name="psychology_alt" size="22px" />
                  </div>
                  <div class="text-h6 text-weight-bold q-mt-md">2) Diagnóstico</div>
                  <div class="feature-text q-mt-sm safe-text">
                    O sistema identifica seu estilo de aprendizagem e o horário em que você tende a render melhor.
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-4">
              <q-card class="feature-card animate__animated animate__fadeInUp animate__delay-2s" bordered>
                <q-card-section>
                  <div class="feature-icon">
                    <q-icon name="description" size="22px" />
                  </div>
                  <div class="text-h6 text-weight-bold q-mt-md">3) Relatório</div>
                  <div class="feature-text q-mt-sm safe-text">
                    Você recebe um plano mais claro, prático e organizado para começar a aplicar imediatamente.
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div class="cta-strip q-mt-xl">
            <div>
              <div class="cta-strip-title">Quer parar de estudar sem direção?</div>
              <div class="cta-strip-sub">
                Descubra o seu melhor jeito de aprender e construa uma rotina mais inteligente.
              </div>
            </div>

            <q-btn
              class="btn-cta text-white"
              unelevated
              label="Começar agora"
              icon-right="arrow_forward"
              to="/app"
            />
          </div>
        </div>
      </section>

      <!-- SOBRE -->
      <section
        id="sobre"
        class="section section-light"
        :style="isMobile ? 'padding-top: 60px;' : 'padding-top: 20px;'"
      >
        <div class="parallax-wrap desktop-only">
          <div class="parallax-img" />
          <div class="parallax-overlay" />
        </div>

        <div class="container">
          <div class="section-head">
            <div class="kicker">Sobre</div>
            <h2 class="section-title safe-text">Humanizado, realista e aplicável.</h2>
            <p class="section-sub safe-text">
              Estratégias de estudo não funcionam iguais para todo mundo. Aqui, o foco é personalizar.
            </p>
          </div>

          <div class="row q-col-gutter-xl items-center q-mt-lg">
            <div class="col-12 col-md-6">
              <q-card class="about-card animate__animated animate__fadeInLeft" bordered>
                <q-card-section class="row items-center q-col-gutter-md">
                  <div class="col-auto">
                    <q-avatar size="72px" class="about-avatar">
                      <img src="/kamila.png" alt="Flávia Kamila" />
                    </q-avatar>
                  </div>

                  <div class="col">
                    <div class="text-h6 text-weight-bold">Flávia Kamila</div>
                    <div class="text-body2 text-grey-7 safe-text">
                      Advogada, mãe e aprovada em diversos concursos públicos.
                      Mentora de aprendizagem com foco em autonomia e constância.
                    </div>

                    <div class="row q-gutter-xs q-mt-sm">
                      <q-chip dense class="chip">Aprendizagem</q-chip>
                      <q-chip dense class="chip">Cronotipo</q-chip>
                      <q-chip dense class="chip">Plano prático</q-chip>
                    </div>
                  </div>
                </q-card-section>

                <q-separator />

                <q-card-section>
                  <p class="text-body1 q-mb-none safe-text">
                    “Meu objetivo é te ajudar a estudar com estratégia — respeitando seu tempo, sua rotina e seu ritmo.
                    Você não precisa de mais conteúdo, precisa de clareza e método.”
                  </p>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-6">
              <img
                src="/missao.png"
                alt="Sobre"
                class="img-soft full-width animate__animated animate__fadeInRight"
              />
            </div>
          </div>

          <div class="row q-col-gutter-lg q-mt-xl">
            <div class="col-12 col-md-6">
              <q-card class="info-card animate__animated animate__fadeInUp" bordered>
                <q-card-section>
                  <div class="text-h6 text-weight-bold">Missão</div>
                  <div class="text-body2 text-grey-7 q-mt-xs safe-text">
                    Promover uma educação personalizada, acessível e acolhedora, respeitando limites e potencialidades.
                  </div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <img src="/sobre4.png" alt="Missão" class="img-soft full-width" />
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-6">
              <q-card class="info-card animate__animated animate__fadeInUp animate__delay-1s" bordered>
                <q-card-section>
                  <div class="text-h6 text-weight-bold">Visão</div>
                  <div class="text-body2 text-grey-7 q-mt-xs safe-text">
                    Ser referência em estratégias individualizadas, transformando vidas por meio do estudo com propósito.
                  </div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <img src="/visao.png" alt="Visão" class="img-soft full-width" />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </section>

      <!-- PLANOS -->
      <section id="planos" class="section section-pricing">
        <div class="container">
          <div class="section-head">
            <div class="kicker">Planos</div>
            <div class="section-title safe-text">Um pacote direto ao ponto</div>
            <p class="section-sub safe-text">
              Você compra, responde e recebe seu relatório personalizado. Sem mensalidade.
            </p>
          </div>

          <div class="row justify-center q-mt-lg">
            <div class="col-12 col-md-6">
              <q-card class="pricing-card animate__animated animate__zoomIn" bordered>
                <q-card-section>
                  <div class="row items-center justify-between q-col-gutter-md">
                    <div class="col">
                      <div class="text-h6 text-weight-bold">Diagnóstico + Relatório</div>
                      <div class="text-body2 pricing-sub">
                        Ideal para iniciar com mais clareza e método
                      </div>
                    </div>
                    <div class="col-auto">
                      <q-badge class="badge-highlight" rounded>Acesso Ilimitado</q-badge>
                    </div>
                  </div>

                  <div class="price-line q-mt-md">
                    <div class="price">
                      R$ <span class="price-big">49</span><span class="price-dec">,90</span>
                    </div>
                    <div class="text-caption pricing-caption">Pagamento único</div>
                  </div>

                  <q-separator class="q-my-md" />

                  <div class="pack-title">Inclui</div>

                  <div class="q-mt-sm">
                    <div class="pack-row">
                      <q-icon name="check" class="check2" />
                      <div class="pack-item2 safe-text">Estilo de aprendizagem + recomendações</div>
                    </div>
                    <div class="pack-row">
                      <q-icon name="check" class="check2" />
                      <div class="pack-item2 safe-text">Cronotipo + melhor janela de estudos</div>
                    </div>
                    <div class="pack-row">
                      <q-icon name="check" class="check2" />
                      <div class="pack-item2 safe-text">Plano prático de rotina, técnicas e prioridades</div>
                    </div>
                    <div class="pack-row">
                      <q-icon name="check" class="check2" />
                      <div class="pack-item2 safe-text">Relatório final organizado e pronto para aplicar</div>
                    </div>
                  </div>

                  <q-btn
                    class="btn-cta q-mt-md full-width text-white"
                    unelevated
                    label="Garantir meu relatório"
                    icon-right="arrow_forward"
                    to="/app"
                  />

                  <div class="text-caption pricing-caption q-mt-sm">
                    Ao continuar, você será direcionado para os formulários do diagnóstico.
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTATO -->
      <section id="contato" class="section section-light">
        <div class="container">
          <div class="row items-start q-col-gutter-xl">
            <div class="col-12 col-md-6">
              <div class="section-head left">
                <div class="kicker">Contato</div>
                <h2 class="section-title safe-text">Fale comigo</h2>
                <p class="section-sub safe-text">
                  Tem dúvida, sugestão ou quer entender qual caminho faz mais sentido para você?
                  Envie sua mensagem.
                </p>
              </div>

              <q-form class="contact-form">
                <q-input
                  v-model="form.name"
                  color="red-6"
                  outlined
                  bg-color="white"
                  label="Nome"
                  class="q-mb-md"
                />

                <q-input
                  v-model="form.email"
                  color="red-6"
                  outlined
                  bg-color="white"
                  label="E-mail"
                  type="email"
                  class="q-mb-md"
                />

                <q-input
                  v-model="form.message"
                  color="red-6"
                  outlined
                  bg-color="white"
                  label="Mensagem"
                  type="textarea"
                  autogrow
                  class="q-mb-md"
                />

                <q-btn
                  label="Enviar mensagem"
                  class="btn-cta q-py-md text-white full-width"
                  icon-right="send"
                  @click="redirectToWpp"
                />
              </q-form>

              <div class="row items-center q-gutter-sm q-mt-lg">
                <img src="/insta.png" style="width: 34px" alt="Instagram" />
                <a
                  class="insta-link"
                  href="https://instagram.com/flaviakamilaf"
                  target="_blank"
                  rel="noreferrer"
                >
                  @flaviakamilaf
                </a>
              </div>
            </div>

            <div class="col-12 col-md-6 desktop-only">
              <q-card class="contact-card" bordered>
                <q-card-section>
                  <div class="text-h6 text-weight-bold">Dica rápida</div>
                  <div class="text-body2 text-grey-7 q-mt-xs safe-text">
                    Se você sente que estuda muito e rende pouco, quase sempre o problema é:
                    <span class="text-weight-bold">método errado</span> ou
                    <span class="text-weight-bold">horário errado</span>.
                    O diagnóstico ajuda justamente nesses dois pontos.
                  </div>

                  <q-separator class="q-my-md" />

                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-sm-6">
                      <q-card flat class="tip">
                        <q-card-section class="row items-center no-wrap">
                          <div class="icon-badge small">
                            <q-icon name="bolt" size="18px" />
                          </div>
                          <div>
                            <div class="mini-title">Clareza</div>
                            <div class="mini-sub">o que fazer primeiro</div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>

                    <div class="col-12 col-sm-6">
                      <q-card flat class="tip">
                        <q-card-section class="row items-center no-wrap">
                          <div class="icon-badge small">
                            <q-icon name="event" size="18px" />
                          </div>
                          <div>
                            <div class="mini-title">Ritmo</div>
                            <div class="mini-sub">quando você rende mais</div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>

                  <q-btn
                    class="btn-cta q-mt-md full-width text-white"
                    unelevated
                    label="Fazer o diagnóstico agora"
                    icon-right="auto_awesome"
                    to="/app"
                  />
                </q-card-section>
              </q-card>
            </div>
          </div>

          <q-separator class="q-my-xl" />

          <footer class="footer">
            <div class="text-body2">
              © 2026 <strong>Flávia Kamila</strong>. Todos os direitos reservados.
            </div>

            <div class="text-body2 q-mt-xs">
              Desenvolvido por
              <a class="devlink" href="https://aitosoftwares.com/" target="_blank" rel="noreferrer">
                AitoSoftwares
              </a>
            </div>

            <div class="w100 row justify-center">
              <q-btn flat round class="q-mt-md" to="/admin">
                <q-avatar square size="32px" class="rounded-borders">
                  <img src="/logo.png" alt="Logo" />
                </q-avatar>
              </q-btn>
            </div>
          </footer>
        </div>
      </section>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const isMobile = ref(window.innerWidth < 650)

const form = ref({
  name: '',
  email: '',
  message: ''
})

function handleResize() {
  isMobile.value = window.innerWidth < 650
}

function openNewTab(url) {
  window.open(url, '_blank')
}

function redirectToWpp() {
  const name = form.value.name?.trim() || ''
  const email = form.value.email?.trim() || ''
  const message = form.value.message?.trim() || ''

  const whatsappMessage = `Olá, meu nome é ${name} (${email}). ${message}`
  const whatsappUrl = `https://wa.me/5561995451717?text=${encodeURIComponent(whatsappMessage)}`
  window.open(whatsappUrl, '_blank')
}

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

onMounted(() => {
  window.addEventListener('resize', handleResize)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', handleResize)
})
</script>

<style scoped>
:global(html),
:global(body),
:global(#q-app) {
  width: 100%;
  max-width: 100%;
  overflow-x: clip;
  scroll-behavior: smooth;
  background: #fff8f7;
}

:global(*),
:global(*::before),
:global(*::after) {
  box-sizing: border-box;
}

:global(.row > [class*="col-"]) {
  min-width: 0;
}

.page {
  background:
    radial-gradient(900px 420px at 0% 0%, rgba(255, 95, 86, 0.10), transparent 55%),
    radial-gradient(800px 380px at 100% 10%, rgba(255, 142, 124, 0.10), transparent 60%),
    linear-gradient(180deg, #fff9f8 0%, #fff5f3 100%);
  color: #2a1e1e;
}

.page-container {
  overflow-x: clip;
}

.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(16px, 2.2vw, 24px);
}

.desktop-only {
  display: block;
}

.mobile-only {
  display: none;
}

@media (max-width: 1023px) {
  .desktop-only {
    display: none !important;
  }

  .mobile-only {
    display: block !important;
  }
}

/* HEADER */
.topbar {
  background: rgba(255, 250, 249, 0.82);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(204, 71, 56, 0.10);
  color: #2a1e1e;
}

.toolbar {
  min-height: 72px;
}

.brand-title {
  line-height: 1.1;
}

.brand-main {
  display: flex;
  gap: 4px;
  font-size: 1.1rem;
  color: #2f1d1d;
}

.brand-main strong:last-child {
  background: linear-gradient(90deg, #d93b2b, #ff6b57);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.brand-sub {
  font-size: 0.78rem;
  color: #7a5b59;
  margin-top: 4px;
}

.btn-nav {
  color: #6b4744;
  font-weight: 600;
  letter-spacing: 0.2px;
}

.btn-nav:hover {
  color: #d93b2b;
}

.btn-login {
  border: 1px solid rgba(217, 59, 43, 0.18);
  background: #fff;
  color: #b13224;
  border-radius: 14px;
  font-weight: 700;
}


.btn-menu {
  color: #b13224;
}

.menu-mobile {
  background: rgba(255, 252, 251, 0.98);
  border: 1px solid rgba(217, 59, 43, 0.10);
  border-radius: 16px;
  box-shadow: 0 18px 44px rgba(115, 57, 48, 0.12);
}

/* HERO */
.hero {
  position: relative;
  min-height: 94vh;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 98px 0 48px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('/homeDesk.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  transform: scale(1.02);
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(212, 172, 165, 0.452) 0%, rgba(255, 246, 246, 0.603) 38%, rgba(255, 147, 147, 0.425) 65%, rgba(255, 156, 156, 0.24) 100%),
    radial-gradient(900px 420px at 18% 22%, rgba(255, 104, 83, 0.16), transparent 60%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.08), rgba(255, 255, 255, 0.10));
}

.hero-content {
  position: relative;
  z-index: 2;
}

.eyebrow {
  display: inline-flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(217, 59, 43, 0.10);
  color: #b13224;
  font-weight: 700;
  font-size: 0.86rem;
  box-shadow: 0 10px 24px rgba(130, 69, 61, 0.08);
}

.hero-title {
  font-size: clamp(2.0rem, 3vw, 3.8rem);
  line-height: 1.03;
  letter-spacing: -0.03em;
  margin: 0;
  color: #241717;
  max-width: 11.5ch;
  text-wrap: balance;
  backdrop-filter: blur(12px);
}

.grad {
  background: linear-gradient(135deg, #7e2319, #ff1e00 75%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-sub {
  margin-top: 18px;
  font-size: 1.06rem;
  line-height: 1.65;
  color: #6f5653;
  max-width: 56ch;
}

.safe-text {
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

.btn-cta {
  background: linear-gradient(135deg, #7e2319, #ff1e00);
  color: #fff;
  font-weight: 800;
  border-radius: 16px;
  padding: 12px 20px;
  box-shadow: 0 18px 40px rgba(217, 59, 43, 0.22);
}

.btn-soft {
  background: rgba(255, 255, 255, 0.76);
  color: #be2716;
  border: 1px solid rgba(217, 59, 43, 0.12);
  border-radius: 16px;
  padding: 12px 20px;
  font-weight: 800;
  backdrop-filter: blur(10px);
}

.btn-ghost-strong {
  background: rgba(255, 255, 255, 0.38);
  border: 1px solid rgba(217, 59, 43, 0.10);
  color: #6c4b47;
  border-radius: 16px;
  padding: 12px 18px;
  backdrop-filter: blur(12px);
  font-weight: 700;
}

.btn-outline-soft {
  background: #fff;
  border: 1px solid rgba(217, 59, 43, 0.12);
  color: #b13224;
  border-radius: 14px;
}

.mini-card {
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(217, 59, 43, 0.08);
  border-radius: 18px;
  backdrop-filter: blur(12px);
  box-shadow: 0 18px 40px rgba(125, 66, 58, 0.08);
}

.icon-badge {
  width: 40px;
  height: 40px;
  min-width: 40px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  color: #c63729;
  background: linear-gradient(135deg, rgba(255, 107, 87, 0.18), rgba(217, 59, 43, 0.10));
  border: 1px solid rgba(217, 59, 43, 0.10);
}

.icon-badge.small {
  width: 36px;
  height: 36px;
  min-width: 36px;
}

.mini-title {
  font-weight: 800;
  color: #2b1d1d;
}

.mini-sub {
  font-size: 0.84rem;
  color: #6f5653;
}

.hero-card {
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(217, 59, 43, 0.12);
  border-radius: 24px;
  backdrop-filter: blur(16px);
  box-shadow: 0 26px 70px rgba(121, 67, 60, 0.14);
  color: #2a1e1e;
}

.hero-card-sub {
  color: #7c6160;
}

.price {
  font-weight: 900;
  letter-spacing: 0.2px;
  color: #2a1e1e;
}

.price-big {
  font-size: 4rem;
  line-height: 1;
}

.price-dec {
  font-size: 1.3rem;
  opacity: 0.9;
}

.price-note {
  font-size: 0.8rem;
  color: #8b6f6b;
  margin-top: 4px;
}

.badge-highlight {
  background: linear-gradient(135deg, rgba(255, 107, 87, 0.18), rgba(217, 59, 43, 0.12));
  border: 1px solid rgba(217, 59, 43, 0.12);
  color: #a42f22;
  font-weight: 700;
}

.pack-title {
  font-weight: 800;
  color: #2a1e1e;
}

.pack-row {
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-bottom: 12px;
}

.pack-item {
  color: #5f4947;
  line-height: 1.35;
}

.check {
  color: #d93b2b;
  margin-top: 2px;
}

.scroll-down {
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  color: #9d4a40;
  z-index: 3;
}

@media (max-width: 1023px) {
  .hero {
    padding-top: 84px;
    min-height: auto;
    padding-bottom: 52px;
  }

  .hero-bg {
    background-image: url('/ceo2.jpeg');
    background-position: center top;
  }

  .hero-overlay {
    background:
      linear-gradient(180deg, rgba(255, 249, 248, 0.96) 0%, rgba(255, 248, 246, 0.88) 36%, rgba(255, 246, 244, 0.90) 100%);
  }

  .hero-title {
    max-width: 100%;
  }

  .price-big {
    font-size: 3.2rem;
  }
}

/* SECTIONS */
.section {
  padding: 82px 0;
}

.section-soft {
  background:
    radial-gradient(900px 380px at 10% 0%, rgba(255, 107, 87, 0.10), transparent 55%),
    linear-gradient(180deg, #fff7f6 0%, #fffdfc 100%);
}

.section-light {
  background: #fffdfc;
  color: #201616;
}

.section-pricing {
  background:
    radial-gradient(900px 380px at 90% 10%, rgba(255, 107, 87, 0.10), transparent 56%),
    linear-gradient(180deg, #fff7f5 0%, #fff4f2 100%);
}

.section-head {
  text-align: center;
  max-width: 820px;
  margin: 0 auto;
}

.section-head.left {
  text-align: left;
  margin: 0;
}

.kicker {
  display: inline-block;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.78rem;
  color: #ca1f0c;
  margin-bottom: 10px;
}

.section-title {
  font-size: clamp(1.75rem, 2.4vw, 2.7rem);
  line-height: 1.15;
  margin: 0;
  color: #231717;
}

.section-sub {
  margin-top: 12px;
  color: #715856;
  line-height: 1.6;
}

/* FEATURE CARDS */
.feature-card {
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(217, 59, 43, 0.08);
  border-radius: 22px;
  transition: transform 0.22s ease, box-shadow 0.22s ease, border-color 0.22s ease;
  box-shadow: 0 16px 44px rgba(126, 73, 65, 0.08);
}

.feature-card:hover {
  transform: translateY(-4px);
  border-color: rgba(217, 59, 43, 0.14);
  box-shadow: 0 22px 54px rgba(126, 73, 65, 0.12);
}

.feature-icon {
  width: 46px;
  height: 46px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, rgba(255, 107, 87, 0.20), rgba(217, 59, 43, 0.10));
  border: 1px solid rgba(217, 59, 43, 0.10);
  color: #c8382a;
}

.feature-text {
  color: #6f5653;
  line-height: 1.6;
}

/* CTA STRIP */
.cta-strip {
  display: flex;
  gap: 18px;
  justify-content: space-between;
  align-items: center;
  padding: 22px;
  border-radius: 22px;
  background: linear-gradient(135deg, rgba(255, 255, 255, 0.78), rgba(255, 247, 244, 0.88));
  border: 1px solid rgba(217, 59, 43, 0.08);
  box-shadow: 0 18px 44px rgba(126, 73, 65, 0.08);
}

.cta-strip-title {
  font-weight: 800;
  color: #251818;
}

.cta-strip-sub {
  color: #735b58;
  margin-top: 4px;
}

@media (max-width: 600px) {
  .cta-strip {
    flex-direction: column;
    align-items: stretch;
  }
}

/* PARALLAX */
.parallax-wrap {
  position: relative;
  height: 42vh;
  overflow: hidden;
  border-bottom: 1px solid rgba(217, 59, 43, 0.06);
}

.parallax-img {
  position: absolute;
  inset: 0;
  background-image: url('/kamila.png');
  background-size: contain;
  background-position: center;
  background-attachment: fixed;
  filter: saturate(0.94) brightness(1.03);
}

.parallax-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(255, 253, 252, 0.10), rgba(255, 253, 252, 1));
}

/* ABOUT / INFO */
.about-card,
.info-card,
.contact-card {
  border-radius: 22px;
  background: #ffffff;
  border: 1px solid rgba(217, 59, 43, 0.08);
  box-shadow: 0 18px 46px rgba(123, 71, 65, 0.08);
}

.about-avatar {
  border: 1px solid rgba(217, 59, 43, 0.08);
  overflow: hidden;
}

.chip {
  background: rgba(255, 107, 87, 0.10);
  border: 1px solid rgba(217, 59, 43, 0.10);
  color: #a63225;
}

.img-soft {
  border-radius: 20px;
  border: 1px solid rgba(217, 59, 43, 0.08);
  box-shadow: 0 16px 40px rgba(129, 74, 68, 0.08);
}

/* PRICING */
.pricing-card {
  border-radius: 24px;
  background: linear-gradient(180deg, #fffefe 0%, #fff7f5 100%);
  border: 1px solid rgba(217, 59, 43, 0.10);
  color: #251919;
  box-shadow: 0 24px 60px rgba(126, 73, 65, 0.12);
}

.pricing-sub,
.pricing-caption {
  color: #7c6360;
}

.price-line {
  display: grid;
  gap: 6px;
}

.check2 {
  color: #d93b2b;
  margin-top: 2px;
}

.pack-item2 {
  color: #604947;
  line-height: 1.35;
}

/* CONTACT */
.contact-form {
  background: #ffffff;
  padding: 18px;
  border-radius: 22px;
  border: 1px solid rgba(217, 59, 43, 0.08);
  box-shadow: 0 16px 44px rgba(126, 73, 65, 0.08);
}

.insta-link {
  color: #ca1f0c;
  font-weight: 800;
  text-decoration: none;
}

.tip {
  border-radius: 18px;
  background: linear-gradient(180deg, #fff8f7 0%, #fff5f3 100%);
  border: 1px solid rgba(217, 59, 43, 0.08);
}

/* FOOTER */
.footer {
  text-align: center;
  color: #6e5754;
}

.devlink {
  font-weight: 800;
  color: #ca1f0c;
  text-decoration: none;
  border-bottom: 1px dashed rgba(196, 55, 40, 0.35);
}

/* ANIMAÇÃO AUXILIAR */
.fade-in {
  opacity: 0;
  animation: fade 0.55s ease forwards;
}

@keyframes fade {
  to {
    opacity: 1;
  }
}
</style>