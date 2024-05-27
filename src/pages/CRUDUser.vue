<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from 'axios';

const accountData = {
  name: '',
  email: '',
  cnpjCompanyString: null, // Definido como null para permitir objeto ou valor
  password: 'senha123'
};

const accountDataLocal = ref(structuredClone(accountData));

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData);
};

const saveChanges = async () => {
  // Lógica para salvar mudanças
  try{
    const response = await axios.post('http://localhost:8080/employee', accountDataLocal.value);
    console.log('Changes saved', accountDataLocal.value);
    resetForm();
  } catch (error) {
    console.error('Erro ao salvar mudanças:', error);
  }
};

const route = useRoute();
const activeTab = ref(route.params.tab || 'account');

const tabs = [
  {
    title: 'Registro de Usuário',
    icon: 'bx-user',
    tab: 'account',
  }
];

const state = reactive({
  accountDataLocal: structuredClone(accountData),
  empresas: [],
});

const fetchEmpresas = async () => {
  try {
    const response = await axios.get('http://localhost:8080/company/active');
    console.log('Empresas:', response.data); // Verifique os dados retornados
    state.empresas = response.data;
  } catch (error) {
    console.error('Erro ao buscar empresas:', error);
  }
};

onMounted(() => {
  fetchEmpresas();
});
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
      <VWindowItem value="account">
        <VRow>
          <VCol cols="12">
            <VCard title="Cadastro De Usuário">
              <VDivider />
              <VCardText>
                <VForm class="mt-6">
                  <VRow>
                    <VCol md="6" cols="12">
                      <VTextField
                        class="custom-color"
                        placeholder="Nome do usuário"
                        label="Nome do usuário"
                        v-model="accountDataLocal.name"
                      />
                    </VCol>
                    <VCol md="6" cols="12">
                      <VTextField
                        class="custom-color"
                        placeholder="Email"
                        label="Email"
                        v-model="accountDataLocal.email"
                      />
                    </VCol>
                    <!-- Empresa -->
                    <VCol md="6" cols="12">
                      <VTextField
                        class="custom-color"
                        placeholder="CNPJ da empresa"
                        label="CNPJ"
                        v-model="accountDataLocal.cnpjCompanyString"
                      />
                    </VCol>
                    <!-- <VCol md="6" cols="12">
                      <VSelect
                        class="custom-color"
                        :items="state.empresas"
                        item-text="name"
                        item-value="cnpj"
                        label="Empresa"
                        v-model="accountDataLocal.empresa"
                        return-object
                      >
                        <template v-slot:prepend-item>
                          <VListItem>
                            <VListItemTitle>Selecione uma Empresa</VListItemTitle>
                          </VListItem>
                        </template>
                        <template v-slot:item="{ item }">
                          <VListItem :title="item.name" :value="item.cnpj" />
                        </template>
                      </VSelect>
                    </VCol> -->
                    <!-- SENHA -->
                    <VCol md="6" cols="12">
                      <VTextField
                        class="custom-color"
                        placeholder="Senha"
                        label="Senha"
                        v-model="accountDataLocal.password"
                        type="password"
                      />
                    </VCol>
                    <VCol cols="12" class="d-flex flex-wrap gap-4">
                      <VBtn @click="saveChanges">Save changes</VBtn>
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

.custom-color {
  color: #000;
}
</style>
