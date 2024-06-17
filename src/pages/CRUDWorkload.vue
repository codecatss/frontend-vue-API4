<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/service/apiConfig.js';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { VCard, VCardTitle, VCardText, VRow, VCol, VWindowItem } from 'vuetify/components';

// Import form component
import avatar1 from '@images/avatars/avatar-1.png';

const accountData = {
  nomeExpertise: '',
  descricao: '',
};

const workloadData = ref({});
const selectedWorkload = ref('Visualizar todas workloads');
const partnerFilter = ref('Workloads com parceiros aptos');

async function fetchData() {
  const response = await api.get('/dash/companyexpertiseusercountservice');
  processData(response.data);

  console.log("fetchData -> ", response.data);

  return response.data;
};

const processData = (data) => {
  const result = {};

  data.forEach(item => {
    if (!result[item.workloadName]) {
      result[item.workloadName] = [];
    }
    if (item.completionPercentage === 100) {
      result[item.workloadName].push(item.companyName);
    }
  });
  
  workloadData.value = result;

  console.log("processData -> ", workloadData.value);
};

onMounted(async () => {
  fetchData();
});

// Tab navigation
const route = useRoute();
const activeTab = ref(route.params.tab || 'account');

const tabs = [
  {
    title: 'Criar Workload',
    icon: 'bx-user',
    tab: 'account',
  },
  {
    title: 'Tabela de Workloads',
    icon: 'mdi-store',
    tab: 'security',
  },
];

const headers = [
  { text: 'Workload Name', value: 'workloadName' },
  { text: 'Company Names', value: 'companyNames' }
];

const sortedWorkloadNames = computed(() => {
  return ['Visualizar todas workloads', ...Object.keys(workloadData.value).sort((a, b) => a.localeCompare(b))];
});

const tableItems = computed(() => {
  let items = Object.keys(workloadData.value).map(workloadName => ({
    workloadName,
    companyNames: workloadData.value[workloadName]
  }));

  if (selectedWorkload.value !== 'Visualizar todas workloads') {
    items = items.filter(item => item.workloadName === selectedWorkload.value);
  }

  if (partnerFilter.value === 'Workloads com parceiros aptos') {
    items = items.filter(item => item.companyNames.length > 0);
  } else if (partnerFilter.value === 'Workloads sem parceiros aptos') {
    items = items.filter(item => item.companyNames.length === 0);
  }

  return items.sort((a, b) => a.workloadName.localeCompare(b.workloadName));
});

const submitForm = async () => {
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
            <VCard title="Cadastro De Workload">
              <VDivider />
              <VCardText>
                <!-- Form -->
                <VForm class="mt-6">
                  <VRow>
                    <!-- Nome Da Expertise -->
                    <VCol md="6" cols="12">
                      <VTextField
                        placeholder="Nome Do Workload"
                        label="Nome Do Workload"
                      />
                    </VCol>
                    <!-- Descrição -->
                    <VCol md="6" cols="12">
                      <VTextField
                        placeholder="Descricao..."
                        label="Descricao"
                      />
                    </VCol>

                    <!-- Form Actions -->
                    <VCol cols="12" class="d-flex flex-wrap gap-4">
                      <VBtn>Save changes</VBtn>
                      <VBtn color="secondary" variant="tonal" type="reset">
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
                <VCard>
                    <VCardTitle style="padding-top: 20px;">Relação Workload - Empresa</VCardTitle>
                    <VCardText>
                      <VRow>
                            <VCol cols="6">
                                <VSelect
                                  class="filtro"
                                  v-model="selectedWorkload"
                                  :items="sortedWorkloadNames"
                                  label="Select Workload"
                                  dense
                                />
                            </VCol>
                            <VCol cols="6">
                                <VSelect
                                  class="filtro"
                                  v-model="partnerFilter"
                                  :items="['Visualizar todos', 'Workloads com parceiros aptos', 'Workloads sem parceiros aptos']"
                                  label="Filtrar por Parceiros"
                                  dense
                                />
                            </VCol>
                        </VRow>
                        <table class="elevation-1">
                            <thead>
                                <tr>
                                    <th>Workload</th>
                                    <th>Parceiros Aptos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="item in tableItems" :key="item.workloadName">
                                  <td class="tableWorkload">{{ item.workloadName }}</td>
                                  <td class="tableCompany">
                                    <ul>
                                      <li class="nenhum" v-if="item.companyNames.length === 0">Nenhum parceiro está apto a realizar este workload.</li>
                                      <li v-for="company in item.companyNames" :key="company">{{ company }}</li>
                                    </ul>
                                  </td>
                                </tr>
                            </tbody>
                        </table>
                    </VCardText>
                </VCard>
            </VCol>
            </VRow>
      </VWindowItem>
    </VWindow>
  </div>
</template>

<style scoped>

.nenhum {
    color: rgb(255, 109, 109);
}

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

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  border-bottom: 0.5px solid #a0a0a0;
  text-align: left;
}

thead {
  background-color: #464b6d;
  color: rgb(231, 231, 231);
}

tbody {
    font-family: sans-serif;
}

.elevation-1 {
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}

.tableWorkload {
    font-weight: 200;
}

.tableCompany {
    font-weight: 100;
}

.filtro {
  padding-right: 0px !important;
  padding-top: 30px;
  padding-bottom: 30px;
}
</style>
