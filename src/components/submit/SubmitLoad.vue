<template>
  <div class="status-container">
    <h1 class="page-title">{{ $t('uploadStatus.title') }}</h1>
    <div class="progress-wrapper">
      <div class="progress-bar" :style="{ width: progressBarWidth }"></div>
      <span class="progress-text"><strong>{{ uploadedCount }} / {{ totalAssignments }} {{ $t('uploadStatus.tasksUploaded') }}</strong></span>
    </div>
  </div>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';

const uploadedCount = ref(0); // 已上传的文件夹数量
const totalAssignments = 86; // 总作业数量

onMounted(async () => {
  try {
    // 从后端获取作业状态
    const response = await fetch('/api/status/submitNowCheck');
    if (response.ok) {
      const data = await response.json();
      uploadedCount.value = data["uploadCount"]; // 返回上传数量
    } else {
      console.error('获取作业状态失败:', response.statusText);
    }
  } catch (error) {
    console.error('请求时发生错误:', error);
  }
});

const progressBarWidth = computed(() => {
  return `${(uploadedCount.value / totalAssignments) * 100}%`; // 计算进度条宽度
});
</script>

<style scoped>
.status-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
  border-radius: 10px;
  overflow: hidden;
  position: relative;
  box-shadow: 0 4px 20px rgba(0, 255, 150, 0.5);
  animation: fadeIn 0.8s ease-in-out;
}

.page-title {
  font-size: 32px;
  text-align: center;
  color: #90ff96;
  text-shadow: 0 0 10px rgba(144, 255, 150, 0.8);
  margin-bottom: 30px;
}

.progress-wrapper {
  position: relative;
  height: 30px;
  background-color: #444;
  border-radius: 15px; /* 圆角效果 */
  overflow: hidden;
  box-shadow: inset 0 0 10px rgba(144, 255, 150, 0.8);
}

.progress-bar {
  height: 100%;
  background: linear-gradient(270deg, rgba(0, 204, 255, 1), rgba(0, 204, 255, 0.5));
  background-size: 400% 100%;
  animation: progressFlow 2s linear infinite; /* 流动效果 */
  transition: width 0.5s ease; /* 动画过渡 */
  border-radius: 15px; /* 圆角效果 */
}

.progress-text {
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  color: #ffffff;
  font-weight: bold; /* 加粗文本 */
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes progressFlow {
  0% {
    background-position: 100% 0;
  }
  100% {
    background-position: 0 0;
  }
}
</style>
