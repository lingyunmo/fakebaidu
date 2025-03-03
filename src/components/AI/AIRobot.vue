<script setup>
</script>

<template>
  <div class="robot">
    <div class="antenna"></div>
    <div class="head">
      <div class="eyes">
        <div class="eye"></div>
        <div class="eye"></div>
      </div>
      <div class="mouth"></div>
    </div>
    <div class="neck"></div>
    <div class="body">
      <div class="panel">
        <div class="panel-line"></div>
        <div class="panel-line"></div>
        <div class="panel-line"></div>
      </div>
      <div class="buttons">
        <div class="button red"></div>
        <div class="button yellow"></div>
        <div class="button green"></div>
      </div>
    </div>
    <div class="arms">
      <div class="arm left-arm"></div>
      <div class="arm right-arm"></div>
    </div>
    <div class="legs">
      <div class="leg left-leg"></div>
      <div class="leg right-leg"></div>
    </div>
  </div>
</template>

<style scoped>
.robot {
  width: 180px;
  background-color: #c1c1c1;
  border-radius: 10px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  padding-top: 10px;
  position: relative;
}

.antenna {
  width: 5px;
  height: 30px;
  background-color: #999;
  border-radius: 2px;
  position: absolute;
  top: -20px;
  left: 50%;
  transform: translateX(-50%);
}

.head {
  width: 100px;
  height: 100px;
  background-color: #808080;
  border-radius: 20px;
  position: relative;
  margin-bottom: 10px;
}

.eyes {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.eye {
  width: 20px;
  height: 20px;
  background-color: white;
  border-radius: 50%;
  position: relative;
}

.eye::before {
  content: '';
  width: 10px;
  height: 10px;
  background-color: black;
  border-radius: 50%;
  position: absolute;
  top: 5px;
  left: 5px;
}

.mouth {
  width: 60px;
  height: 10px;
  background-color: black;
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.neck {
  width: 20px;
  height: 10px;
  background-color: #555;
  margin-bottom: 10px;
}

.body {
  width: 150px;
  height: 180px;
  background-color: #444;
  border-radius: 10px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 20px;
}

.panel {
  width: 80px;
  height: 60px;
  background-color: #222;
  border-radius: 5px;
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
}

.panel-line {
  width: 60px;
  height: 5px;
  background-color: #ccc;
}

.buttons {
  display: flex;
  gap: 10px;
}

.button {
  width: 20px;
  height: 20px;
  background-color: red;
  border-radius: 50%;
}

.button.yellow {
  background-color: yellow;
}

.button.green {
  background-color: green;
}

.arms {
  display: flex;
  justify-content: space-between;
  width: 100%;
  position: relative;
  top: -15px;
}

.arm {
  width: 80px;
  height: 20px;
  background-color: #808080;
  border-radius: 10px;
  position: absolute;
}

.left-arm {
  left: -70px; /* 让左臂更接近身体 */
  top: -100px;
}

.right-arm {
  right: -70px; /* 让右臂更接近身体 */
  top: -100px;
}

.legs {
  display: flex;
  justify-content: space-between;
  width: 100px;
  margin-top: 10px;
  position: relative;
  bottom: 10px;
}

.leg {
  width: 30px;
  height: 100px;
  background-color: #808080;
  border-radius: 10px;
}
</style>
