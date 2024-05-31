import { createRouter, createWebHistory } from "vue-router";
import Accueil from "./views/Accueil.vue";
import Events from "./views/Events.vue";
import EventId from "./views/EventId.vue";
import Profil from "./views/Profil.vue";
import Panier from "./views/Panier.vue";
import Inscription from "./views/Inscription.vue";
import Connexion from "./views/Connexion.vue";
import store from "@/store";

const routes = [
  {
    path: "/",
    name: "Accueil",
    component: Accueil,
  },
  {
    path: "/connexion",
    name: "Connexion",
    component: Connexion,
  },
  {
    path: "/inscription",
    name: "Inscription",
    component: Inscription,
  },
  {
    path: "/events",
    name: "Evenements",
    component: Events,
  },
  {
    path: "/event/:id",
    name: "Event",
    component: EventId,
  },
  {
    path: "/profil",
    name: "Profil",
    component: Profil,
  },
  {
    path: "/panier",
    name: "Panier",
    component: Panier,
    meta: { requiresAuth: true },
  },
  // Ajoutez d'autres routes ici
];

// Créez l'instance du routeur
const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (!store.getters["auth/isAuthenticated"]) {
      next({
        path: "/connexion",
        query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});

export default router;
