<script setup>
import { ref, computed } from 'vue';
import AI from "@/components/AI/AIChatMessageBox.vue";
import Maintain from "@/components/Maintainance.vue";

const password = ref('');
const correctPassword = '1111';
const maintenanceFlag = ref(0); // 1 表示维护状态，0 表示正常

const isAuthenticated = computed(() => password.value === correctPassword);
</script>

<template>
  <div class="container">
    <div v-if="maintenanceFlag === 1">
      <h1 class="page-title">{{ $t('maintenance.accessTitle') }}</h1>
      <div class="server-status">
        <p>{{ $t('maintenance.currentStatus') }}</p>
        <p>{{ $t('maintenance.enterPassword') }}</p>
        <input type="password" v-model="password" :placeholder="$t('maintenance.passwordPlaceholder')" />
      </div>
      <div v-if="isAuthenticated">
        <AI />
      </div>
      <div v-else>
        <Maintain />
      </div>
    </div>
    <div v-else>
      <AI />
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  color: #90ff96;
}

.page-title {
  font-size: 32px;
  text-align: center;
  color: #90ff96;
  text-shadow: 0 0 10px rgba(144, 255, 150, 0.8);
  margin-bottom: 30px;
}

.server-status {
  text-align: center;
  margin-bottom: 20px;
}

input[type="password"] {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  background-color: #555;
  color: #90ff96;
  margin-top: 10px;
}

input[type="password"]::placeholder {
  color: #bbb;
}
</style>
