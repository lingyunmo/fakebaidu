<template>
  <el-form :model="form" ref="formRef" label-width="120px" class="post-add-form">
    <el-form-item :label="$t('post.title')" prop="title" :rules="[{ required: true, message: $t('post.titleRequired'), trigger: 'blur' }]">
      <el-input v-model="form.title"/>
    </el-form-item>
    <el-form-item :label="$t('post.content')" prop="content" :rules="[{ required: true, message: $t('post.contentRequired'), trigger: 'blur' }]">
      <el-input type="textarea" v-model="form.content"/>
    </el-form-item>
    <el-form-item :label="$t('post.author')" prop="author">
      <el-input v-model="form.author"/>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitPost">{{ $t('post.submitPost') }}</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';
import {ElMessage} from 'element-plus';

const form = ref({
  title: '',
  content: '',
  author: '',
});

const formRef = ref(null);

async function submitPost() {
  try {
    // 确保表单数据有效
    await formRef.value.validate();

    const response = await axios.post('/api/posts/add', {
      title: form.value.title,
      content: form.value.content,
      author: form.value.author,
    });

    if (response.status === 200) {
      ElMessage.success('帖子发布成功');
      setTimeout(() => {
        location.reload();
      }, 1000);
    } else {
      ElMessage.error('帖子发布失败');
    }
  } catch (error) {
    ElMessage.error('帖子发布失败，请稍后重试');
    console.error('发布帖子失败', error);
  }
}
</script>

<style scoped>
.post-add-form {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
}
</style>
