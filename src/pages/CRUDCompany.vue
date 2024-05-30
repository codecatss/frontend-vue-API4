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
            <VCard title="Cadastro De Parceiro">
              <VDivider />
              <VCardText>
                <!-- Form -->
                <VForm class="mt-6">
                  <VRow>
                    <!-- CNPJ -->
                    <VCol md="6" cols="12">
                      <VTextField
                        placeholder="CNPJ"
                        label="CNPJ"
                        v-model="accountDataLocal.cnpj"
                        maxlength="18"
                      />
                    </VCol>
                    <!-- Nome Da Parceiro -->
                    <VCol md="6" cols="12">
                      <VTextField
                        placeholder="Nome Da Parceiro"
                        label="Nome Da Parceiro"
                        v-model="accountDataLocal.nomeTrack"
                        readonly="readonly"
                      />
                    </VCol>
                    <!-- Estado -->
                    <VCol md="6" cols="12">
                      <VSelect
                        v-model="accountDataLocal.estado"  
                        placeholder="Estado"
                        label="Estado"
                        no-data-text="Nenhum estado disponível"
                        :items="states.map(state => state.nome)"  
                        readonly="readonly"
                      />
                    </VCol>

                    <!-- Cidade -->
                    <VCol md="6" cols="12">
                      <VSelect
                        placeholder="Cidade"
                        label="Cidade"
                        no-data-text="Nenhuma cidade disponível"
                        v-model="accountDataLocal.cidade"
                        :items="accountDataLocal.cities"
                        readonly="readonly"
                      />
                    </VCol>
                    <!-- Endereço -->
                    <VCol md="6" cols="12">
                      <VTextField
                        placeholder="Endereço"
                        label="Endereço"
                        v-model="accountDataLocal.endereco"
                        readonly="readonly"
                      />
                    </VCol>
                    <!-- Slogan -->
                    <VCol md="6" cols="12">
                      <VTextField
                        placeholder="Forneça Um Slogan Para Empresa"
                        label="Slogan"
                        v-model="accountDataLocal.slogan"
                      />
                    </VCol>
                    <!-- Form Actions -->
                    <VCol cols="12" class="d-flex flex-wrap gap-4">
                      <VBtn @click="handleSaveCompany">Cadastrar</VBtn>
                      <VBtn color="secondary" variant="tonal" type="reset" @click.prevent="resetForm">
                        Limpar formulario
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
                <template #item.nome="{ item }">
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
                      {{ item.raw.nome }}
                    </span>
                  </div>
                </template>
                <template #item.config="{ item }">
                  <div class="d-flex justify-center text-center mr-7">
                    <VBtn icon style="margin-right: 10px;" @click="printObject(item)">
                      <VIcon left small>bxs-show</VIcon>
                    </VBtn>
                    <VBtn icon style="margin-left: 10px;">
                      <VIcon left small>bxs-cog</VIcon>
                    </VBtn>
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

<script setup>
import { ref, reactive, watchEffect, watch, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { api } from '@/service/apiConfig.js';
import { VDataTable } from 'vuetify/labs/VDataTable';
import { get_address_by_cep, format_validation_zip_code } from '@/utils/via_cep';
import { get_data_by_cnpj, validation_cnpj } from '@/utils/cnpj';

// Data and functions for the form
const accountData = {
  nomeTrack: '',
  cnpj: '',
  estado: 'Selecione Um Estado',
  cidade: 'Seleciona Uma Cidade',
  endereco: '',
  slogan: ''
};

const accountDataLocal = reactive(structuredClone(accountData));

const resetForm = () => {
  Object.assign(accountDataLocal, structuredClone(accountData));
};

const recentDevices = ref([]);

// Tab navigation
const route = useRoute();
const activeTab = ref(route.params.tab || 'account');

const tabs = [
  {
    title: 'Criar Parceiro',
    icon: 'bx-user',
    tab: 'account',
  },
  {
    title: 'Tabela de Parceiro',
    icon: 'mdi-store',
    tab: 'security',
  },
];

const states = [
  { sigla: 'AC', nome: 'Acre' },
  { sigla: 'AL', nome: 'Alagoas' },
  { sigla: 'AP', nome: 'Amapá' },
  { sigla: 'AM', nome: 'Amazonas' },
  { sigla: 'BA', nome: 'Bahia' },
  { sigla: 'CE', nome: 'Ceará' },
  { sigla: 'DF', nome: 'Distrito Federal' },
  { sigla: 'ES', nome: 'Espírito Santo' },
  { sigla: 'GO', nome: 'Goiás' },
  { sigla: 'MA', nome: 'Maranhão' },
  { sigla: 'MT', nome: 'Mato Grosso' },
  { sigla: 'MS', nome: 'Mato Grosso do Sul' },
  { sigla: 'MG', nome: 'Minas Gerais' },
  { sigla: 'PA', nome: 'Pará' },
  { sigla: 'PB', nome: 'Paraíba' },
  { sigla: 'PR', nome: 'Paraná' },
  { sigla: 'PE', nome: 'Pernambuco' },
  { sigla: 'PI', nome: 'Piauí' },
  { sigla: 'RJ', nome: 'Rio de Janeiro' },
  { sigla: 'RN', nome: 'Rio Grande do Norte' },
  { sigla: 'RS', nome: 'Rio Grande do Sul' },
  { sigla: 'RO', nome: 'Rondônia' },
  { sigla: 'RR', nome: 'Roraima' },
  { sigla: 'SC', nome: 'Santa Catarina' },
  { sigla: 'SP', nome: 'São Paulo' },
  { sigla: 'SE', nome: 'Sergipe' },
  { sigla: 'TO', nome: 'Tocantins' },
];

const handleSaveCompany = async () => {
  var cnpj_format = accountDataLocal.cnpj.replace(/\D/g, '');

  const response = await api.post('/company/save', {
    name: accountDataLocal.nomeTrack,
    cnpj: cnpj_format,
    city: accountDataLocal.cidade,
    address: accountDataLocal.endereco,
    state: accountDataLocal.estado,
    slogan: accountDataLocal.slogan,
  });

  if (response.status == 200) {
    alert('Empresa cadastrada com sucesso!');
    await putData();  // Atualiza a lista de empresas
  } else {
    alert('Erro ao cadastrar empresa!');
  }
};

// Função para buscar cidades com base na sigla do estado selecionado
const fetchCitiesByState = async (stateSigla) => {
  try {
    console.log('Buscando cidades do estado:', stateSigla);
    const estado = states.find(state => stateSigla == state.nome);
    const siglaEstado = estado ? estado.sigla : null;
    console.log('Sigla do estado:', siglaEstado);
    if (siglaEstado) {
      const response = await api.get(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${siglaEstado}/municipios`);
      return response.data.map(city => city.nome);
    } else {
      console.error('Estado não encontrado:', stateSigla);
      return [];
    }
  } catch (error) {
    console.error('Erro ao buscar cidades:', error);
    return [];
  }
};

// Função para buscar dados do CNPJ
watchEffect(() => {
  if (accountDataLocal.cnpj.length === 14 && /^\d+$/.test(accountDataLocal.cnpj)) {
    console.log('Buscando dados do CNPJ:', accountDataLocal.cnpj);
    fetch(`https://api-publica.speedio.com.br/buscarcnpj?cnpj=${accountDataLocal.cnpj}`)
      .then(response => response.json())
      .then(data => {
        console.log('Dados do CNPJ:', data);
        // Verifica se a propriedade "UF" e "MUNICIPIO" existem nos dados
        if (data["UF"] && data["MUNICIPIO"]) {
          const estado = states.find(state => state.sigla == data["UF"]);
          // Se existirem, atribui os valores aos campos correspondentes
          accountDataLocal.nomeTrack = data["RAZAO SOCIAL"];
          accountDataLocal.estado = estado.nome;
          accountDataLocal.cidade = data["MUNICIPIO"];
          // Preencher o input de endereço com o nome da rua
          accountDataLocal.endereco = data["LOGRADOURO"];

          // Atualizar a lista de cidades com base no estado atualizado
          fetchCitiesByState(data["UF"]).then(cities => {
            accountDataLocal.cities = cities;
          });
        } else {
          // Se não existirem, limpa os campos correspondentes
          accountDataLocal.nomeTrack = '';
          accountDataLocal.estado = 'Selecione Um Estado';
          accountDataLocal.cidade = 'Seleciona Uma Cidade';
          accountDataLocal.endereco = '';
        }
        console.log(accountDataLocal);
      })
      .catch(error => {
        console.error('Erro ao buscar dados do CNPJ:', error);
      });
    console.log(accountDataLocal);
  }
});

// Função para aplicar a máscara ao CNPJ
const formatCNPJ = (value) => {
  // Remove qualquer caractere que não seja dígito
  value = value.replace(/\D/g, '');

  // Aplica a máscara ao valor
  if (value.length > 14) value = value.substring(0, 14);
  if (value.length > 12) value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5');
  else if (value.length > 8) value = value.replace(/^(\d{2})(\d{3})(\d{3})(\d{0,4})/, '$1.$2.$3/$4');
  else if (value.length > 5) value = value.replace(/^(\d{2})(\d{3})(\d{0,3})/, '$1.$2.$3');
  else if (value.length > 2) value = value.replace(/^(\d{2})(\d{0,3})/, '$1.$2');

  return value;
};

// Watcher para aplicar a máscara ao CNPJ
watch(() => accountDataLocal.cnpj, (newVal) => {
  accountDataLocal.cnpj = formatCNPJ(newVal);
});

async function fetchData(){
  const response = await api.get('/company/companies')
  return response.data;
}

const printObject = (item) => {
  if (Array.isArray(item.columns)) {
    console.log("Columns:", item.columns);
    const prototype = Object.getPrototypeOf(item.columns);
    console.log("Prototype of columns:", prototype);
    // Aqui você pode acessar as propriedades e métodos do protótipo, se necessário
  } else if (typeof item.columns === 'object' && item.columns !== null) {
    console.log("Columns:", item.columns);
    const prototype = Object.getPrototypeOf(item.columns);
    console.log("Prototype of columns:", prototype);
    // Aqui você pode acessar as propriedades e métodos do protótipo, se necessário
  } else {
    console.log("Item.columns não é um array ou objeto válido.");
  }

  // Acessando a propriedade 'cnpj' através do Proxy
  console.log("CNPJ:", item.raw.cnpj);
};




const recentDevicesHeaders = [
  {
    title: 'Nome do Parceiro',
    key: 'nome',
  },
  {
    title: 'CNPJ do Parceiro',
    key: 'cnpj',
  },
  {
    title: 'Tipo De Ingestão',
    key: 'ingestion',
  },
  {
    title: 'Status',
    key: 'status',
  },
  {
    title: 'Slogan',
    key: 'slogan',
  },
  {
    title: '',
    key: 'config',
  
  }
];

async function putData(){
  const data = await fetchData();
  const dataArray = Object.values(data);
  console.log(data);

  let formattedDevices = [];

  dataArray.forEach((item) => {
    if (item.status === 'ACTIVE') {
       item.status = 'Ativo';
    } else if (item.status === 'INACTIVE') {
       item.status = 'Inativo';
    }
    formattedDevices.push({
      nome: item.name,
      cnpj: formatCNPJ(item.cnpj),  
      status: item.status,
      ingestion: item.ingestionOperation,
      slogan: item.slogan,
    });
  });
  return formattedDevices;
}

onMounted(async () => {
  recentDevices.value = await putData();
});

</script>

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




/* Estilo para borda verde */
.active-border {
  border: 2px solid green;
}

/* Estilo para borda vermelha */
.inactive-border {
  border: 2px solid red;
}

/* Classe para aplicar borda a todos os elementos */
.border-indicator {
  padding: 5px; /* Ajuste conforme necessário */
  display: inline-block; /* Para permitir que a borda se ajuste ao conteúdo */
}

</style>
