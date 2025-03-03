<template>
  <div class="project-template-container">
    <div class="inner-container" :class="{ flipped: showTemplates }">
      <div class="front">
        <h1 class="project-template-title">可用的模板</h1>
        <button class="project-template-button" @click="toggleTemplates">点击获取模板</button>
      </div>
      <div class="back">
        <div class="project-template-list">
          <ul>
            <li v-for="(file, index) in templates" :key="index">
              <a :href="`/template/${file}`" download>{{ file }}</a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showTemplates: false,
      templates: [],
    };
  },
  methods: {
    toggleTemplates() {
      this.showTemplates = !this.showTemplates;

      if (!this.templates.length) {
        this.templates = [
          '15-曹梓扬.doc',
          '16-李昊宇.doc',
          '17-高田.doc',
          '潍坊学院.docx',
        ];
      }
    },
  },
};
</script>

<style scoped>
.project-template-container {
  perspective: 800px;
  max-width: 180px;
  margin: 10px 100px;
  position: relative;
}

.inner-container {
  position: relative;
  width: 100%;
  height: auto;
  transition: transform 0.6s; /* 翻转的过渡效果 */
  transform-style: preserve-3d; /* 保持3D效果 */
}

.flipped {
  transform: rotateY(180deg); /* 翻转效果 */
}

.front, .back {
  position: absolute;
  width: 100%;
  backface-visibility: hidden; /* 隐藏背面 */
}

.front {
  background: #151617;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  color: #00ffcc;
}

.back {
  background: #151617;
  padding: 2rem;
  border-radius: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
  color: #00ffcc;
  transform: rotateY(180deg); /* 背面翻转180度 */
}

.project-template-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 1rem;
}

.project-template-button {
  background: linear-gradient(90deg, #6779f5, #202122);
  border: none;
  border-radius: 0.75rem;
  padding: 1rem;
  color: white;
  font-weight: bold;
  cursor: pointer;
  transition: background 0.5s ease, transform 0.3s ease;
}

.project-template-button:hover {
  background: linear-gradient(90deg, #202122, #6779f5);
  transform: scale(1.05);
}

.project-template-list {
  text-align: center;
  margin-top: 15px;
}

.project-template-list ul {
  list-style-type: none;
  padding: 0;
}

.project-template-list li {
  margin: 10px 0;
}

.project-template-list a {
  color: #00ffcc;
  text-decoration: none;
  transition: color 0.3s ease, transform 0.3s ease;
}

.project-template-list a:hover {
  color: #6779f5;
  transform: scale(1.05);
}
</style>