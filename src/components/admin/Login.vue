<template>
  <div class="login">
    <div class="loginText">{{ $t('login.title') }}</div>
    <div class="field">
      <input
          type="text"
          placeholder=" "
          v-model="username"
          @focus="onFocus"
          @blur="onBlur"
          required
      />
      <div class="placeholder">{{ $t('login.username') }}</div>
    </div>
    <div class="field">
      <input
          type="password"
          placeholder=" "
          v-model="password"
          @focus="onFocus"
          @blur="onBlur"
          required
      />
      <div class="placeholder">{{ $t('login.password') }}</div>
    </div>
    <div
        class="loginButton"
        :class="{ disabled: !canLogin }"
        @click="canLogin ? initiateLogin() : null"
        :style="{ cursor: canLogin ? 'pointer' : 'not-allowed', opacity: canLogin ? 1 : 0.5 }"
    >
    {{ $t('login.submit') }}
  </div>
  <div v-if="loading" class="loading-message">
    <p class="loading-text">{{ $t('login.verifying') }}</p>
    <div class="progress-bar-container">
      <div class="progress-bar" :style="{ width: progress + '%' }"></div>
    </div>
    <p class="loading-text">{{ $t('login.encrypting') }}</p>
  </div>
  </div>
</template>

<script>
import {mapActions} from "vuex";

export default {
  data() {
    return {
      username: '',
      password: '',
      loading: false,
      progress: 0,
      interval: null,
      anim: 0,
    };
  },
  computed: {
    canLogin() {
      return this.username.trim() !== '' && this.password.trim() !== '';
    },
  },
  methods: {
    ...mapActions(['login']),
    onFocus() {
      this.anim = 1;
    },
    onBlur(event) {
      if (!event.target.value) {
        this.anim = 0;
      }
    },
    async initiateLogin() {
      this.startLoading();

      try {
        await this.wait(2000);

        const success = await this.login({username: this.username, password: this.password});

        if (success) {
          localStorage.setItem('username', this.username);
          this.$router.push('/admin');
        } else {
          this.$router.push({name: 'Error'});
        }
      } catch (error) {
        this.$router.push({name: 'Error'});
      } finally {
        this.stopLoading();
      }
    },
    startLoading() {
      this.loading = true;
      this.progress = 0;

      this.interval = setInterval(() => {
        if (this.progress < 100) {
          this.progress += 10;
        }
      }, 200);
    },
    stopLoading() {
      clearInterval(this.interval);
      this.loading = false;
    },
    wait(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
  },
};
</script>

<style scoped>
*,
*:before,
*:after {
  box-sizing: border-box;
}

body {
  margin: 0;
  height: 100vh;
  width: 100%;
  color: black;
  background: #0c0c0b;
  overflow: hidden;
  display: flex; /* 使用 flexbox 布局 */
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}

.login {
  max-width: 500px; /* 增加最大宽度 */
  margin: 50px auto;
  background: #151617;
  padding: 2rem; /* 增加内边距 */
  border-radius: 1.5rem;
  display: grid;
  gap: 1rem; /* 增加间距 */
  position: relative;
  overflow: hidden;
  animation: slideIn 0.5s ease forwards;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.loginText {
  color: #6779f5;
  text-align: center;
  font-size: 2.5rem; /* 增加字体大小 */
  font-weight: 600;
  margin-bottom: 1rem;
}

@property --anim {
  syntax: "<number>";
  inherits: true;
  initial-value: 0;
}

.field {
  background: #6779f5;
  border-radius: 0.75rem;
  position: relative;
  height: 3rem; /* 增加高度 */
  --anim: 0;
  transition: --anim 500ms ease;

  background: linear-gradient(to right,
  #6779f5 calc(clamp(0, (var(--anim) - 0.75) / 0.25, 1) * 33%),
  transparent calc(clamp(0, (var(--anim) - 0.75) / 0.25, 1) * 33%),
  transparent calc(100% - clamp(0, (var(--anim) - 0.75) / 0.25, 1) * 33%),
  #6779f5 calc(100% - clamp(0, (var(--anim) - 0.75) / 0.25, 1) * 33%)),
  linear-gradient(to top,
      transparent calc(15% + clamp(0, (var(--anim) - 0.65) / 0.1, 1) * 70%),
      #202122 calc(15% + clamp(0, (var(--anim) - 0.65) / 0.1, 1) * 70%)),
  linear-gradient(to right,
      transparent calc(50% - clamp(0, var(--anim) / 0.65, 1) * 50%),
      #6779f5 calc(50% - clamp(0, var(--anim) / 0.65, 1) * 50%),
      #6779f5 calc(50% + clamp(0, var(--anim) / 0.65, 1) * 50%),
      transparent calc(50% + clamp(0, var(--anim) / 0.65, 1) * 50%)),
  linear-gradient(#202122, #202122);
}

.field:has(input:focus) {
  --anim: 1;
}

.field > .placeholder {
  pointer-events: none;
  position: absolute;
  inset: 0;
  display: grid;
  place-content: center;
  color: #7d8dff;
  transition: transform 500ms ease;
}

.field:has(input:focus) > .placeholder,
.field:has(input:not(:placeholder-shown)) > .placeholder {
  transform: translateY(-50%) scale(0.85);
}

.field > input {
  padding-left: 1rem;
  color: white;
  position: absolute;
  inset: 0.25rem; /* 增加内边距 */
  border-radius: 0.625rem;
  border: none;
  outline: none;
  background: #202122;
  font-size: 1.25rem; /* 增加字体大小 */
}

.loginButton {
  margin-top: 0.5rem;
  background: radial-gradient(circle at center, #6779f5 calc(-50% + var(--anim) * 150%), #202122 calc(var(--anim) * 100%));
  border-radius: 0.75rem;
  position: relative;
  height: 3rem; /* 增加高度 */
  display: grid;
  place-content: center;
  color: #7d8dff;
  --anim: 0;
  transition: --anim 500ms ease, color 500ms ease, opacity 300ms ease; /* 添加透明度变化的过渡 */
}

.loginButton.disabled {
  cursor: not-allowed;
  background: #3a3a3a;
  color: #b0b0b0;
  pointer-events: none;
}

.loginButton.disabled:hover {
  position: relative;
}

.loginButton.disabled:hover::after {
  content: '⛔';
  position: absolute;
  top: 50%;
  right: 10px;
  transform: translateY(-50%);
  font-size: 18px;
  color: #ff4c4c;
}

.loginButton:hover {
  --anim: 1;
  color: white;
  cursor: pointer;
}

.loading-message {
  text-align: center;
  color: #7d8dff;
  font-size: 1.25rem; /* 增加字体大小 */
  margin-top: 1rem;
}

.loading-text {
  color: #7d8dff;
}

.progress-bar-container {
  background: #202122;
  border-radius: 0.5rem;
  overflow: hidden;
  margin-top: 0.5rem;
  height: 0.75rem; /* 增加高度 */
}

.progress-bar {
  height: 100%;
  background-color: #6779f5;
  transition: width 0.5s ease;
}

.overlay {
  position: absolute;
  inset: 0;
  background: rgba(12, 12, 11, 0.8);
  border-radius: 1.5rem;
}
</style>