<template>
  <div class="navbar">
    <div class="left">
      <router-link to="/" class="logo">
        <img src="../assets/images/logo.png" alt="" />
      </router-link>
      <ul>
        <li><router-link to="/">Accueil</router-link></li>
        <li><router-link to="/events">Evenements</router-link></li>
      </ul>
    </div>
    <div class="right">
      <router-link to="/panier" class="basket">
        <span>{{ cartItemCount }}</span>
        <i class="fa-solid fa-basket-shopping"></i>
      </router-link>
      <router-link v-if="!isAuthenticated" to="/connexion" class="connexion">
        Je me connecte
      </router-link>
      <router-link v-if="isAuthenticated" to="/profil" class="user">
        <i class="fa-solid fa-circle-user"></i>
      </router-link>
      <span class="logout" @click="logout" v-if="isAuthenticated">
        <i class="fa-solid fa-arrow-right-from-bracket"></i>
      </span>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "NavbarJo",
  computed: {
    ...mapGetters("auth", ["isAuthenticated"]),
    ...mapGetters("cart", ["cartItemCount"]),
  },
  methods: {
    ...mapActions("auth", ["logout"]),
    logout() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/");
    },
  },
};
</script>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #000;
  padding: 20px 20px;
}

.left {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 20px;
}

.navbar .logo {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  gap: 20;
}
.navbar .logo img {
  object-fit: contain;
  width: 60px;
  height: 60px;
}

.navbar .right .logout i {
  cursor: pointer;
  font-size: 20px;
  color: #fff;
  transition: 0.2s ease;
}

.navbar .right .logout:hover i {
  color: #d7c47c;
}

.navbar ul {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  gap: 20px;
  align-items: center;
}

.navbar ul li a {
  color: #fff;
  transition: 0.2s ease;
}

.navbar ul li a:hover {
  color: #d7c47c;
}

.right {
  display: flex;
  justify-content: end;
  align-items: center;
  gap: 30px;
}

.right .connexion {
  padding: 10px 30px;
  background: #fff;
  color: #000;
  border-radius: 30px;
  font-size: 18px;
  font-weight: 600;
}

.right .basket {
  position: relative;
}

.right .user i {
  font-size: 40px;
  color: #fff;
  transition: 0.2s ease;
}

.right .user:hover i {
  color: #d7c47c;
}

.right .basket i {
  font-size: 20px;
  color: #fff;
}

.right .basket span {
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  position: absolute;
  top: 0;
  right: 0;
  margin-top: -15px;
  margin-right: -15px;
  background: #d7c47c;
  color: #000;
  width: 15px;
  height: 15px;
  padding: 10px;
  border-radius: 50%;
}
</style>
