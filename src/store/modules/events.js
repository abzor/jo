import axios from "axios";

const state = {
  events: [],
};

const mutations = {
  SET_EVENTS(state, events) {
    state.events = events.map((event) => ({
      ...event.attributes,
      id: event.id,
    }));
  },
};

const actions = {
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
};

const getters = {
  allEvents: (state) => {
    return state.events;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
