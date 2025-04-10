<template>
  <q-layout view="hHh lpR fFf" class="bg-dark">

    <q-header elevated class="bg-grad-1 text-white shadow-2" height-hint="98" style="overflow: hidden;">
      <q-toolbar>
        <q-toolbar-title class="">
          Flávia Kamila
        </q-toolbar-title>
        <q-btn dense glossy label="Acessar" to="/admin" color="orange" icon-right="login" class="q-px-md" />
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab v-if="!isMobile"><a style="letter-spacing: .5px;" href="#inicio">Início</a></q-route-tab>
        <q-route-tab v-if="!isMobile"><a style="letter-spacing: .5px;" href="#sobre">Sobre</a></q-route-tab>
        <q-route-tab v-if="!isMobile"><a style="letter-spacing: .5px;" href="#contato">Contato</a></q-route-tab>
        <q-route-tab v-if="isMobile"><a style="letter-spacing: .5px;" href="#inicio"><q-icon name="home" size="md" color="grey"></q-icon></a></q-route-tab>
        <q-route-tab v-if="isMobile"><a style="letter-spacing: .5px;" href="#sobre"><q-icon name="contact_support" size="md" color="grey"></q-icon></a></q-route-tab>
        <q-route-tab v-if="isMobile"><a style="letter-spacing: .5px;" href="#contato"><q-icon name="mail" size="md" color="grey"></q-icon></a></q-route-tab>
      </q-tabs>
    </q-header>

    <q-page-container class="animate__animated animate__fadeIn">

      <!-- HOME -->
      <section id="inicio" class="q-pa-md home-section" style="border-bottom: 4px solid #2D2D2D">
        <div class="content-overlay q-pa-lg q-mx-sm animate__animated animate__zoomIn animate__slower animate__delay-1s">
          <p class="text-subtitle text-center">
            Descubra seu <strong>perfil de aprendizagem</strong> e receba um <strong>plano de estudos
              personalizado</strong> para atingir seus objetivos de forma eficiente.
          </p>
          <div class="flex flex-center q-mt-md">
            <q-btn label="Comece Agora" color="secondary" to="/app" icon-right="contact_support"
              class="q-py-lg full-width full-width-sm" />
          </div>
        </div>
      </section>

      <!-- SOBRE -->
      <section id="sobre" class="bg-grey-1">
        <div id="parallax-sobre" class="parallax-img"></div>
        <div class="q-mb-xl q-px-md">
          <div class="q-gutter-md row items-center justify-center q-col-gutter-lg">
            <div class="col-12 col-md-6">
              <p style="font-size:1.7em" class="text-bold q-mt-md">
                Com uma abordagem humanizada e baseada em evidências, ajudo pessoas a entenderem como aprendem melhor e
                a encontrarem o seu ritmo de estudos ideal.
              </p>
              <p style="font-size:1.2em" class="q-mt-sm q-mb-xl">
                Acredito que cada trajetória é única — por isso, meu trabalho é guiar com empatia, escuta ativa e
                estratégias realmente eficazes.
              </p>
            </div>
          </div>

          <div class="row items-center q-col-gutter-xl q-pt-lg q-px-xs">
            <div class="col-12 col-md-6">
              <img src="/sobre2.svg" alt="Quem sou" class="full-width rounded-borders" />
            </div>

            <div class="col-12 col-md-6">
              <h2 class="text-h4 text-bold q-mb-md" style="overflow: hidden;">Quem sou</h2>
              <p class="text-body1">
                Me chamo Flávia Kamila, sou especialista em educação personalizada e mentora de aprendizagem. Ao longo
                dos anos, acompanhei centenas de estudantes em sua jornada rumo à autonomia, autoconfiança e realização
                pessoal por meio dos estudos.
              </p>
            </div>
          </div>
        </div>

        <!-- Bloco com dois textos -->
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-6">
            <h3 class="text-h5 text-bold q-mb-sm q-pl-md">Missão</h3>
            <p class="text-body1 q-pl-md">
              Promover uma educação personalizada, acessível e acolhedora, que respeite o tempo, os limites e as
              potências de cada pessoa.
            </p>
            <div class="col-12 col-md-6">
              <img src="/sobre.svg" alt="Missão" class="q-px-md rounded-borders" id="missao-img" />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <h3 class="text-h5 text-bold q-mb-sm q-pl-md">Visão</h3>
            <p class="text-body1 q-pl-md">
              Ser referência no desenvolvimento de estratégias de aprendizagem individualizadas, transformando vidas por
              meio do conhecimento.
            </p>
            <div class="col-12 col-md-6">
              <img src="/sobre4.svg" alt="Visão" class="full-width rounded-borders" />
            </div>
          </div>
        </div>
      </section>

      <!-- CONTATO -->
      <img id="contato" src="/contato.avif" class="shadow-2 mobile-only" style="width: 100vw!important"
        alt="Ilustração">

      <section class="q-px-xl section-default bg-grey-2">
        <div class="q-gutter-md row items-center justify-center q-col-gutter-lg">
          <div class="col-12 col-md-6">
            <h2 class="text-h4 text-bold q-mb-md" style="overflow: hidden;">Fale Comigo</h2>
            <p class="text-body1 q-mb-md">
              Tem alguma dúvida, sugestão ou deseja iniciar sua jornada de autoconhecimento nos estudos? Envie sua
              mensagem — será um prazer conversar com você!
            </p>
            <q-form>
              <q-input filled label="Nome" class="q-mb-md" />
              <q-input filled label="E-mail" type="email" class="q-mb-md" />
              <q-input filled label="Mensagem" type="textarea" class="q-mb-md" />
              <q-btn label="Enviar Mensagem" color="green" glossy class="q-py-md w100" icon-right="send"
                type="submit" />
            </q-form>
          </div>
          <div class="w100 row no-wrap justify-center items-center q-mb-xl">
            <img src="/insta.png" style="width:40px" class="q-mr-md" alt="Instagram">
            <a class="cursor-pointer text-shadow" href="https://instagram.com/flaviakamilaf">@flaviakamilaf</a>
          </div>
        </div>
      </section>

      <footer class="q-pa-md bg-grey-3 text-center">
        <p class="text-body2">© 2025 <strong>Flávia Kamila</strong>. Todos os direitos reservados.</p>
        <p class="text-body2">
          Desenvolvido por <a class="text-bold text-shadow" href="https://samuelvictorol.github.io/portfolio/">
            Samuel Victor
          </a>
        </p>
      </footer>

    </q-page-container>
  </q-layout>
</template>
<script setup>

const isMobile = window.innerWidth <= 1023

</script>
<style scoped>
html {
  background: black;
}

a {
  text-decoration: none;
  color: inherit;
}

.home-section {
  position: relative;
  height: 89vh;
  display: flex;
  align-items: flex-end;
  justify-content: center;
  overflow: hidden;
  padding: 2rem 1rem 4rem;
  z-index: 1;
}

.home-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/homeDesk.jpeg');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  z-index: -1;
}

.content-overlay {
  background-color: #ffffffd1;
  max-width: 900px;
  width: 100vw;
  padding: 2rem;
  text-align: center;
  color: rgb(28, 28, 28);
  backdrop-filter: blur(4px);
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  border: 3px solid white;
  border-radius: 8px;
}

.section-default {
  width: 100%;
}

.greyscale {
  filter: grayscale(1);
}

#sobre-img {
  object-fit: scale-down;
}

.responsive-img {
  width: 100%;
  max-width: 500px;
  border-radius: 12px;
  display: block;
  margin: auto;
}

.text-subtitle {
  font-size: 1.1rem;
  line-height: 1.3;
  color: #343434;
}

.parallax-img {
  background-image: url('/desc.png');
  background-attachment: fixed;
  background-size: cover;
  background-position: center;
  height: 60vh;
  width: 100%;
}

/* RESPONSIVO */
@media (max-width: 1024px) {
  .home-section::before {
    background-image: url('/ceo2.jpeg');
    background-size: cover;
  }
  .parallax-img{
    background-size: contain;
    background-attachment: scroll; /* Remove o fixed no mobile */
  }
  .content-overlay {
    padding: 1.5rem;
  }
  #missao-img{
    width: 100%;
    max-width: 100%;
    height: auto;
  }
  #sobre-img {
    width: 100%;
    max-width: 100%;
    height: auto;
  }

  h1 {
    font-size: 2rem;
  }

  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }
}

@media (max-width: 600px) {
  .home-section {
    min-height: 80vh;
    padding: 1rem 0 3rem;
    align-items: flex-end;
  }
  .parallax-img {
    background-image: url('/descMob.png');
    background-size: cover;
  }

  .content-overlay {
    padding: 1rem;
    border-radius: 4px;
  }

  h1 {
    font-size: 1.6rem;
  }

  h2 {
    font-size: 1.3rem;
  }

  p {
    font-size: 0.95rem;
  }

  .section-default {
    padding: 2rem 1rem;
  }
}

/* Visibilidade condicional */
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
</style>
