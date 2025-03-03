<template>
  <div class="container">
    <img src="../../assets/logo.svg" alt="搜索图标" style="display: block; margin-bottom: 10px;">
    <search-box></search-box>
    <Topic></Topic>
  </div>
</template>

<script>
import SearchBox from './SearchBox.vue';
import Topic from "@/components/HomePage/Topic.vue";

export default {
  name: 'HomePage',
  components: {
    Topic,
    SearchBox
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

img {
  height: 100px;
  width: 100px;
}
</style>