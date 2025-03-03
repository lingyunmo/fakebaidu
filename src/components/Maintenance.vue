<template>
  <div class="container">
    <div v-if="submitMaintenanceFlag === 1">
      <h1 class="page-title">{{ $t('maintenance.accessTitle') }}</h1>
      <div class="server-status">
        <p>{{ $t('maintenance.currentStatus') }}</p>
        <p>{{ $t('maintenance.enterPassword') }}</p>
        <input type="password" v-model="password" :placeholder="$t('maintenance.passwordPlaceholder')"/>
      </div>
      <div v-if="isAuthenticated">
        <slot/>
      </div>
      <div v-else>
        <Maintainance/>
        <ChatWithMe/>
      </div>
    </div>
    <slot v-else/>
  </div>
</template>

<script setup>

import ChatWithMe from "@/components/ChatWithMe.vue";
import Maintainance from "@/components/Maintainance.vue";
import {computed, onMounted, ref} from "vue";

const password = ref('');
const correctPassword = '1111';
const submitMaintenanceFlag = ref(1); // 1 表示维护状态，0 表示正常

const isAuthenticated = computed(() => password.value === correctPassword);

async function fetchStatus() {
  try {
    const response = await fetch('/api/status'); // 根据后端API路径进行调整
    const data = await  response.json();
    submitMaintenanceFlag.value = Number(data["submitMaintenanceFlag"]);
  } catch (error) {
    console.error('获取状态失败', error);
  }
}

onMounted(() => {
  fetchStatus();
});
</script>

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
