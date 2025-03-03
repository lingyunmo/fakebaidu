<template>
  <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
  >
    <el-menu-item index="1">{{ $t('menu.home') }}</el-menu-item>
    <el-menu-item index="2">{{ $t('menu.news') }}</el-menu-item>
    <el-menu-item index="3">{{ $t('menu.forum') }}</el-menu-item>
    <el-menu-item index="4">{{ $t('menu.submitAssignment') }}</el-menu-item>
    <el-menu-item index="5">{{ $t('menu.submitProject') }}</el-menu-item>
    <el-menu-item index="6">{{ $t('menu.chatWithMe') }}</el-menu-item>
    <el-menu-item index="7">{{ $t('menu.chatGPT') }}</el-menu-item>
    <el-menu-item index="8">{{ $t('menu.contact') }}</el-menu-item>
    <el-menu-item index="9">{{ $t('menu.help') }}</el-menu-item>
    <el-menu-item index="10">{{ $t('menu.bilibili') }}</el-menu-item>
    <el-menu-item index="11">{{ $t('menu.lottery') }}</el-menu-item>
    <el-menu-item index="12" v-if="loggedInUser">{{ $t('menu.admin') }}</el-menu-item>
    <el-menu-item index="13" v-if="loggedInUser">{{ $t('menu.adminProject') }}</el-menu-item>
    <el-menu-item index="14" v-if="loggedInUser">{{ $t('menu.maintenance') }}</el-menu-item>
    <el-menu-item index="15" v-if="loggedInUser">{{ $t('menu.adminChange') }}</el-menu-item>

    <el-menu-item index="loggedIn" class="login-section" v-if="loggedInUser">
      {{ loggedInUser }} {{ $t('menu.loggedIn') }}
    </el-menu-item>
    <el-menu-item index="login" class="login-section" v-else>
      {{ $t('menu.login') }}
    </el-menu-item>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      activeIndex: '1',
    };
  },
  computed: {
    ...mapGetters(['loggedInUser']),
  },
  methods: {
    handleSelect(key) {
      this.activeIndex = key; // 更新 activeIndex
      switch (key) {
        case '1':
          this.$router.push('/');
          break;
        case '2':
          this.$router.push('/news');
          break;
        case '3':
          this.$router.push('/forum');
          break;
        case '4':
          this.$router.push('/submit');
          break;
        case '5':
          this.$router.push('/project');
          break;
        case '6':
          this.$router.push('/chatWithMe');
          break;
        case '7':
          this.$router.push('/chatgpt');
          break;
        case '8':
          this.$router.push('/contact');
          break;
        case '9':
          this.$router.push('/help');
          break;
        case '10':
          this.$router.push('/bilibili');
          break;
        case '11':
          this.$router.push('/lottery');
          break;
        case '12':
          this.$router.push('/admin');
          break;
        case '13':
          this.$router.push('/adminProject');
          break;
        case '14':
          this.$router.push('/toggle');
          break;
        case '15':
          this.$router.push('/adminChange');
          break;
        case 'loggedIn':
          this.$router.push('/logout');
          break;
        case 'login':
          this.$router.push('/login');
          break;
        default:
          console.log('未知的菜单项:', key);
      }
    },
  },
};
</script>

<style scoped>
.el-menu-demo {
  background-color: #333;
  border-bottom: none;
  display: flex;
  justify-content: flex-start;
  position: relative;
  flex-wrap: wrap;
}

.el-menu-item {
  padding: 0 15px; /* 减小内边距 */
}

.el-menu-demo .el-menu-item {
  color: #90ff96;
  text-shadow: 0 0 5px rgba(161, 206, 119, 0.8);
}

.login-section {
  position: absolute;
  right: 20px;
  color: #90ff96;
  text-shadow: 0 0 5px rgba(161, 206, 119, 0.8);
  padding: 0 10px; /* 减小内边距 */
  display: flex;
  align-items: center;
}

@media (max-width: 768px) {
  .el-menu-demo {
    justify-content: space-between;
  }

  .login-section {
    position: static;
    width: 100%;
    text-align: center;
    margin-top: 10px;
  }
}
</style>