<template>
  <div class="container">
    <h1>Mon panier</h1>
    <p class="text" v-if="cartItems.length === 0">
      Vous n'avez pas d'article dans votre panier
    </p>
    <div class="lists-panier" v-else>
      <div v-for="item in cartItems" :key="item.id" class="card-article">
        <div class="info">
          <h3>{{ item.titre }}</h3>
          <p>{{ item.desc }}</p>
          <p class="price">{{ item.price }}€</p>
        </div>
        <div class="delete" @click="handleRemoveFromCart(item.id)">
          <i class="fa-solid fa-xmark"></i>
        </div>
      </div>
    </div>
    <div class="total" v-if="cartItems.length > 0">
      <p>Total (TTC) : {{ cartTotalPrice }}€</p>
      <button @click="handleCheckout()">Valider le panier</button>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import axios from "axios";

export default {
  name: "PanierUser",
  computed: {
    ...mapGetters("cart", ["cartItems", "cartTotalPrice"]),
    ...mapGetters("auth", ["currentUser"]),
  },
  methods: {
    ...mapActions("cart", ["removeFromCart", "loadCart"]),
    handleRemoveFromCart(id) {
      this.removeFromCart(id);
      console.log("Removed from cart:", id);
    },
    async handleCheckout() {
      const jwtToken = localStorage.getItem("jwtToken");
      try {
        // Générer une nouvelle clé pour chaque billet
        const tickets = this.cartItems.map((item) => ({
          qrcode: `https://jo.doonun.com/billet${Math.random()
            .toString(36)
            .substring(7)}`,
          key: Math.random().toString(36).substring(7),
          titre: item.titre,
          date: item.date,
          price: item.price,
          users_permissions_user: this.currentUser.id,
          token_user: jwtToken,
        }));

        // Poster chaque billet individuellement sur le serveur
        await Promise.all(
          tickets.map((ticket) => axios.post("/billets", { data: ticket }))
        );

        // Effacer le panier
        await this.clearCart();

        // Recharger le panier
        await this.loadCart();

        // Rediriger l'utilisateur vers la page de profil
        window.location.href = "/profil";
      } catch (error) {
        console.error("Error during checkout:", error);
        // Afficher un message d'erreur à l'utilisateur
        // ...
      }
    },
    async clearCart() {
      const userId = this.currentUser.id;
      const userCarts = await axios.get(
        `/paniers?populate=*&filters[users_permissions_user][id][$eq]=${userId}`
      );

      if (userCarts.data.data.length) {
        const cartId = userCarts.data.data[0].id;
        await axios.delete(`/paniers/${cartId}`);
        this.loadCart();
      }
    },
  },
  created() {
    this.loadCart();
    console.log("Cart loaded:", this.cartItems);
  },
};
</script>

<style scoped>
.container {
  margin-bottom: 100px;
}
h1 {
  text-align: center;
  margin-top: 30px;
}

.text {
  margin-top: 10px;
  text-align: center;
}

.lists-panier {
  border-top: 1px solid #000;
  border-left: 1px solid #000;
  border-right: 1px solid #000;
  border-bottom: 0px solid #000;
  margin-top: 30px;
}

.card-article {
  display: flex;
  border-bottom: 1px solid #000;
}

.card-article .info {
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 90%;
}

.card-article .info .price {
  font-size: 18px;
  font-weight: 600;
}

.quantity-control {
  display: flex;
  align-items: center;
}
.quantity-control button {
  background-color: #f0f0f0;
  border: 1px solid #ccc;
  padding: 5px 10px;
  cursor: pointer;
}
.quantity-control input {
  width: 50px;
  text-align: center;
  border: 1px solid #ccc;
  margin: 0 5px;
}

.card-article .delete {
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border-left: 1px solid #000;
  width: 10%;
  transition: 0.2s ease;
}

.card-article .delete:hover {
  background: rgb(255, 35, 35);
}

.card-article .delete:hover i {
  color: #fff;
}

.total {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 10px;
}

.total p {
  text-align: end;
}

button {
  cursor: pointer;
  border: none;
  background: blue;
  color: #fff;
  padding: 10px 20px;
  font-weight: 600;
  transition: 0.2s ease;
}

button:hover {
  background: #000;
}
</style>
