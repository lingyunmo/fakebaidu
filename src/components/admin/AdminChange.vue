<template>
  <div class="admin-change-container">
    <h1 class="page-title">{{ $t('adminChange.change_title') }}</h1>
    <router-link to="/admin">
      <button class="back-button">{{ $t('adminChange.back_to_admin') }}</button>
    </router-link>
    <table>
      <thead>
      <tr>
        <th>{{ $t('adminChange.name') }}</th>
        <th v-for="i in 5" :key="i">{{ $t(`adminChange.assignment${i}`) }}</th>
        <th>{{ $t('adminChange.save') }}</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(user, index) in users" :key="user.name">
        <td>{{ user.name }}</td>
        <td v-for="i in 5" :key="i">
          <input type="checkbox" v-model="user[`assignment${i}`]" />
        </td>
        <td>
          <button @click="updateAssignmentStatus(user)" class="save-button">{{ $t('adminChange.save') }}</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const users = ref([]);

// 计算属性从 Vuex 获取 Token
const token = computed(() => store.getters.token);

// 获取用户数据和作业状态
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

// 更新作业状态
const updateAssignmentStatus = async (user) => {
  try {
    if (!token.value) {
      alert('未授权用户，请先登录。');
      await router.push('/login');
      return;
    }

    // 确保用户对象中包含必需的字段
    const { name, assignment1, assignment2, assignment3, assignment4, assignment5 } = user;
    if (!name) {
      alert('用户姓名不能为空。');
      return;
    }

    const response = await fetch('/api/update-user-status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token.value}`,
      },
      body: JSON.stringify({
        name,
        assignment1,
        assignment2,
        assignment3,
        assignment4,
        assignment5,
      }),
    });

    if (response.ok) {
      alert('更新成功！');
    } else {
      const errorData = await response.json(); // 获取服务器返回的错误信息
      console.error('更新失败:', errorData.error || response.statusText);
      alert(`更新失败: ${errorData.error || '请检查权限或重试。'}`);
    }
  } catch (error) {
    console.error('请求错误:', error);
    alert('请求错误，请稍后重试。');
  }
};

onMounted(fetchUsers);
</script>

<style scoped>
.admin-change-container {
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
  margin-bottom: 20px;
}

.back-button {
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

.back-button:hover {
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

.save-button {
  padding: 5px 10px;
  color: #90ff96;
  background-color: transparent;
  border: 2px solid #90ff96;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.save-button:hover {
  background-color: #90ff96;
  color: #333;
}
</style>
