<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import api from '@/api'

const router = useRouter()
const goBack = () => router.push('/')


const form = ref({
    name: '',
    habitat_period: '',
    nutrition: '',
    family: '',
    length: '',
    height: '',
    weight: '',
    appearance: '',
    lifestyle: '',

    dino_type: 'predator',
    dino_location: 'ground',
    dino_period: 'triassic',
    food_type: 'carnivores'
})

const addPage = async () => {
    const { data } = await api.post('/dinoPage', form.value)

    alert(`success. ID = ${data.id}`)
}
</script>

<template>
    <section class="login-form">
        <div class="login-form__wrapper">
            <form @submit.prevent="addPage" action="#" class="form">
                <h2 class="form__title">Добавление новой страницы</h2>
                <div :class="['custom-input']">
                    <input v-model="form.name" type="text" class="custom-input__field" placeholder="Имя динозавра">
                    <label class="custom-input__label">Название</label>
                </div>
                <div :class="['custom-input']">
                    <input v-model="form.habitat_period" type="text" class="custom-input__field" placeholder="Период обитания динозавра">
                    <label class="custom-input__label">Период обитания</label>
                </div>
                <div :class="['custom-input']">
                    <input v-model="form.nutrition" type="text" class="custom-input__field" placeholder="Питание динозавра">
                    <label class="custom-input__label">Питание</label>
                </div>
                <div :class="['custom-input']">
                    <input v-model="form.family" type="text" class="custom-input__field" placeholder="Семейство динозавра">
                    <label class="custom-input__label">Семейство</label>
                </div>
                <div :class="['custom-input']">
                    <input v-model="form.length" type="text" class="custom-input__field" placeholder="Длина динозавра">
                    <label class="custom-input__label">Длина</label>
                </div>
                <div :class="['custom-input']">
                    <input v-model="form.height" type="text" class="custom-input__field" placeholder="Высота динозавра">
                    <label class="custom-input__label">Высота</label>
                </div>
                <div :class="['custom-input']">
                    <input v-model="form.weight" type="text" class="custom-input__field" placeholder="Вес динозавра">
                    <label class="custom-input__label">Вес</label>
                </div>
                <div :class="['custom-input']">
                    <input v-model="form.appearance" type="text" class="custom-input__field" placeholder="Внешность динозавра">
                    <label class="custom-input__label">Внешность</label>
                </div>
                <div :class="['custom-input']">
                    <input v-model="form.lifestyle" type="text" class="custom-input__field" placeholder="Образ жизни динозавра">
                    <label class="custom-input__label">Образ жизни</label>
                </div>
                <div :class="['custom-input']">
                    <input type="file" class="custom-input__field" placeholder="Картинка динозавра">
                    <label for="user-email" class="custom-input__label">Картинка</label>
                </div>
                <div :class="['custom-input']">
                    <input type="file" class="custom-input__field" placeholder="Картинка динозавра">
                    <label for="user-email" class="custom-input__label">Картинка 2x</label>
                </div>
                <select v-model="form.dino_type" name="select_type" id="seletct-dino-type" class="custom-select">
                    <option value="predator">predator</option>
                    <option value="herbivorous">herbivorous</option>
                    <option value="aquatic">aquatic</option>
                    <option value="flying">flying</option>
                </select>
                <select v-model="form.dino_location" name="select_location" id="seletct-dino-location" class="custom-select">
                    <option value="ground">ground</option>
                    <option value="water">water</option>
                    <option value="fly">fly</option>
                </select>
                <select v-model="form.dino_period" name="select_period" id="seletct-dino-period" class="custom-select">
                    <option value="triassic">triassic</option>
                    <option value="jurassic">jurassic</option>
                    <option value="chalky">chalky</option>
                </select>
                <select v-model="form.food_type" name="select_food" id="seletct-dino-food" class="custom-select">
                    <option value="carnivores">carnivores</option>
                    <option value="herbivores">herbivores</option>
                    <option value="omnivores">omnivores</option>
                    <option value="piscivores">piscivores</option>
                    <option value="insectivores">insectivores</option>
                </select>
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
    width: 100%;
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