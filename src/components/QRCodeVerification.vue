<template>
  <div class="qr-code-container" v-if="!isVerified">
    <div class="loading-container">
      <div class="spinner"></div>
      <span class="loading-text">{{ $t('QRCode.loadingText') }}</span>
    </div>
    <h1 class="verification-title">{{ $t('QRCode.verificationTitle') }}</h1>
    <img :src="qrCodeUrl" alt="二维码" v-if="qrCodeUrl" />
    <p>{{ $t('QRCode.uuid') }} {{ uniqueId }}</p>
    <div class="scan-warning" v-html="formattedScanWarning"></div>
    <div v-if="message">{{ message }}</div>
    <div v-if="timeLeft >= 0 && !isVerified">{{ $t('QRCode.timeLeft', { time: timeLeft }) }}</div>
    <div v-if="uniqueId && !isVerified">
      <a :href="verificationLink" target="_blank">{{ $t('QRCode.linkVerification') }}</a>
    </div>
    <div v-if="isVerified" class="verification-success">{{ $t('QRCode.verificationSuccess') }}</div>
    <div class="pulse-effect"></div>
    <div class="pulse-effect-large"></div>
  </div>
  <slot v-if="isVerified" />
</template>

<script>
import QRCode from 'qrcode';

const STATUS = {
  AUTHENTICATED: '认证',
  INVALID: '失效',
  VALID: '有效',
};

export default {
  data() {
    return {
      qrCodeUrl: '',
      uniqueId: '',
      message: '',
      checkInterval: null,
      countdownInterval: null, // 保存倒计时的定时器
      timeLeft: 300, // 5分钟的倒计时
      isVerified: false, // 标记是否已验证成功
    };
  },
  async created() {
    await this.generateQRCode(); // 组件创建时自动生成二维码
  },
  computed: {
    verificationLink() {
      return `${window.location.origin}/api/qr/auth/${this.uniqueId}`; // 生成完整的验证链接
    },
    formattedScanWarning() {
      return this.$t('QRCode.scanWarning').replace(/\n/g, '<br/>');
    },
  },
  methods: {
    async generateQRCode() {
      try {
        const response = await fetch('/api/qr/generate');

        if (response.ok) {
          const data = await response.json();
          this.uniqueId = data.uniqueId;
          this.qrCodeUrl = await this.createQRCode(this.uniqueId);
          this.message = '二维码生成成功';
          this.startCheckInterval();
          this.startCountdown();
        } else {
          this.message = '生成二维码失败，请重试。';
        }
      } catch (error) {
        this.message = '生成二维码过程中出现错误。';
      }
    },
    async createQRCode(uniqueId) {
      return QRCode.toDataURL(`${window.location.origin}/api/qr/auth/${uniqueId}`);
    },
    async checkQRCode() {
      if (!this.uniqueId) {
        return;
      }
      try {
        const response = await fetch(`/api/qr/check/${this.uniqueId}`);
        const data = await response.json();

        // 处理不同状态
        if (response.ok) {
          switch (data.status) {
            case STATUS.AUTHENTICATED:
              this.handleSuccess();
              break;
            case STATUS.INVALID:
              this.handleInvalid();
              break;
            case STATUS.VALID:
              this.message = '请扫描二维码以进行认证';
              break;
            default:
              this.handleInvalid(); // 如果状态未知，也当作失效处理
          }
        } else {
          this.handleInvalid(); // 请求失败也处理为失效
        }
      } catch (error) {
        this.message = '检查二维码状态时出现错误。';
      }
    },
    handleSuccess() {
      this.clearIntervals();
      this.message = '二维码已验证成功！';
      this.isVerified = true; // 标记为已验证
      this.timeLeft = 0; // 清除倒计时显示
    },
    handleInvalid() {
      this.clearIntervals();
      this.message = '二维码已失效或不存在，请重新生成。';
    },
    clearIntervals() {
      clearInterval(this.checkInterval);
      clearInterval(this.countdownInterval); // 清除倒计时定时器
    },
    startCheckInterval() {
      this.checkInterval = setInterval(this.checkQRCode, 1000);
    },
    startCountdown() {
      this.countdownInterval = setInterval(() => {
        if (this.timeLeft > 0) {
          this.timeLeft--;
        } else {
          this.clearIntervals();
          this.message = '二维码已过期，请重新生成。';
        }
      }, 1000);
    },
  },
  beforeDestroy() {
    this.clearIntervals();
  },
};
</script>

<style scoped>
.qr-code-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #1a1a2e; /* 深蓝背景 */
  color: #00d4ff; /* 明亮的科技蓝字体 */
  border-radius: 10px;
  text-align: center;
  position: relative;
  overflow: hidden;
}

.loading-container {
  display: flex;
  align-items: center;
  margin-bottom: 20px; /* 加载圈与标题之间的间距 */
}

.spinner {
  border: 8px solid rgba(0, 212, 255, 0.3);
  border-top: 8px solid #00d4ff;
  border-radius: 50%;
  width: 30px; /* 调整加载圈大小 */
  height: 30px; /* 调整加载圈大小 */
  animation: spin 1s linear infinite;
  margin-right: 10px; /* 加载圈与文本之间的间距 */
}

.loading-text {
  font-size: 16px; /* 加载文本的字体大小 */
  color: #00d4ff; /* 文本颜色 */
}

.verification-title {
  font-size: 28px; /* 标题字体大小 */
  color: #00d4ff;
  text-shadow: 0 0 10px rgba(0, 212, 255, 0.8);
  margin-bottom: 20px;
}

.scan-warning {
  font-size: 18px; /* 提示文本的字体大小增加 */
  color: #ff4d4d; /* 提示文本颜色 */
  margin: 10px 0; /* 提示文本的上下间距 */
}

.verification-success {
  font-size: 24px; /* 成功消息字体大小 */
  color: #00d4ff;
  animation: fadeIn 1s ease-in;
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

@keyframes fadeIn {
  0% {
    opacity: 0;
    transform: translateY(-20px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

.pulse-effect {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 300px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.2);
  animation: pulse 2s infinite;
  transform: translate(-50%, -50%);
}

.pulse-effect-large {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 400px;
  height: 400px;
  border-radius: 50%;
  background: rgba(0, 212, 255, 0.1);
  animation: pulse-large 3s infinite;
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

@keyframes pulse-large {
  0% {
    transform: scale(1);
    opacity: 1;
  }
  50% {
    transform: scale(1.2);
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    opacity: 1;
  }
}
</style>