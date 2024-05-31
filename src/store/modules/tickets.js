import axios from "axios";

const state = {
  tickets: [],
};

const getters = {
  userTickets: (state) => {
    console.log("Getter - userTickets:", state.tickets);
    return state.tickets;
  },
};

const mutations = {
  SET_TICKETS: (state, tickets) => {
    state.tickets = tickets.map((ticket) => ({
      id: ticket.id,
      titre: ticket.attributes.titre,
      date: ticket.attributes.date,
      price: ticket.attributes.price,
      key: ticket.attributes.key,
    }));
  },
};

const actions = {
  async loadTickets({ commit, rootGetters }) {
    if (!rootGetters["auth/isAuthenticated"]) {
      // Rediriger vers la page de connexion
      this.$router.push("/connexion");
      return;
    }

    const userId = rootGetters["auth/currentUser"].id;
    const userTickets = await axios.get(
      `/billets?populate=*&filters[users_permissions_user][id][$eq]=${userId}`
    );

    if (userTickets.data.data.length) {
      commit("SET_TICKETS", userTickets.data.data);
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
