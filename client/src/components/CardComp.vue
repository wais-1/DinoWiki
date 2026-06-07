<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref, onMounted } from 'vue'
import api from '@/api'
const authStore = useAuthStore()
import BrowsingHistory from '@/views/BrowsingHistory.vue'


const props = defineProps({
    id: Number,
    image: String,
    image2x: String,
    title: String,
    description: String,
    isFavorite: String,
    dinoPageId: Number
})

const getImage = (value) => {
    if (!value) return ''

    // Cloudinary URL
    if (value.startsWith('http')) {
        return value
    }

    // локальные картинки проекта
    return new URL(`../images/${value}`, import.meta.url).href
}

const liked = ref(false)

const btnLiked = async (event) => {
  event.preventDefault()

  try {

    if (!authStore.user) {
      alert('Войдите в аккаунт')
      return
    }

    if (!liked.value) {

      await api.post('/favorite', {
        dino_card_id: props.id,
        id_user: authStore.user.id
      })

      liked.value = true

    } else {

      await api.delete('/favorite', {
        data: {
          dino_card_id: props.id,
          id_user: authStore.user.id
        }
      })

      liked.value = false
    }

  } catch (err) {
    console.error(err)
  }
}
const addToHistory = async () => {
  if (!authStore.user) return

  try {
    await api.post('/browsing-history/', {
      dino_card_id: props.id,
      id_user: authStore.user.id
    })
  } catch (err) {
    console.error('Ошибка записи истории:', err)
  }
}

onMounted(async () => {
  try {

    if (!authStore.user) return

    const { data } = await api.get(
      `/favorite/check/${authStore.user.id}/${props.id}`
    )

    liked.value = data.liked

  } catch (err) {
    console.error(err)
  }
})
</script>

<template>
    <div class="card-comp">
        <RouterLink class="card" :to="`/dino/${dinoPageId}`" @click="addToHistory">
            <div class="card__img-wrap">
                <img v-if="image" :src="getImage(image)" :srcset="image2x ? `${getImage(image2x)} 2x` : ''"
                    class="card__img" alt="картинка карточки" />
                <span class="card__hover">Читать</span>
            </div>
            <div class="card-content">
                <h2 class="card-content__title">{{ title }}</h2>
                <p class="card-content__descr">{{ description }}</p>
            </div>
            <slot></slot>
        </RouterLink>
        <button @click.stop="btnLiked" :class="['card__like', { clicked: liked }]">
            <svg class="icon-like" width="38" height="38" viewBox="0 0 48 48" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M23.9997 8.24415L21.8487 6.03315C16.7997 0.843146 7.54168 2.63415 4.19968 9.15915C2.63068 12.2281 2.27668 16.6591 5.14168 22.3141C7.90168 27.7591 13.6437 34.2811 23.9997 41.3851C34.3557 34.2811 40.0947 27.7591 42.8577 22.3141C45.7227 16.6561 45.3717 12.2281 43.7997 9.15915C40.4577 2.63415 31.1997 0.840146 26.1507 6.03015L23.9997 8.24415ZM23.9997 45.0001C-21.9993 14.6041 9.83668 -9.11985 23.4717 3.42915C23.6517 3.59515 23.8277 3.76615 23.9997 3.94215C24.1687 3.76504 24.3448 3.59489 24.5277 3.43215C38.1597 -9.12585 69.9987 14.6011 23.9997 45.0001Z"
                    fill="#C4511B" />
            </svg>
            <svg class="icon-liked" width="38" height="38" viewBox="0 0 48 48" fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd"
                    d="M23.9993 3.94215C37.3133 -9.74384 70.6014 14.2052 23.9993 45.0002C-22.6027 14.2082 10.6853 -9.74384 23.9993 3.94215Z"
                    fill="#C4511B" />
            </svg>

        </button>
        <div class="card-btns" v-if="authStore.isAdmin">
            <button v-if="authStore.isAdmin" class="card-content__delete">Удалить</button>
            <RouterLink :to="`/edit-card/${id}`" v-if="authStore.isAdmin" class="card-content__update">Обновить
            </RouterLink>
        </div>
    </div>
</template>

<style scoped>
.card-comp {
    display: flex;
    flex-direction: column;
    position: relative;
}

.card {
    max-width: 529px;
    display: block;
}

.card-content {
    padding: 13px 19px;
    background-color: #F5EDDE;
    border-radius: 0 0 12px 12px;
    margin-top: -5px;
}

.card-content__title {
    font-size: 28px;
    color: #C4511B;
    font-weight: normal;
    margin: 0 0 12px;
}

.card-content__descr {
    font-size: 13px;
    color: #2C2A28;
    width: 380px;
}

.card__hover {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    color: #F9F6F0;
    font-size: 24px;
    opacity: 0;
    transition: opacity 0.5s ease;
}

.card__img-wrap {
    position: relative;
}

.card__img-wrap::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 98%;
    border-radius: 12px 12px 0 0;
    transition: background-color 0.5s ease;
}

.card:hover .card__img-wrap::before {
    background-color: rgb(0, 0, 0, 0.6);
    scrollbar-width: auto;
}

.card:hover .card__hover {
    opacity: 1;
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

.card__like {
    background-color: transparent;
    border: none;
    position: absolute;
    right: 11px;
    bottom: 20%;
    cursor: pointer;
    transition: transform 0.5s ease;
}

.card__like:hover {
    transform: scale(1.2);
}

.icon-liked {
    display: none;
}

.clicked .icon-like {
    display: none;
}

.clicked .icon-liked {
    display: block;
}
</style>