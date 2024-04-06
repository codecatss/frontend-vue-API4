<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/Header.vue'
import FooterComponent from './components/Footer.vue'
import importComp from './components/import.vue'
</script>

<template>
  

  <importComp/>
  
  <RouterView/>


</template>

<style scoped>

@media (min-width: 1024px) {

  nav {
    text-align: left;
    font-size: 1rem;
  }
}
</style>
