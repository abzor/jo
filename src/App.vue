<template>
  <Navbar />
  <router-view></router-view>
  <Footer />
</template>

<script>
import Navbar from "./components/Navbar.vue";
import Footer from "./components/Footer.vue";
import { mapActions } from "vuex";
export default {
  name: "App",
  components: {
    Navbar,
    Footer,
  },
  methods: {
    ...mapActions("auth", ["initializeAuth"]),
  },
  created() {
    this.initializeAuth();
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
