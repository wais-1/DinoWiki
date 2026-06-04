<script setup>
</script>

<template>
    <section class="intro snap-section">
        <div class="intro__wrapper">
            <picture>
                <!-- <source srcset="../images/banner-img.webp" type="image/webp"> -->
                <img class="intro__img" src="../images/img-velociraptor.png"
                    srcset="../images/img-velociraptor@2x.png 2x" alt="картинка велоцираптора" width="1280"
                    height="298">
            </picture>
            <div class="intro-main">
                <span class="intro-main__heading">БОЛЕЕ <span class="intro-main__highlight">200</span></span>
                <span class="intro-main__text">плотоядных видов динозавров</span>
            </div>
            <picture>
                <!-- <source srcset="../images/banner-img.webp" type="image/webp"> -->
                <img class="intro__img" src="../images/img-stegozavr.png" srcset="../images/img-stegozavr@2x.png 2x"
                    alt="картинка стегозавра" width="1280" height="298">
            </picture>
            <div class="intro-main intro-main--second">
                <span class="intro-main__heading">БОЛЕЕ <span class="intro-main__highlight">150</span></span>
                <span class="intro-main__text">травоядных видов динозавров</span>
            </div>
            <picture>
                <!-- <source srcset="../images/banner-img.webp" type="image/webp"> -->
                <img class="intro__img" src="../images/img-mozozavr.png" srcset="../images/img-mozozavr@2x.png 2x"
                    alt="картинка мозощавра" width="1280" height="298">
            </picture>
            <div class="intro-main intro-main--third">
                <span class="intro-main__heading">БОЛЕЕ <span class="intro-main__highlight">50</span></span>
                <span class="intro-main__text">водоплавающих видов динозавров</span>
            </div>
        </div>
    </section>
</template>

<style scoped>
.intro {
    height: 100vh;
    min-height: 600px;
}

.intro__wrapper {
    position: relative;
}

.intro__wrapper::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0, 0, 0, 0.5);
}

.intro__img {
    width: 100%;
    display: block;
    height: 309px;
}

.intro-main__heading {
    font-family: "Days One", "Arial", sans-serif;
    font-size: 40px;
    color: #F9F6F0;
}

.intro-main {
    display: flex;
    flex-direction: column;
    gap: 19px;
    align-items: center;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 112px;
}

.intro-main--second {
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
}

.intro-main--third {
    top: unset;
    bottom: 94px;
}

.intro-main__highlight {
    color: #C4511B;
}

.intro-main__text {
    display: block;
    font-size: 24px;
    color: #F9F6F0;
}
</style>