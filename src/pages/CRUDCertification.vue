<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/service/apiConfig.js';
import { VDataTable } from 'vuetify/labs/VDataTable';

import avatar1 from '@images/avatars/avatar-1.png';

const accountData = {
  name: '',
  description: '',
  lifeTimeMonth: 'Selecione o tempo de vida da certificação',
};

const accountDataLocal = ref(structuredClone(accountData));

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData);
};

const recentDevicesHeaders = [
  { title: 'Nome da Certificação', key: 'browser' },
  { title: 'Descrição', key: 'descricao' },
  { title: 'Tempo de vida', key: 'lifeTime' },
  { title: 'Criado em', key: 'created_at' },
  { title: 'Tipo de ingestão', key: 'operation' },
];

async function fetchData() {
  const response = await api.get('/certification');
  return response.data;
}

async function putData() {
  const data = await fetchData();
  let recentDevices = [];
  data.forEach((item) => {
    recentDevices.push({
      browser: item.name,
      descricao: item.description,
      lifeTime: item.lifeTimeMonth,
      operation: item.ingestionOperation,
      created_at: item.createAt,
    });
  });
  return recentDevices;
}

async function getFormData() {
  let formData = {};

  for (const key in accountDataLocal.value) {
    formData[key] = accountDataLocal.value[key];
  }

  formData['ingestionOperation'] = 'MANUAL';

  return formData;

}

async function postData() {
  const response = await api.post('/certification', await getFormData());
  return response.data;
}

const recentDevices = ref([]);

onMounted(async () => {
  recentDevices.value = await putData();
});

const route = useRoute();
const activeTab = ref(route.params.tab || 'account');

const tabs = [
  {
    title: 'Criar Certificação',
    icon: 'bx-user',
    tab: 'account',
  },
  {
    title: 'Tabela de Certificação',
    icon: 'mdi-store',
    tab: 'security',
  },
];
</script>

<template>
  <div>
    <VTabs v-model="activeTab" show-arrows>
      <VTab v-for="item in tabs" :key="item.icon" :value="item.tab">
        <VIcon size="20" start :icon="item.icon" />
        {{ item.title }}
      </VTab>
    </VTabs>
    <VDivider />

    <VWindow v-model="activeTab" class="mt-5 disable-tab-transition">
      <!-- Account -->
      <VWindowItem value="account">
        <VRow>
          <VCol cols="12">
            <VCard title="Cadastro De Certificações">
              <VDivider />
              <VCardText>
                <!-- Form -->
                <VForm class="mt-6">
                  <VRow>
                    <VCol md="6" cols="12">
                      <VTextField
                        placeholder="Nome Da Certificação"
                        label="Nome Da Certificação"
                        v-model="accountDataLocal.name"
                      />
                    </VCol>
                    <VCol md="6" cols="12">
                      <VTextField
                        placeholder="Descrição"
                        label="Descrição"
                        v-model="accountDataLocal.description"
                      />
                    </VCol>
                    <VCol md="6" cols="12">
                      <VTextField
                        placeholder="Tempo De Vida Da Certificação"
                        label="Tempo De Vida Da Certificação"
                        v-model="accountDataLocal.lifeTimeMonth"
                        type="number"
                        min="0"
                        step="1"
                        suffix=" meses"
                      />
                    </VCol>
                    <!-- Form Actions -->
                    <VCol cols="12" class="d-flex flex-wrap gap-4">
                      <VBtn @click="postData">Save changes</VBtn>
                      <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">
                        Reset
                      </VBtn>
                    </VCol>
                  </VRow>
                </VForm>
              </VCardText>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>

      <!-- Security -->
      <VWindowItem value="security">
        <VRow>
          <VCol cols="12">
            <VCard title="Certificações">
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
                    <svg
                      class="oracle-icon"
                      width="25px"
                      height="25px"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fill="#F00"
                        fill-rule="evenodd"
                        d="M7.957359,18.9123664 C4.11670252,18.9123664 1,15.803458 1,11.9617373 C1,8.12000773 4.11670252,5 7.957359,5 L16.0437948,5 C19.8855156,5 23,8.12000773 23,11.9617373 C23,15.803458 19.8855156,18.9123664 16.0437948,18.9123664 L7.957359,18.9123664 L7.957359,18.9123664 Z M15.8639176,16.4585488 C18.352201,16.4585488 20.3674397,14.448858 20.3674397,11.9617373 C20.3674397,9.47460595 18.352201,7.45381934 15.8639176,7.45381934 L8.1360824,7.45381934 C5.64895285,7.45381934 3.63255855,9.47460595 3.63255855,11.9617373 C3.63255855,14.448858 5.64895285,16.4585488 8.1360824,16.4585488 L15.8639176,16.4585488 L15.8639176,16.4585488 Z"
                      />
                    </svg>
                    <span class="text-high-emphasis text-base">
                      {{ item.raw.browser }}
                    </span>
                  </div>
                </template>
                <template #item.lifeTime="{ item }">
                  <div class="lifeTime">
                    <span class="text-high-emphasis text-base">
                      {{ item.raw.lifeTime }} meses
                    </span>
                  </div>
                </template>
                <template #item.createAt="{ item }">
                  <div class="created_at">
                    <span class="text-high-emphasis text-base">
                      {{ item.raw.createAt }}
                    </span>
                  </div>
                </template>
                <template #item.operation="{ item }">
                  <div class="operation">
                    <span class="text-high-emphasis text-base">
                      {{ item.raw.operation }}
                    </span>
                    <Button>
                      <v-icon left>bxs-show</v-icon>
                    </Button>
                    <Button>
                      <v-icon left>bxs-cog</v-icon>
                    </Button>
                  </div>
                </template>
                <template #bottom />
              </VDataTable>
            </VCard>
          </VCol>
        </VRow>
      </VWindowItem>
    </VWindow>
  </div>
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

.operation {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
