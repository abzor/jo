import axios from "axios";

const state = {
  offers: [],
  eventOffers: {},
};

const mutations = {
  SET_OFFERS(state, offers) {
    state.offers = offers;
  },
  SET_EVENT_OFFERS(state, { eventId, event, offers }) {
    state.eventOffers[eventId] = { event, offers };
  },
};

const actions = {
  async fetchEventOffers({ commit }, eventId) {
    try {
      const response = await axios.get(`/evenements/${eventId}?populate=*`);
      const eventData = response.data.data;
      const event = eventData.attributes;
      const offers = eventData.attributes.offres.data.map((offer) => ({
        id: offer.id, // Assurez-vous que chaque offre possède un identifiant unique
        ...offer.attributes,
      }));
      commit("SET_EVENT_OFFERS", { eventId, event, offers });
    } catch (error) {
      console.error(error);
    }
  },
};

const getters = {
  availableOffers: (state) => {
    return state.offers.filter((offer) => offer.quantity > 0);
  },
  getEventInfo: (state) => (eventId) => {
    return state.eventOffers[eventId] ? state.eventOffers[eventId].event : null;
  },
  getEventOffers: (state) => (eventId) => {
    return state.eventOffers[eventId] ? state.eventOffers[eventId].offers : [];
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
