<template>
  <div class="hero" v-if="event">
    <img
      :src="`https://jo.doonun.com${event.img.data.attributes.url}`"
      alt=""
    />
    <h1>{{ event.titre }}</h1>
    <p>{{ event.desc }}</p>
    <p><strong>Ville:</strong> {{ event.lieu }}</p>
    <p><strong>Date:</strong> {{ event.date }}</p>
    <div class="hero-after"></div>
  </div>
  <div class="container">
    <div class="billets">
      <h2>Billets</h2>
      <div v-for="offer in filteredOffers" :key="offer.id" class="card-billet">
        <div class="infos-billet">
          <p>{{ offer.type }}</p>
          <h3>{{ offer.titre }}</h3>
          <p>{{ offer.desc }}</p>
          <div class="bottom">
            <p class="price">{{ offer.price }}€</p>
            <button class="add" @click="addToCart(offer)">
              Ajouter au panier
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";

export default {
  name: "EventId",
  data() {
    return {
      event: null,
    };
  },
  computed: {
    ...mapGetters("offers", ["getEventInfo", "getEventOffers"]),
    ...mapGetters("cart", ["cartItemCount"]),
    filteredOffers() {
      const offers = this.getEventOffers(this.$route.params.id);
      return offers;
    },
  },
  created() {
    const eventId = this.$route.params.id;
    this.fetchEvent(eventId);
    this.fetchEventOffers(eventId);
  },
  methods: {
    ...mapActions("offers", ["fetchEventOffers"]),
    ...mapMutations("cart", ["ADD_TO_CART"]),
    async fetchEvent(eventId) {
      try {
        const event = await this.getEventInfo(eventId);
        this.event = event;
      } catch (error) {
        console.error(error);
      }
    },
    addToCart(offer) {
      console.log("Adding to cart:", offer);
      this.$store.dispatch("cart/addToCart", offer);
    },
  },
};
</script>

<style scoped>
h1 {
  color: #fff;
  z-index: 3;
}
.hero p {
  z-index: 3;
  color: #fff;
  max-width: 600px;
  font-size: 20px;
  font-weight: 400;
  line-height: 1.5rem;
  width: 100%;
  text-align: center;
}

.hero {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px;
  background-size: cover;
  background-position: center center;
  width: 100%;
  height: 400px;
  z-index: 1;
  gap: 20px;
}

.hero img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 1;
}
.hero-after {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 400px;
  background: rgba(0, 0, 0, 0.8);
  z-index: 2;
}

h2 {
  margin-top: 40px;
  margin-bottom: 30px;
  text-align: center;
}

.card-billet {
  display: flex;
  align-items: stretch;
  padding: 20px;
  background: #fff;
  transition: 0.2s ease;
  gap: 10px;
  border: 1px solid #000;
  border-radius: 5px;
  margin-bottom: 20px;
}

.img-billet {
  display: flex;
  align-items: stretch;
  min-width: 100px;
  max-width: 100px;
  width: 100%;
  border-radius: 5px;
  gap: 10px;
}
.img-billet img {
  min-width: 100px;
  max-width: 100px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
}

.infos-billet {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.infos-billet p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.bottom {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.price {
  font-size: 18px;
  font-weight: 600;
}

.add {
  cursor: pointer;
  display: block;
  padding: 10px 20px;
  border: 1px solid #000;
  border-radius: 5px;
  background: #fff;
  font-weight: 600;
  font-size: 16px;
  min-width: 150px;
  width: auto;
  margin-left: auto;
  transition: 0.2s ease;
}

.add:hover {
  background: #d7c47c;
  border: 1px solid #d7c47c;
}
</style>
