<template>
  <SubmitLoad />
  <div class="admin-container">
    <h1 class="page-title">{{ $t('admin.title') }}</h1>
    <router-link to="/AdminC">
      <button class="colorful-button">{{ $t('admin.enter_colorful') }}</button>
    </router-link>
    <table>
      <thead>
      <tr>
        <th>{{ $t('admin.name') }}</th>
        <th v-for="i in 5" :key="i">{{ $t(`admin.assignment${i}`) }}</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(user, index) in users"
          :key="user.name"
          :style="{ opacity: user.opacity, transform: user.transform }"
          class="fade-in-row"
      >
        <td>{{ user.name }}</td>
        <td v-for="i in 5" :key="i" :class="['status', user[`assignment${i}`] ? 'submitted' : 'not-submitted']">
          {{ user[`assignment${i}`] ? $t('admin.submitted') : $t('admin.not_submitted') }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import SubmitLoad from "@/components/submit/SubmitLoad.vue";

const users = ref([]);

// 获取用户数据和作业状态
const fetchUsers = async () => {
  try {
    const response = await fetch('/api/assignments/status');
    if (response.ok) {
      const data = await response.json();
      users.value = data.map((user, index) => ({
        ...user,
        opacity: 0,
        transform: 'translateY(20px) rotate(5deg)',
      }));
      // 逐条显示用户
      users.value.forEach((user, index) => {
        setTimeout(() => {
          user.opacity = 1;
          user.transform = 'translateY(0) rotate(0deg)';
        }, index * 50);
      });
    } else {
      console.error('获取用户状态失败:', response.statusText);
    }
  } catch (error) {
    console.error('请求错误:', error);
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.admin-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
  border-radius: 10px;
}

.page-title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 20px;
}

.colorful-button {
  display: block;
  margin: 0 auto 20px;
  padding: 10px 20px;
  font-size: 18px;
  color: #90ff96;
  background-color: transparent;
  border: 2px solid #90ff96;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.colorful-button:hover {
  background-color: #90ff96;
  color: #333;
  transform: scale(1.05);
}

table {
  width: 100%;
  border-collapse: collapse;
}

th,
td {
  padding: 10px;
  text-align: center;
  border: 1px solid #ccc;
  transition: background-color 0.3s ease, transform 0.3s ease;
}

th {
  background-color: #444;
}

.status {
  transition: color 0.5s ease, transform 0.3s ease;
}

.not-submitted {
  color: red;
}

.submitted {
  color: #90ff96;
}

.fade-in-row {
  opacity: 1;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.submitted:hover,
.not-submitted:hover {
  transform: scale(1.05) rotate(3deg);
}

tbody tr {
  will-change: transform, opacity;
}
</style>
