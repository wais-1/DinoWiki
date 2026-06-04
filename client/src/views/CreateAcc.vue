<script setup>
import { useRouter } from 'vue-router'
import { ref, computed } from 'vue'

const router = useRouter()
const goBack = () => router.push('/login')

const userEmail = ref('')
const userPassword = ref('')

const emailErr = ref(false)
const passwordErr = ref(false)
const repeatPassword = ref('')

const isSubmitted = ref(false)

const loginBtn = () => {
    emailErr.value = !userEmail.value
    passwordErr.value = !userPassword.value
    isSubmitted.value = true

    if (emailErr.value || passwordErr.value) return
    if (!isPasswordValid.value) return
    if (repeatPassword.value != userPassword.value) return
}

const isPasswordValid = computed(() => userPassword.value.length >= 8)

const isPasswordErr = computed(() => {
    return isSubmitted.value && !isPasswordValid.value
})

const isMatchErr = computed(() => {
    return isSubmitted.value && (repeatPassword.value != userPassword.value)
})
</script>

<template>
    <section class="login-form">
        <div class="login-form__wrapper">
            <form action="#" class="form">
                <h2 class="form__title">Создать аккаунт</h2>
                <div :class="['custom-input', { error: emailErr }]">
                    <input :ref="userEmail" type="email" class="custom-input__field" id="user-email" placeholder="Введите вашу почту" v-model="userEmail">
                    <span class="error-text">Введите почту</span>
                    <span class="text-login">Неверная почта и пароль</span>
                    <label for="user-email" class="custom-input__label">email</label>
                </div>
                <div :class="['custom-input', { error: passwordErr, 'error-symbols': isPasswordErr && !passwordErr}]">
                    <input type="password" class="custom-input__field" id="user-password"
                        placeholder="Введите ваш пароль" v-model="userPassword">
                    <span class="error-text">Введите пароль</span>
                    <span class="text-login">Неверная почта и пароль</span>
                    <span class="error-password">Минимум 8 символов</span>
                    <label for="user-password" class="custom-input__label">пароль</label>
                </div>
                <div :class="['custom-input', { error: passwordErr, 'error-match': isMatchErr}]">
                    <input type="password" class="custom-input__field" id="password-repeat"
                        placeholder="Введите ваш пароль" v-model="repeatPassword">
                    <span class="error-text">Введите пароль</span>
                    <span class="text-login">Неверная почта и пароль</span>
                    <span class="no-match">Пароли не совпадают</span>
                    <label for="password-repeat" class="custom-input__label">подтвердите пароль</label>
                </div>
            </form>
            <button @click="loginBtn" class="login-form__login">Создать</button>
            <button @click="goBack" class="login-form__back">назад</button>
        </div>
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
    width: 632px;
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

.login-form__forgot {
    color: #C4511B;
    font-size: 20px;
    text-decoration: underline;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 37px;
}

.has-account {
    display: flex;
    gap: 20px;
    align-items: center;
    justify-content: center;
    margin-bottom: 40px;
}

.has-account__text {
    font-size: 20px;
    color: #D95A1C;
}

.has-account__link {
    color: #C4511B;
    font-size: 20px;
    text-decoration: underline;
}

.login-form__login {
    border: none;
    background-color: #D95A1C;
    padding: 16px 30px;
    color: #F9F6F0;
    font-size: 18px;
    text-transform: uppercase;
    border-radius: 50px;
    display: flex;
    margin: 0 auto;
    cursor: pointer;
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

.error-text {
    display: none;
}

.error .custom-input__field {
    border: 2px solid #FF0101;
}

.error .error-text {
    font-size: 14px;
    color: #FF0101;
    padding-left: 14px;
    display: block;
}

.error-login .custom-input__field {
    border: 2px solid #FF0101;
}

.text-login {
    display: none;
}

.error-login .text-login {
    display: block;
    font-size: 14px;
    color: #FF0101;
    padding-left: 14px;
}

.error-symbols .custom-input__field {
    border: 2px solid #FF0101;
}

.error-password {
    display: none;
}

.error-symbols .error-password {
    font-size: 14px;
    color: #FF0101;
    padding-left: 14px;
    display: block;
}

.no-match {
    display: none;
}

.error-match .custom-input__field{
    border: 2px solid #FF0101;
}

.error-match .no-match {
    display: block;
    font-size: 14px;
    color: #FF0101;
    padding-left: 14px;
}
</style>