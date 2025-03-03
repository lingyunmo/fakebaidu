<template>
  <div class="announcement-container">
    <!-- 项目公告标题 -->
    <h1 class="title">{{ $t("project.notice.title") }}</h1>

    <!-- 公告内容 -->
    <p class="important" v-html="$t('project.notice.announcement')" :style="{ transform: `translateX(${shake.value}px)` }"></p>

    <!-- 项目截止时间倒计时 -->
    <div class="countdown">
      <strong>{{ $t("project.notice.deadline") }}:</strong> {{ countdown }}
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted} from 'vue';

const shake = ref(0); // 控制元素的抖动效果
const countdown = ref(""); // 存储倒计时字符串

// 公告内容，使用静态数据
const time = ref([]); // 存储公告时间

// 控制元素随机抖动
const getRandomShake = () => {
  shake.value = Math.random() * 10 - 5;
};

// 更新项目截止时间倒计时
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

async function fetchTime() {
  try {
    const response = await fetch('/api/notice');
    if (!response.ok) {
      console.error('网络响应不正确');
    }
    const data = await response.json();
    time.value = data.time;
  } catch (error) {
    console.error('获取公告失败', error);
  }
}

// 组件挂载时执行相关操作
onMounted(() => {
  fetchTime();
  setInterval(getRandomShake, 1000); // 每秒抖动一次
  setInterval(updateCountdown, 1000); // 每秒更新倒计时
  updateCountdown(); // 初始化倒计时
});
</script>

<style scoped>
.announcement-container {
  max-width: 900px;
  margin: 20px auto;
  padding: 15px;
  background-color: #333;
  color: #00bfff; /* 科技蓝字体 */
  border-radius: 10px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  position: relative;
  overflow: hidden;
}

.title {
  text-align: center;
  font-size: 32px;
  color: #00bfff; /* 科技蓝 */
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.8);
  margin-bottom: 15px;
}

.important {
  color: #00bfff; /* 科技蓝 */
  font-weight: bold;
  font-size: 1.2em;
  animation: pulse 1.5s infinite, shake 0.5s infinite alternate;
  transition: transform 0.3s ease, text-shadow 0.3s ease;
}

.countdown {
  text-align: center;
  font-size: 16px;
  margin: 10px 0;
  color: #00bfff; /* 科技蓝 */
}

/* 动画样式 */
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
</style>
