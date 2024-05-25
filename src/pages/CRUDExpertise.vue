<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/service/apiConfig.js';
import { VDataTable } from 'vuetify/labs/VDataTable';

// Import form component
import avatar1 from '@images/avatars/avatar-1.png';
import axios from 'axios';

// Data and functions for the form
const accountData = {
  nomeExpertise: '',
  descricao: '',
  status: 'ACTIVE',
  certificado: [],
};

const accountDataLocal = ref(structuredClone(accountData));

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData);
};

// Data and functions for the table
const recentDevicesHeaders = [
  { title: 'Nome do Certificação', key: 'browser' },
  { title: 'Estado', key: 'location' },
  { title: 'Expertise', key: 'expertise' },
  { title: 'Progresso', key: 'percentage' },
  { title: 'Configurações', key: 'config' },
];

async function fetchData() {
  const response = await api.get('/dash/companyexpertiseusercountservice');
  return response.data;
}

async function putData() {
  const data = await fetchData();
  let recentDevices = [];
  data.forEach((item) => {
    try {
      item.companyState = decodeURIComponent(escape(item.companyState));
    } catch (e) {}
    recentDevices.push({
      browser: item.companyName,
      Certificação: item.CertificaçãoName,
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
  populateCertifications();
  console.log(certifications);
});

// Tab navigation
const route = useRoute();
const activeTab = ref(route.params.tab || 'account');

const tabs = [
  {
    title: 'Criar Expertise',
    icon: 'bx-user',
    tab: 'account',
  },
  {
    title: 'Tabela de Expertise',
    icon: 'mdi-store',
    tab: 'security',
  },
];

const populateCertifications = async () => {
  try {
    const response = await api.get("/certification");
 
    certifications.value = response.data.map(certification => certification.name);
  } catch (e) {
    console.error('Failed getting certification names', e)
  }

  return certifications;
};

const certifications = ref([]);

const statuses = ['ACTIVE', 'INACTIVE'];

const submitForm = async () => {

  const expertiseDTO = {
    name: accountDataLocal.value.nomeExpertise,
    description: accountDataLocal.value.descricao,
    statusString: accountDataLocal.value.status,
    status: accountDataLocal.value.status,
    createAt: new Date().toISOString,
    updateAt: new Date().toISOString,
    ingestionOperation: 'MANUAL',
  };

  try {
    const response = await api.post("/expertise", expertiseDTO);

    console.log('Response: ', response);
    resetForm();
  } catch (error) {
    console.error('Error: ', error)
  };
  
};

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
            <VCard title="Cadastro De Expertise">
              <VDivider />
              <VCardText>
                <!-- Form -->
                <VForm class="mt-6">
                  <VRow>
                    <!-- Nome Da Expertise -->
                    <VCol md="6" cols="12">
                      <VTextField
                        placeholder="Nome Da Expertise"
                        label="Nome Da Expertise"
                        v-model="accountDataLocal.nomeExpertise"
                      />
                    </VCol>
                    <!-- Descrição -->
                    <VCol md="6" cols="12">
                      <VTextField
                        placeholder="Descricao..."
                        label="Descricao"
                        v-model="accountDataLocal.descricao"
                      />
                    </VCol>
                    <!-- Status -->
                    <VCol md="6" cols="12">
                      <VSelect
                        :items="statuses"
                        placeholder="Status"
                        label="Status"
                        no-data-text="Escolha uma opcao"
                        v-model="accountDataLocal.status"
                      />
                    </VCol>
                    <!-- Certificado -->
                    <VCol md="6" cols="12">
                      <VSelect
                        :items="certifications"
                        placeholder="Certificado"
                        label="Certificado"
                        no-data-text="Escolha uma opcao"
                        v-model="accountDataLocal.certificado"
                      />
                    </VCol>
                    <!-- Form Actions -->
                    <VCol cols="12" class="d-flex flex-wrap gap-4">
                      <VBtn @click.prevent="submitForm">Save changes</VBtn>
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
                <template #item.percentage="{ item }">
                  <div class="percentage">
                    <span class="text-high-emphasis text-base">
                      {{ Math.floor(item.raw.percentage) }}%
                    </span>
                    <div class="progress-bar-wrapper">
                      <div
                        class="progress-bar"
                        :style="{ width: item.raw.percentage + '%' }"
                      ></div>
                    </div>
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

.percentage {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
</style>
