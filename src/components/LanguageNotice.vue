<template>
  <div v-if="showNotice" class="language-notice">
    右上角切换语言
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const showNotice = ref(true);

    // 设置5秒后自动隐藏提示
    onMounted(() => {
      setTimeout(() => {
        showNotice.value = false;
      }, 5000);
    });

    return {showNotice};
  },
};
</script>

<style scoped>
.language-notice {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px 40px;
  background-color: #ffd700;
  color: #333;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  font-size: 24px; /* 增大字体 */
  font-weight: bold;
  text-align: center;
  z-index: 1000;
}
</style>