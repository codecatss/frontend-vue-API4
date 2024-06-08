<script setup>
import { ref, onMounted } from 'vue'
import { api } from "../../service/apiConfig.js"



let statistics = ref([])
let growth = ref(0)
let parameters = ref(0)
let emoji = ref('')


onMounted(async () => {
  const response = await api.get("/dash")
  const data = response.data
  
  // console.log(data)

  growth.value = data.qtygrowth;

  if(growth.value > 5){
    parameters.value = 'crecimento acelerado'
    emoji.value = '🚀'
  } else if(growth.value > 0 && growth.value < 5){
    parameters.value = 'crescimento'
    emoji.value = '😎'
  } else if(growth.value < 0){
    parameters.value = 'decréscimo'
    emoji.value = '😭'
  }

  statistics.value = [
    {
      title: 'Parceiros',
      stats: data.qtyPartnersActive,
      icon: 'ri-pie-chart-2-line',
      color: 'primary',
    },
    {
      title: 'Usuários',
      stats: data.qtyUsers,
      icon: 'ri-group-line',
      color: 'success',
    },
    {
      title: 'Tracks',
      stats: data.qtyTracks,
      icon: 'ri-macbook-line',
      color: 'warning',
    },
    {
      title: 'Expertise',
      stats: data.qtyExpertise,
      icon: 'ri-money-dollar-circle-line',
      color: 'info',
    },
  ]
})


</script>

<template>
  <VCard title="Informações Gerais">
    <template #subtitle>
      <p class="text-body-1 mb-0">
        <span class="d-inline-block font-weight-medium text-high-emphasis">Total de {{growth}}% de {{parameters}} {{ emoji }} de parceiros nesse mês </span> <span class="text-high-emphasis"></span>
      </p>
    </template>

    <template #append>
      <IconBtn class="mt-n5">
        <VIcon
          color="high-emphasis"
          icon="ri-more-2-line"
        />
      </IconBtn>
    </template>

    <VCardText class="pt-10">
      <VRow>
        <VCol
          v-for="item in statistics"
          :key="item.qtyPartnersActive"
          cols="12"
          sm="6"
          md="3"
        >
          <div class="d-flex align-center gap-x-3">
            <VAvatar
              :color="item.color"
              rounded
              size="40"
              class="elevation-2"
            >
              <VIcon
                size="24"
                :icon="item.icon"
              />
            </VAvatar>

            <div class="d-flex flex-column">
              <div class="text-body-1">
                {{ item.title }}
              </div>
              <h5 class="text-h5">
                {{ item.stats }}
              </h5>
            </div>
          </div>
        </VCol>
      </VRow>
    </VCardText>
  </VCard>
</template>
