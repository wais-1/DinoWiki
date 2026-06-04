<script setup>
const emit = defineEmits(['scroll-click'])
</script>

<template>
    <section class="banner snap-section" id="main">
        <div class="container">
            <div class="banner__wrapper">
                <div class="banner-text">
                    <h2 class="banner-text__title">ЭРА <span class="banner-text__big">ГИГАНТОВ</span></h2>
                    <p class="banner-text__descr">Энциклопедия о&nbsp;властелинах доисторической Земли:
                        от&nbsp;тираннозавра до&nbsp;загадочных предков из&nbsp;триаса. В&nbsp;мир, где земля дрожала
                        от&nbsp;шагов ящеров.</p>
                    <button @click="emit('scroll-click')" class="banner-text__btn">Начать путешествие</button>
                </div>
                <picture>
                    <!-- <source srcset="../images/banner-img.webp" type="image/webp"> -->
                    <img class="banner__img" src="../images/img-banner.png" srcset="../images/img-banner@2x.png 2x"
                        alt="картинка баннера" width="1202" height="728">
                </picture>
            </div>
        </div>
    </section>
</template>

<style scoped>
.banner {
    position: relative;
    height: 100vh;
    min-height: 600px;
}

.banner-text {
    display: flex;
    flex-direction: column;
    padding: 123px 0 0;
}

.banner-text__title {
    letter-spacing: 0.04em;
    font-family: "Days One", "Arial", sans-serif;
    font-size: 68px;
    color: #C4511B;
    margin: 0 auto 44px;
    text-align: center;
    width: 972px;
    line-height: 85px;
}

.banner-text__big {
    font-size: 130px;
}

.banner-text__descr {
    font-size: 16px;
    color: #2C2A28;
    margin: 0 0 77px;
    width: 590px;
    position: absolute;
    top: 35%;
    left: 30%;
    text-align: center;
}

.banner__img {
    position: absolute;
    right: 10%;
    bottom: 0;

}

.banner-text__btn {
    color: #F9F6F0;
    background-color: #E86A2C;
    padding: 20px;
    font-size: 20px;
    font-weight: 900;
    width: 325px;
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: transform 0.5s ease;
    position: absolute;
    left: 66px;
    bottom: 108px;
    z-index: 50;
    animation: bigger 2s ease infinite;
}

@keyframes bigger {
    0% {
        transform: scale(1);
    }
    50% {
        transform: scale(1.1);
    }
    100% {
        transform: scale(1);
    }
}
</style>