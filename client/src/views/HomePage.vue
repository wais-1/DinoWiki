<script setup>
import Banner from './Banner.vue';
import Intro from './Intro.vue';
import MainCards from './MainCards.vue';
import { ref, onMounted, nextTick } from 'vue'
import Account from './Account.vue';

const intro = ref(null)
onMounted(async () => {
  await nextTick()
  const introEl = document.querySelector('.intro')
  const header = document.querySelector('.header')
  if (!introEl || !header) return
  const observer = new IntersectionObserver(([entry]) => {
    header.classList.toggle('header--light', entry.isIntersecting)
  }, { threshold: 0.8 })
  observer.observe(introEl)
})

const scrollToNext = () => {
  intro.value?.$el?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}
</script>

<template>
  <Banner @scroll-click="scrollToNext"></Banner>
  <Intro ref="intro"></Intro>
  <MainCards></MainCards>
</template>