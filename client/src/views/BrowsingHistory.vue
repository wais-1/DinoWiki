<script setup>
import CardComp from '@/components/CardComp.vue'
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/api'
import { useRouter } from 'vue-router'

const router = useRouter()
const authStore = useAuthStore()
const history = ref([])

const goBack = () => router.push('/')

const fetchHistory = async () => {
    try {
        const response = await api.get('/browsing-history/', {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
        history.value = response.data
    } catch (error) {
        console.error('Ошибка загрузки истории:', error)
    }
}

// Функция для записи просмотра (вызывается на странице динозавра)
const addToHistory = async (dinoId) => {
    try {
        await api.post('/browsing-history/', { dino_id: dinoId }, {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
    } catch (error) {
        console.error('Ошибка записи истории:', error)
    }
}

const clearHistory = async () => {
    try {
        await api.delete('/browsing-history/', {
            headers: {
                Authorization: `Bearer ${authStore.token}`
            }
        })
        history.value = []
    } catch (error) {
        console.error('Ошибка очистки истории:', error)
    }
}

onMounted(() => {
    fetchHistory()
})
</script>
<template>
    <div class="common-wrapper">
        <section class="main-cards snap-section" :class="{ 'shifted': isFilterOpened }">
            <div class="container">
                <div v-if="history.length" class="card__wrapper">
                    <CardComp v-for="item in history" :key="item.id" :id="item.id" :title="item.dino_name"
                        :description="item.mini_description" :image="item.dino_card_img"
                        :image2x="item.dino_card_img_2x" :dino-page-id="item.dino_page_id"
                        :is-favorite="item.favorite_status" />
                </div>
            </div>
            <button @click="goBack" class="account__back">назад</button>
        </section>
    </div>
</template>

<style scoped>
.common-wrapper {
    position: relative;
}

.card__wrapper {
    display: flex;
    gap: 60px;
    flex-wrap: wrap;
    justify-content: center;
}

.main-cards {
    padding: 120px 0 120px;
    position: relative;
    z-index: 30;
    transition: transform 0.5s ease;
}

.main-cards__wrapper {
    display: flex;
    align-items: center;
    gap: 28px;
    justify-content: center;
    margin-bottom: 73px;
}

.custom-search {
    position: relative;
}

.custom-search__field {
    width: 1000px;
    padding: 20px 73px;
    border: none;
    background-color: #F5EDDE;
    border-radius: 10px;
}

.custom-search__field::placeholder {
    color: rgb(196, 81, 27, 0.55);
    font-size: 16px;
}

.custom-search__field:focus {
    outline: none;
}

.custom__search-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 37px;
}

.filters-btn {
    display: flex;
    align-items: center;
    gap: 5px;
    color: #D95A1C;
    background-color: transparent;
    border: none;
    font-size: 18px;
    cursor: pointer;
    transition: opacity 0.5s ease;
}

.filters-btn:hover {
    opacity: 0.7;
}

.account__back {
    border: none;
    background-color: #D95A1C;
    padding: 16px 30px;
    color: #F9F6F0;
    font-size: 18px;
    text-transform: uppercase;
    border-radius: 50px;
    position: absolute;
    top: 150px;
    left: 82px;
    cursor: pointer;
}
</style>