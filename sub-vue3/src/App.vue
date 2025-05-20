<script setup lang="ts">
import HelloWorld from './components/HelloWorld.vue'
import { ref } from "vue";
import { useStore } from "vuex";

const store = useStore();
const user = ref(store.state.user);
</script>

<template>
  <div class="App">
    <router-view/>
  </div>
</template>
<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
