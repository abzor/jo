<template>
  <div class="filtre">
    <div class="offers">
      <span>Offres : </span>
      <label class="radio-button">
        <input
          type="radio"
          name="offer"
          value="solo"
          @change="onFilterChange"
        />
        <span class="radio"></span>
        <i class="fa-solid fa-user"></i>
      </label>
      <label class="radio-button">
        <input type="radio" name="offer" value="duo" @change="onFilterChange" />
        <span class="radio"></span>
        <i class="fa-solid fa-user-group"></i>
      </label>
      <label class="radio-button">
        <input
          type="radio"
          name="offer"
          value="famille"
          @change="onFilterChange"
        />
        <span class="radio"></span>
        <i class="fa-solid fa-users"></i>
      </label>
    </div>
  </div>
</template>

<script>
export default {
  name: "filter-offer",
  methods: {
    onFilterChange(event) {
      this.$emit("changeFilter", event.target.value);
    },
  },
};
</script>

<style scoped>
.filtre {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  justify-content: end;
  gap: 20px;
}

.list-sports {
  display: flex;
  align-items: center;
}

.list-sports select {
  padding: 10px;
  border-radius: 5px;
  background: #fff;
  border: 1px solid #ddd;
}

.offers {
  display: flex;
  align-items: center;
}

.radio-button {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 10px;
  position: relative;
  align-items: center;
  color: #000;
}

.radio-button input[type="radio"] {
  position: absolute;
  opacity: 0;
}

.radio {
  position: relative;
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid #000;
  transform: translateZ(-25px);
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

.radio::before {
  position: absolute;
  content: "";
  width: 6px;
  height: 6px;
  top: 5px;
  left: 5px;
  border-radius: 50%;
  background-color: #fff;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  opacity: 0;
  transition: all 0.3s ease-in-out;
}

.radio-button input[type="radio"]:checked + .radio {
  border-color: #000;
  transform: translateZ(0px);
  background-color: #000;
}

.radio-button input[type="radio"]:checked + .radio::before {
  opacity: 1;
}
</style>
