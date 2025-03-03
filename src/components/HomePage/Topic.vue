<template>
  <div class="hot-search-container">
    <div
        class="hot-search-item"
        v-for="(item, index) in hotSearches"
        :key="index"
        @click="goToBaiduSearch(item)"
    >
      {{ item }}
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Topic',
  data() {
    return {
      hotSearches: []
    };
  },
  created() {
    this.fetchHotSearches();
  },
  methods: {
    async fetchHotSearches() {
      try {
        const response = await axios.get('/api/topics'); // 修改为后端 API 地址
        this.hotSearches = response.data.map(topic => topic.title); // 假设后端返回的是一个对象数组
      } catch (error) {
        console.error('Error fetching hot searches:', error);
      }
    },
    goToBaiduSearch(query) {
      window.location.href = `https://www.baidu.com/s?wd=${encodeURIComponent(query)}`;
    }
  }
};
</script>

<style scoped>
.hot-search-container {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding: 20px;
  background-color: #333;
  border-radius: 8px;
  justify-content: center;
  margin: 0 auto;
  max-width: 1200px;
  box-sizing: border-box;
}

.hot-search-item {
  width: 350px;
  padding: 15px;
  border: 1px solid #444;
  border-radius: 8px;
  background-color: #222;
  text-align: center;
  color: #90ff96;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s, border 0.3s;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.hot-search-item:hover {
  background-color: #004080;
  transform: scale(1.05);
  border: 2px solid #00f;
  text-overflow: unset;
}
</style>
