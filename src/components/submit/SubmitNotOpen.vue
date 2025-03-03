<template>
  <div class="not-open-container">
    <h1 class="not-open-title">{{ $t('submissionNS.notOpenTitle') }}</h1>
    <p class="not-open-message">{{ $t('submissionNS.notOpenMessage') }}</p>
    <p class="processing-message">{{ $t('submissionNS.processingMessage') }}</p>
    <div class="spinner"></div>
    <div class="pulse-effect"></div>
    <div class="pulse-effect-large"></div>
  </div>
</template>

<style scoped>
.not-open-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #1a1a2e; /* 深蓝背景 */
  color: #00d4ff; /* 明亮的科技蓝字体 */
  border-radius: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.not-open-title {
  font-size: 48px; /* 调大标题字体 */
  color: #00d4ff;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
  margin-bottom: 20px;
  animation: fadeIn 1s ease-in;
}

.not-open-message {
  font-size: 24px; /* 调大消息字体 */
  margin-bottom: 20px;
  animation: fadeIn 1.5s ease-in;
}

.processing-message {
  font-size: 20px; /* 调整处理中提示的字体大小 */
  margin-bottom: 30px;
  animation: fadeIn 2s ease-in;
}

.spinner {
  border: 8px solid rgba(0, 212, 255, 0.3);
  border-top: 8px solid #00d4ff;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 0 auto;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

@keyframes fadeIn {
  0% { opacity: 0; transform: translateY(-20px); }
  100% { opacity: 1; transform: translateY(0); }
}

.pulse-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.2);
  animation: pulse 2s infinite;
  transform: translate(-50%, -50%);
}

.pulse-effect-large {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.1);
  animation: pulse-large 3s infinite;
  transform: translate(-50%, -50%);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes pulse-large {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>