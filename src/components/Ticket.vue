<template>
  <div class="tickets">
    <div class="left">
      <div class="qrcode">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/5/5e/QR_Code_example.png"
          alt=""
        />
      </div>
    </div>
    <div class="middle">
      <h2>{{ titre }}</h2>
      <div class="info">
        <section>
          <div class="title">DATE</div>
          <div>{{ date }}</div>
        </section>
        <section>
          <div class="title">PRIX</div>
          <div>{{ price }}€</div>
        </section>
        <section>
          <div class="title">KEY</div>
          <div>{{ cle }}</div>
        </section>
      </div>
    </div>
    <div class="right">
      <h3>#{{ id }}</h3>
    </div>
  </div>
</template>

<script>
export default {
  name: "ticket-jo",
  props: {
    id: Number,
    titre: String,
    date: String,
    price: String,
    cle: String,
  },
};
</script>

<style>
.tickets {
  display: flex;
  max-width: 600px;
  max-height: 250px;
  border: 1px solid #dd3f3e;
}

.tickets .left {
  padding: 20px;
  width: 30%;
  background: #dd3f3e;
}

.tickets .middle {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 10px;
  width: 60%;
}

.tickets .right {
  padding: 10px;
  width: 10%;
}

.qrcode {
  width: 100%;
  height: 100%;
}

.qrcode img {
  object-fit: contain;
  width: 100%;
  height: 100%;
}

.info {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 10px;
}

.info section {
  display: flex;
  flex-direction: column;
  font-weight: 700;
  font-size: 14px;
  gap: 10px;
}
</style>
