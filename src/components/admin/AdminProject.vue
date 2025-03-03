<template>
  <ProjectLoad/>
  <div class="admin-container">
    <h1 class="page-title">{{ $t('projectStatus.title') }}</h1>
    <button class="filter-toggle-btn" @click="toggleFilter">
      {{ filter.value ? $t('admin.showAll') : $t('admin.showUnsubmitted') }}
    </button>
    <table>
      <thead>
      <tr>
        <th>{{ $t('admin.name') }}</th>
        <th>{{ $t('projectStatus.project1') }}</th>
        <th>{{ $t('projectStatus.project2') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="(user, index) in unsubmittedUsers"
          :key="user.name"
          :style="{ opacity: user.opacity, transform: user.transform }"
          class="fade-in-row"
      >
        <td>{{ user.name }}</td>
        <td :class="['status', user.project1 ? 'submitted' : 'not-submitted']">
          {{ user.project1 ? $t('admin.submitted') : $t('admin.not_submitted') }}
        </td>
        <td :class="['status', user.project2 ? 'submitted' : 'not-submitted']">
          {{ user.project2 ? $t('admin.submitted') : $t('admin.not_submitted') }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import ProjectLoad from "@/components/project/ProjectLoad.vue";

const users = ref([]);
const filter = ref(false); // false不过滤，true过滤

// 获取用户数据和作业状态
const fetchUsers = async () => {
  try {
    const response = await fetch('/api/project/all');
    if (response.ok) {
      const data = await response.json();
      // 初始化每个用户的透明度和变换
      users.value = data.map((user) => ({
        ...user,
        opacity: 0,
        transform: 'translateY(20px) rotate(5deg)', // 初始位置下移并稍微旋转
      }));
      // 逐条显示用户
      users.value.forEach((user, index) => {
        setTimeout(() => {
          user.opacity = 1; // 逐条显示
          user.transform = 'translateY(0) rotate(0deg)'; // 回到正常位置
        }, index * 50); // 每条数据间隔50ms
      });
    } else {
      console.error('获取用户状态失败:', response.statusText);
    }
  } catch (error) {
    console.error('请求错误:', error);
  }
};

// 计算属性，过滤出未提交的用户
const unsubmittedUsers = computed(() => {
  return filter.value ? users.value : users.value.filter(user => !user.project1 || !user.project2);
});

// 切换过滤状态
const toggleFilter = () => {
  filter.value = !filter.value;
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
  color: #90ff96;
  margin-bottom: 20px; /* 调整底部间距 */
}

.filter-toggle-btn {
  display: block;
  margin: 20px auto;
  padding: 10px 20px;
  font-size: 18px;
  color: #90ff96;
  background-color: transparent;
  border: 2px solid #90ff96;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.filter-toggle-btn:hover {
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
}

th {
  background-color: #444;
}

.status {
  transition: color 0.5s ease, transform 0.3s ease;
}

.not-submitted {
  color: red; /* 未提交状态使用红色显示 */
}

.submitted {
  color: #90ff96; /* 已提交状态使用原颜色 */
}

/* 添加动画效果 */
.fade-in-row {
  opacity: 1;
  transition: opacity 0.5s ease, transform 0.5s ease;
}

.submitted:hover,
.not-submitted:hover {
  transform: scale(1.05) rotate(3deg); /* 放大和旋转效果 */
}

/* 添加更高科技的效果 */
tbody tr {
  will-change: transform, opacity; /* 提前告知浏览器可能的变化 */
}
</style>
