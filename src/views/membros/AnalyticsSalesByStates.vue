<script setup>
const salesByStates = [
  {
    abbr: 'AC',
    state: 'Acre',
    sales: '0',
    color: 'success',
  },
  {
    abbr: 'AL',
    state: 'Alagoas',
    sales: '0',
    color: 'error',
  },
  {
    abbr: 'AP',
    state: 'Amapá',
    sales: '0',
    color: 'warning',
  },
  {
    abbr: 'AM',
    state: 'Amazonas',
    sales: '0',
    color: 'secondary',
  },
  {
    abbr: 'BA',
    state: 'Bahia',
    sales: '0',
    color: 'error',
  },
  {
    abbr: 'CE',
    state: 'Ceará',
    sales: '0',
    color: 'success',
  },
  {
    abbr: 'DF',
    state: 'Distrito Federal',
    sales: '0',
    color: 'error',
  },
  {
    abbr: 'ES',
    state: 'Espírito Santo',
    sales: '0',
    color: 'warning',
  },
  {
    abbr: 'GO',
    state: 'Goiás',
    sales: '0',
    color: 'secondary',
  },
  {
    abbr: 'MA',
    state: 'Maranhão',
    sales: '0',
    color: 'error',
  },
  {
    abbr: 'MT',
    state: 'Mato Grosso',
    sales: '0',
    color: 'success',
  },
  {
    abbr: 'MS',
    state: 'Mato Grosso do Sul',
    sales: '0',
    color: 'error',
  },
  {
    abbr: 'MG',
    state: 'Minas Gerais',
    sales: '0',
    color: 'warning',
  },
  {
    abbr: 'PA',
    state: 'Pará',
    sales: '0',
    color: 'secondary',
  },
  {
    abbr: 'PB',
    state: 'Paraíba',
    sales: '0',
    color: 'error',
  },
  {
    abbr: 'PR',
    state: 'Paraná',
    sales: '0',
    color: 'success',
  },
  {
    abbr: 'PE',
    state: 'Pernambuco',
    sales: '0',
    color: 'error',
  },
  {
    abbr: 'PI',
    state: 'Piauí',
    sales: '0',
    color: 'warning',
  },
  {
    abbr: 'RJ',
    state: 'Rio de Janeiro',
    sales: '0',
    color: 'secondary',
  },
  {
    abbr: 'RN',
    state: 'Rio Grande do Norte',
    sales: '0',
    color: 'error',
  },
  {
    abbr: 'RS',
    state: 'Rio Grande do Sul',
    sales: '0',
    color: 'success',
  },
  {
    abbr: 'RO',
    state: 'Rondônia',
    sales: '0',
    color: 'error',
  },
  {
    abbr: 'RR',
    state: 'Roraima',
    sales: '0',
    color: 'warning',
  },
  {
    abbr: 'SC',
    state: 'Santa Catarina',
    sales: '0',
    color: 'secondary',
  },
  {
    abbr: 'SP',
    state: 'São Paulo',
    sales: '0',
    color: 'error',
  },
  {
    abbr: 'SE',
    state: 'Sergipe',
    sales: '0',
    color: 'success',
  },
  {
    abbr: 'TO',
    state: 'Tocantins',
    sales: '0',
    color: 'error',
  },
];

</script>

<template>
  <VCard class="custom-class">
    <VCardItem>
      <VCardTitle class="text-md-h5 text-primary">Localização Dos Parceiros</VCardTitle>
      
      <template #append>
        <div class="me-n3">
          <MoreBtn />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <VList class="card-list">
        <VListItem
          v-for="data in salesByStates"
          :key="data.state"
        >
          <template #prepend>
            <VAvatar
              :color="data.color"
              variant="tonal"
              size="40"
            >
              {{ data.abbr }}
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1 d-flex align-center">



          </VListItemTitle>

          <VListItemSubtitle class="text-body-1 me-2">
            {{ data.state }}
          </VListItemSubtitle>

          <template #append>
            <div>
              <h6 class="text-h6 mb-1">
                {{ data.sales }}
              </h6>

            </div>
          </template>
        </VListItem>
      </VList>
    </VCardText>
  </VCard>
</template>

  <style lang="scss" scoped>
  .card-list {
    --v-card-list-gap: 0.875rem;
  }

  .card-list {
    --v-card-list-gap: 0.875rem;
  }

.custom-class{
  max-height: 850px;
  overflow-y: auto;
}
  </style>
