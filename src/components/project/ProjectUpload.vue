<template>
  <div class="project-upload-container">
    <h1 class="page-title">{{ $t('project.upload.title') }}</h1>

    <div class="form-group">
      <label for="name">{{ $t('project.upload.name') }}</label>
      <input id="name" v-model="name" type="text" :placeholder="$t('project.upload.namePlaceholder')"/>
    </div>

    <div class="form-group">
      <label for="project">{{ $t('project.upload.projectType') }}</label>
      <select id="project" v-model="project">
        <option value="" disabled>{{ $t('project.upload.selectProject') }}</option>
        <option value="项目1">{{ $t('project.upload.project1') }}</option>
        <option value="项目2">{{ $t('project.upload.project2') }}</option>
      </select>
    </div>

    <div class="form-group">
      <label for="files">{{ $t('project.upload.uploadFiles') }}</label>
      <input id="files" type="file" multiple @change="handleFileChange" accept=".zip,.rar,.7z"/>
    </div>

    <div class="file-preview">
      <h3>{{ $t('project.upload.filePreview') }}</h3>
      <ul>
        <li v-for="file in selectedFiles" :key="file.name">
          {{ file.name }} ({{ file.type }})
        </li>
      </ul>
    </div>

    <button @click="handleSubmit">{{ $t('project.upload.submit') }}</button>

    <div v-if="loading" class="validation-message">
      {{ $t('project.upload.uploading') }}
      <div class="progress-bar-container">
        <div class="progress-bar" :style="{ width: progress + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import {ref} from 'vue';
import axios from 'axios';

const name = ref('');
const project = ref('');
const selectedFiles = ref([]);
const loading = ref(false);
const progress = ref(0);

// 处理文件选择
const handleFileChange = (event) => {
  selectedFiles.value = Array.from(event.target.files);
};

// 提交项目
const handleSubmit = async () => {
  if (!name.value || !project.value || selectedFiles.value.length === 0) {
    alert("请填写完整信息并选择文件！");
    return;
  }

  loading.value = true;
  progress.value = 0;
  const isValidName = await validateName(name.value);

  if (isValidName) {
    const success = await submitProject();
    loading.value = false; // 结束 loading 状态
    if (success) {
      alert(`项目上传成功！名字: ${name.value}，项目类型: ${project.value}，上传的文件: ${selectedFiles.value.map(file => file.name).join(', ')}`);
    } else {
      alert("上传失败，请重试！");
    }
  } else {
    loading.value = false; // 结束 loading 状态
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

// 提交项目的函数
const submitProject = async () => {
  const formData = new FormData();
  formData.append("name", name.value);
  formData.append("project", project.value);

  selectedFiles.value.forEach((file) => {
    formData.append('files', file);
  });

  try {
    await axios.post("/api/project/upload", formData, {
      onUploadProgress: (progressEvent) => {
        if (progressEvent.lengthComputable) {
          progress.value = (progressEvent.loaded / progressEvent.total) * 100;
        }
      }
    });
    return true; // 上传成功
  } catch (error) {
    console.error("上传失败", error);
    return false; // 上传失败
  }
};
</script>

<style scoped>
.project-upload-container {
  max-width: 600px;
  margin: 20px auto;
  padding: 20px;
  background-color: #333;
  color: #00bfff; /* 科技蓝文本 */
  border-radius: 10px;
}

.page-title {
  font-size: 32px;
  text-align: center;
  color: #00bfff; /* 科技蓝 */
  text-shadow: 0 0 10px rgba(0, 191, 255, 0.8);
  margin-bottom: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #00bfff; /* 科技蓝 */
}

input[type="text"],
select,
input[type="file"] {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #333;
  color: #00bfff; /* 科技蓝文本 */
  outline: none;
}

input[type="text"]::placeholder {
  color: #bbb;
}

.file-preview {
  margin-top: 20px;
  color: #00bfff; /* 科技蓝 */
}

button {
  padding: 10px 20px;
  background-color: #00bfff; /* 科技蓝 */
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #00d9ff; /* 浅绿色悬停效果 */
}

.validation-message {
  text-align: center;
  margin-top: 20px;
  color: #ffcc00; /* 黄色文本 */
  font-weight: bold;
}

.progress-bar-container {
  margin-top: 20px;
  width: 100%;
  background-color: #444; /* 深色背景 */
  border-radius: 5px;
  overflow: hidden;
}

.progress-bar {
  height: 10px;
  background-color: #00bfff; /* 科技蓝进度条 */
  transition: width 0.2s ease; /* 流畅过渡效果 */
}
</style>