<template>
  <q-layout view="hHh lpR fFf" class="page">
    <q-header elevated class="topbar "  style="overflow: hidden!important;">
      <q-toolbar class="q-px-md" >
        <q-toolbar-title class="brand-title">
          <div style="overflow: hidden!important;" class="text-weight-bold"><strong>Flávia</strong><strong>Kamila</strong></div>
          <div style="overflow: hidden!important;" v-if="!isMobile" class="brand-sub">Aprendizagem • Cronotipo • Estratégia de estudos</div>
        </q-toolbar-title>

        <div class="row items-center q-gutter-sm" >
          <q-btn flat class="btn-ghost desktop-only" label="Início" @click="scrollTo('inicio')" />
          <q-btn flat class="btn-ghost desktop-only" label="Como funciona" @click="scrollTo('como')" />
          <q-btn flat class="btn-ghost desktop-only" label="Sobre" @click="scrollTo('sobre')" />
          <q-btn flat class="btn-ghost desktop-only" label="Planos" @click="scrollTo('planos')" />
          <q-btn flat class="btn-ghost desktop-only" label="Contato" @click="scrollTo('contato')" />

          <q-btn dense unelevated class="btn-outline desktop-only" icon="login" label="Login" to="/login" />
          <q-btn dense unelevated class="btn-primary text-grey-3" icon="person_add" label="Registrar" to="/login" />

          <q-btn dense flat round icon="menu" class="mobile-only">
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
                <q-item clickable v-close-popup to="/admin">
                  <q-item-section avatar><q-icon name="admin_panel_settings" /></q-item-section>
                  <q-item-section>Admin</q-item-section>
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

        <div class="container hero-content">
          <div class="row items-center q-col-gutter-xl">
            <div class="col-12 col-md-7">
              <div class="badge fade-in" style="font-size: .7rem;">
                <q-icon name="verified" size="18px" class="q-mr-xs" />
                Métodos de aprendizagem com base em evidências
              </div>

              <h1 class="hero-title safe-text fade-in delay-1"  style="overflow: hidden!important;">
                Descubra seu <span class="grad">estilo de aprendizado</span>,
                seu <span class="grad">cronotipo</span> e receba um
                <span class="grad">relatório personalizado</span> para estudar melhor.
              </h1>
<!-- 
              <p class="hero-sub safe-text fade-in delay-2">
                Um complemento contendo material didático utilizando formulários inteligentes que analisam suas respostas e geram
                um plano prático: como estudar, quando estudar e como manter constância — do seu jeito.
              </p> -->

              <div class="row q-col-gutter-sm q-mt-md fade-in delay-3">
                <div class="col-12 col-sm-auto">
                  <q-btn class="btn-cta full-width text-grey-3" unelevated icon-right="arrow_forward" label="Começar agora" to="/app" />
                </div>
                <div class="col-12 col-sm-auto">
                  <q-btn class="btn-cta-2 full-width text-grey-3" unelevated icon-right="apps" label="Curso Completo" to="/curso" />
                </div>
                <div class="col-12 col-sm-auto">
                  <q-btn class="btn-ghost-strong full-width" unelevated icon="play_circle" label="Ver como funciona" @click="scrollTo('como')" />
                </div>
              </div>

              <div class="row q-col-gutter-sm q-mt-lg fade-in delay-4">
                <div class="col-12 col-sm-4">
                  <q-card flat class="mini-card">
                    <q-card-section class="row items-center no-wrap">
                      <q-icon name="schedule" size="20px" class="q-mr-sm" />
                      <div>
                        <div class="mini-title">Rápido</div>
                        <div class="mini-sub">Relatório em minutos</div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-12 col-sm-4">
                  <q-card flat class="mini-card">
                    <q-card-section class="row items-center no-wrap">
                      <q-icon name="psychology" size="20px" class="q-mr-sm" />
                      <div>
                        <div class="mini-title">Personalizado</div>
                        <div class="mini-sub">Baseado em você</div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
                <div class="col-12 col-sm-4">
                  <q-card flat class="mini-card">
                    <q-card-section class="row items-center no-wrap">
                      <q-icon name="done_all" size="20px" class="q-mr-sm" />
                      <div>
                        <div class="mini-title">Aplicável</div>
                        <div class="mini-sub">Plano prático</div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </div>
            </div>

            <div class="col-12 col-md-5">
              <q-card class="hero-card fade-in delay-2" bordered>
                <q-card-section>
                  <div class="text-h6 text-weight-bold q-mb-xs">Diagnóstico + Relatório</div>
                  <div class="text-subtitle2 text-grey-6 q-mb-md">
                    Descubra seu perfil e leve um plano para aplicar ainda hoje.
                  </div>

                  <div class="row items-end q-col-gutter-sm q-mb-md">
                    <div class="col">
                      <div class="price-label">A partir de</div>
                      <div class="price">
                        R$ <span class="price-big">49</span><span class="price-dec">,90</span>
                      </div>
                      <div class="price-note">Pagamento único</div>
                    </div>
                    <div class="col-auto">
                      <q-badge class="badge-highlight" rounded>Mais vendido</q-badge>
                    </div>
                  </div>

                  <q-separator />

                  <div class="q-mt-md">
                    <div class="pack-title">Pacote incluído</div>

                    <div class="q-mt-sm">
                      <div class="row items-start q-mb-sm">
                        <q-icon name="check_circle" class="check" />
                        <div class="pack-item safe-text">Formulário de estilo de aprendizagem</div>
                      </div>
                      <div class="row items-start q-mb-sm">
                        <q-icon name="check_circle" class="check" />
                        <div class="pack-item safe-text">Formulário de cronotipo (melhor horário do dia)</div>
                      </div>
                      <div class="row items-start q-mb-sm">
                        <q-icon name="check_circle" class="check" />
                        <div class="pack-item safe-text">Relatório personalizado + recomendações práticas</div>
                      </div>
                      <div class="row items-start q-mb-sm">
                        <q-icon name="check_circle" class="check" />
                        <div class="pack-item safe-text">Sugestão de rotina e método de estudo</div>
                      </div>
                    </div>

                    <q-btn class="btn-cta q-mt-md full-width text-grey-3" unelevated label="Quero meu relatório" icon-right="auto_awesome" to="/app" />
                    <q-btn class="btn-outline-soft q-mt-sm full-width" unelevated label="Já tenho conta — fazer login" icon="login" to="/login" />
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>

        <q-btn class="scroll-down desktop-only" round flat icon="keyboard_arrow_down" @click="scrollTo('como')" />
      </section>

      <!-- COMO FUNCIONA -->
      <section id="como" class="section section-dark">
        <div class="container">
          <div class="section-head">
            <div class="kicker">Como funciona</div>
            <h2 class="section-title safe-text" style="overflow: hidden!important;">Você responde. O sistema calcula. Você aplica.</h2>
            <p class="section-sub safe-text">
              Simples e direto: o objetivo é te dar clareza e um caminho prático, sem enrolação.
            </p>
          </div>

          <div class="row q-col-gutter-lg q-mt-md">
            <div class="col-12 col-md-4">
              <q-card class="feature-card" bordered>
                <q-card-section>
                  <div class="feature-icon"><q-icon name="assignment" size="24px" /></div>
                  <div class="text-h6 text-weight-bold q-mt-sm">1) Formulários</div>
                  <div class="text-body2 text-grey-4 q-mt-xs safe-text">
                    Você responde perguntas objetivas sobre rotina, preferências e comportamento de estudo.
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-4">
              <q-card class="feature-card" bordered>
                <q-card-section>
                  <div class="feature-icon"><q-icon name="psychology_alt" size="24px" /></div>
                  <div class="text-h6 text-weight-bold q-mt-sm">2) Diagnóstico</div>
                  <div class="text-body2 text-grey-4 q-mt-xs safe-text">
                    O sistema identifica seu estilo de aprendizagem e seu cronotipo com base nas respostas.
                  </div>
                </q-card-section>
              </q-card>
            </div>

            <div class="col-12 col-md-4">
              <q-card class="feature-card" bordered>
                <q-card-section>
                  <div class="feature-icon"><q-icon name="description" size="24px" /></div>
                  <div class="text-h6 text-weight-bold q-mt-sm">3) Relatório</div>
                  <div class="text-body2 text-grey-4 q-mt-xs safe-text">
                    Você recebe um relatório com recomendações práticas e um plano claro para executar.
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>

          <div class="cta-strip q-mt-xl">
            <div>
              <div class="text-weight-bold">Quer parar de estudar no escuro?</div>
              <div class="text-grey-4">Comece com um diagnóstico simples e um plano que faz sentido pra você.</div>
            </div>
            <q-btn class="btn-cta text-grey-3" unelevated label="Começar agora" icon-right="arrow_forward" to="/app" />
          </div>
        </div>
      </section>

      <!-- SOBRE -->
      <section id="sobre" class="section section-light" :style="isMobile ? 'padding-top: 60px;' : 'padding-top: 0px;'">
        <div class="parallax-wrap desktop-only">
          <div class="parallax-img" />
          <div class="parallax-overlay" />
        </div>

        <div class="container">
          <div class="section-head">
            <div class="kicker">Sobre</div>
            <h2 class="section-title safe-text" style="overflow: hidden!important;">Humanizado, realista e aplicável.</h2>
            <p class="section-sub safe-text">
              Estratégias de estudo não funcionam iguais pra todo mundo — por isso aqui a regra é personalizar.
            </p>
          </div>

          <div class="row q-col-gutter-xl items-center q-mt-lg">
            <div class="col-12 col-md-6">
              <q-card class="about-card" bordered>
                <q-card-section class="row items-center q-col-gutter-md">
                  <div class="col-auto" >
                    <q-avatar style="overflow: hidden!important;" size="72px" class="about-avatar">
                      <img src="/kamila.png" alt="Flávia Kamila" />
                    </q-avatar>
                  </div>
                  <div class="col">
                    <div class="text-h6 text-weight-bold" >Flávia Kamila</div>
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
              <img src="/missao.svg" alt="Sobre" class="img-soft full-width" />
            </div>
          </div>

          <div class="row q-col-gutter-lg q-mt-xl">
            <div class="col-12 col-md-6">
              <q-card class="info-card" bordered>
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
              <q-card class="info-card" bordered>
                <q-card-section>
                  <div class="text-h6 text-weight-bold">Visão</div>
                  <div class="text-body2 text-grey-7 q-mt-xs safe-text">
                    Ser referência em estratégias individualizadas, transformando vidas por meio do estudo com propósito.
                  </div>
                </q-card-section>
                <q-card-section class="q-pt-none">
                  <img src="/visao.svg" alt="Visão" class="img-soft full-width" />
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </section>

      <!-- PLANOS -->
      <section id="planos" class="section section-dark">
        <div class="container">
          <div class="section-head">
            <div class="kicker">Planos</div>
            <div class="section-title safe-text" style="overflow: hidden!important;">Um pacote direto ao ponto</div>
            <p class="section-sub safe-text">
              Você compra, responde e recebe seu relatório personalizado. Sem mensalidade.
            </p>
          </div>

          <div class="row justify-center q-mt-lg">
            <div class="col-12 col-md-6">
              <q-card class="pricing-card" bordered>
                <q-card-section>
                  <div class="row items-center justify-between">
                    <div>
                      <div class="text-h6 text-weight-bold">Diagnóstico + Relatório</div>
                      <div class="text-body2 text-grey-4">Ideal para iniciar com clareza e método</div>
                    </div>
                    <q-badge class="badge-highlight" rounded>Recomendado</q-badge>
                  </div>

                  <div class="price-line q-mt-md">
                    <div class="price">
                      R$ <span class="price-big">49</span><span class="price-dec">,90</span>
                    </div>
                    <div class="text-caption text-grey-4">Pagamento único (você altera depois)</div>
                  </div>

                  <q-separator class="q-my-md" />

                  <div class="pack-title">Inclui</div>
                  <div class="q-mt-sm">
                    <div class="row items-start q-mb-sm">
                      <q-icon name="check" class="check2" />
                      <div class="pack-item2 safe-text">Estilo de aprendizagem + recomendações</div>
                    </div>
                    <div class="row items-start q-mb-sm">
                      <q-icon name="check" class="check2" />
                      <div class="pack-item2 safe-text">Cronotipo + melhor janela de estudos</div>
                    </div>
                    <div class="row items-start q-mb-sm">
                      <q-icon name="check" class="check2" />
                      <div class="pack-item2 safe-text">Plano prático (rotina, técnicas e prioridades)</div>
                    </div>
                    <div class="row items-start q-mb-sm">
                      <q-icon name="check" class="check2" />
                      <div class="pack-item2 safe-text">Relatório final organizado e pronto pra aplicar</div>
                    </div>
                  </div>

                  <q-btn class="btn-cta q-mt-md full-width text-grey-3" unelevated label="Garantir meu relatório" icon-right="arrow_forward" to="/app" />
                  <div class="text-caption text-grey-5 q-mt-sm">
                    Ao continuar, você será direcionado para os formulários do diagnóstico.
                  </div>
                </q-card-section>
              </q-card>
            </div>
          </div>
        </div>
      </section>

      <!-- CONTATO -->
      <section id="contato"  class="section section-light">
        <div class="container">
          <div class="row items-start q-col-gutter-xl">
            <div class="col-12 col-md-6">
              <div class="section-head left">
                <div class="kicker">Contato</div>
                <h2 class="section-title safe-text" style="overflow: hidden!important;">Fale comigo</h2>
                <p class="section-sub safe-text">
                  Tem dúvida, sugestão ou quer entender qual caminho faz mais sentido pra você?
                  Envie sua mensagem — vou te responder com atenção.
                </p>
              </div>

              <q-form class="contact-form">
                <q-input color="deep-purple-8" filled label="Nome" class="q-mb-md" />
                <q-input color="deep-purple-8" filled label="E-mail" type="email" class="q-mb-md" />
                <q-input color="deep-purple-8" filled label="Mensagem" type="textarea" class="q-mb-md" />
                <q-btn label="Enviar mensagem" color="deep-purple-14" glossy class="q-py-md full-width" icon-right="send" type="submit" />
              </q-form>

              <div class="row items-center q-gutter-sm q-mt-lg">
                <img src="/insta.png" style="width: 34px" alt="Instagram" />
                <a class="insta text-deep-purple-4" href="https://instagram.com/flaviakamilaf" target="_blank" rel="noreferrer" >
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
                    <span class="text-weight-bold">método errado</span> ou <span class="text-weight-bold">horário errado</span>.
                    O diagnóstico resolve os dois.
                  </div>

                  <q-separator class="q-my-md" />

                  <div class="row q-col-gutter-md">
                    <div class="col-12 col-sm-6">
                      <q-card flat class="tip">
                        <q-card-section class="row items-center no-wrap">
                          <q-icon name="bolt" size="20px" class="q-mr-sm" />
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
                          <q-icon name="event" size="20px" class="q-mr-sm" />
                          <div>
                            <div class="mini-title">Ritmo</div>
                            <div class="mini-sub">quando você rende mais</div>
                          </div>
                        </q-card-section>
                      </q-card>
                    </div>
                  </div>

                  <q-btn class="btn-cta q-mt-md full-width text-grey-3" unelevated label="Fazer o diagnóstico agora" icon-right="auto_awesome" to="/app" />
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
          </footer>
        </div>
      </section>
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { ref } from 'vue';

const isMobile = window.innerWidth < 650;

function scrollTo(id) {
  const el = document.getElementById(id)
  if (!el) return
  el.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<style scoped>
/* ===============================
   FIX DEFINITIVO: SEM "FLASH" NO LOAD
   =============================== */
:global(html),
:global(body),
:global(#q-app) {
  width: 100%;
  max-width: 100%;
  overflow-x: clip; /* evita scrollbar aparecer/sumir */
}

:global(*),
:global(*::before),
:global(*::after) {
  box-sizing: border-box;
}

/* Flex/grid: impede coluna estourar por texto */
:global(.row > [class*="col-"]) {
  min-width: 0;
}

/* ===============================
   PALETA / BASE
   =============================== */
.page {
  background: #07070a;
  color: #f4f4f5;
}

.page-container {
  overflow-x: clip;
}

.container {
  width: 100%;
  max-width: 1180px;
  margin: 0 auto;
  padding: 0 clamp(14px, 2vw, 18px);
}

/* Responsivo helpers */
.desktop-only { display: block; }
.mobile-only { display: none; }
@media (max-width: 1023px) {
  .desktop-only { display: none !important; }
  .mobile-only { display: block !important; }
}

/* ===============================
   HEADER
   =============================== */
.topbar {
  background: linear-gradient(90deg, rgba(124,58,237,.22), rgba(20,184,166,.14));
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255,255,255,.08);
}

.brand-avatar { border: 1px solid rgba(255,255,255,.2); }
.brand-title { line-height: 1.1; }
.brand-sub { font-size: .78rem; opacity: .85; }

.btn-ghost { color: rgba(255,255,255,.92); letter-spacing: .4px; }
.btn-outline { border: 1px solid rgba(255,255,255,.35); color: #fff; }
.btn-primary {
  background: linear-gradient(90deg, #7c3aed, #14b8a6);
  color: #0b0b10;
  font-weight: 800;
}
.menu-mobile {
  background: rgba(10,10,14,.98);
  border: 1px solid rgba(255,255,255,.08);
  border-radius: 14px;
}

/* ===============================
   HERO (sem transform que cause overflow)
   =============================== */
.hero {
  position: relative;
  min-height: 92vh;
  display: flex;
  align-items: center;
  overflow: hidden; /* garante clip do bg */
  padding: 86px 0 40px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background-image: url('/homeDesk.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(900px 420px at 20% 25%, rgba(124,58,237,.35), transparent 60%),
    radial-gradient(800px 400px at 80% 40%, rgba(20,184,166,.22), transparent 55%),
    linear-gradient(180deg, rgba(5,5,8,.55), rgba(5,5,8,.86));
}

.hero-content { position: relative; z-index: 2; }

.badge {
  display: inline-flex;
  align-items: center;
  background: rgba(255,255,255,.09);
  border: 1px solid rgba(255,255,255,.14);
  padding: 8px 12px;
  border-radius: 999px;
  font-size: .9rem;
  width: fit-content;
  margin-bottom: 16px;
}

.hero-title {
  font-size: clamp(2rem, 2.6vw, 3.1rem);
  line-height: 1.05;
  margin: 0;
}

.grad {
  background: linear-gradient(90deg, #a78bfa, #5eead4);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}

.hero-sub {
  margin-top: 12px;
  font-size: 1.05rem;
  line-height: 1.45;
  color: rgba(255,255,255,.86);
  max-width: 58ch;
}

.safe-text {
  max-width: 100%;
  overflow-wrap: anywhere;
  word-break: break-word;
  hyphens: auto;
}

.btn-cta {
  background: linear-gradient(90deg, #7c3aed, #14b8a6);
  color: #0b0b10;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 18px;
}
.btn-cta-2 {
  background: linear-gradient(-90deg, #7c3aed, #14b8a6);
  color: #0b0b10;
  font-weight: 900;
  border-radius: 14px;
  padding: 12px 18px;
}

.btn-ghost-strong {
  background: rgba(255,255,255,.10);
  border: 1px solid rgba(255,255,255,.16);
  color: #fff;
  border-radius: 14px;
  padding: 12px 18px;
}

.btn-outline-soft {
  background: transparent;
  border: 1px solid rgba(255,255,255,.18);
  color: rgba(255,255,255,.92);
  border-radius: 14px;
}

.mini-card {
  background: rgba(255,255,255,.08);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 16px;
}
.mini-title { font-weight: 800; }
.mini-sub { font-size: .83rem; opacity: .9; }

.hero-card {
  background: rgba(16,16,22,.72);
  border: 1px solid rgba(255,255,255,.12);
  border-radius: 18px;
  backdrop-filter: blur(10px);
  max-width: 100%;
}

.price-label { font-size: .85rem; opacity: .85; }
.price { font-weight: 900; letter-spacing: .4px; }
.price-big { font-size: 2.3rem; }
.price-dec { font-size: 1.25rem; opacity: .9; }
.price-note { font-size: .78rem; opacity: .82; margin-top: 4px; }

.badge-highlight {
  background: linear-gradient(90deg, rgba(167,139,250,.22), rgba(94,234,212,.18));
  border: 1px solid rgba(255,255,255,.12);
  color: #fff;
}

.pack-title { font-weight: 800; letter-spacing: .2px; }
.check { color: #5eead4; margin-right: 10px; margin-top: 2px; }

.scroll-down {
  position: absolute;
  left: 50%;
  bottom: 14px;
  transform: translateX(-50%);
  color: rgba(255,255,255,.85);
  z-index: 3;
}

@media (max-width: 1023px) {
  .hero-bg { background-image: url('/ceo2.jpeg'); }
  .hero { padding-top: 74px; min-height: 95vh; }
}

/* ===============================
   SECTIONS
   =============================== */
.section { padding: 74px 0; }

.section-dark {
  background: radial-gradient(900px 420px at 30% 20%, rgba(124,58,237,.16), transparent 60%),
              radial-gradient(800px 400px at 80% 60%, rgba(20,184,166,.10), transparent 60%),
              #07070a;
}

.section-light {
  background: #f6f7fb;
  color: #0f172a;
}

.section-head { text-align: center; max-width: 820px; margin: 0 auto; }
.section-head.left { text-align: left; margin: 0; }
.kicker {
  display: inline-block;
  font-weight: 900;
  letter-spacing: .16em;
  text-transform: uppercase;
  font-size: .78rem;
  opacity: .85;
  margin-bottom: 10px;
}
.section-title {
  font-size: clamp(1.6rem, 2.1vw, 2.2rem);
  line-height: 1.12;
  margin: 0;
}
.section-sub { margin-top: 10px; opacity: .9; line-height: 1.5; }

/* Feature cards */
.feature-card {
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.10);
  border-radius: 18px;
  transition: transform .2s ease, border-color .2s ease;
}
.feature-card:hover { transform: translateY(-4px); border-color: rgba(255,255,255,.20); }

.feature-icon {
  width: 44px; height: 44px;
  border-radius: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, rgba(124,58,237,.25), rgba(20,184,166,.18));
  border: 1px solid rgba(255,255,255,.14);
}

/* CTA strip */
.cta-strip {
  display: flex;
  gap: 18px;
  justify-content: space-between;
  align-items: center;
  padding: 18px;
  border-radius: 18px;
  background: rgba(255,255,255,.06);
  border: 1px solid rgba(255,255,255,.10);
}
@media (max-width: 600px) {
  .cta-strip { flex-direction: column; align-items: stretch; }
}

/* Parallax desktop */
.parallax-wrap { position: relative; height: 44vh; overflow: hidden; }
.parallax-img {
  position: absolute;
  inset: 0;
  background-image: url('/desc.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;
}
.parallax-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(246,247,251,.0), rgba(246,247,251,1));
}

/* About / info */
.about-card, .info-card, .contact-card { border-radius: 18px; background: #ffffff; }
.about-avatar { border: 1px solid rgba(15,23,42,.12); }
.chip { background: rgba(124,58,237,.10); border: 1px solid rgba(124,58,237,.18);overflow: hidden!important; }
.img-soft { border-radius: 18px; border: 1px solid rgba(15,23,42,.10); }

/* Pricing */
.pricing-card {
  border-radius: 18px;
  background: rgba(16,16,22,.78);
  border: 1px solid rgba(255,255,255,.12);
  color: #fff;
  backdrop-filter: blur(10px);
  max-width: 100%;
}
.price-line { display: grid; gap: 6px; }
.check2 { color: #5eead4; margin-right: 10px; margin-top: 2px; }
.pack-item2 { color: rgba(255,255,255,.92); line-height: 1.25; }

/* Contact (SEM 100vw => sem flash) */
.contact-hero {
  width: 100% !important;
  max-width: 100% !important;
  display: block;
}

.contact-form {
  background: #ffffff;
  padding: 16px;
  border-radius: 18px;
  border: 1px solid rgba(15,23,42,.08);
}

.insta { color: #0f172a; font-weight: 900; text-decoration: none; }
.tip { border-radius: 16px; background: rgba(124,58,237,.08); border: 1px solid rgba(124,58,237,.12); }

/* Footer */
.footer { text-align: center; opacity: .9; }
.devlink {
  font-weight: 900;
  color: #0f172a;
  text-decoration: none;
  border-bottom: 1px dashed rgba(15,23,42,.35);
}

/* ===============================
   ANIMAÇÃO SEM "PULO" VISUAL
   (nada de transform que estoura largura)
   =============================== */
.fade-in {
  opacity: 0;
  animation: fade .55s ease forwards;
}
.delay-1 { animation-delay: .08s; }
.delay-2 { animation-delay: .16s; }
.delay-3 { animation-delay: .24s; }
.delay-4 { animation-delay: .32s; }

@keyframes fade {
  to { opacity: 1; }
}
</style>