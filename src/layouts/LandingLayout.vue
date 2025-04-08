<template>
  <q-layout view="hHh lpR fFf">

    <q-header elevated class="bg-grad-1 text-black" height-hint="98">
      <q-toolbar>
        <q-toolbar-title>
          Flávia Kamila
        </q-toolbar-title>
        <q-btn dense glossy label="Acessar App" color="green" icon-right="login" class="q-px-md" />
      </q-toolbar>

      <q-tabs align="center">
        <q-route-tab >
          <a href="#inicio">Início</a>
        </q-route-tab>
        <q-route-tab>
          <a href="#sobre">Sobre</a>
        </q-route-tab>
        <q-route-tab>
          <a href="#contato">Contato</a>
        </q-route-tab>
      </q-tabs>
    </q-header>

    <q-page-container class="animate__animated animate__fadeIn">

      <!-- HOME -->
      <section id="inicio" class="q-pa-md home-section">
        <div class="content-overlay q-pa-lg animate__animated animate__fadeInLeft animate__slow">
          <h1 class="text-h2 text-center q-mb-xl text-bold">Conheça o Aplicativo</h1>
          <p class="text-subtitle text-center q-pb-xl">
            Descubra seu <strong>perfil de aprendizagem</strong> e receba <strong>recomendações
              personalizadas</strong> com nosso <strong>formulário interativo</strong>
          </p>

          <div class="flex flex-center q-mt-md">
            <q-btn label="Criar Plano de Estudos" color="blue" glossy to="#" icon-right="library_books"
              class="q-pa-xl full-width full-width-sm" />
          </div>
        </div>
      </section>

      <!-- SOBRE -->
      <section id="sobre" class="q-pa-xl bg-grey-1">
        <div class="q-mb-xl">
          <div class="q-gutter-md row items-center justify-center q-col-gutter-lg">
            <div class="col-12 col-md-6">
              <h2 class="text-h4 text-bold q-mb-md">Sobre o Aplicativo</h2>
              <div class="col-12 col-md-6">
                <img src="/sobre.png" alt="Sobre o app" class="greyscale responsive-img">
              </div>
              <p class="text-body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Integer nec odio. 
                Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet.
              </p>
              <p class="text-body1 q-mt-sm">
                Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. 
                Mauris massa. Vestibulum lacinia arcu eget nulla.
              </p>
            </div>
          </div>
          <div class="row items-center q-col-gutter-xl">
            <!-- Imagem ilustrativa -->
            <div class="col-12 col-md-6">
              <img src="/sobre2.png" alt="Sobre" class="greyscale full-width rounded-borders" />
            </div>

            <!-- Texto Quem Sou -->
            <div class="col-12 col-md-6">
              <h2 class="text-h4 text-bold q-mb-md">Quem sou</h2>
              <p class="text-body1">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisi vel consectetur interdum,
                nisl nisi cursus sapien, in auctor risus mauris a nibh. Integer fringilla magna vel lacus facilisis
                tincidunt.
              </p>
            </div>
          </div>
        </div>

        <!-- Bloco com dois textos -->
        <div class="row q-col-gutter-xl">
          <div class="col-12 col-md-6">
            <h3 class="text-h5 text-bold q-mb-sm">Missão</h3>
            <p class="text-body1">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis a metus ac nulla consequat aliquet id quis
              turpis.
            </p>
            <div class="col-12 col-md-6">
              <img src="/sobre3.png" alt="Sobre" class="greyscale full-width rounded-borders" />
            </div>
          </div>

          <div class="col-12 col-md-6">
            <h3 class="text-h5 text-bold q-mb-sm">Visão</h3>
            <p class="text-body1">
              Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Mauris blandit aliquet elit, eget
              tincidunt nibh pulvinar.
            </p>
            <div class="col-12 col-md-6">
              <img src="/sobre4.png" alt="Sobre" class="greyscale full-width rounded-borders" />
            </div>
          </div>
        </div>
      </section>

      <!-- CONTATO -->
      <section id="contato" class="q-pa-xl section-default bg-grey-2">
        <div class="q-gutter-md row items-center justify-center q-col-gutter-lg">
          <div class="col-12 col-md-6">
            <h2 class="text-h4 text-bold q-mb-md">Entre em Contato</h2>
            <p class="text-body1 q-mb-md">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
            <q-form>
              <q-input filled label="Nome" class="q-mb-md" />
              <q-input filled label="E-mail" type="email" class="q-mb-md" />
              <q-input filled label="Mensagem" type="textarea" class="q-mb-md" />
              <q-btn label="Enviar Mensagem" color="blue-14" glossy class="w100" icon-right="send" type="submit" />
            </q-form>
          </div>
          <div class="w100 row no-wrap justify-center items-center">
            <img src="/insta.png" style="width:40px" class="q-mr-md" alt="Ilustração contato">
            <a class="cursor-pointer text-shadow" href="https://instagram.com/flaviakamilaf">@flaviakamilaf</a>
          </div>
          <div class="col-12 col-md-6">
            <img src="/home2.png" alt="Ilustração contato" class="shadow-2 responsive-img">
          </div>
        </div>
      </section>
      <footer class="q-pa-md bg-grey-3 text-center">
        <p class="text-body2">© 2025 <strong>Flávia Kamila</strong>. Todos os direitos reservados.</p>
        <p class="text-body2">Desenvolvido por <a class="text-bold text-shadow" href="https://samuelvictorol.github.io/portfolio/">
          Samuel Victor
        </a></p>
      </footer>
    </q-page-container>

  </q-layout>
</template>

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
  min-height: 92vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden; /* para esconder o excesso do pseudo-elemento */
  z-index: 1;
}

.home-section::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: url('/home.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  filter: grayscale(100%);
  z-index: -1; /* coloca a imagem atrás do conteúdo da seção */
}
.content-overlay {
  background-color:#ffffffb6;
  max-width: 700px;
  backdrop-filter: blur(8px);
  width: 100%;
  border-radius: 8px;
  color: rgb(28, 28, 28);
  text-align: center;
  filter: drop-shadow(0 0 10px rgba(0, 0, 0, 0.5));
  border: 1px solid white;
}

.section-default {
  width: 100%;
}

.greyscale {
  filter: grayscale(1)
}

.responsive-img {
  width: 100%;  
  max-width: 500px;
  border-radius: 12px;
  display: block;
  margin: auto;
}

.text-subtitle {
  font-size: 1.2rem;
  line-height: 1.5;
  color: #343434;
}

/* Responsivo */
@media (max-width: 600px) {
  .content-overlay {
    padding: 1rem;
    border-radius: 12px;
  }

  .home-section {
    padding: 1rem;
    background-position: top;
  }

  h1,
  h2 {
    font-size: 1.5rem;
  }

  p {
    font-size: 1rem;
  }

  .section-default {
    padding: 2rem 1rem;
  }
}
</style>
