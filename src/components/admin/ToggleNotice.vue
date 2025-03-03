<template>
  <div class="announcement-container">
    <h1 class="title">{{ $t('announcementA.title') }}</h1>
    <div class="announcement">
      <label>{{ $t('announcementA.part1_label') }}</label>
      <textarea v-model="part1"></textarea>

      <label>{{ $t('announcementA.part2_label') }}</label>
      <textarea v-model="part2"></textarea>

      <label>{{ $t('announcementA.time_label') }}</label>
      <input v-model="time" />

      <el-button @click="updateNotice">{{ $t('announcementA.update_button') }}</el-button>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const part1 = ref('');
const part2 = ref('');
const time = ref('');

async function fetchAnnouncements() {
  try {
    const response = await fetch('/api/notice');

    if (!response.ok) {
      throw new Error('网络响应不正常');
    }

    const data = await response.json();
    part1.value = data.part1;
    part2.value = data.part2;
    time.value = data.time; // 获取时间，按字符串处理
  } catch (error) {
    console.error('获取公告失败', error);
  }
}

async function updateNotice() {
  try {
    await axios.post('/api/notice/update', {
      id: 1, // 假设只更新id为1的公告
      part1: part1.value,
      part2: part2.value,
      time: time.value // 直接使用字符串形式的时间
    });
    console.log('公告更新成功');
  } catch (error) {
    console.error('更新公告失败', error);
  }
}

onMounted(() => {
  fetchAnnouncements(); // 初始化时获取公告数据
});
</script>

<style scoped>
.announcement-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background-color: #1a1a2e; /* 深蓝背景 */
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  color: #00d4ff; /* 明亮的科技蓝字体 */
}

.title {
  font-size: 32px;
  text-align: center;
  margin-bottom: 30px;
}

.announcement {
  display: flex;
  flex-direction: column;
}

textarea {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

input {
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ccc;
}
</style>
