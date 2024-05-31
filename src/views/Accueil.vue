<template>
  <div>
    <Hero />
    <Evenements />

    <div class="container">
      <h2>Ce qu'il faut savoir sur les JO</h2>
      <section>
        <div>
          <img
            src="https://olympics.com/orgassets/pierre-de-coubertin/medias/film/film-12.jpg"
            alt=""
          />
        </div>
        <div class="block">
          <h3>Le fondateur</h3>
          <p>
            Les Jeux Olympiques sont un événement sportif international majeur
            qui se déroule tous les quatre ans, en alternance entre les Jeux
            Olympiques d'été et les Jeux Olympiques d'hiver. Ils ont été créés
            en 1896 par Pierre de Coubertin, un éducateur français, dans le but
            de promouvoir la paix mondiale et l'amitié entre les nations à
            travers le sport.
          </p>
        </div>
      </section>
      <section>
        <div class="block">
          <h3>Les jeux d'été et d'hiver</h3>
          <p>
            Les Jeux Olympiques d'été comprennent des sports tels que
            l'athlétisme, la natation, le basketball, le football et le tennis,
            tandis que les Jeux Olympiques d'hiver incluent des sports comme le
            ski alpin, le patinage artistique et le hockey sur glace.
          </p>
        </div>
        <div>
          <img
            src="https://cdn-europe1.lanmedia.fr/var/europe1/storage/images/europe1/sport/jo-tennis-monfils-elimine-en-quarts-par-nishikori-2819611/28410436-1-fre-FR/JO-Tennis-Monfils-elimine-en-quarts-par-Nishikori.jpg"
            alt=""
          />
        </div>
      </section>
      <section>
        <div>
          <img
            src="https://cdn.futura-sciences.com/buildsv6/images/largeoriginal/c/e/2/ce23232e06_50212922_jeux-olympiques-1.jpg"
            alt=""
          />
        </div>
        <div class="block">
          <h3>Le nombre de participants</h3>
          <p>
            Plus de 200 nations participent aux Jeux Olympiques, ce qui en fait
            l'événement sportif le plus diversifié au monde. Les Jeux Olympiques
            sont régis par le Comité International Olympique (CIO), qui est
            responsable de l'organisation et de la supervision des Jeux.
          </p>
        </div>
      </section>
      <section>
        <div class="block">
          <h3>Les valeurs</h3>
          <p>
            Les valeurs fondamentales des Jeux Olympiques sont l'excellence,
            l'amitié et le respect. Ils visent à encourager la compétition
            saine, le fair-play et le dépassement de soi, tout en célébrant la
            diversité culturelle et en promouvant la compréhension mutuelle.
          </p>
        </div>
        <div>
          <img
            src="https://media.cnn.com/api/v1/images/stellar/prod/210726160634-team-roc-july-26.jpg?q=x_306,y_128,h_1717,w_3052,c_crop/h_833,w_1480"
            alt=""
          />
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import Hero from "../components/Hero.vue";
import Evenements from "../components/Evenements.vue";
export default {
  name: "home-jo",
  components: {
    Hero,
    Evenements,
  },
};
</script>

<style scoped>
h2 {
  margin-top: 40px;
  margin-bottom: 30px;
}

.block {
  cursor: pointer;
  padding: 20px;
  border: 1px solid #000;
  transition: 0.2s ease;
}

.block:hover {
  background: #d7c47c;
}

section {
  max-width: 100%;
  margin: 0 auto;
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(40%, 1fr));
  margin-bottom: 20px;
}

section div {
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
  align-items: start;
}

section img {
  object-fit: cover;
  object-position: center;
  width: 100%;
  height: 100%;
}
</style>
