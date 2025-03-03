<template>
  <Maintenance>
    <div v-if="submitSubmissionClosed === 0">
      <div v-if="qrcode === 1">
        <QRCodeVerification>
          <SubmitComposition/>
        </QRCodeVerification>
      </div>
      <div v-else>
        <SubmitComposition/>
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
import SubmitComposition from "@/components/submit/SubmitComposition.vue";
import SubmitNotOpen from "@/components/submit/SubmitNotOpen.vue";
import ChatWithMe from "@/components/ChatWithMe.vue";
import QRCodeVerification from "@/components/QRCodeVerification.vue";
import Maintenance from "@/components/Maintenance.vue"; // 引入二维码验证组件

const submitSubmissionClosed = ref(1); // 1 表示终止提交状态，0 表示正常提交
const qrcode = ref(0); // 1 表示开启二维码验证，0 表示关闭

async function fetchStatus() {
  try {
    const response = await fetch('/api/status'); // 根据后端API路径进行调整
    const data = await response.json();

    submitSubmissionClosed.value = Number(data["submitSubmissionClosed"]);
    qrcode.value = Number(data["QRCodeCheck"]);
  } catch (error) {
    console.error('获取状态失败', error);
  }
}

onMounted(() => {
  fetchStatus();
});
</script>

<style scoped>

</style>
