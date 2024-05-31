import axios from "axios";

const state = {
  items: [],
};

const getters = {
  cartItems: (state) => {
    console.log("Getter - cartItems:", state.items);
    return state.items;
  },
  cartItemCount: (state) => state.items.length,
  cartTotalPrice: (state) => {
    return state.items.reduce(
      (total, item) => total + parseFloat(item.price.replace(",", ".")),
      0
    );
  },
};

const mutations = {
  SET_CART: (state, items) => {
    state.items = items.map((item) => ({
      id: item.id,
      titre: item.attributes.titre,
      desc: item.attributes.desc,
      price: item.attributes.price,
      date: item.attributes.date,
    }));
  },
};

const actions = {
  async addToCart({ commit, rootGetters }, item) {
    if (!rootGetters["auth/isAuthenticated"]) {
      // Rediriger vers la page de connexion
      this.$router.push("/connexion");
      return;
    }

    const userId = rootGetters["auth/currentUser"].id;
    const userCarts = await axios.get(
      `/paniers?populate=*&filters[users_permissions_user][id][$eq]=${userId}`
    );

    if (userCarts.data.data.length) {
      // Si l'utilisateur a un panier, mettre à jour le panier avec le nouvel article
      const cartId = userCarts.data.data[0].id;
      await axios.put(`/paniers/${cartId}`, {
        data: {
          offres: [
            ...userCarts.data.data[0].attributes.offres.data.map(
              (offre) => offre.id
            ),
            item.id,
          ],
          total: String(
            parseFloat(userCarts.data.data[0].attributes.total) +
              parseFloat(item.price.replace(",", "."))
          ),
        },
      });

      // Mettre à jour le state du panier dans Vuex
      const updatedCart = await axios.get(`/paniers/${cartId}?populate=*`);
      commit("SET_CART", updatedCart.data.data.attributes.offres.data);
    } else {
      // Si l'utilisateur n'a pas de panier, en créer un et ajouter le nouvel article
      const newCart = await axios.post("/paniers", {
        data: {
          total: String(item.price.replace(",", ".")),
          statut: "En cours",
          users_permissions_user: userId,
          offres: [item.id],
        },
      });

      // Mettre à jour le state du panier dans Vuex
      const fetchedNewCart = await axios.get(
        `/paniers/${newCart.data.data.id}?populate=*`
      );
      commit("SET_CART", fetchedNewCart.data.data.attributes.offres.data);
    }
  },

  async removeFromCart({ commit, rootGetters }, itemId) {
    if (!rootGetters["auth/isAuthenticated"]) {
      // Rediriger vers la page de connexion
      this.$router.push("/connexion");
      return;
    }

    const userId = rootGetters["auth/currentUser"].id;
    const userCarts = await axios.get(
      `/paniers?populate=*&filters[users_permissions_user][id][$eq]=${userId}`
    );

    if (userCarts.data.data.length) {
      const cartId = userCarts.data.data[0].id;
      const itemToRemove = userCarts.data.data[0].attributes.offres.data.find(
        (offre) => offre.id === itemId
      );
      const updatedOffres =
        userCarts.data.data[0].attributes.offres.data.filter(
          (offre) => offre.id !== itemId
        );

      let updatedTotal = 0;
      if (itemToRemove && itemToRemove.price) {
        updatedTotal = (
          parseFloat(userCarts.data.data[0].attributes.total) -
          parseFloat(itemToRemove.price.replace(",", "."))
        ).toFixed(2);
      }

      await axios.put(`/paniers/${cartId}`, {
        data: {
          offres: updatedOffres.map((offre) => offre.id),
          total: String(updatedTotal),
        },
      });

      // Mettre à jour le state du panier dans Vuex
      const updatedCart = await axios.get(`/paniers/${cartId}?populate=*`);
      commit("SET_CART", updatedCart.data.data.attributes.offres.data);
    }
  },

  async loadCart({ commit, rootGetters }) {
    if (!rootGetters["auth/isAuthenticated"]) {
      // Rediriger vers la page de connexion
      this.$router.push("/connexion");
      return;
    }

    const userId = rootGetters["auth/currentUser"].id;
    const userCarts = await axios.get(
      `/paniers?populate=*&filters[users_permissions_user][id][$eq]=${userId}`
    );

    if (userCarts.data.data.length) {
      const cartId = userCarts.data.data[0].id;
      const fetchedCart = await axios.get(`/paniers/${cartId}?populate=*`);
      commit("SET_CART", fetchedCart.data.data.attributes.offres.data);
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
