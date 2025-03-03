<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      message: '',
    };
  },
  async mounted() {
    try {
      const response = await axios.get('/api/greet'); // 使用代理配置的路径
      this.message = response.data.message;
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  },
};
</script>
