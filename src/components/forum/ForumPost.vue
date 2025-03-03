<template>
  <div v-if="post" class="forum-post-container">
    <h1 class="post-title">{{ post.title }}</h1>
    <p class="post-date">{{ formatDate(post.date) }}</p>
    <p class="post-author">{{ $t('forum.author') }}: {{ post.author }}</p>
    <div class="post-content">
      <p>{{ post.content }}</p>
    </div>
    <div class="reply-form">
      <el-input
          v-model="replyForm.content"
          type="textarea"
          :placeholder="$t('forum.replyPlaceholder')"
          :rows="4"
      ></el-input>
      <el-button type="primary" @click="submitReply">{{ $t('forum.submitReply') }}</el-button>
    </div>
    <div class="replies">
      <h2>{{ $t('forum.replies') }}:</h2>
      <el-card v-for="reply in post.replies" :key="reply.id" class="reply-card">
        <p class="reply-author">{{ reply.author }} - {{ formatDate(reply.date) }}</p>
        <p class="reply-content">{{ reply.content }}</p>
      </el-card>
    </div>
    <!-- 添加的返回按钮 -->
    <el-button type="success" @click="goBack">{{ $t('forum.goBack') }}</el-button>
  </div>
</template>

<script>
import axios from 'axios';
import {mapGetters} from 'vuex';

export default {
  data() {
    return {
      post: null,
      replyForm: {
        content: '',
      },
    };
  },
  computed: {
    ...mapGetters(['loggedInUser'])
  },
  async created() {
    await this.fetchPost();
  },
  methods: {
    async fetchPost() {
      try {
        const response = await axios.get(`/api/posts?id=${this.$route.params.id}`);
        this.post = response.data;
      } catch (error) {
        console.error('获取帖子失败', error);
      }
    },
    formatDate(date) {
      const options = {year: 'numeric', month: 'long', day: 'numeric'};
      return new Date(date).toLocaleDateString('zh-CN', options);
    },
    async submitReply() {
      // 检查用户是否已登录
      if (!this.loggedInUser) {
        this.$message.error('请先登录');
        return;
      }

      // 检查回复内容是否为空
      if (this.replyForm.content.trim() === '') {
        this.$message.error('回复内容不能为空');
        return;
      }

      // 创建新的回复对象
      const newReply = {
        id: Date.now(), // 使用时间戳生成唯一 ID
        author: this.loggedInUser,
        date: new Date().toISOString(),
        content: this.replyForm.content,
      };

      // 构建请求数据
      const requestData = {
        postId: parseInt(this.$route.params.id, 10), // 确保 postId 是数字
        reply: newReply
      };

      try {
        // 发送请求将回复内容保存到服务器
        const response = await axios.post('/api/posts/reply', requestData);

        // 检查服务器返回的数据是否正确
        if (response.status === 200 && response.data && response.data.reply) {
          // 将新回复添加到本地数据中
          this.post.replies.push(response.data.reply);
          this.replyForm.content = ''; // 清空回复框
          this.$message.success('回复提交成功');
        } else {
          this.$message.error('提交回复失败，服务器返回无效数据');
        }
      } catch (error) {
        console.error('提交回复失败', error);
        this.$message.error('提交回复失败，请稍后重试');
      }
    },
    // 添加的返回方法
    goBack() {
      this.$router.go(-1);
    }
  },
};
</script>

<style scoped>
.forum-post-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
}

.post-title {
  font-size: 24px;
  color: #90ff96;
  margin-bottom: 10px;
}

.post-date, .post-author {
  color: #bbb;
}

.post-content {
  margin-bottom: 20px;
}

.reply-form {
  margin-bottom: 20px;
}

.reply-card {
  margin-bottom: 10px;
  background-color: #444;
  color: #90ff96;
}

.reply-author {
  color: #bbb;
  font-size: 14px;
}

.reply-content {
  margin-top: 5px;
}

.el-button {
  background-color: #90ff96;
  color: #333;
  border: none;
}

.el-button.default {
  background-color: #555;
  color: #fff;
  margin-top: 20px;
}
</style>
