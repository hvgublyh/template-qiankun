<template>
  <div class="error-container">
    <div class="error-content">
      <div class="error-icon">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="96" height="96">
          <path fill="none" d="M0 0h24v24H0z"/>
          <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" fill="currentColor"/>
        </svg>
      </div>
      <h1 class="error-title">{{ title }}</h1>
      <p class="error-message">{{ message }}</p>
      <button class="error-button" @click="goBack">Go Back</button>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps({
  title: {
    type: String,
    default: 'Error Occurred'
  },
  message: {
    type: String,
    default: 'Sorry, something went wrong.'
  },
  statusCode: {
    type: Number,
    default: 500
  }
});

const router = useRouter();

const goBack = () => {
  router.back();
};
</script>

<style scoped>
.error-container {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 2rem;
  background-color: #f8f9fa;
}

.error-content {
  max-width: 500px;
  padding: 2rem;
  text-align: center;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.error-icon {
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
  color: #e74c3c;
}

.error-title {
  font-size: 1.8rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.error-message {
  font-size: 1.1rem;
  margin-bottom: 2rem;
  color: #7f8c8d;
}

.error-button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  color: white;
  background-color: #3498db;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.2s;
}

.error-button:hover {
  background-color: #2980b9;
}
</style>