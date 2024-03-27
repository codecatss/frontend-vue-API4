<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/Header.vue'
import FooterComponent from './components/Footer.vue'
</script>

<template>
  
  <HeaderComponent :login="true"/>
  
  <FooterComponent/>
  
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
