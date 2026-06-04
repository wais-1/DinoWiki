<script setup>
import { ref, onMounted } from 'vue'
import api from '@/api'

const users = ref([])
const error = ref(null)

onMounted(async () => {
  try {
    const { data } = await api.get('/users')
    users.value = data
  } catch (e) {
    error.value = 'Не удалось загрузить пользователей'
  }
})
</script>

<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <ul v-else>
      <li v-for="user in users" :key="user.user_id">
        {{ user.user_email }}
      </li>
    </ul>
  </div>
  <RouterView />
</template>