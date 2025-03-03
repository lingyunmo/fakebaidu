<template>
  <div class="search-box">
    <el-input
        v-model="searchQuery"
        :placeholder="$t('search.placeholder')"
        prefix-icon="el-icon-search"
        @keyup.enter.native="handleSearch"
        clearable
        class="dark-input"
    ></el-input>
    <el-button
        type="primary"
        @click="handleSearch"
        class="dark-button"
    >
      {{ $t('search.buttonText') }}
    </el-button>
  </div>
</template>

<script>
export default {
  name: 'SearchBox',
  data() {
    return {
      searchQuery: '',
    };
  },
  methods: {
    handleSearch() {
      if (this.searchQuery.trim() !== '') {
        const searchUrl = `https://www.baidu.com/s?wd=${encodeURIComponent(this.searchQuery)}`;
        window.open(searchUrl, '_blank');
      }
    },
  },
};
</script>

<style scoped>
.search-box {
  display: flex;
  align-items: center;
  margin: 20px auto;
  width: 100%;
  max-width: 600px; /* Adjusted maximum width for better responsiveness */
  padding: 0 10px; /* Added padding to ensure spacing on smaller screens */
  box-sizing: border-box;
}

.dark-input .el-input__inner {
  background-color: #333;
  color: #90ff96;
  border: 1px solid #555; /* Adjusted border color for better visibility */
}

.dark-input .el-input__inner::placeholder {
  color: #bbb;
}

.dark-button {
  background-color: #444;
  border: 1px solid #90ff96;
  color: #90ff96;
  margin-left: 10px; /* Spacing between input and button */
}

.dark-button:hover {
  background-color: #555; /* Slightly lighter color on hover */
}
</style>
