<template>
  <footer>
    <div class="container-footer">
      <p>&copy; 2024 JO. Tous droits réservés.</p>
      <ul class="social-links">
        <li>
          <a href="#"><i class="fab fa-facebook-f"></i></a>
        </li>
        <li>
          <a href="#"><i class="fab fa-twitter"></i></a>
        </li>
        <li>
          <a href="#"><i class="fab fa-instagram"></i></a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script>
export default {
  name: "Footer-jo",
};
</script>

<style scoped>
footer {
  background-color: #333;
  color: #fff;
  padding: 20px;
  margin-top: 300px;
}

.container-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.social-links {
  list-style: none;
  display: flex;
}

.social-links li {
  margin: 0 10px;
}

.social-links a {
  color: #fff;
  text-decoration: none;
  font-size: 20px;
}
</style>
