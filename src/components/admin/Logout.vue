<template>
  <div class="logout-container">
    <h1>注销中...</h1>
  </div>
</template>

<script>
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
  name: 'Logout',
  setup() {
    const store = useStore(); // 获取 Vuex store 实例
    const router = useRouter();

    const handleLogout = async () => {
      await store.dispatch('logout'); // 调用 Vuex 的 logout 动作
      await router.push('/login'); // 注销后重定向到登录页面
    };

    // 在组件挂载时执行注销
    handleLogout();

    return {};
  },
};
</script>

<style scoped>
.logout-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  font-size: 24px;
  color: #333; /* 你可以根据需要自定义颜色 */
}
</style>
