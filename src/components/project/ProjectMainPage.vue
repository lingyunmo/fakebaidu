<template>
  <Maintenance>
    <div v-if="projectSubmissionClosed === 0">
      <div v-if="qrcode === 1">
        <QRCodeVerification>
          <ProjectComposition/>
        </QRCodeVerification>
      </div>
      <div v-else>
        <ProjectComposition/>
      </div>
    </div>
    <div v-else>
      <SubmitNotOpen/>
      <ChatWithMe/>
    </div>
  </Maintenance>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import SubmitNotOpen from "@/components/submit/SubmitNotOpen.vue";
import ChatWithMe from "@/components/ChatWithMe.vue";
import Maintenance from "@/components/Maintenance.vue";
import QRCodeVerification from "@/components/QRCodeVerification.vue";
import ProjectComposition from "@/components/project/ProjectComposition.vue";

const projectSubmissionClosed = ref(1); // 1 表示终止提交状态，0 表示正常提交
const qrcode = ref(0); // 1 表示开启二维码验证，0 表示关闭

async function fetchStatus() {
  try {
    const response = await fetch('/api/status');
    const data = await response.json(); // 解析 JSON 数据

    // 注意这里必须使用 .value 进行赋值
    projectSubmissionClosed.value = Number(data["projectSubmissionClosed"]); // 假设后端返回的数据中有这个字段
    qrcode.value = Number(data["QRCodeCheck"]); // 假设后端返回的数据中有这个字段
  } catch (error) {
    console.error('获取状态失败', error);
  }
}

// 在组件挂载时调用 fetchStatus
onMounted(() => {
  fetchStatus();  // 这里需要调用 fetchStatus 函数
});
</script>

<style scoped>

</style>