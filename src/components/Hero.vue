<template>
  <div class="hero">
    <h1>Billetrie des JO 2024</h1>
    <p>
      Bienvenue sur la billetterie officielle des Jeux Olympiques et
      Paralympiques de Paris 2024 ! Pour vous connecter à votre compte ou en
      créer un, cliquez ci-dessous :
    </p>
    <router-link to="" class="btn connecte" v-if="!isAuthenticated">
      Créer un compte
    </router-link>
    <div class="hero-after"></div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "hero-jo",
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
  },
};
</script>

<style scoped>
h1 {
  color: #fff;
  z-index: 3;
}
p {
  z-index: 3;
  color: #fff;
  max-width: 600px;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5rem;
  width: 100%;
}

.connecte {
  z-index: 3;
  padding: 10px 30px;
  font-weight: 600;
  font-size: 18px;
  background: #d7c47c;
  border-radius: 30px;
  color: #000;
  z-index: 3;
}
.hero {
  position: relative;
  display: flex;
  align-items: start;
  flex-direction: column;
  justify-content: center;
  padding: 30px;
  background-image: url("../assets/images/banner.jpg");
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 400px;
  z-index: 1;
  gap: 20px;
}
.hero-after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2;
}
</style>
