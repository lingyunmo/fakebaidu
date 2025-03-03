<template>
  <el-space class="language-switcher">
    <el-dropdown @command="handleCommand">
      <el-button
          class="language-button"
          size="large"
          type="primary"
          style="border: 2px solid #4CAF50; padding: 10px 15px; transition: background-color 0.3s; font-size: 16px; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);"
      >
        <el-icon>
          <Operation/>
        </el-icon>
        {{ languageLabel }}
      </el-button>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item command="co">Arcane</el-dropdown-item>
          <el-dropdown-item command="en">English</el-dropdown-item>
          <el-dropdown-item command="fr">Français</el-dropdown-item>
          <el-dropdown-item command="es">Español</el-dropdown-item>
          <el-dropdown-item command="py">Русский язык</el-dropdown-item>
          <el-dropdown-item command="cl">古文</el-dropdown-item>
          <el-dropdown-item command="hk">繁體中文</el-dropdown-item>
          <el-dropdown-item command="zh">简体中文</el-dropdown-item>
          <el-dropdown-item command="kr">한국어</el-dropdown-item>
          <el-dropdown-item command="jp">日本語</el-dropdown-item>

        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </el-space>
</template>

<script>
import {defineComponent} from 'vue';
import {Operation} from '@element-plus/icons-vue';

export default defineComponent({
  components: {
    Operation,
  },
  data() {
    return {
      language: this.$i18n.locale,
    };
  },
  computed: {
    languageLabel() {
      switch (this.language) {
        case 'co':
          return 'Arcane'
        case 'en':
          return 'English';
        case 'fr':
          return 'Français';
        case 'es':
          return 'Español';
        case 'py':
          return 'Русский язык';
        case 'cl':
          return '古文';
        case 'hk':
          return '繁體中文';
        case 'zh':
          return '简体中文';
        case 'kr':
          return '한국어';
        case 'jp':
          return '日本語';
        default:
          return 'EN';
      }
    },
  },
  methods: {
    handleCommand(command) {
      this.language = command;
      this.$i18n.locale = this.language;
    },
  },
});
</script>

<style scoped>
.language-switcher {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
}

.language-button {
  border-radius: 5px;
}
</style>
