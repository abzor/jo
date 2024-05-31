<template>
  <router-link :to="`/event/${event.id}`">
    <div class="card-event">
      <div class="img-event">
        <img
          :src="`https://jo.doonun.com${event.img.data.attributes.url}`"
          :alt="event.titre"
        />
      </div>
      <div class="infos-event">
        <h3>{{ event.titre }}</h3>
        <p>{{ event.desc }}</p>
        <p><strong>Ville:</strong> {{ event.lieu }}</p>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  name: "CardEvent",
  props: {
    event: {
      type: Object,
      required: true,
    },
  },
};
</script>

<style scoped>
a {
  display: inline-block;
}
.card-event {
  display: flex;
  align-items: stretch;
  padding: 10px;
  background: #fff;
  transition: 0.2s ease;
  gap: 10px;
  border: 1px solid #000;
  border-radius: 5px;
}

.card-event:hover {
  background: #d7c47c;
  border: 1px solid #d7c47c;
}

.img-event {
  display: flex;
  align-items: stretch;
  min-width: 100px;
  max-width: 100px;
  width: 100%;
  border-radius: 5px;
  gap: 10px;
}
.img-event img {
  min-width: 100px;
  max-width: 100px;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 5px;
}

.infos-event {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.infos-event p {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>
