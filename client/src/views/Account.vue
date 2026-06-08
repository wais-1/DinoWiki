<script setup>
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()

const router = useRouter()
const goBack = () => router.push('/')
</script>
<template>
    <section class="account">
        <div class="container">
            <div class="account-wrapper">
                <div class="account-main">
                    <RouterLink to="/favoriteCards" class="account-main__btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M5.624 4.424C3.965 5.182 2.75 6.986 2.75 9.137C2.75 11.334 3.65 13.028 4.938 14.48C6.001 15.676 7.287 16.668 8.541 17.634C8.83967 17.864 9.13467 18.0933 9.426 18.322C9.952 18.737 10.421 19.1 10.874 19.365C11.327 19.63 11.69 19.75 12 19.75C12.31 19.75 12.674 19.63 13.126 19.365C13.579 19.1 14.048 18.737 14.574 18.322C14.8653 18.0927 15.1603 17.8637 15.459 17.635C16.713 16.667 17.999 15.676 19.062 14.48C20.351 13.028 21.25 11.334 21.25 9.137C21.25 6.987 20.035 5.182 18.376 4.424C16.764 3.687 14.598 3.882 12.54 6.021C12.47 6.09359 12.3862 6.15132 12.2934 6.19076C12.2006 6.23019 12.1008 6.25052 12 6.25052C11.8992 6.25052 11.7994 6.23019 11.7066 6.19076C11.6138 6.15132 11.53 6.09359 11.46 6.021C9.402 3.882 7.236 3.687 5.624 4.424ZM12 4.46C9.688 2.39 7.099 2.1 5 3.059C2.786 4.074 1.25 6.426 1.25 9.138C1.25 11.803 2.36 13.837 3.817 15.477C4.983 16.79 6.41 17.889 7.671 18.859C7.95767 19.079 8.233 19.293 8.497 19.501C9.01 19.905 9.56 20.335 10.117 20.661C10.674 20.987 11.31 21.251 12 21.251C12.69 21.251 13.326 20.986 13.883 20.661C14.441 20.335 14.99 19.905 15.503 19.501C15.767 19.293 16.0423 19.079 16.329 18.859C17.589 17.889 19.017 16.789 20.183 15.477C21.64 13.837 22.75 11.803 22.75 9.138C22.75 6.426 21.215 4.074 19 3.061C16.901 2.101 14.312 2.391 12 4.46Z"
                                fill="#D95A1C" />
                        </svg>
                        избранное
                    </RouterLink>
                    <div class="personal">
                        <h3 class="personal__title">
                            <svg width="32" height="32" viewBox="0 0 32 32" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M18 30H14C13.4696 30 12.9609 29.7893 12.5858 29.4142C12.2107 29.0391 12 28.5304 12 28V21C11.4696 21 10.9609 20.7893 10.5858 20.4142C10.2107 20.0391 10 19.5304 10 19V13C10 12.2044 10.3161 11.4413 10.8787 10.8787C11.4413 10.3161 12.2044 10 13 10H19C19.7956 10 20.5587 10.3161 21.1213 10.8787C21.6839 11.4413 22 12.2044 22 13V19C22 19.5304 21.7893 20.0391 21.4142 20.4142C21.0391 20.7893 20.5304 21 20 21V28C20 28.5304 19.7893 29.0391 19.4142 29.4142C19.0391 29.7893 18.5304 30 18 30ZM13 12C12.8664 11.9912 12.7324 12.011 12.6071 12.0581C12.4818 12.1052 12.368 12.1786 12.2733 12.2733C12.1786 12.368 12.1052 12.4818 12.0581 12.6071C12.011 12.7324 11.9912 12.8664 12 13V19H14V28H18V19H20V13C20.0088 12.8664 19.989 12.7324 19.9419 12.6071C19.8948 12.4818 19.8214 12.368 19.7267 12.2733C19.632 12.1786 19.5182 12.1052 19.3929 12.0581C19.2676 12.011 19.1336 11.9912 19 12H13ZM16 9C15.2089 9 14.4355 8.76541 13.7777 8.32588C13.1199 7.88636 12.6072 7.26164 12.3045 6.53074C12.0017 5.79983 11.9225 4.99557 12.0769 4.21964C12.2312 3.44372 12.6122 2.73098 13.1716 2.17157C13.731 1.61216 14.4437 1.2312 15.2196 1.07686C15.9956 0.92252 16.7998 1.00173 17.5307 1.30448C18.2616 1.60723 18.8864 2.11992 19.3259 2.77772C19.7654 3.43552 20 4.20888 20 5C20 6.06087 19.5786 7.07828 18.8284 7.82843C18.0783 8.57858 17.0609 9 16 9ZM16 3C15.6044 3 15.2178 3.1173 14.8889 3.33706C14.56 3.55683 14.3036 3.86918 14.1522 4.23464C14.0009 4.60009 13.9613 5.00222 14.0384 5.39018C14.1156 5.77815 14.3061 6.13451 14.5858 6.41422C14.8655 6.69392 15.2219 6.8844 15.6098 6.96157C15.9978 7.03874 16.3999 6.99914 16.7654 6.84776C17.1308 6.69639 17.4432 6.44004 17.6629 6.11114C17.8827 5.78224 18 5.39557 18 5C18 4.46957 17.7893 3.96086 17.4142 3.58579C17.0391 3.21072 16.5304 3 16 3Z"
                                    fill="#D95A1C" />
                            </svg>
                            персональная подборка
                        </h3>
                        <div class="personal__btns">
                            <button class="personal__btn">
                                Трицератопс (Triceratops)
                                <svg class="personal__icon" width="28" height="8" viewBox="0 0 28 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M27.3536 4.03554C27.5488 3.84028 27.5488 3.52369 27.3536 3.32843L24.1716 0.14645C23.9763 -0.0488122 23.6597 -0.0488122 23.4645 0.14645C23.2692 0.341712 23.2692 0.658295 23.4645 0.853557L26.2929 3.68198L23.4645 6.51041C23.2692 6.70567 23.2692 7.02226 23.4645 7.21752C23.6597 7.41278 23.9763 7.41278 24.1716 7.21752L27.3536 4.03554ZM0 3.68198V4.18198H27V3.68198V3.18198H0V3.68198Z"
                                        fill="#D95A1C" />
                                </svg>
                            </button>
                            <button class="personal__btn">
                                Мозозавр (Mosasauridae)
                                <svg class="personal__icon" width="28" height="8" viewBox="0 0 28 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M27.3536 4.03554C27.5488 3.84028 27.5488 3.52369 27.3536 3.32843L24.1716 0.14645C23.9763 -0.0488122 23.6597 -0.0488122 23.4645 0.14645C23.2692 0.341712 23.2692 0.658295 23.4645 0.853557L26.2929 3.68198L23.4645 6.51041C23.2692 6.70567 23.2692 7.02226 23.4645 7.21752C23.6597 7.41278 23.9763 7.41278 24.1716 7.21752L27.3536 4.03554ZM0 3.68198V4.18198H27V3.68198V3.18198H0V3.68198Z"
                                        fill="#D95A1C" />
                                </svg>
                            </button>
                            <button class="personal__btn">
                                Велоцираптор (Velociraptor)
                                <svg class="personal__icon" width="28" height="8" viewBox="0 0 28 8" fill="none"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M27.3536 4.03554C27.5488 3.84028 27.5488 3.52369 27.3536 3.32843L24.1716 0.14645C23.9763 -0.0488122 23.6597 -0.0488122 23.4645 0.14645C23.2692 0.341712 23.2692 0.658295 23.4645 0.853557L26.2929 3.68198L23.4645 6.51041C23.2692 6.70567 23.2692 7.02226 23.4645 7.21752C23.6597 7.41278 23.9763 7.41278 24.1716 7.21752L27.3536 4.03554ZM0 3.68198V4.18198H27V3.68198V3.18198H0V3.68198Z"
                                        fill="#D95A1C" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    <RouterLink class="account-main__btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M11.5 3C14.0196 3 16.4359 4.00089 18.2175 5.78249C19.9991 7.56408 21 9.98044 21 12.5C21 15.0196 19.9991 17.4359 18.2175 19.2175C16.4359 20.9991 14.0196 22 11.5 22C8.98044 22 6.56408 20.9991 4.78249 19.2175C3.00089 17.4359 2 15.0196 2 12.5C2 9.98044 3.00089 7.56408 4.78249 5.78249C6.56408 4.00089 8.98044 3 11.5 3ZM11.5 4C9.24566 4 7.08365 4.89553 5.48959 6.48959C3.89553 8.08365 3 10.2457 3 12.5C3 14.7543 3.89553 16.9163 5.48959 18.5104C7.08365 20.1045 9.24566 21 11.5 21C12.6162 21 13.7215 20.7801 14.7528 20.353C15.7841 19.9258 16.7211 19.2997 17.5104 18.5104C18.2997 17.7211 18.9258 16.7841 19.353 15.7528C19.7801 14.7215 20 13.6162 20 12.5C20 10.2457 19.1045 8.08365 17.5104 6.48959C15.9163 4.89553 13.7543 4 11.5 4ZM11 7H12V12.42L16.7 15.13L16.2 16L11 13V7Z"
                                fill="#D95A1C" />
                        </svg>
                        история просмотра
                    </RouterLink>
                    <button class="account-main__btn">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M13.73 21C13.5542 21.3031 13.3018 21.5547 12.9982 21.7295C12.6946 21.9044 12.3504 21.9965 12 21.9965C11.6496 21.9965 11.3054 21.9044 11.0018 21.7295C10.6982 21.5547 10.4458 21.3031 10.27 21M18 8.4C18 6.703 17.368 5.075 16.243 3.875C15.118 2.675 13.59 2 12 2C10.41 2 8.883 2.674 7.757 3.875C6.632 5.075 6 6.703 6 8.4C6 15.867 3 18 3 18H21C21 18 18 15.867 18 8.4Z"
                                stroke="#D95A1C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                        </svg>
                        уведомления
                    </button>
                </div>
                <div class="account-avatar">
                    <div class="account-avatar__nickname">
                        <svg class="icon-avatar" width="361" height="77" viewBox="0 0 361 77" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <rect width="361" height="61" rx="20" fill="#C4511B" />
                            <path d="M178.143 76.0952L165.911 60.4284L190.159 60.2627L178.143 76.0952Z"
                                fill="#C4511B" />
                        </svg>
                        <span class="account-avatar__name">{{ authStore.isAdmin ? 'Admin' : authStore.user.email }}</span>
                    </div>
                    <picture>
                        <img src="../images/img-avatar.png" srcset="../images/img-avatar@2x.png 2x"
                            alt="картинка аватвра" class="account-avatar__img">
                    </picture>
                    <button class="account-avatar__btn">установить фото</button>
                </div>
            </div>
        </div>
        <button @click="goBack" class="account__back">назад</button>
    </section>
</template>

<style scoped>
.account {
    position: relative;
    padding-top: 150px;
}

.account-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.account-main {
    display: flex;
    flex-direction: column;
    gap: 23px;
    width: 396px;
    align-items: flex-start;
}

.account-main__btn {
    border: none;
    background-color: #F5EDDE;
    border-radius: 50px;
    padding: 13px 40px;
    display: flex;
    align-items: center;
    gap: 19px;
    color: #D95A1C;
    text-transform: uppercase;
    font-size: 18px;
    width: fit-content;
    transition: transform 0.5s ease;
}

.account-main__btn:hover {
    transform: scale(1.1);
}

.account-avatar__btn {
    border: none;
    background-color: #D95A1C;
    border-radius: 50px;
    padding: 13px 40px;
    color: #F9F6F0;
    text-transform: uppercase;
    font-size: 18px;
    width: fit-content;
}

.personal {
    background-color: #F5EDDE;
    border-radius: 20px;
    padding: 21px 32px;
    width: 396px;
}

.personal__title {
    display: flex;
    align-items: center;
    gap: 19px;
    color: #D95A1C;
    text-transform: uppercase;
    font-size: 18px;
    font-weight: 400;
    margin: 0 0 29px;
}

.personal__btns {
    display: flex;
    flex-direction: column;
    gap: 19px;
}

.personal__btn {
    display: flex;
    align-items: center;
    border: none;
    background-color: transparent;
    gap: 13px;
    font-size: 15px;
    color: #D95A1C;
    transition: opacity 0.5s ease;
}

.personal__btn:hover {
    opacity: 0.7;
}

.account-avatar {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 44px;
}

.account-avatar__nickname {
    position: relative;
    display: inline-block;
}

.account-avatar__name {
    position: absolute;
    top: 38%;
    left: 50%;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    color: #F9F6F0;
    text-transform: uppercase;
    font-size: 18px;
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

.personal__icon {
    clip-path: polygon(0 0, 0 0, 0 100%, 0% 100%);
    transition: clip-path 0.5s ease;
}

.personal__btn:hover .personal__icon {
    clip-path: polygon(0 0, 100% 0, 100% 100%, 0 100%);
}
</style>