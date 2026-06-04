<script setup>
defineProps({
    image: String,
    image2x: String,
    title: String,
    description: String,
    isFavorite: Boolean,
    dinoPageId: Number
})

const getImage = (filename) => {
    if (!filename) return ''
    return new URL(`../images/${filename}`, import.meta.url).href
}
</script>

<template>
    <RouterLink class="card" :to="`/dino/${dinoPageId}`">
        <div class="card__img-wrap">
            <img v-if="image" :src="getImage(image)" :srcset="`${getImage(image2x)} 2x`" class="card__img"
                alt="картинка карточки">
            <span class="card__hover">Читать</span>
        </div>
        <div class="card-content">
            <h2 class="card-content__title">{{ title }}</h2>
            <p class="card-content__descr">{{ description }}</p>
        </div>
        <slot></slot>
    </RouterLink>
</template>

<style scoped>
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
</style>