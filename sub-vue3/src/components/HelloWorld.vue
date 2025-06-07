<script setup lang="ts">
import { useRouter } from 'vue-router'

defineProps<{ msg: string }>()

const router = useRouter()
const goError = () => {
  router.push({ path: '/error' })
}
</script>

<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <div class="card">
      <button type="button" @click="goError">移动到Error</button>
      <p>
        Edit
        <code>components/HelloWorld.vue</code> to test HMR
      </p>
    </div>

    <p>
      Check out
      <a href="https://vuejs.org/guide/quick-start.html#local" target="_blank">create-vue</a>, the official Vue + Vite
      starter
    </p>
    <p>
      Learn more about IDE Support for Vue in the
      <a href="https://vuejs.org/guide/scaling-up/tooling.html#ide-support" target="_blank">Vue Docs Scaling up
        Guide</a>.
    </p>
    <p class="read-the-docs">Click on the Vite and Vue logos to learn more</p>
  </div>
</template>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
