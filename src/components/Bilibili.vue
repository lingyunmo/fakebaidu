<template>
  <div class="bilibili-container">
    <iframe
        src="https://www.bilibili.com/"
        frameborder="0"
        class="bilibili-iframe"
        allowfullscreen
    ></iframe>
  </div>
</template>

<script setup>
// 这里可以添加任何需要的逻辑
</script>

<style scoped>
.bilibili-container {
  max-width: 1400px;
  margin: 20px auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
  border-radius: 10px;
}

.bilibili-iframe {
  width: 100%;
  height: 600px; /* 根据需要调整高度 */
  border: none;
}
</style>