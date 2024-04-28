<script setup>
import { VDataTable } from 'vuetify/labs/VDataTable'
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
    title: 'OPN Track',
    key: 'track',
  },
  {
    title: 'Expertise',
    key: 'expertise',
  },
  {
    title: 'Progresso',
    key: 'percentage',
  },
  {
    title: 'Deadline',
    key: 'deadline',
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
      percentage: item.progressPercentage,
      deadline: item.deadline,
      deviceIcon: {
        icon: 'bxl-windows',
        color: 'primary',
      },
    });
  
  });
  console.log("Listaaaaaa: ", recentDevices);
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
      <VCard title="Recent Devices">
        <VDataTable
          :headers="recentDevicesHeaders"
          :items="recentDevices"
          class="text-no-wrap rounded-0 text-sm"
        >
          <template #item.browser="{ item }">
            <div class="d-flex">
              <VIcon
                start
                :icon="item.raw.deviceIcon.icon"
                :color="item.raw.deviceIcon.color"
              />
              <span class="text-high-emphasis text-base">
                {{ item.raw.browser }}
              </span>
            </div>
          </template>
          <template #item.percentage="{ item }">
            <div class="progress-bar-wrapper">
              <div class="progress-bar" :style="{ width: item.raw.percentage + '%' }"></div>
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
</style>
