<template>
  <div class="wrapper">
    <footer class="footer">
      <div class="container">
        <p>&copy; {{ currentYear }} {{ $t('copyright') }}</p>
      </div>
    </footer>
  </div>
</template>

<script setup>

const currentYear = new Date().getFullYear();
</script>

<style scoped>
.footer {
  margin-top: 100px;
  background-color: #333;
  color: #90ff96;
  text-align: center;
  padding: 20px 0;
  position: relative;
  bottom: 0;
  width: 100%;
}
</style>