<script setup>
import avatar1 from '@images/avatars/avatar-1.png'

const accountData = {
  nomeParceiro: '',
  cnpj: '',
  estado: 'Selecione Um Estado',
  cidade: 'Seleciona Uma Cidade',
  endereco: '',
  slogan: ''
}

const accountDataLocal = ref(structuredClone(accountData))

const resetForm = () => {
  accountDataLocal.value = structuredClone(accountData)
}
</script>

<template>
  <VRow>
    <VCol cols="12">
      <VCard title="Cadastro De Parceiro">

        <VDivider />

        <VCardText>
          <!-- 👉 Form -->
          <VForm class="mt-6" v-model="accountDataLocal">
            <VRow>
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField
                  placeholder="Nome Do Parceiro"
                  label="Nome Do Parceiro"
                  v-model="accountDataLocal.nomeParceiro"
                />
              </VCol>
              
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField
                  placeholder="CNPJ"
                  label="CNPJ"
                  v-model="accountDataLocal.cnpj"
                />
              </VCol>
            
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VSelect
                  placeholder="Estado"
                  label="Estado"
                  no-data-text="Nenhum estado disponível"
                  v-model="accountDataLocal.estado"
                />
              </VCol>

              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VSelect
                  placeholder="Cidade"
                  label="Cidade"
                  no-data-text="Nenhuma cidade disponível"
                  v-model="accountDataLocal.cidade"
                />
              </VCol>
            
              <!-- 👉 First Name -->
              <VCol md="6" cols="12">
                <VTextField
                  placeholder="Endereço"
                  label="Endereço"
                  v-model="accountDataLocal.endereco"
                />
              </VCol>

              <VCol md="6" cols="12">
                <VTextField
                  placeholder="Forneça Um Slogan Para Empresa"
                  label="Slogan"
                  v-model="accountDataLocal.slogan"
                />
              </VCol>
                                                    
              <!-- 👉 Form Actions -->
              <VCol cols="12" class="d-flex flex-wrap gap-4">
                <VBtn>Save changes</VBtn>

                <VBtn
                  color="secondary"
                  variant="tonal"
                  type="reset"
                  @click.prevent="resetForm"
                >
                  Reset
                </VBtn>
              </VCol>
            </VRow>
          </VForm>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12">

    </VCol>
  </VRow>
</template>
