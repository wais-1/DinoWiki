<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import api from '@/api'

const router = useRouter()
const goBack = () => router.push('/')

const dino_name = ref('')
const mini_description = ref('')
const dino_page_id = ref('')

const image = ref(null)
const image2x = ref(null)

const onImageChange = (e) => {
  image.value = e.target.files[0]
}

const onImage2xChange = (e) => {
  image2x.value = e.target.files[0]
}

const addCard = async () => {
  try {
    const formData = new FormData()

    formData.append('dino_name', dino_name.value)
    formData.append('mini_description', mini_description.value)
    formData.append('dino_page_id', dino_page_id.value)

    if (image.value) {
      formData.append('image', image.value)
    }

    if (image2x.value) {
      formData.append('image2x', image2x.value)
    }

    const { data } = await api.post(
      '/dinoCard',
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }
    )

    alert(`success. ID = ${data.id}`)

  } catch (err) {
    console.error(err)
    alert('Ошибка при создании карточки')
  }
}
</script>

<template>
    <section class="login-form">
        <div class="login-form__wrapper">
            <form @submit.prevent="addCard" action="#" class="form">
                <h2 class="form__title">Добавление новой карточки</h2>
                <div :class="['custom-input']">
                    <input v-model="dino_name" type="text" class="custom-input__field" placeholder="Имя динозавра">
                    <label for="user-email" class="custom-input__label">Название</label>
                </div>
                <div :class="['custom-input']">
                    <input  v-model="mini_description"type="text" class="custom-input__field" placeholder="Описание динозавра">
                    <label for="user-email" class="custom-input__label">Описание</label>
                </div>
                <div :class="['custom-input']">
                    <input v-model="dino_page_id" type="number" class="custom-input__field" placeholder="id страницы динозавра">
                    <label for="user-email" class="custom-input__label">id страницы</label>
                </div>
                <div :class="['custom-input']">
                    <input @change="onImageChange" type="file" class="custom-input__field" placeholder="Картинка динозавра">
                    <label for="user-email" class="custom-input__label">Картинка</label>
                </div>
                <div :class="['custom-input']">
                    <input @change="onImage2xChange" type="file" class="custom-input__field" placeholder="Картинка динозавра">
                    <label for="user-email" class="custom-input__label">Картинка 2x</label>
                </div>
                <button class="form__btn">Добавить</button>
            </form>
        </div>
        <button @click="goBack" class="login-form__back">назад</button>
    </section>
</template>

<style scoped>
.login-form {
    position: relative;
    padding-top: 177px;
}

.login-form__wrapper {
    background-color: #F5EDDE;
    padding: 61px 90px;
    border-radius: 40px;
    margin: 0 auto;
    width: 900px;
}

.form {
    display: flex;
    flex-direction: column;
    gap: 57px;
    margin-bottom: 48px;
}

.form__title {
    font-size: 36px;
    margin: 0 0 30px;
    color: #D95A1C;
    font-family: "Days One", "Arial", sans-serif;
    text-align: center;
}

.custom-input__field {
    padding: 24px;
    border: none;
    background-color: #F9F6F0;
    border-radius: 20px;
    width: 100%;
    display: block;
}

.custom-input__field:focus {
    outline: none;
}

.custom-input {
    position: relative;
}

.custom-input__field::placeholder {
    color: rgb(196, 81, 27, 0.55);
    font-size: 16px;
}

.custom-input__label {
    position: absolute;
    top: -33px;
    font-size: 18px;
    color: #D95A1C;
    left: 14px;
}

.form__btn {
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

.form__btn:hover {
    background-color: #855e25;
}

.login-form__back {
    border: none;
    background-color: #D95A1C;
    padding: 16px 30px;
    color: #F9F6F0;
    font-size: 18px;
    text-transform: uppercase;
    border-radius: 50px;
    position: absolute;
    top: 177px;
    left: 82px;
    cursor: pointer;
}
</style>