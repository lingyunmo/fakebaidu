<template>
  <div class="check-container">
    <h1 class="page-title">{{ $t('check.title') }}</h1>

    <div class="form-group">
      <label for="username">{{ $t('check.nameLabel') }}</label>
      <input
          id="username"
          v-model="localUsername"
          type="text"
          :placeholder="$t('check.usernamePlaceholder')"
      />
    </div>

    <button @click="checkSubmissions">{{ $t('check.checkButton') }}</button>

    <div v-if="submissions.length > 0" class="submissions-status">
      <h2>{{ $t('check.submissionStatusTitle') }}</h2>
      <div class="assignment-status-container">
        <div
            v-for="(submitted, index) in submissions"
            :key="index"
            class="assignment-card"
            @mouseenter="hoveredIndex = index"
            @mouseleave="hoveredIndex = null"
        >
          <div class="assignment-details">
            <label class="assignment-label">{{ $t('check.assignment') }} {{ index + 1 }}</label>
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
  checkSubmissions();
});

const checkSubmissions = async () => {
  if (!localUsername.value) {
    alert("请填写名字！");
    return;
  }

  try {
    const response = await fetch("/api/submit/check-submissions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: localUsername.value })
    });

    if (response.ok) {
      const data = await response.json();
      submissions.value = data.submissions;
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
  color: #90ff96;
  border-radius: 10px;
}

.page-title {
  font-size: 32px;
  text-align: center;
  color: #90ff96;
  text-shadow: 0 0 10px rgba(144, 255, 150, 0.8);
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 10px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #90ff96;
}

input[type="text"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #555;
  color: #90ff96;
  outline: none;
}

input[type="text"]::placeholder {
  color: #bbb;
}

button {
  padding: 10px 20px;
  background-color: #90ff96;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  margin-bottom: 15px;
}

button:hover {
  background-color: #78e286;
}

.submissions-status {
  margin-top: 10px;
}

.assignment-status-container {
  display: flex;
  flex-wrap: wrap; /* 允许卡片换行 */
  gap: 10px; /* 卡片间距 */
}

.assignment-card {
  background-color: #444;
  border-radius: 8px;
  padding: 10px;
  flex: 1 0 120px; /* 最小宽度 120px，允许自适应 */
  transition: transform 0.2s, box-shadow 0.2s;
  font-size: 14px; /* 卡片字体大小减小 */
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
  color: #4caf50;
}

.not-submitted {
  color: #f44336;
}
</style>
