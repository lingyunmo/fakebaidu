<template>
  <div id="app">
    <language-notice v-if="!isErrorPage && isConnected" />
    <navbar v-if="!isErrorPage && isConnected" ref="navbar" />
    <I18n v-if="isConnected" />
    <router-view v-if="isConnected"></router-view>
    <Foot v-if="!isErrorPage && isConnected" />
    <NotConnected v-if="!isConnected" />
  </div>
</template>

<script>
import Navbar from './components/main/Navbar.vue';
import Foot from "@/components/main/Foot.vue";
import I18n from "@/components/main/I18n.vue";
import LanguageNotice from "@/components/LanguageNotice.vue";
import NotConnected from "@/components/NotConnected.vue"; // 导入 NotConnected 组件

export default {
  components: {
    I18n,
    Foot,
    Navbar,
    LanguageNotice,
    NotConnected, // 注册 NotConnected 组件
  },
  data() {
    return {
      isConnected: false,
      checkInterval: null,
    };
  },
  computed: {
    isErrorPage() {
      return this.$route.path === '/error';
    },
  },
  methods: {
    async checkConnection() {
      try {
        const response = await fetch('/api/greet');
        if (response.ok) {
          this.isConnected = true;
        } else {
          this.isConnected = false;
        }
      } catch (error) {
        console.error('连接检测失败:', error);
        this.isConnected = false;
      }
    },
  },
  mounted() {
    this.checkConnection(); // 初次检测
    this.checkInterval = setInterval(this.checkConnection, 10000); // 每10秒检测一次
  },
  beforeDestroy() {
    clearInterval(this.checkInterval); // 清除定时器
  },
};
</script>