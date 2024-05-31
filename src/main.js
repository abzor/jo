// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";
import "./assets/css/style.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const app = createApp(App);

// Ajoutez Axios à l'instance Vue
axios.defaults.baseURL = process.env.VUE_APP_API_URL;
axios.defaults.headers.common[
  "Authorization"
] = `Bearer ${process.env.VUE_APP_API_STRAPI}`;

app.use(router);
app.use(store);

app.mount("#app");
