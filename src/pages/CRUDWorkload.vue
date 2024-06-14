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

const tableItems = computed(() => {
  return Object.keys(workloadData.value).map(workloadName => ({
    workloadName,
    companyNames: workloadData.value[workloadName]
  }));
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
                    <VCardTitle>Relação Workload - Empresa</VCardTitle>
                    <VCardText>
                        <table class="elevation-1">
                            <thead>
                                <tr>
                                    <th>Workload</th>
                                    <th>Parceiros Aptos</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(companies, workloadName) in workloadData" :key="workloadName">
                                <td class="tableWorkload">{{ workloadName }}</td>
                                <td class="tableCompany">
                                    <ul>
                                        <li class="nenhum" v-if="companies.length === 0">Nenhum parceiro está apto a realizar este workload.</li>
                                        <li v-for="company in companies" :key="company">{{ company }}</li>
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
  background-color: #565868;
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

</style>
