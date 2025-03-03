<template>
  <div class="admin-colorful-container">
    <h1 class="page-title">{{ $t('adminC.colorful_title') }}</h1>
    <div class="data-container">
      <div
          v-for="user in users"
          :key="user.name"
          class="user-card"
          :style="{ backgroundColor: getRandomColor() }"
      >
        <h2 class="user-name">{{ user.name }}</h2>
        <div v-for="i in 5" :key="i">
          <p class="assignment-status" :style="{ color: getRandomColor() }">
            {{ $t(`adminC.assignment${i}_status`) }}: {{ user[`assignment${i}`] ? $t('adminC.submitted') : $t('adminC.not_submitted') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const users = ref([]);

// 获取用户数据
const fetchUsers = async () => {
  try {
    const response = await fetch('/api/assignments/status');
    if (response.ok) {
      users.value = await response.json();
    } else {
      console.error('获取用户状态失败:', response.statusText);
    }
  } catch (error) {
    console.error('请求错误:', error);
  }
};

const getRandomColor = () => {
  const letters = '0123456789ABCDEF';
  return `#${Array.from({ length: 6 }, () => letters[Math.floor(Math.random() * 16)]).join('')}`;
};

onMounted(fetchUsers);
</script>

<style scoped>
.admin-colorful-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #333;
  border-radius: 10px;
}

.page-title {
  font-size: 32px;
  text-align: center;
  color: #90ff96;
  margin-bottom: 30px;
}

.data-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.user-card {
  border-radius: 8px;
  padding: 20px;
  margin: 10px;
  flex: 1 1 calc(30% - 20px); /* 调整卡片宽度 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s, box-shadow 0.3s;
}

.user-card:hover {
  transform: scale(1.05); /* 悬停时放大效果 */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.5); /* 悬停时阴影增强 */
}

.assignment-status {
  transition: color 0.3s; /* 状态文本颜色变化效果 */
}

.user-name {
  font-size: 24px;
  color: #90ff96; /* 用户名颜色 */
}
</style>
