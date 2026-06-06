<script setup>
import CardComp from '@/components/CardComp.vue';
import { ref, onMounted, computed } from 'vue'
import api from '@/api';
import Filters from './Filters.vue';

const cardData = ref([])
onMounted(async () => {
    const { data } = await api.get('/dinoCard')
    cardData.value = data
})

const searchQuery = ref('')

const filteredDino = computed(() => {
    if (!searchQuery.value) return cardData.value
    return cardData.value.filter(item =>
        item.dino_name.toLowerCase().includes(searchQuery.value.toLowerCase())
    )
})

const isFilterOpened = ref(false)
</script>
<template>
    <div class="common-wrapper">
        <section class="main-cards snap-section" id="catalog" :class="{ 'shifted': isFilterOpened }">
            <div class="container">
                <div class="main-cards__wrapper">
                    <div class="custom-search">
                        <svg class="custom__search-icon" width="31" height="30" viewBox="0 0 31 30" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9.66966" cy="9.66966" r="6.34144" transform="rotate(43.052 9.66966 9.66966)"
                                stroke="#C4511B" stroke-opacity="0.55" />
                            <path
                                d="M25.1531 23.0312C25.5035 23.3585 25.5221 23.9078 25.1948 24.2582C24.8674 24.6087 24.3182 24.6273 23.9677 24.3L15.3345 16.2347L16.5198 14.9659L25.1531 23.0312Z"
                                stroke="#C4511B" stroke-opacity="0.55" />
                        </svg>
                        <input v-model="searchQuery" type="search" class="custom-search__field"
                            placeholder="Введите имя динозавра">
                    </div>
                    <button @click.prevent="isFilterOpened = !isFilterOpened" class="filters-btn">
                        <span class="filters__text">Фильтры</span>
                        <svg width="9" height="5" viewBox="0 0 9 5" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <line x1="0.353553" y1="0.353539" x2="4.42462" y2="4.42461" stroke="#D95A1C" />
                            <line y1="-0.5" x2="5.75736" y2="-0.5"
                                transform="matrix(-0.707107 0.707107 0.707107 0.707107 8.1012 0.707092)"
                                stroke="#D95A1C" />
                        </svg>
                    </button>
                </div>
                <div class="card__wrapper">
                    <CardComp v-for="item in filteredDino" :id="item.id" :key="item.id" :title="item.dino_name"
                        :description="item.mini_description" :image="item.dino_card_img"
                        :image2x="item.dino_card_img_2x" :dino-page-id="item.dino_page_id"></CardComp>
                </div>
            </div>
        </section>
        <Filters v-model:isOpen="isFilterOpened"></Filters>
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
</style>