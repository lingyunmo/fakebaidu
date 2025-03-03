<template>
  <div class="submit-container">
    <h1 class="page-title">{{ $t('submission.pageTitle') }}</h1>
    <div class="form-group">
      <label for="name">{{ $t('submission.nameLabel') }}</label>
      <input id="name" v-model="name" type="text" :placeholder="$t('submission.namePlaceholder')"/>
    </div>

    <div class="form-group">
      <label for="assignment">{{ $t('submission.assignmentLabel') }}</label>
      <select id="assignment" v-model="assignment">
        <option value="" disabled>{{ $t('submission.assignmentPlaceholder') }}</option>
        <option v-for="option in assignmentOptionsCanUpload" :key="option" :value="option">{{ option }}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="files">{{ $t('submission.fileLabel') }}</label>
      <input id="files" type="file" multiple @change="handleFileChange"/>
    </div>

    <div class="file-preview">
      <h3>{{ $t('submission.filePreview') }}</h3>
      <ul>
        <li v-for="file in selectedFiles" :key="file.name">
          {{ fileTypeIcon(file.type) }} {{ file.name }} ({{ file.type }})
        </li>
      </ul>
    </div>

    <button @click="handleSubmit">{{ $t('submission.submitButton') }}</button>

    <div v-if="loading" class="validation-message">
      {{ $t('submission.loadingMessage') }}
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {onMounted, ref} from 'vue';

const name = ref(""); // 存储用户输入的名字
const assignment = ref(""); // 存储用户选择的作业类型
const timeOutStatus = ref(2); // 存储用户提交是否超时（超时为2,正常为1）
const selectedFiles = ref([]); // 存储选择的文件
const loading = ref(false); // 加载状态
const progress = ref(0); // 进度条进度
const emit = defineEmits(['update:name']);// 需要传递的名字
const assignmentOptionsCanUpload = ref([]);// 作业类型选项

// 处理文件选择
const handleFileChange = (event) => {
  selectedFiles.value = Array.from(event.target.files);
};

// 更新进度条的函数
const updateProgress = (duration = 1000, interval = 100) => {
  return new Promise((resolve) => {
    const totalSteps = duration / interval;

    for (let i = 0; i <= totalSteps; i++) {
      setTimeout(() => {
        progress.value = (i / totalSteps) * 100; // 更新进度为百分比
        if (i === totalSteps) {
          resolve(); // 进度条更新完成时解决 Promise
        }
      }, i * interval);
    }
  });
};

// 提交作业
const handleSubmit = async () => {
  if (!name.value || !assignment.value || selectedFiles.value.length === 0) {
    alert("请填写完整信息并选择文件！");
    return;
  }

  loading.value = true;
  progress.value = 0;

  // 更新进度条
  await updateProgress(); // 等待进度条更新完成

  // 验证姓名
  const isValidName = await validateName(name.value);

  loading.value = false; // 更新完进度条后再停止加载
  if (isValidName) {
    alert("姓名验证成功！");
    emit('update:name', name.value);
    await submitAssignment(); // 姓名有效，提交作业
  } else {
    alert("姓名验证失败，请输入有效的姓名！");
  }
};

// 姓名验证函数
const validateName = async (inputName) => {
  try {
    const response = await fetch(`/api/submit/validateName?name=${encodeURIComponent(inputName)}`);
    const data = await response.json();
    return data.exists; // 检查姓名是否存在
  } catch (error) {
    console.error('姓名验证失败:', error);
    return false;
  }
};

const fileTypeIcons = {
  'image/': '🖼️',
  'application/pdf': '📄',
  'application/vnd.ms-excel': '📊',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': '📊',
  'text/html': '🌐',
  'text/css': '🎨',
  'application/javascript': '💻',
  'text/javascript': '💻',
};

const fileTypeIcon = (fileType) => {
  const icon = Object.keys(fileTypeIcons).find(type => fileType.startsWith(type));
  return icon ? fileTypeIcons[icon] : '📁';
};

// 提交作业的函数
const submitAssignment = async () => {
  const formData = new FormData();
  formData.append("name", name.value); // 添加名字
  formData.append("assignment", assignment.value); // 添加作业类型
  formData.append("timeOutStatus", timeOutStatus.value); // 添加作业状态

  selectedFiles.value.forEach((file) => {
    formData.append('files', file); // 直接使用原始文件对象
  });

  try {
    const response = await fetch("/api/submit/upload", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      const result = await response.text();
      alert(`作业提交成功！\n提交内容:\n名字: ${name.value}\n作业类型: ${assignment.value}\n上传的文件: ${selectedFiles.value.map(file => file.name).join(', ')}`);
    } else {
      alert(`提交失败: ${response.statusText}`);
    }
  } catch (error) {
    console.error("提交时发生错误:", error);
    alert("提交失败，请重试！");
  }
};

const fetchAssignmentOptions = async () => {
  try {
    const response = await fetch('/api/assignments');
    if (response.ok) {
      const data = await response.json();
      const assignments = data.assignments; // 获取 assignments 数组

      // 定义对应关系
      const assignmentMap = {
        'assignment1_status': '第一次作业',
        'assignment2_status': '第二次作业',
        'assignment3_status': '第三次作业',
        'assignment4_status': '第四次作业',
        'assignment5_status': '第五次作业',
      };

      // 筛选出可提交的作业
      assignmentOptionsCanUpload.value = assignments
          .filter(assignment => assignment.submit_status === 0) // 仅选择可以提交的作业
          .map(assignment => assignmentMap[`assignment${assignments.indexOf(assignment) + 1}_status`]);
    } else {
      console.error('获取作业类型失败:', response.statusText);
    }
  } catch (error) {
    console.error('请求错误:', error);
  }
};

onMounted(fetchAssignmentOptions);
</script>

<style scoped>
.submit-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
  border-radius: 10px;
}

.page-title {
  font-size: 32px;
  text-align: center;
  color: #90ff96;
  text-shadow: 0 0 10px rgba(144, 255, 150, 0.8);
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #90ff96;
}

input[type="text"],
select,
input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #555;
  color: #90ff96;
  outline: none;
}

input[type="text"]::placeholder {
  color: #bbb;
}

.file-preview {
  margin-top: 20px;
  color: #90ff96;
}

button {
  padding: 10px 20px;
  background-color: #90ff96;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
}

button:hover {
  background-color: #78e286;
}

.validation-message {
  text-align: center;
  margin-top: 20px;
  color: #ffcc00;
  font-weight: bold;
}

.progress-bar-container {
  margin-top: 20px;
  width: 100%;
  background-color: #444;
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 10px;
  background-color: #90ff96;
  transition: width 0.3s;
}
</style>
