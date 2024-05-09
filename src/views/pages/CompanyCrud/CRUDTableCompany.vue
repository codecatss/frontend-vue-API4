<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable';
import { ref } from 'vue';
import { api } from '@/service/apiConfig.js';

async function fetchData(){
  const response = await api.get('/dash/companyexpertiseusercountservice')
  return response.data
}

const recentDevicesHeaders = [
  {
    title: 'Nome do Parceiro',
    key: 'browser',
  },
  {
    title: 'Estado',
    key: 'location',
  },
  {
    title: 'Expertise',
    key: 'expertise',
  },
  {
    title: 'Progresso',
    key: 'percentage',
  },
]

async function putData(){
  const data = await fetchData();
  
  let recentDevices = [];

  data.forEach((item) => {
    try{
      item.companyState = decodeURIComponent(escape(item.companyState));
    } catch (e) {
      // do nothing;
    };
    recentDevices.push({
      browser: item.companyName,
      track: item.trackName,
      expertise: item.expertiseName,
      location: item.companyState,
      percentage: item.completionPercentage,
    });
  
  });
  return recentDevices;
}

const recentDevices = ref([]);

onMounted(async () => {
  recentDevices.value = await putData();
});

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Membros Do Programa OPN">
        <VDataTable
          :headers="recentDevicesHeaders"
          :items="recentDevices"
          :items-per-page="-1"
          :fixed-header="true"
          :height="'600px'"
          class="text-no-wrap rounded-0 text-sm"
        >
          <template #item.browser="{ item }">
            <div class="d-flex">
              <svg class="oracle-icon" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F00" fill-rule="evenodd" d="M7.957359,18.9123664 C4.11670252,18.9123664 1,15.803458 1,11.9617373 C1,8.12000773 4.11670252,5 7.957359,5 L16.0437948,5 C19.8855156,5 23,8.12000773 23,11.9617373 C23,15.803458 19.8855156,18.9123664 16.0437948,18.9123664 L7.957359,18.9123664 L7.957359,18.9123664 Z M15.8639176,16.4585488 C18.352201,16.4585488 20.3674397,14.448858 20.3674397,11.9617373 C20.3674397,9.47460595 18.352201,7.45381934 15.8639176,7.45381934 L8.1360824,7.45381934 C5.64895285,7.45381934 3.63255855,9.47460595 3.63255855,11.9617373 C3.63255855,14.448858 5.64895285,16.4585488 8.1360824,16.4585488 L15.8639176,16.4585488 L15.8639176,16.4585488 Z"/>
              </svg>
              <span class="text-high-emphasis text-base">
                {{ item.raw.browser }}
              </span>
            </div>
          </template>
          <template #item.percentage="{ item }">
            <div class="percentage">
              <span class="text-high-emphasis text-base">
                {{ Math.floor(item.raw.percentage) }}%
              </span>
              <div class="progress-bar-wrapper">
                <div class="progress-bar" :style="{ width: item.raw.percentage + '%' }"></div>
              </div>
            </div>
           
            

          </template>
          <template #bottom />
        </VDataTable>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.progress-bar-wrapper {
  width: 100px;
  height: 10px;
  background-color: #bcbcbc;
  margin-left: 10px;
  border-radius: 5px;

}

.progress-bar {
  height: 100%;
  background-color: #ff3939;
  border-radius: 5px;
}

.oracle-icon {
  margin-right: 10px;
}


.percentage {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
