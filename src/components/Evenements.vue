<template>
  <div>
    <div class="title-event">
      <h2>Evenements</h2>
      <router-link to="/events">
        <i class="fa-solid fa-arrow-right"></i>
      </router-link>
    </div>
    <div class="lists-events">
      <CardEvent v-for="event in events" :key="event.id" :event="event" />
    </div>
  </div>
</template>

<script>
import CardEvent from "./CardEvent.vue";
export default {
  name: "event-jo",
  components: {
    CardEvent,
  },
  created() {
    this.$store.dispatch("events/fetchEvents");
  },
  computed: {
    events() {
      const storeEvents = this.$store.getters["events/allEvents"];
      return storeEvents.slice(0, 4);
    },
  },
};
</script>

<style scoped>
h2 {
  margin: 20px 0;
  font-size: 25px;
}
.lists-events {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(540px, 1fr));
  gap: 20px;
}

.title-event {
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title-event a {
  display: inline-block;
  padding: 10px 15px;
  background: #fff;
  border: 1px solid #000;
  transition: 0.2s ease;
  border-radius: 5px;
}

.title-event a:hover {
  background: #d7c47c;
  border: 1px solid #d7c47c;
}

.title-event a i {
  color: #000;
  font-size: 18px;
}
</style>
