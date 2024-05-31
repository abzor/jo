import axios from "axios";

const state = {
  token: localStorage.getItem("token") || null,
  user: JSON.parse(localStorage.getItem("user")) || null,
};

const mutations = {
  SET_TOKEN(state, token) {
    state.token = token;
  },
  SET_USER(state, user) {
    state.user = user;
  },
  RESET_AUTH(state) {
    state.token = null;
    state.user = null;
  },
};

const actions = {
  async register({ commit }, userData) {
    const response = await axios.post("/auth/local/register", userData);
    const { jwt: token, user } = response.data;
    commit("SET_TOKEN", token);
    commit("SET_USER", user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return { token, user };
  },
  async login({ commit }, credentials) {
    const response = await axios.post("/auth/local", credentials);
    const { jwt: token, user } = response.data;
    commit("SET_TOKEN", token);
    commit("SET_USER", user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return { token, user };
  },
  logout({ commit }) {
    commit("RESET_AUTH");
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
};

const getters = {
  isAuthenticated: (state) => !!state.token,
  currentUser: (state) => state.user,
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
