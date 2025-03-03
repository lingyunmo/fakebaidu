<template>
  <div class="lottery-container">
    <h1 class="lottery-title">{{ $t('lottery.title') }}</h1>
    <div class="wheel" :style="{ transform: `rotate(${rotation}deg)` }">
      <div class="slice" v-for="(prize, index) in prizes" :key="index" :style="{ backgroundColor: sliceColors[index % sliceColors.length] }">
        <span>{{ prize }}</span>
      </div>
    </div>
    <button @click="drawLottery" :disabled="isSpinning">{{ isSpinning ? '正在转动...' : $t('lottery.drawButton') }}</button>

    <div v-if="result" class="lottery-result">
      <h2>{{ $t('lottery.resultTitle') }}</h2>
      <p>{{ result }}</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const prizes = [
  "贷款100万美元",
  "一年免费电池更换服务",
  "终身供应的猫粮",
  "一辆虚拟汽车",
  "无限量冰淇淋券",
  "月度超能力体验",
  "一台会唱歌的洗衣机",
  "10种不同颜色的空气",
  "免费的平行宇宙旅行",
  "随便选择一只宠物宇宙飞船",
];

const sliceColors = ['#ffcc00', '#ff6666', '#66ff66', '#66ccff', '#ff66cc'];
const result = ref('');
const isSpinning = ref(false);
const rotation = ref(0);

const drawLottery = () => {
  isSpinning.value = true;
  const randomDegrees = Math.floor(Math.random() * 360) + 720; // 转动720度加上随机角度
  rotation.value += randomDegrees;

  setTimeout(() => {
    isSpinning.value = false;
    result.value = prizes[Math.floor((randomDegrees % 360) / (360 / prizes.length))]; // 计算中奖
  }, 3000); // 旋转时间
};
</script>

<style scoped>
.lottery-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  background-color: #333;
  color: #90ff96;
  border-radius: 10px;
  text-align: center;
}

.lottery-title {
  font-size: 32px;
  margin-bottom: 20px;
}

.wheel {
  width: 300px;
  height: 300px;
  border-radius: 50%;
  position: relative;
  overflow: hidden;
  transition: transform 3s ease-out;
}

.slice {
  width: 50%;
  height: 50%;
  position: absolute;
  right: 50%;
  bottom: 50%;
  transform-origin: 100% 100%;
  border-left: 100px solid transparent;
  border-right: 100px solid transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  color: #fff;
}

.slice:nth-child(1) { transform: rotate(0deg); }
.slice:nth-child(2) { transform: rotate(36deg); }
.slice:nth-child(3) { transform: rotate(72deg); }
.slice:nth-child(4) { transform: rotate(108deg); }
.slice:nth-child(5) { transform: rotate(144deg); }
.slice:nth-child(6) { transform: rotate(180deg); }
.slice:nth-child(7) { transform: rotate(216deg); }
.slice:nth-child(8) { transform: rotate(252deg); }
.slice:nth-child(9) { transform: rotate(288deg); }
.slice:nth-child(10) { transform: rotate(324deg); }

button {
  padding: 10px 20px;
  background-color: #90ff96;
  color: #333;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #78e286;
}

.lottery-result {
  margin-top: 20px;
  font-size: 24px;
  color: #f44336;
}
</style>
