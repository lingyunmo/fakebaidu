<template>
  <div class="not-connected-container">
    <h1 class="not-connected-title">{{ $t('notConnected.title') }}</h1>
    <p class="not-connected-message">{{ $t('notConnected.message') }}</p>
    <p class="retry-message">{{ $t('notConnected.retry') }}</p>
    <div class="spinner"></div>
    <div class="pulse-effect"></div>
    <div class="pulse-effect-large"></div>
    <div class="pulse-effect-medium"></div>
    <div class="pulse-effect-corner top-left"></div>
    <div class="pulse-effect-corner top-right"></div>
    <div class="pulse-effect-corner bottom-left"></div>
  </div>
</template>

<style scoped>
.not-connected-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 40px;
  background-color: #1a1a2e; /* 深蓝背景 */
  color: #00d4ff; /* 明亮的科技蓝字体 */
  border-radius: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.not-connected-title {
  font-size: 60px; /* 放大标题字体 */
  color: #00d4ff;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
  margin-bottom: 30px;
  animation: fadeIn 1s ease-in;
}

.not-connected-message {
  font-size: 32px; /* 放大消息字体 */
  margin-bottom: 20px;
  animation: fadeIn 1.5s ease-in;
}

.retry-message {
  font-size: 24px; /* 放大提示信息的字体大小 */
  margin-bottom: 30px;
  animation: fadeIn 2s ease-in;
}

.spinner {
  border: 12px solid rgba(0, 212, 255, 0.3);
  border-top: 12px solid #00d4ff;
  border-radius: 50%;
  width: 70px; /* 增大尺寸 */
  height: 70px; /* 增大尺寸 */
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
  width: 350px;
  height: 350px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.2);
  animation: pulse 2s infinite;
  transform: translate(-50%, -50%);
}

.pulse-effect-large {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 450px;
  height: 450px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.1);
  animation: pulse-large 3s infinite;
  transform: translate(-50%, -50%);
}

.pulse-effect-medium {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.15);
  animation: pulse-medium 2.5s infinite;
  transform: translate(-50%, -50%);
}

.pulse-effect-corner {
  position: absolute;
  border-radius: 50%;
  animation: pulse-corner 3s infinite;
}

.pulse-effect-corner.top-left {
  top: 10px;
  left: 10px;
  width: 150px; /* 可以根据需要调整 */
  height: 150px;
  background: linear-gradient(45deg, #00ff00, #00ccff, #ff00ff);
  animation: pulse-corner 2s infinite;
}

.pulse-effect-corner.top-right {
  top: 10px;
  right: 10px;
  width: 150px; /* 可以根据需要调整 */
  height: 150px;
  background: linear-gradient(45deg, #00ff00, #00ccff, #ff00ff);
  animation: pulse-corner 2s infinite;
}

.pulse-effect-corner.bottom-left {
  bottom: 10px;
  left: 10px;
  width: 150px; /* 可以根据需要调整 */
  height: 150px;
  background: linear-gradient(45deg, #00ff00, #00ccff, #ff00ff);
  animation: pulse-corner 2s infinite;
}

@keyframes pulse {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.1); opacity: 0.7; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes pulse-large {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.2); opacity: 0.5; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes pulse-medium {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.6; }
  100% { transform: scale(1); opacity: 1; }
}

@keyframes pulse-corner {
  0% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
  100% { transform: scale(1); opacity: 1; }
}
</style>
