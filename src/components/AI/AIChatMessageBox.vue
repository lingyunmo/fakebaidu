<script setup>
import {ref} from 'vue';
import MarkdownIt from 'markdown-it';
import Robot from "@/components/AI/AIRobot.vue";

// 创建 MarkdownIt 实例
const md = new MarkdownIt();
// 存储用户输入的内容
const userMessage = ref("");
// 聊天记录
const chatHistory = ref([]);
// 用于逐字显示的AI回复
const currentBotMessage = ref("");
// 服务器状态
const serverStatus = ref("");
//模型ID
const modelId = ref("");

// 发送信息
const sendMessage = async () => {
  if (userMessage.value.trim() === "") return; // 如果输入为空则返回

  // 将用户消息添加到聊天记录
  chatHistory.value.push({sender: "user", message: userMessage.value});

  // 清空输入框
  const messageToSend = userMessage.value;
  userMessage.value = "";

  // 获取AI回复并逐字显示
  currentBotMessage.value = "";
  chatHistory.value.push({sender: "bot", message: ""});
  await displayMessage("正在加载中，请稍后···",50);
  const response = await getAIResponse(messageToSend);
  currentBotMessage.value = "";
  await displayMessage(response,10);
};

// 逐字显示AI回复
const displayMessage = (message,delay) => {
  return new Promise((resolve) => {
    let i = 0;
    const interval = setInterval(() => {
      if (i < message.length) {
        // 逐字更新当前的bot消息
        currentBotMessage.value += message[i];
        // 更新最后一个bot消息的内容
        chatHistory.value[chatHistory.value.length - 1].message = currentBotMessage.value;
        i++;
      } else {
        clearInterval(interval);
        resolve();
      }
    }, delay);
  });
};

// 从 LM Studio API 获取回复
const getAIResponse = async (message) => {
  try {
    const response = await fetch('/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        messages: [
          {
            role: 'user',
            content: message
          }
        ],
        model: 'llmmeta-llama-3.1-8b-instruct-q4_k_m'
      }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    console.log('AI 回复:', data);

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    } else {
      throw new Error('Invalid response format');
    }
  } catch (error) {
    console.error('获取AI回复失败', error);
    return "对不起，我暂时无法处理这个问题。";
  }
};

//合并fetchServerStatus和fetchCurrentModel
const initializeApp = async () => {
  try {
    const serverResponse = await fetch('/v1/models/');
    const serverData = await serverResponse.json();

    if (serverData.data && serverData.data.length > 0 && modelId.value!=null) {
      modelId.value = serverData.data[0].id;
      serverStatus.value = "服务器在线";
    } else {
      modelId.value = '没有找到模型信息';
      throw new Error(`HTTP error! status: ${serverResponse.status}`);
    }
  } catch (error) {
    console.error('初始化应用失败', error);
    serverStatus.value = "服务器维护中";
    modelId.value = '获取当前模型ID失败';
  }
};

initializeApp();
</script>

<template>
  <div class="chat-container">
    <h1 class="page-title">ChatGPT 0.3 (CloseAI)</h1>
    <div class="server-status">
      <p>服务器状态: {{ serverStatus }}</p>
      <div :class="[serverStatus === '服务器在线' ? 'status-light-green' : 'status-light-red']"></div>
      <p>当前模型: {{ modelId }}</p>
    </div>
    <div class="chat-box">
      <div v-for="(chat, index) in chatHistory" :key="index" :class="['message', chat.sender]">
        <!-- 渲染Markdown内容为HTML -->
        <div class="message-bubble" v-html="md.render(chat.message)"></div>
      </div>
    </div>

    <div class="input-box">
      <input
          type="text"
          v-model="userMessage"
          placeholder="请输入信息..."
          @keydown.enter="sendMessage"
      />
      <button @click="sendMessage">发送</button>
    </div>
  </div>
</template>

<style scoped>
/* 样式定义保持不变 */
.chat-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333;
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

.chat-box {
  flex-grow: 1;
  overflow-y: auto;
  margin-bottom: 20px;
  max-height: 500px;
  padding-right: 10px;
  border: 1px solid #444;
  background-color: #444;
  border-radius: 10px;
}

.message {
  margin: 10px 0;
  display: flex;
  justify-content: flex-start;
}

.message.user {
  justify-content: flex-end;
}

.message-bubble {
  padding: 10px 15px;
  border-radius: 20px;
  max-width: 70%;
  word-wrap: break-word;
}

.message.user .message-bubble {
  background-color: #90ff96;
  color: #333;
}

.message.bot .message-bubble {
  background-color: #e5e5e5;
  color: #333;
}

.input-box {
  display: flex;
  align-items: center;
  background-color: #444;
  padding: 10px;
  border-radius: 10px;
}

input[type="text"] {
  flex-grow: 1;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 20px;
  outline: none;
  background-color: #555;
  color: #90ff96;
}

input[type="text"]::placeholder {
  color: #bbb;
}

button {
  padding: 10px 20px;
  margin-left: 10px;
  background-color: #90ff96;
  color: #333;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

button:hover {
  background-color: #78e286;
}

.status-light-green {
  width: 20px;
  height: 20px;
  background-color: green;
  border-radius: 50%;
  display: inline-flex;
}

.status-light-red {
  width: 30px;
  height: 30px;
  background-color: red;
  border-radius: 50%;
  display: inline-flex;
}
</style>