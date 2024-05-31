// store/index.js
import { createStore } from "vuex";
import events from "./modules/events";
import offers from "./modules/offers";
import cart from "./modules/cart";
import auth from "./modules/auth";
import tickets from "./modules/tickets";

export default createStore({
  modules: {
    events,
    offers,
    cart,
    auth,
    tickets,
  },
});
