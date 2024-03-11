<script setup>
import { RouterLink, RouterView } from 'vue-router'
import HeaderComponent from './components/Header.vue'
import FooterComponent from './components/Footer.vue'
</script>

<template>

  <HeaderComponent/>

  <div class="wrapper">
    
  </div>

  <FooterComponent/>

</template>

<style scoped>

@media (min-width: 1024px) {

  .logo {
    margin: 0 2rem 0 0;
  }

  .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
    background-color: var(--oracle-white);
  }

  nav {
    text-align: left;
    font-size: 1rem;
  }
}
</style>
