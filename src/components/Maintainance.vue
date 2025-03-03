<template>
  <div class="maintenance-container">
    <h1 class="maintenance-title">{{ $t('maintenance.title') }}</h1>
    <p class="maintenance-message">{{ $t('maintenance.message') }}</p>
    <div class="spinner"></div>
    <div class="pulse-effect"></div>
  </div>
</template>

<style scoped>
.maintenance-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
  border-radius: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.maintenance-title {
  font-size: 48px; /* 调大标题字体 */
  color: #90ff96;
  text-shadow: 0 0 10px rgba(144, 255, 150, 0.8);
  margin-bottom: 20px;
  animation: fadeIn 1s ease-in;
}

.maintenance-message {
  font-size: 24px; /* 调大消息字体 */
  margin-bottom: 30px;
  animation: fadeIn 1.5s ease-in;
}

.spinner {
  border: 8px solid rgba(144, 255, 150, 0.3);
  border-top: 8px solid #90ff96;
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
  background: rgba(144, 255, 150, 0.2);
  animation: pulse 2s infinite;
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
</style>
