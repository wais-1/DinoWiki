<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import api from '@/api'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const route = useRoute()
const router = useRouter()
const dino = ref(null)
const goBack = () => router.push('/')

const id = route.params.id

const getImage = (value) => {
    if (!value) return ''

    if (value.startsWith('http')) {
        return value
    }

    return new URL(`../images/${value}`, import.meta.url).href
}

const loadDino = async (id) => {
    dino.value = null
    const { data } = await api.get(`/dinoPage/${id}`)
    dino.value = data
}

onMounted(() => loadDino(route.params.id))
watch(() => route.params.id, (id) => loadDino(id))
</script>

<template>
    <section v-if="dino" :class="['dino-page', `dino-page--${dino.dino_type}`]">
        <div class="container">
            <div class="dino-page__wrapper">
                <div class="dino-page__main">
                    <h2 :class="['dino-page__title', `dino-page__title--${dino.dino_type}`]">{{ dino.name }}</h2>
                    <div class="page-wrapper">
                        <h3 :class="['page-wrapper__title', `page-wrapper__title--${dino.dino_type}`]">Период обитания
                        </h3>
                        <span class="page-wrapper__text">{{ dino.habitat_period }}</span>
                    </div>
                    <div class="page-wrapper">
                        <h3 :class="['page-wrapper__title', `page-wrapper__title--${dino.dino_type}`]">Питание</h3>
                        <span class="page-wrapper__text">{{ dino.nutrition }}</span>
                    </div>
                    <div class="page-wrapper">
                        <h3 :class="['page-wrapper__title', `page-wrapper__title--${dino.dino_type}`]">Семейство</h3>
                        <span class="page-wrapper__text">{{ dino.family }}</span>
                    </div>
                    <div :class="['data-wrapper', `data-wrapper--${dino.dino_type}`]">
                        <div :class="['page-wrapper__margin', `page-wrapper__margin--${dino.dino_type}`]">
                            <h3 class="page-wrapper__name">Длина</h3>
                            <span class="page-wrapper__note">{{ dino.length }}</span>
                        </div>
                        <div :class="['page-wrapper__margin', `page-wrapper__margin--${dino.dino_type}`]">
                            <h3 class="page-wrapper__name">Высота</h3>
                            <span class="page-wrapper__note">{{ dino.height }}</span>
                        </div>
                        <div class="page-wrapper__margin">
                            <h3 class="page-wrapper__name">Вес</h3>
                            <span class="page-wrapper__note">{{ dino.weight }}</span>
                        </div>
                    </div>
                    <div class="page-wrapper">
                        <h3 :class="['page-wrapper__title', `page-wrapper__title--${dino.dino_type}`]">Внешность</h3>
                        <span class="page-wrapper__text">{{ dino.appearance }}</span>
                    </div>
                    <div class="page-wrapper">
                        <h3 :class="['page-wrapper__title', `page-wrapper__title--${dino.dino_type}`]">Образ жизни</h3>
                        <span class="page-wrapper__text">{{ dino.lifestyle }}</span>
                    </div>
                </div>
                <img v-if="dino.dino_page_img" :src="getImage(dino.dino_page_img)"
                    :srcset="dino.dino_page_img_2x ? `${getImage(dino.dino_page_img_2x)} 2x` : ''"
                    class="dino-page__img" alt="картинка динозавра" />
            </div>
            <button :class="['dino-page__back', `dino-page__back--${dino.dino_type}`]" @click="goBack">назад</button>
            <div class="card-btns" v-if="authStore.isAdmin">
                <button v-if="authStore.isAdmin" class="card-content__delete">Удалить</button>
                <RouterLink :to="`/edit-page/${id}`" v-if="authStore.isAdmin" class="card-content__update">Обновить
                </RouterLink>
            </div>
        </div>
    </section>
</template>

<style scoped>
.dino-page {
    padding: 140px 0 0;
    position: relative;
}

.dino-page__main {
    display: flex;
    flex-direction: column;
}

.dino-page__wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.dino-page__title {
    font-size: 45px;
    letter-spacing: 0.04em;
    font-family: "Days One", "Arial", sans-serif;
    color: #85563B;
    margin: 0 0 46px;
    width: 662px;
}

.page-wrapper {
    display: flex;
    flex-direction: column;
    gap: 12px;
    margin-bottom: 37px;
    max-width: 659px;
}

.page-wrapper__name {
    margin: 0;
    font-size: 24px;
    font-family: "Days One", "Arial", sans-serif;
    color: #F9F6F0;
    text-transform: uppercase;
}

.page-wrapper__margin {
    margin: 0;
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 12px;
    align-items: center;
}

.page-wrapper__title {
    margin: 0;
    font-size: 24px;
    color: #A6785E;
    font-family: "Days One", "Arial", sans-serif;
    text-transform: uppercase;
}

.page-wrapper__note {
    font-size: 18px;
    text-align: center;
    text-transform: uppercase;
    color: #F9F6F0;
}

.data-wrapper {
    display: flex;
    gap: 50px;
    background-color: #A6785E;
    width: 485px;
    padding: 23px 36px;
    border-radius: 12px;
    margin-bottom: 37px;
}

.dino-page__back {
    background-color: #A6785E;
    color: #F9F6F0;
    border: none;
    padding: 14px 29px;
    font-size: 18px;
    text-transform: uppercase;
    border-radius: 50px;
    position: absolute;
    top: 127px;
    right: 82px;
    cursor: pointer;
}

.dino-page__title--herbivorous {
    color: #56633C;
}

.page-wrapper__title--herbivorous {
    color: #7D8868;
}

.data-wrapper--herbivorous {
    background-color: #7D8868;
}

.dino-page__back--herbivorous {
    background-color: #7D8868;
}

.dino-page__title--aquatic {
    color: #1B4E65;
}

.page-wrapper__title--aquatic {
    color: #357997;
}

.data-wrapper--aquatic {
    background-color: #357997;
}

.dino-page__back--aquatic {
    background-color: #357997;
}

.card-btns {
    display: flex;
    justify-content: space-between;
    padding-top: 25px;
}

.card-content__delete {
    border: none;
    padding: 16px 29px;
    border-radius: 50px;
    text-transform: uppercase;
    font-size: 14px;
    color: #F9F6F0;
    background-color: #536C4F;
    cursor: pointer;
    transition: background-color 0.5s ease;
}

.card-content__delete:hover {
    background-color: #404e3d;
}

.card-content__update {
    border: none;
    padding: 16px 29px;
    border-radius: 50px;
    text-transform: uppercase;
    font-size: 14px;
    color: #F9F6F0;
    background-color: #ab7a2f;
    cursor: pointer;
    transition: background-color 0.5s ease;
}

.card-content__update:hover {
    background-color: #855e25;
}
</style>