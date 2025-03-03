<template>
  <div class="announcement-container">
    <h1 class="title" @click="toggleCollapse" style="cursor: pointer;">
      {{ $t('announcement.title') }}
    </h1>
    <p class="click-hint">{{ $t('announcement.clickHint') }}</p>

    <p class="important" v-html="announcements1" :style="{ transform: `translateX(${shake.value}px)` }">
    </p>

    <div class="countdown">
      <strong>{{ $t('announcement.deadline') }}：</strong> {{ countdown }}
    </div>

    <div class="notes" v-show="!isCollapsed">
      <p class="note">• {{ $t('announcement.fileSubmission') }}</p>
      <p class="note" v-html="$t('announcement.contentSubmission')"></p>
      <p class="note">• {{ $t('announcement.statusCheck') }}</p>
    </div>

    <div class="assignment-notice" :style="{ top: assignmentY + 'px', left: assignmentX + 'px' }">
      <p>{{ announcements2 }}</p>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const shake = ref(0);
const isCollapsed = ref(false);
const countdown = ref("");
const assignmentY = ref(10);
const assignmentX = ref(50);
const directionY = ref(1);
const directionX = ref(1);
const speed = 1; // 浮动速度

const announcements1 = ref([]); // 存储公告内容
const announcements2 = ref([]); // 存储公告内容
const time = ref([]); // 存储公告内容

const toggleCollapse = () => {
  isCollapsed.value = !isCollapsed.value;
};

async function fetchAnnouncements() {
  try {
    const response = await fetch('/api/notice');
    if (!response.ok) {
      throw new Error('网络响应不正确');
    }
    const data = await response.json();
    announcements1.value = data["part1"];
    announcements2.value = data["part2"];
    time.value = data.time;
  } catch (error) {
    console.error('获取公告失败', error);
  }
}


onMounted(() => {
  fetchAnnouncements(); // 组件挂载时获取公告
});

const getRandomShake = () => {
  shake.value = Math.random() * 10 - 5;
};

const updateCountdown = () => {
  const now = new Date();
  const targetDate = new Date(time.value.toString());
  const remainingTime = targetDate - now;

  if (remainingTime > 0) {
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);
    countdown.value = `${days}天 ${hours}小时 ${minutes}分钟 ${seconds}秒`;
  } else {
    countdown.value = "截止时间已过！";
  }
};

const moveAssignment = () => {
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;

  assignmentY.value += speed * directionY.value;
  assignmentX.value += speed * directionX.value;

  // 检查是否到达边界并反转方向
  if (assignmentY.value > windowHeight - 50 || assignmentY.value < 10) {
    directionY.value *= -1;
  }

  if (assignmentX.value > windowWidth - 50 || assignmentX.value < 10) {
    directionX.value *= -1;
  }
};

onMounted(() => {
  setInterval(getRandomShake, 1000);
  setInterval(updateCountdown, 1000);
  setInterval(moveAssignment, 50);
  updateCountdown();
});
</script>

<style scoped>
.announcement-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 15px;
  background-color: #333;
  color: #90ff96;
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  position: relative;
  overflow: hidden;
}

.assignment-notice {
  position: fixed; /* 改为 fixed */
  top: 10px; /* 固定顶部位置 */
  left: 50%; /* 居中水平位置 */
  transform: translateX(-50%); /* 居中 */
  background-color: #007acc; /* 科技蓝 */
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  z-index: 10; /* 确保置于最上方 */
  color: #fff; /* 字体颜色 */
}

.title {
  text-align: center;
  font-size: 32px;
  color: #90ff96;
  text-shadow: 0 0 10px rgba(144, 255, 150, 0.8);
  margin-bottom: 15px;
}

.click-hint {
  text-align: center;
  font-size: 14px;
  color: #ffcc00;
  margin-bottom: 10px;
  font-style: italic;
}

.important {
  color: red;
  font-weight: bold;
  font-size: 1.5em;
  animation: pulse 1.5s infinite, shake 0.5s infinite alternate;
  transition: transform 0.3s ease, text-shadow 0.3s ease;
}

.countdown {
  text-align: center;
  font-size: 16px;
  margin: 10px 0;
  color: #ffcc00;
}

.notes {
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.note {
  margin: 10px 0;
  line-height: 1.5;
  position: relative;
  animation: float 3s ease-in-out infinite, glow 2s ease-in-out infinite alternate;
  overflow: hidden;
  padding: 8px;
  border-radius: 5px;
  background-color: rgba(255, 255, 255, 0.05);
  backdrop-filter: blur(5px);
  box-shadow: 0 0 10px rgba(144, 255, 150, 0.5);
  transition: transform 0.3s, background-color 0.3s, box-shadow 0.3s;
}

.note:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-left: 4px solid blue;
  padding-left: 12px;
  transform: translateY(-5px) rotate(1deg);
  box-shadow: 0 8px 30px rgba(0, 0, 255, 0.7);
  animation: none;
}

/* 动画样式 */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    transform: translateY(20px);
  }
  to {
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

@keyframes shake {
  0% {
    transform: translateX(0);
  }
  25% {
    transform: translateX(-3px);
  }
  50% {
    transform: translateX(3px);
  }
  75% {
    transform: translateX(-3px);
  }
  100% {
    transform: translateX(0);
  }
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes glow {
  0% {
    text-shadow: 0 0 5px rgba(144, 255, 150, 0.5);
  }
  100% {
    text-shadow: 0 0 20px rgba(144, 255, 150, 1);
  }
}
</style>
