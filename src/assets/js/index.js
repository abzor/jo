import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    cart: [],
    offers: [],
    events: [],
    eventOffers: {},
  },
  mutations: {
    SET_CART(state, cart) {
      state.cart = cart;
    },
    UPDATE_OFFER_QUANTITIES(state) {
      state.offers.forEach((offer) => {
        const cartItem = state.cart.find((item) => item.id === offer.id);
        if (cartItem) {
          offer.quantity -= cartItem.quantity;
        }
      });
    },
    ADD_TO_CART(state, offerId) {
      const offer = state.offers.find((o) => o.id === offerId);
      if (offer && offer.quantity > 0) {
        const cartItem = state.cart.find((item) => item.id === offerId);
        if (cartItem) {
          cartItem.quantity++;
        } else {
          state.cart.push({ ...offer, quantity: 1 });
        }
        offer.quantity--;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    REMOVE_FROM_CART(state, offerId) {
      const cartItemIndex = state.cart.findIndex((item) => item.id === offerId);
      if (cartItemIndex !== -1) {
        const cartItem = state.cart[cartItemIndex];
        const offer = state.offers.find((o) => o.id === offerId);
        if (offer) {
          offer.quantity += cartItem.quantity;
        }
        state.cart.splice(cartItemIndex, 1);
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    INCREASE_QUANTITY(state, offerId) {
      const cartItem = state.cart.find((item) => item.id === offerId);
      const offer = state.offers.find((o) => o.id === offerId);
      if (cartItem && offer && offer.quantity > 0) {
        cartItem.quantity++;
        offer.quantity--;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    DECREASE_QUANTITY(state, offerId) {
      const cartItem = state.cart.find((item) => item.id === offerId);
      const offer = state.offers.find((o) => o.id === offerId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        offer.quantity++;
        localStorage.setItem("cart", JSON.stringify(state.cart));
      }
    },
    SET_EVENTS(state, events) {
      state.events = events.map((event) => ({
        ...event.attributes,
        id: event.id,
      }));
    },
    SET_EVENT_OFFERS(state, { eventId, offers }) {
      state.eventOffers[eventId] = offers;
    },
  },

  actions: {
    loadCart({ commit }) {
      const cart = localStorage.getItem("cart");
      if (cart) {
        commit("SET_CART", JSON.parse(cart));
        commit("UPDATE_OFFER_QUANTITIES");
      }
    },
    async fetchEvents({ commit }) {
      try {
        const response = await axios.get("/evenements?populate=*");
        const events = response.data.data;
        console.log("evenements : ", events);
        commit("SET_EVENTS", events);
      } catch (error) {
        console.error(error);
      }
    },
    async fetchEventOffers({ commit }, eventId) {
      try {
        const response = await axios.get(`/evenements/${eventId}?populate=*`);
        const event = response.data.data;
        const offers = event.attributes.offres.data.map(
          (offer) => offer.attributes
        );
        console.log("offres : ", offers);
        commit("SET_EVENT_OFFERS", { eventId, offers });
      } catch (error) {
        console.error(error);
      }
    },
  },
  getters: {
    cartItemCount: (state) => {
      return state.cart.length;
    },
    cartItems: (state) => {
      return state.cart;
    },
    cartTotalPrice: (state) => {
      return state.cart.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    availableOffers: (state) => {
      return state.offers.filter((offer) => offer.quantity > 0);
    },
    allEvents: (state) => {
      return state.events;
    },
    getEventOffers: (state) => (eventId) => {
      return state.eventOffers[eventId] || [];
    },
  },
});
