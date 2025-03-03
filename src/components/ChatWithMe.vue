<template>
  <div class="chat-container">
    <div v-if="!nickname" class="nickname-container">
      <p class="nickname-reminder">{{ $t('chat.nicknameReminder') }}</p>
      <input @keyup.enter="setNickname" v-model="nicknameInput" class="nickname-input" :placeholder="$t('chat.nicknamePlaceholder')" />
      <button @click="setNickname" class="nickname-button">{{ $t('chat.nicknameButton') }}</button>
    </div>

    <div v-else>
      <h1 class="chat-title">{{ $t('chat.chatTitle') }}</h1>
      <div class="chat-box" ref="chatBox">
        <div v-for="chat in chats" :key="chat.id" class="chat-message">
          <strong class="chat-nickname">{{ chat.nickname }}</strong>:
          <span class="chat-context">{{ chat.context }}</span>
          <span class="chat-time">{{ chat.time }}</span>
        </div>
      </div>

      <div class="message-container">
        <button @click="toggleEmojiPicker" class="emoji-button">😀</button>
        <div v-if="showEmojiPicker" class="emoji-picker">
          <div class="emoji-page" v-for="(page, index) in paginatedEmojis" :key="index" v-show="currentPage === index">
            <span @click="addEmoji(emoji)" v-for="emoji in page" :key="emoji">{{ emoji }}</span>
          </div>
          <div class="pagination">
            <button @click="prevPage" :disabled="currentPage === 0">{{ $t('chat.prevPage') }}</button>
            <span>{{ $t('chat.page') }} {{ currentPage + 1 }} / {{ paginatedEmojis.length }}</span>
            <button @click="nextPage" :disabled="currentPage === paginatedEmojis.length - 1">{{ $t('chat.nextPage') }}</button>
          </div>
        </div>
        <input
            v-model="messageInput"
            @keyup.enter="sendMessage"
            class="message-input"
            :placeholder="$t('chat.messagePlaceholder')"
        />
        <button @click="sendMessage" class="message-button">{{ $t('chat.sendButton') }}</button>
      </div>
    </div>
    <div v-if="!nickname" class="spinner"></div>
    <div class="pulse-effect"></div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      nickname: '',
      nicknameInput: '',
      messageInput: '',
      chats: [],
      showEmojiPicker: false,
      emojis: [
        '😀', '😁', '😂', '🤣', '😃', '😄', '😅', '😆', '😉', '😊',
        '😇', '🙂', '🙃', '😋', '😌', '😍', '😎', '😏', '😐', '😑',
        '😒', '😔', '😕', '😖', '😫', '😩', '😬', '😭', '😮', '😯',
        '😲', '😳', '😵', '😡', '😠', '😷', '😱', '😨', '😩', '😫',
        '😬', '🙁', '☹️', '😖', '😣', '😕', '😮‍💨', '😪', '🤤', '😴',
        '😵‍💫', '🥱', '😷', '🤒', '🤕', '🤑', '🤠', '😈', '👿', '👹',
        '👺', '💩', '😺', '😸', '😻', '😼', '😽', '🙀', '😿', '😾',
        '👨‍❤️‍👨', '👩‍❤️‍👩', '👩‍❤️‍👨', '👨‍❤️‍👩', '🤵', '👰', '🧑‍🤝‍🧑', '🤵‍♂️', '🤵‍♀️', '👨‍🦱',
        '👩‍🦰', '👨‍🦳', '👩‍🦳', '👨‍🦲', '👩‍🦲', '👨‍', '👩‍', '🤲', '🙌', '👏',
        '👐', '🤝', '👍', '👎', '✊', '✌️', '🤘', '🤙', '👋', '🤚',
        '🖐️', '✋', '👌', '🤏', '👈', '👉', '👆', '👇', '🖖', '✋',
        '✍️', '🖊️', '🖋️', '🖌️', '🖍️', '✏️', '📏', '📐', '✂️', '🗑️',
        '🗞️', '📜', '📋', '📖', '📚', '📙', '📕', '📗', '📘', '📓',
        '📔', '📒', '📊', '📈', '📉', '📅', '📆', '📇', '🗂️', '🗃️',
        '🗳️', '🗄️', '📌', '📍', '✏️', '✒️', '🖋️', '🖊️', '🖌️', '🖍️',
        '📏', '📐', '📑', '📋', '📖', '📚', '🗂️', '🗃️', '📦', '📫',
        '📪', '📬', '📭', '📮', '🗳️', '📜', '🗞️', '📑', '🖊️', '🖋️',
        '🖌️', '🖍️', '✏️', '🖋️', '✒️', '🔖', '📌', '📍', '✏️', '🖌️',
        '📏', '📐', '📊', '📈', '📉', '📅', '📆', '📇', '🗂️', '🗃️',
        '🗄️', '📌', '📍', '✏️', '✒️', '🖊️', '🖋️', '🖌️', '🖍️', '📏',
        '📐', '📑', '📋', '📖', '📚', '📙', '📕', '📗', '📘', '📓',
        '📔', '📒', '📊', '📈', '📉', '📅', '📆', '📇', '🗂️', '🗃️',
        '📦', '📫', '📪', '📬', '📭', '📮', '🗳️', '📜', '🗞️', '📑',
        '💔', '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎',
        '💖', '💗', '💓', '💞', '💕', '💌', '💋', '💏', '💑', '👩‍❤️‍👩',
        '👨‍❤️‍👨', '👨‍❤️‍👩', '💍', '💎', '🔔', '🎁', '🎀', '🎊', '🎉', '🎈',
        '🎏', '🎐', '🧨', '🧧', '💵', '💴', '💷', '💶', '💳', '💸',
        '💰', '🪙', '🛍️', '💼', '📦', '📫', '📬', '📭', '📮', '🗳️',
        '📜', '🗞️', '📝', '🗂️', '📌', '📍', '✏️', '✒️', '🖊️', '🖋️',
        '🖌️', '🖍️', '📏', '📐', '📑', '📋', '📖', '📚', '📙', '📕',
        '📗', '📘', '📓', '📔', '📒', '📊', '📈', '📉', '📅', '📆',
        '📇', '🗂️', '🗃️', '🗄️', '📌', '📍', '✏️', '✒️', '🖊️', '🖋️',
        '🖌️', '🖍️', '📏', '📐', '📑', '📋', '📖', '📚', '📙', '📕',
        '📗', '📘', '📓', '📔', '📒', '📊', '📈', '📉', '📅', '📆',
        '📇', '🗂️', '🗃️', '🗄️', '🔒', '🔓', '🔑', '🔐', '🗝️', '🔋',
        '🔌', '💡', '🔦', '🕯️', '🪔', '🌟', '✨', '💫', '🌈', '🌞',
        '🌝', '🌜', '🌙', '🌍', '🌎', '🌏', '🌌', '⭐', '🌠', '🌅',
        '🌄', '🌊', '🌧️', '🌩️', '🌪️', '🌬️', '🌀', '☀️', '🌡️'],
      currentPage: 0,
      itemsPerPage: 102
    };
  },
  computed: {
    paginatedEmojis() {
      const pages = [];
      for (let i = 0; i < this.emojis.length; i += this.itemsPerPage) {
        pages.push(this.emojis.slice(i, i + this.itemsPerPage));
      }
      return pages;
    }
  },
  methods: {
    setNickname() {
      if (this.nicknameInput.trim()) {
        this.nickname = this.nicknameInput;
        this.fetchChats();
        this.startPolling();
      }
    },
    async fetchChats() {
      try {
        const response = await fetch('/api/chat');
        this.chats = await response.json();
        await this.$nextTick(() => {
          this.scrollToBottom(); // 确保聊天框自动滚动到底部
        });
      } catch (error) {
        console.error('Failed to fetch chat messages:', error);
      }
    },
    async sendMessage() {
      if (this.messageInput.trim()) {
        const message = {
          nickname: this.nickname,
          context: this.messageInput,
          time: new Date().toISOString()
        };

        try {
          await fetch('/api/chat', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
          });
          this.messageInput = ''; // 清空输入框
          await this.fetchChats(); // 更新聊天记录
        } catch (error) {
          console.error('Failed to send chat message:', error);
        }
      }
    },
    prevPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    nextPage() {
      if (this.currentPage < this.paginatedEmojis.length - 1) {
        this.currentPage++;
      }
    },
    startPolling() {
      setInterval(this.fetchChats, 5000); // 每5秒更新聊天记录
    },
    scrollToBottom() {
      const chatBox = this.$refs.chatBox;
      if (chatBox) {
        chatBox.scrollTop = chatBox.scrollHeight;
      }
    },
    toggleEmojiPicker() {
      this.showEmojiPicker = !this.showEmojiPicker;
    },
    addEmoji(emoji) {
      this.messageInput += emoji;
      this.showEmojiPicker = false;
    }
  }
};
</script>

<style scoped>
.chat-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
  border-radius: 10px;
  position: relative;
  overflow: hidden;
}

.nickname-container {
  text-align: center;
  margin-bottom: 20px;
}

.nickname-reminder {
  margin-bottom: 10px;
  color: #90ff96;
}

.nickname-input {
  padding: 10px;
  font-size: 18px;
  border: 2px solid #90ff96;
  border-radius: 5px;
  background-color: #222;
  color: #90ff96;
}

.nickname-button {
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 18px;
  background-color: #90ff96;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.nickname-button:hover {
  background-color: #72e07c;
}

.chat-title {
  text-align: center;
  margin-bottom: 20px;
  color: #90ff96;
}

.chat-box {
  max-height: 400px;
  overflow-y: auto;
  background-color: #222;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
  color: #90ff96;
}

.chat-message {
  margin-bottom: 15px;
  animation: fadeIn 1s ease-in;
}

.chat-nickname {
  color: #90ff96;
  font-weight: bold;
}

.chat-context {
  color: #fff;
}

.chat-time {
  float: right;
  font-size: 12px;
  color: rgba(144, 255, 150, 0.7);
}

.message-container {
  display: flex;
  align-items: center;
  position: relative;
}

.emoji-button {
  font-size: 24px;
  background: none;
  border: none;
  cursor: pointer;
  color: #90ff96;
  margin-right: 10px;
}

.emoji-picker {
  position: absolute;
  bottom: 60px;
  left: 20px;
  background-color: #222;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-wrap: wrap;
}

.emoji-picker span {
  font-size: 24px;
  margin: 5px;
  cursor: pointer;
  transition: transform 0.2s;
}

.emoji-picker span:hover {
  transform: scale(1.2);
}

.message-input {
  flex: 1;
  padding: 10px;
  font-size: 18px;
  border: 2px solid #90ff96;
  border-radius: 5px;
  background-color: #222;
  color: #90ff96;
}

.message-button {
  padding: 10px 20px;
  margin-left: 10px;
  font-size: 18px;
  background-color: #90ff96;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.message-button:hover {
  background-color: #72e07c;
}

.spinner {
  border: 8px solid rgba(144, 255, 150, 0.3);
  border-top: 8px solid #90ff96;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin: 20px auto;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.pulse-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(144, 255, 150, 0.2);
  animation: pulse 2s infinite;
  transform: translate(-50%, -50%);
}

@keyframes pulse {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.1);
    opacity: 0.7;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

.nickname-input:focus,
.message-input:focus {
  outline: none;
  border-color: #72e07c;
}

.nickname-input::placeholder,
.message-input::placeholder {
  color: rgba(144, 255, 150, 0.7);
}

.message-input {
  transition: border-color 0.3s;
}

.message-input:focus {
  border-color: #72e07c;
}
.emoji-page {
  display: flex;
  flex-wrap: wrap;
}
.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 10px;
}
</style>