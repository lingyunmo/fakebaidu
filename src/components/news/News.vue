<template>
  <div class="news-container">
    <h1 class="page-title">{{ $t('news.pageTitle') }}</h1>
    <div class="news-list">
      <div class="news-item" v-for="newsItem in paginatedNews" :key="newsItem.id">
        <el-card shadow="hover" class="news-card">
          <div class="news-header">
            <h2>{{ newsItem.title }}</h2>
            <p class="news-date">{{ formatDate(newsItem.date) }}</p>
          </div>
          <div class="news-content">
            <p>{{ newsItem.content }}</p>
          </div>
          <el-button type="primary" @click="viewNews(newsItem)">{{ $t('news.viewDetails') }}</el-button>
        </el-card>
      </div>
    </div>

    <div class="pagination">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="news.length"
          :page-size="itemsPerPage"
          @current-change="handlePageChange"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      news: [],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    paginatedNews() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.news.slice(start, end);
    },
  },
  methods: {
    async fetchNews() {
      try {
        // 更新为后端API路径
        const response = await fetch('/api/news'); // 这里的路径需根据后端设置进行调整
        if (!response.ok) {
          throw new Error('网络响应不是OK');
        }
        this.news = await response.json();
      } catch (error) {
        console.error('获取新闻数据失败', error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('zh-CN', options);
    },
    viewNews(newsItem) {
      this.$router.push({ name: 'NewsDetail', params: { id: newsItem.id } });
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.fetchNews();
  },
};
</script>

<style scoped>
.news-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
}

.page-title {
  font-size: 32px;
  text-align: center;
  color: #90ff96;
  text-shadow: 0 0 10px rgba(144, 255, 150, 0.8);
  margin-bottom: 30px;
}

.news-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.news-item {
  flex: 1 1 500px;
  max-width: 500px;
  min-height: 100px;
}

.news-card {
  background-color: #444;
  color: #90ff96;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.news-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.news-header h2 {
  color: #90ff96;
  text-shadow: 0 0 5px rgba(144, 255, 150, 0.8);
  font-size: 18px;
}

.news-date {
  color: #bbb;
  font-size: 14px;
}

.news-content {
  color: #bbb;
  flex: 1;
  margin-bottom: 15px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
}

.el-button {
  background-color: #90ff96;
  color: #333;
  border: none;
}
</style>
