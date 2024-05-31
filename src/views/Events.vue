<template>
  <div class="container">
    <h1>Événements</h1>
    <input
      type="search"
      v-model="search"
      placeholder="Rechercher un événement"
    />
    <div class="list-events">
      <CardEvent v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script>
import CardEvent from "../components/CardEvent";

export default {
  name: "EventsJO2024",
  components: {
    CardEvent,
  },
  data() {
    return {
      search: "",
    };
  },
  created() {
    this.$store.dispatch("events/fetchEvents");
  },
  methods: {
    loadEventOffers(eventId) {
      this.$store.dispatch("offers/fetchEventOffers", eventId);
    },
  },
  computed: {
    events() {
      const storeEvents = this.$store.getters["events/allEvents"];

      if (this.search) {
        return storeEvents.filter((event) =>
          event.titre.toLowerCase().includes(this.search.toLowerCase())
        );
      }

      return storeEvents;
    },
  },
};
</script>

<style scoped>
.container {
  margin-bottom: 100px;
}

h1 {
  margin: 100px;
  margin-bottom: 30px;
  text-align: center;
}

input {
  display: block;
  margin-left: auto;
  margin-right: auto;
  padding: 20px;
  max-width: 500px;
  width: 100%;
  font-weight: 500;
  font-size: 16px;
  margin-bottom: 50px;
  border-radius: 5px;
  border: 1px solid #000;
  outline: none;
}
input:active {
  outline: none;
  border: none;
}

input:focus {
  outline: 1px solid #d7c47c;
  border: none;
}

.list-events {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(540px, 1fr));
  gap: 20px;
}
</style>
