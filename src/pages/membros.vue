<!-- eslint-disable import/no-unresolved -->
<script lang="ts" setup>

import Mapa from '@/layouts/components/Mapa.vue'
import AnalyticsSalesByCountries from '@/views/membros/AnalyticsSalesByCountries.vue'
import AnalyticsUserTable from '@/views/membros/AnalyticsUserTable.vue'


</script>

<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol
      cols="12"
      md="8"
      sm="4"
    >
    <Mapa  />
   


    </VCol>

        <!-- 👉 Congratulations -->
        <VCol
        cols="12"
        md="4"
        sm="4"
      >
      <AnalyticsSalesByCountries /> 
  
      </VCol>

         <!-- 👉 Congratulations -->
      <AnalyticsUserTable />
 
  </VRow>
</template>


