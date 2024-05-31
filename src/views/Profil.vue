<template>
  <div>
    <h1>Mes billets</h1>
    <div class="lists-billets">
      <Ticket
        v-for="ticket in tickets"
        :key="ticket.id"
        :cle="ticket.key"
        :titre="ticket.titre"
        :date="ticket.date"
        :price="ticket.price"
        :id="ticket.id"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Ticket from "../components/Ticket.vue";

export default {
  name: "profil-user",
  components: {
    Ticket,
  },
  computed: {
    ...mapGetters("tickets", ["userTickets"]),
    tickets() {
      return this.userTickets;
    },
  },
  created() {
    this.$store.dispatch("tickets/loadTickets");
  },
};
</script>

<style scoped>
h1 {
  text-align: center;
  margin-top: 30px;
}

.lists-billets {
  margin-top: 30px;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  margin-bottom: 100px;
}
</style>
