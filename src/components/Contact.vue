<template>
  <div class="contact-container">
    <h1 class="contact-title">{{ $t('contact.title') }}</h1>
    <p class="description">{{ $t('contact.description') }}</p>

    <div class="contact-methods">
      <div class="contact-card">
        <h2>{{ $t('contact.github') }}</h2>
        <a href="https://github.com/lingyunmo" target="_blank" class="link">{{ $t('contact.visitGithub') }}</a>
      </div>
      <div class="contact-card">
        <h2>{{ $t('contact.feedback') }}</h2>
        <p>{{ $t('contact.feedbackDescription') }}</p>
        <a href="mailto:2087789639@qq.com" class="link">{{ $t('contact.sendEmail') }}</a>
      </div>
      <div class="contact-card">
        <h2>{{ $t('contact.contribute') }}</h2>
        <p>{{ $t('contact.contributeDescription') }}</p>
        <a href="https://github.com/lingyunmo/Lanthanum" target="_blank" class="link">{{ $t('contact.viewProject') }}</a>
      </div>
    </div>
  </div>
</template>

<script setup>
</script>

<style scoped>
.contact-container {
  max-width: 800px;
  margin: 20px auto;
  padding: 20px;
  background-color: #222;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  color: #ffffff;
}

.contact-title {
  font-size: 36px;
  text-align: center;
  color: #90ff96;
  margin-bottom: 20px;
}

.description {
  text-align: center;
  margin-bottom: 30px;
  font-size: 18px;
}

.contact-methods {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.contact-card {
  background: linear-gradient(145deg, #3a3a3a, #444);
  border-radius: 10px;
  padding: 20px;
  margin: 10px;
  width: 250px;
  box-shadow: 6px 6px 12px #1b1b1b, -6px -6px 12px #5b5b5b;
  transition: transform 0.3s, box-shadow 0.3s;
}

.contact-card:hover {
  transform: translateY(-5px);
  box-shadow: 8px 8px 16px #1b1b1b, -8px -8px 16px #5b5b5b;
}

h2 {
  color: #90ff96;
}

.link {
  color: #90ff96;
  text-decoration: none;
  transition: color 0.3s;
}

.link:hover {
  color: #fff;
  text-decoration: underline;
}
</style>
