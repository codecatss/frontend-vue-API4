<template>
  <VRow>
    <!-- Coluna para o componente Mapa -->
    <VCol cols="12" md="8" sm="4">
      <Mapa />
    </VCol>

    <!-- Coluna para o componente AnalyticsSalesByStates -->
    <VCol cols="12" md="4" sm="4">
      <AnalyticsSalesByStates />
    </VCol>

    <!-- Coluna para o componente TablePartner -->
    <VCol cols="12">
      <TablePartner />
    </VCol>
  </VRow>
</template>

<script setup lang="ts">
import Mapa from '@/layouts/components/Mapa.vue';
import AnalyticsSalesByStates from '@/views/membros/AnalyticsSalesByStates.vue';
import TablePartner from '@/views/membros/TablePartner.vue';
</script>

<style scoped>
/* Adicione estilos personalizados aqui, se necessário */
</style>
