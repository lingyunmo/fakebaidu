<template>
  <div class="check-container">
    <h1 class="page-title">{{ $t('projectCheck.title') }}</h1>
    <div class="form-group">
      <label for="username">{{ $t('projectCheck.nameLabel') }}</label>
      <input
          id="username"
          v-model="localUsername"
          type="text"
          :placeholder="$t('projectCheck.usernamePlaceholder')"
      />
    </div>
    <button @click="checkProjects">{{ $t('projectCheck.checkButton') }}</button>

    <div v-if="submissions.length > 0" class="submissions-status">
      <h2>{{ $t('projectCheck.submissionStatusTitle') }}</h2>
      <div class="assignment-status-container">
        <div
            v-for="(submitted, index) in submissions"
            :key="index"
            class="assignment-card"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
        >
          <div class="assignment-details">
            <label class="assignment-label">{{ $t('projectCheck.assignment') }} {{ index + 1 }}</label>
            <div class="status-icon" :class="{ 'submitted': submitted, 'not-submitted': !submitted }">
              <span v-if="submitted">✅</span>
              <span v-else>❌</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, watch } from 'vue';

const props = defineProps(['username']);
const localUsername = ref(props.username);
const submissions = ref([]);
const hoveredIndex = ref(null);

watch(() => props.username, (newValue) => {
  localUsername.value = newValue;
  checkProjects();
});

const checkProjects = async () => {
  if (!localUsername.value) {
    alert("请填写名字！");
    return;
  }
  try {
    const response = await fetch("/api/project/check-project", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: localUsername.value })
    });
    if (response.ok) {
      const data = await response.json();
      submissions.value = data.projectStatus; // 使用新的 API 返回值
    } else {
      alert(`检查失败: ${response.statusText}`);
    }
  } catch (error) {
    console.error("检查时发生错误:", error);
    alert("检查失败，请重试！");
  }
};
</script>

<style scoped>
.check-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333;
  color: #00bfff; /* 科技蓝文本 */
  border-radius: 10px;
}

.page-title {
  font-size: 32px;
  text-align: center;
  color: #00bfff; /* 科技蓝 */
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.8);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #00bfff; /* 科技蓝 */
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
  color: #00bfff; /* 科技蓝文本 */
  outline: none;
}

input[type="text"]::placeholder {
  color: #bbb;
}

button {
  padding: 10px 20px;
  background-color: #00bfff; /* 科技蓝 */
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 15px;
}

button:hover {
  background-color: #00d9ff; /* 浅绿色悬停效果 */
}

.submissions-status {
  margin-top: 10px;
}

.assignment-status-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px; /* 卡片间距 */
}

.assignment-card {
  background-color: #444; /* 深色背景 */
  border-radius: 8px;
  padding: 10px;
  flex: 1 0 120px; /* 最小宽度 120px，允许自适应 */
  transition: transform 0.2s, box-shadow 0.2s;
}

.assignment-card:hover {
  transform: scale(1.03);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
}

.assignment-details {
  display: flex;
  justify-content: space-between; /* 在卡片中水平排列 */
  align-items: center;
}

.assignment-label {
  font-size: 14px; /* 标签字体大小减小 */
}

.status-icon {
  font-size: 20px;
  margin-left: 10px;
}

.submitted {
  color: #4caf50; /* 提交成功的绿色 */
}

.not-submitted {
  color: #f44336; /* 未提交的红色 */
}
</style>