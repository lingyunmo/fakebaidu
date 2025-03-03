<script setup>
import { ref } from 'vue';
import Upload from "@/components/submit/SubmitUpload.vue";
import SubmitCheck from "@/components/submit/SubmitCheck.vue";
import Notice from "@/components/submit/SubmitNotice.vue";
import SubmitLoad from "@/components/submit/SubmitLoad.vue";

const name = ref(""); // 存储名字

</script>

<template>
  <Notice />
  <Upload v-model:name="name" /> <!-- 使用 v-model 传递名字 -->
  <SubmitCheck :username="name" /> <!-- 将名字传递给 SubmitCheck -->
  <SubmitLoad />
</template>

<style scoped>
</style>
