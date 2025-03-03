<template>
  <div class="news-detail-container" v-if="newsItem">
    <el-card shadow="hover" class="news-card">
      <div class="news-header">
        <h1>{{ newsItem.title }}</h1>
        <p class="news-date">{{ formatDate(newsItem.date) }}</p>
      </div>
      <div class="news-content">
        <p>{{ newsItem.content }}</p>
      </div>
      <el-button type="primary" @click="goBack">{{ $t('news.goBack') }}</el-button>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newsItem: null // 初始化为 null，避免渲染错误
    };
  },
  async created() {
    await this.fetchNewsDetail();
  },
  methods: {
    async fetchNewsDetail() {
      try {
        const newsId = this.$route.params.id;
        const response = await fetch(`/api/news/${newsId}`); // 从后端 API 获取新闻详情
        if (!response.ok) {
          throw new Error('网络响应不是OK');
        }
        this.newsItem = await response.json();
      } catch (error) {
        console.error('获取新闻详情失败', error);
      }
    },
    formatDate(date) {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(date).toLocaleDateString('zh-CN', options);
    },
    goBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.news-detail-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
}

.news-card {
  background-color: #444;
  color: #90ff96;
}

.news-header {
  margin-bottom: 20px;
}

.news-header h1 {
  font-size: 24px;
  color: #90ff96;
  text-shadow: 0 0 5px rgba(144, 255, 150, 0.8);
}

.news-date {
  color: #bbb;
  font-size: 16px;
}

.news-content {
  margin-bottom: 20px;
}

.el-button {
  background-color: #90ff96;
  color: #333;
  border: none;
}
</style>
