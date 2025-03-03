<script setup>

import ProjectNotice from "@/components/project/ProjectNotice.vue";
import ProjectUpload from "@/components/project/ProjectUpload.vue";
import ProjectLoad from "@/components/project/ProjectLoad.vue";
import ProjectTemplate from "@/components/project/ProjectTemplate.vue";
import ProjectCheck from "@/components/project/ProjectCheck.vue";
</script>

<template>
  <div class="project-container">
    <ProjectNotice />
    <ProjectTemplate />
    <ProjectUpload />
    <ProjectCheck/>
    <ProjectLoad />
  </div>
</template>

<script>
</script>

<style scoped>
</style>
