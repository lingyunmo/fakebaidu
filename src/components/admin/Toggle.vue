<template>
  <div class="toggle-container">
    <h1 class="page-title">{{ $t('toggle.title') }}</h1>

    <!-- 维护状态开关 -->
    <div class="switch-group">
      <el-switch
          v-model="submitMaintenanceFlag"
          @change="updateStatus('maintenance', submitMaintenanceFlag)"
          :active-text="$t('toggle.maintenance_on')"
          :inactive-text="$t('toggle.maintenance_off')"
          active-color="#00d4ff"
          inactive-color="#f56c6c"
      ></el-switch>
      <p class="switch-label">{{ $t('toggle.maintenance') }}</p>
    </div>

    <!-- 作业提交状态开关 -->
    <div class="switch-group">
      <el-switch
          v-model="submitSubmissionClosed"
          @change="updateStatus('submission', submitSubmissionClosed)"
          :active-text="$t('toggle.submission_closed')"
          :inactive-text="$t('toggle.submission_open')"
          active-color="#00d4ff"
          inactive-color="#f56c6c"
      ></el-switch>
      <p class="switch-label">{{ $t('toggle.submission') }}</p>
    </div>

    <!-- 项目提交状态开关 -->
    <div class="switch-group">
      <el-switch
          v-model="projectSubmissionClosed"
          @change="updateStatus('project', projectSubmissionClosed)"
          :active-text="$t('toggle.project_closed')"
          :inactive-text="$t('toggle.project_open')"
          active-color="#00d4ff"
          inactive-color="#f56c6c"
      ></el-switch>
      <p class="switch-label">{{ $t('toggle.project') }}</p>
    </div>

    <!-- 二维码开关 -->
    <div class="switch-group">
      <el-switch
          v-model="QRCodeCheck"
          @change="updateStatus('qrcode', QRCodeCheck)"
          :active-text="$t('toggle.qrcode_open')"
          :inactive-text="$t('toggle.qrcode_closed')"
          active-color="#00d4ff"
          inactive-color="#f56c6c"
      ></el-switch>
      <p class="switch-label">{{ $t('toggle.qrcode') }}</p>
    </div>

    <!-- 作业状态切换 -->
    <h2 class="sub-title">{{ $t('toggle.assignment_status') }}</h2>
    <div v-for="(assignment, index) in assignments" :key="index" class="switch-group">
      <el-switch
          v-model="assignment.submitStatus"
          @change="updateAssignmentStatus(assignment.assignment_name, assignment.submitStatus)"
          :active-text="`${assignment.assignment_name} ${$t('toggle.submission_open')}`"
          :inactive-text="`${assignment.assignment_name} ${$t('toggle.submission_closed')}`"
          :active-color="assignment.submitStatus ? '#00d4ff' : '#f56c6c'"
          :inactive-color="assignment.submitStatus ? '#f56c6c' : '#00d4ff'"
      ></el-switch>
      <p class="switch-label">{{ assignment.assignment_name }}</p>
    </div>

    <!-- 当前作业编号更新 -->
    <div class="switch-group">
      <input v-model="currentAssignmentId" :placeholder="$t('toggle.current_assignment_id_placeholder')" />
      <el-button @click="updateCurrentAssignmentId">{{ $t('toggle.update_assignment_id') }}</el-button>
    </div>
  </div>
  <ToggleNotice/>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import ToggleNotice from "@/components/admin/ToggleNotice.vue";

const submitMaintenanceFlag = ref(false);
const submitSubmissionClosed = ref(false);
const projectSubmissionClosed = ref(false);
const QRCodeCheck = ref(false);
const assignments = ref([]);
const currentAssignmentId = ref(null);

async function fetchStatus() {
  try {
    const response = await fetch('/api/status');
    const data = await response.json();
    submitMaintenanceFlag.value = Number(data["submitMaintenanceFlag"]) === 1;
    submitSubmissionClosed.value = Number(data["submitSubmissionClosed"]) === 1;
    projectSubmissionClosed.value = Number(data["projectSubmissionClosed"]) === 1;
    QRCodeCheck.value = Number(data["QRCodeCheck"]) === 1;
  } catch (error) {
    console.error('获取状态失败', error);
  }
}

async function updateStatus(type, value) {
  try {
    await axios.post('/api/status/toggle', { type, value: value ? 1 : 0 });
    console.log(`${type} 状态更新成功`);
  } catch (error) {
    console.error('更新状态失败', error);
  }
}

async function fetchAssignmentStatus() {
  try {
    const response = await fetch('/api/assignments');
    const data = await response.json();

    if (data && Array.isArray(data["assignments"])) {
      assignments.value = data["assignments"].map(assignment => ({
        assignment_name: assignment["assignment_name"],
        submitStatus: assignment["submit_status"] === 0,
      }));
    } else {
      console.error('作业状态数据格式不正确');
    }
  } catch (error) {
    console.error('获取状态失败', error);
  }
}

async function updateAssignmentStatus(assignmentName, value) {
  try {
    await axios.post('/api/assignments/toggle', { assignmentName, submitStatus: value ? 0 : 1 });
    console.log(`${assignmentName} 状态更新成功`);
  } catch (error) {
    console.error('更新作业状态失败', error);
  }
}

async function updateCurrentAssignmentId() {
  if (currentAssignmentId["value"]) {
    const assignmentId = Number(currentAssignmentId["value"]);
    if (isNaN(assignmentId)) {
      console.error('作业编号必须是数字');
      return;
    }

    try {
      await axios.post('/api/status/updateAssignmentId', { submitNowCheck: assignmentId });
      console.log(`作业编号更新成功: ${assignmentId}`);
    } catch (error) {
      console.error('更新作业编号失败', error.response.data);
    }
  } else {
    console.error('作业编号不能为空');
  }
}

onMounted(() => {
  fetchStatus();
  fetchAssignmentStatus();
});
</script>

<style scoped>
.toggle-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 40px;
  background-color: #1a1a2e; /* 深蓝背景 */
  border-radius: 10px;
  box-shadow: 0 0 15px rgba(0, 0, 0, 0.5);
  color: #00d4ff; /* 明亮的科技蓝字体 */
}

.page-title {
  font-size: 32px;
  text-align: center;
  color: #00d4ff; /* 明亮的科技蓝 */
  margin-bottom: 30px;
}

.sub-title {
  font-size: 24px;
  color: #00aaff; /* 更深的蓝色 */
  margin-top: 30px;
}

.switch-group {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.switch-label {
  font-size: 20px; /* 调整标签字体大小 */
  color: #00d4ff; /* 明亮的科技蓝 */
}
</style>
