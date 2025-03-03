<template>
  <div class="error-container" ref="errorContainer">
    <div class="overlay">
      <div class="warning-icon">☠️</div>
      <div class="warning-content">
        <h1 class="warning-title">⚠️ {{ $t('error.title') }} ⚠️</h1>
        <p class="warning-message">{{ $t('error.detected') }}</p>
        <p class="emphasis">{{ $t('error.urgent') }}</p>
        <p class="instruction">{{ $t('error.recorded') }}</p>
        <p class="instruction">{{ $t('error.ban') }}</p>
        <p class="instruction">{{ $t('error.ip_locked') }}</p>
        <p class="advice">{{ $t('error.exit') }}</p>
      </div>
      <div class="random-warnings" ref="randomWarnings"></div>
      <div class="shadow"></div>
    </div>
    <button class="back-button" @click="goBack">{{ $t('error.back_to_login') }}</button>
  </div>
</template>

<script>
export default {
  name: 'Error',
  mounted() {
    this.playWarningSound();
    this.showRandomWarnings();
    this.startBackgroundEffect();
  },
  methods: {
    goBack() {
      this.$router.push('/login');
    },
    playWarningSound() {
      const audio = new Audio('/audio.mp3'); // 替换为恐怖音效的路径
      audio.loop = true; // 循环播放
      audio.play();
    },
    showRandomWarnings() {
      const warnings = [
        "检测到恶意活动！",
        "您的行为已经被监控！",
        "系统即将锁定您的账号！",
        "请立即停止所有操作！",
        "警告：黑客正在入侵您的设备！",
        "后果自负，所有数据将被删除！",
        "您已被列入黑名单！"
      ];
      const randomWarningsContainer = this.$refs.randomWarnings;
      setInterval(() => {
        const randomIndex = Math.floor(Math.random() * warnings.length);
        const warningMessage = document.createElement('div');
        warningMessage.className = 'random-warning';
        warningMessage.innerText = warnings[randomIndex];
        randomWarningsContainer.appendChild(warningMessage);
        setTimeout(() => {
          warningMessage.remove();
        }, 3000); // 3秒后移除警告信息
      }, 200); // 每0.2秒生成一个警告信息
    },
    startBackgroundEffect() {
      const container = this.$refs.errorContainer;
      setInterval(() => {
        container.style.backgroundColor = this.getRandomColor();
      }, 500); // 每500毫秒随机改变背景色
    },
    getRandomColor() {
      const letters = '0123456789ABCDEF';
      let color = '#';
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  }
};
</script>

<style scoped>
.error-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.95);
  color: #ff3333;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: shake 0.5s infinite alternate;
  overflow: hidden; /* 防止超出容器的内容 */
  z-index: 1; /* 确保整个容器在较低层级 */
}

.overlay {
  text-align: center;
  animation: pulse 1s infinite;
  position: relative;
  display: flex; /* 使用flex布局 */
  flex-direction: row; /* 横向排列 */
  align-items: center; /* 垂直居中 */
}

.warning-icon {
  font-size: 10rem;
  animation: pulse 0.8s infinite;
  margin-right: 20px; /* 添加右边距 */
  color: #ff3333;
  text-shadow: 0 0 20px #ff0000; /* 红色光晕效果 */
}

.warning-content {
  max-width: 600px; /* 限制内容的最大宽度 */
  text-align: left; /* 文本左对齐 */
}

.warning-title {
  font-size: 5rem;
  margin: 10px 0;
  animation: blink 1s infinite;
  text-shadow: 0 0 20px #ff0000; /* 红色光晕效果 */
}

.warning-message {
  font-size: 2rem;
  margin-bottom: 10px;
  animation: breathe 2s infinite;
  color: #ff0000;
  text-shadow: 0 0 10px #ff0000; /* 红色光晕效果 */
}

.emphasis {
  font-size: 2rem;
  color: #ff0000;
  margin: 20px 0;
  animation: flash 0.5s infinite; /* 闪烁效果 */
  text-shadow: 0 0 15px #ff0000; /* 红色光晕效果 */
}

.instruction {
  font-size: 1.5rem;
  animation: fade 3s forwards;
  margin-bottom: 20px;
}

.advice {
  font-size: 1.8rem;
  color: #ff0000;
  margin: 30px 0;
  animation: shake 1s infinite alternate;
  text-shadow: 0 0 10px #ff0000; /* 红色光晕效果 */
}

.back-button {
  position: absolute; /* 绝对定位 */
  top: 20px; /* 距离顶部20px */
  right: 20px; /* 距离右侧20px */
  padding: 10px 20px;
  background-color: #ff3333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.3s, transform 0.3s;
  animation: bounce 1s infinite;
  box-shadow: 0 0 10px #ff3333, 0 0 20px #ff3333; /* 添加阴影效果 */
  z-index: 2; /* 确保按钮在最上层 */
}

.back-button:hover {
  background-color: #d02929;
  transform: scale(1.05);
  box-shadow: 0 0 15px #ff3333, 0 0 25px #ff3333; /* 鼠标悬停时加大阴影 */
}

.random-warning {
  font-size: 1.5rem;
  color: #ff0000;
  margin: 5px 0;
  animation: blink 0.7s infinite alternate;
}

/* 动画效果 */
@keyframes flash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.3;
  }
}

@keyframes shake {
  0% {
    transform: translate(0);
  }
  100% {
    transform: translate(-15px);
  }
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

@keyframes blink {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes breathe {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

@keyframes fade {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

.shadow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  animation: flicker 1s infinite alternate;
}

@keyframes flicker {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.6;
  }
}
</style>
