<script setup>
import DataTimeLine from '@/layouts/components/DataTimeLine.vue';
import DataTeste from '@/layouts/components/DataTeste.vue';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { api } from '@/service/apiConfig.js';
import { ref } from 'vue';
import DataTesteVue from '@/layouts/components/DataTeste.vue';

const historicalData = ref([]);
const modalOpen = ref(false);
const selectedChange = ref(null);
const headerMapping = [
  {
    title: 'Tipo de modificação',
    key: 'changeType',
  },
  {
    title: 'Entidade',
    key: 'changeEntity',
  },
  {
    title: 'Autor da modificação',
    key: 'changeAuthor',
  },
  {
    title: 'Ver modificações',
    key: 'changeButton',
  },
//   {
//     title: 'Antes',
//     key: 'changeBefore',
//   },
//   {
//     title: 'Depois',
//     key: 'changeAfter',
//   },
]

async function fetchData(){
  const response = await api.get('/historical/data')
  return response.data
}

async function refreshData(){
    // historicalData.value = await putData();
    const data = await fetchData();
    
    console.log("Antes de limpar o historico...")
    console.log(historicalData.value.length)
    historicalData.value = []
    console.log("Depois de limpar o historico...")
    console.log(historicalData.value.length)

    data.forEach((item) => {
        historicalData.value.push({
            changeType: item.changeType,
            changeEntity: item.tableName,
            changeAuthor: item.changedByPartnerId,
            changeButton: "Aqui vai ter um botão",
        });
    });
}

function openModal(item) {
  selectedChange.value = item.raw;
  modalOpen.value = true;
}

function closeModal() {
  modalOpen.value = false;
  selectedChange.value = null;
}

onMounted(async () => {
    refreshData()
});

</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Dados Historicos">
        <VDataTable
          :headers="headerMapping"
          :items="historicalData"
          :items-per-page="-1"
          :fixed-header="true"
          :height="'600px'"
          class="text-no-wrap rounded-0 text-sm"
        >
          <template #item.changeType="{ item }">
            <div class="d-flex">
              <svg class="oracle-icon" width="25px" height="25px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fill="#F00" fill-rule="evenodd" d="M7.957359,18.9123664 C4.11670252,18.9123664 1,15.803458 1,11.9617373 C1,8.12000773 4.11670252,5 7.957359,5 L16.0437948,5 C19.8855156,5 23,8.12000773 23,11.9617373 C23,15.803458 19.8855156,18.9123664 16.0437948,18.9123664 L7.957359,18.9123664 L7.957359,18.9123664 Z M15.8639176,16.4585488 C18.352201,16.4585488 20.3674397,14.448858 20.3674397,11.9617373 C20.3674397,9.47460595 18.352201,7.45381934 15.8639176,7.45381934 L8.1360824,7.45381934 C5.64895285,7.45381934 3.63255855,9.47460595 3.63255855,11.9617373 C3.63255855,14.448858 5.64895285,16.4585488 8.1360824,16.4585488 L15.8639176,16.4585488 L15.8639176,16.4585488 Z"/>
              </svg>
              <span class="text-high-emphasis text-base">
                {{ item.raw.changeType }}
              </span>
            </div>
          </template>
          <template #item.changeButton="{ item }">
            <div>
                <VBtn @click="openModal(item)">Abrir Modal</VBtn>
            </div>
          </template>
          <!-- <template #bottom /> -->
        </VDataTable>

        <!-- Modal -->
        <VDialog v-model="modalOpen" max-width="80vw">
          <div class="close-button-container">
            <VBtn class="close-button" text @click="closeModal">Fechar</VBtn>
          </div>
          <div class="timeline-container">
            <DataTeste />
          </div>
        </VDialog>
      </VCard>
    </VCol>
  </VRow>
</template>

<style scoped>
.timeline-container {
  max-height: 70vh;
  max-width: 80vw;
  overflow-y: auto;
  position: relative;
}

.close-button-container {
  /* position: absolute; */
  z-index: 1000;
}

.close-button {
  position: relative;
}

.oracle-icon {
  margin-right: 10px;
}

</style>
