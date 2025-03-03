<template>
  <div class="forum-home-container">
    <h1 class="page-title">{{ $t('forum.pageTitle') }}</h1>
    <el-row :gutter="20" class="forum-list">
      <el-col :span="24" v-for="post in paginatedPosts" :key="post.id">
        <el-card class="forum-card">
          <div class="forum-content">
            <div class="forum-header">
              <h2>{{ post.title }}</h2>
              <p class="forum-date">{{ formatDate(post.date) }}</p>
              <p class="forum-author">{{ $t('forum.author') }}: {{ post.author }}</p>
            </div>
            <p class="forum-text">{{ post.content.slice(0, 100) }}...</p>
          </div>
          <el-button class="view-details-button" type="primary" @click="viewPost(post)">{{ $t('forum.viewDetails') }}</el-button>
        </el-card>
      </el-col>
    </el-row>
    <div class="pagination">
      <el-pagination
          background
          layout="prev, pager, next"
          :total="posts.length"
          :page-size="itemsPerPage"
          @current-change="handlePageChange"
      ></el-pagination>
    </div>
    <PostAdd></PostAdd>
  </div>
</template>

<script>
import PostAdd from "@/components/forum/ForumPostAdd.vue";

export default {
  components: { PostAdd },
  data() {
    return {
      posts: [],
      currentPage: 1,
      itemsPerPage: 9, // 每页显示的帖子数
    };
  },
  computed: {
    paginatedPosts() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.posts.slice(start, end);
    },
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await fetch('/api/posts/all');
        this.posts = await response.json();
      } catch (error) {
        console.error('获取帖子数据失败', error);
      }
    },
    formatDate(date) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(date).toLocaleDateString('zh-CN', options);
    },
    viewPost(post) {
      this.$router.push({ name: 'ForumPost', params: { id: post.id } });
    },
    handlePageChange(page) {
      this.currentPage = page;
    },
  },
  mounted() {
    this.fetchPosts();
  },
};
</script>

<style scoped>
.forum-home-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
  overflow-x: auto; /* 添加水平滚动条以适应大宽度卡片 */
}

.page-title {
  font-size: 32px;
  text-align: center;
  color: #90ff96;
  text-shadow: 0 0 10px rgba(144, 255, 150, 0.8);
  margin-bottom: 30px;
}

.forum-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.forum-card {
  min-width: 1100px;
  background-color: #444;
  color: #90ff96;
  display: flex;
  flex-direction: column;
  padding: 20px;
  margin-bottom: 20px;
  position: relative;
}

.forum-content {
  display: flex;
  flex-direction: column;
}

.forum-header {
  margin-bottom: 10px;
}

.forum-header h2 {
  font-size: 18px;
  color: #90ff96;
  text-shadow: 0 0 5px rgba(144, 255, 150, 0.8);
}

.forum-date, .forum-author {
  color: #bbb;
  font-size: 14px;
}

.forum-text {
  margin-bottom: 15px;
}

.view-details-button {
  position: absolute;
  bottom: 20px;
  right: 20px;
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

/* 响应式设计 */
@media (max-width: 768px) {
  .forum-home-container {
    overflow-x: auto; /* 确保在小屏幕上可以滚动查看内容 */
  }

  .forum-card {
    min-width: 100%; /* 在小屏幕上卡片宽度适应容器宽度 */
  }
}
</style>
