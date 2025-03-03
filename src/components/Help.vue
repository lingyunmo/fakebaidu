<template>
  <div class="help-container">
    <h1 class="help-title">{{ $t('help') }}</h1>
    <div class="help-content">
      <div
          class="card"
          v-for="(item, index) in helpItems"
          :key="index"
          :style="{ transform: `translate(${item.x}px, ${item.y}px)` }"
      >
        <h2>{{ item.title }}</h2>
        <p>{{ item.description }}</p>
        <p class="extra-info">{{ item.extra }}</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const helpItems = ref([
  {
    title: '如何提交作业',
    description: '了解如何通过我们的平台提交作业，确保按照指示进行操作，并遵循每一步骤的要求。',
    extra: '提交作业的过程涉及多个步骤和细节，务必认真对待。',
    x: 0,
    y: 0,
  },
  {
    title: '常见问题',
    description: '查看我们的常见问题解答，您会发现许多用户在使用过程中常遇到的困惑。',
    extra: '这些问题的解答将帮助您更深入地理解平台的各项功能。',
    x: 0,
    y: 0,
  },
  {
    title: '获取支持',
    description: '如果您需要更多帮助，请联系我们，我们的支持团队将为您提供详尽的解答。',
    extra: '无论您遇到什么样的技术难题，我们都非常乐意为您提供帮助。',
    x: 0,
    y: 0,
  },
  {
    title: '用户指南',
    description: '用户指南提供了关于如何最大限度利用我们的平台的详细信息。',
    extra: '虽然内容比较繁琐，但仔细阅读将帮助您更好地掌握平台的用法。',
    x: 0,
    y: 0,
  },
  {
    title: '反馈与建议',
    description: '我们非常重视用户的反馈，欢迎您提出任何建议或意见。',
    extra: '您的反馈将帮助我们不断改进服务质量。',
    x: 0,
    y: 0,
  },
  // 增加更多的卡片
  {
    title: '社区参与',
    description: '参与我们的社区活动，您可以与其他用户互动，分享经验。',
    extra: '社区是学习和成长的好地方。',
    x: 0,
    y: 0,
  },
  {
    title: '资源下载',
    description: '访问我们的资源库，获取丰富的学习材料和工具。',
    extra: '这些资源将帮助您更有效地使用平台。',
    x: 0,
    y: 0,
  },
  {
    title: '在线课程',
    description: '参加我们的在线课程，提升您的技能和知识。',
    extra: '课程内容多样，适合不同层次的学习者。',
    x: 0,
    y: 0,
  },
  {
    title: '新功能介绍',
    description: '了解我们平台的新功能，帮助您更好地使用工具。',
    extra: '新功能的使用将极大提升您的工作效率。',
    x: 0,
    y: 0,
  },
  {
    title: '安全提示',
    description: '保护您的账户安全，了解平台的安全措施和建议。',
    extra: '安全是我们最重要的关注之一。',
    x: 0,
    y: 0,
  },
]);

const moveCards = () => {
  helpItems.value.forEach((item) => {
    item.x += (Math.random() - 0.5) * 200;
    item.y += (Math.random() - 0.5) * 200;

    // 限制移动范围
    item.x = Math.max(-300, Math.min(window.innerWidth - 1400, item.x));
    item.y = Math.max(-100, Math.min(window.innerHeight - 800, item.y));
  });
};

// 每隔一段时间更新卡片位置
setInterval(moveCards, 50);
</script>

<style scoped>
.help-container {
  max-width: 1200px;
  margin: 20px auto;
  padding: 20px;
  background-color: #111;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  color: #90ff96;
  text-align: center;
}

.help-title {
  font-size: 36px;
  margin-bottom: 30px;
  animation: fadeIn 1s;
}

.help-content {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  position: relative;
}

.card {
  background: linear-gradient(145deg, #222, #333);
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 280px;
  height: 200px;
  box-shadow: 6px 6px 20px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s, box-shadow 0.3s;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 8px 8px 30px rgba(0, 0, 0, 0.7);
}

.extra-info {
  margin-top: 10px;
  font-size: 14px;
  color: #aaa;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
