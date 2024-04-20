<script setup>
const salesByCountries = [
  {
    abbr: 'US',
    amount: '$8,656k',
    country: 'United states of america',
    change: '+25.8%',
    sales: '894k',
    color: 'success',
  },
  {
    abbr: 'UK',
    amount: '$2,415k',
    country: 'United kingdom',
    change: '-6.2%',
    sales: '645k',
    color: 'error',
  },
  {
    abbr: 'IN',
    amount: '$865k',
    country: 'India',
    change: '+12.4%',
    sales: '148k',
    color: 'warning',
  },
  {
    abbr: 'JA',
    amount: '$745k',
    country: 'Japan',
    change: '-11.9%',
    sales: '86k',
    color: 'secondary',
  },
  {
    abbr: 'KO',
    amount: '$45k',
    country: 'Korea',
    change: '+16.2%',
    sales: '42k',
    color: 'error',
  },
  {
    abbr: 'US',
    amount: '$8,656k',
    country: 'United states of america',
    change: '+25.8%',
    sales: '894k',
    color: 'success',
  },
  {
    abbr: 'UK',
    amount: '$2,415k',
    country: 'United kingdom',
    change: '-6.2%',
    sales: '645k',
    color: 'error',
  },
  {
    abbr: 'IN',
    amount: '$865k',
    country: 'India',
    change: '+12.4%',
    sales: '148k',
    color: 'warning',
  },
  {
    abbr: 'JA',
    amount: '$745k',
    country: 'Japan',
    change: '-11.9%',
    sales: '86k',
    color: 'secondary',
  },
  {
    abbr: 'KO',
    amount: '$45k',
    country: 'Korea',
    change: '+16.2%',
    sales: '42k',
    color: 'error',
  },
  {
    abbr: 'US',
    amount: '$8,656k',
    country: 'United states of america',
    change: '+25.8%',
    sales: '894k',
    color: 'success',
  },
  {
    abbr: 'UK',
    amount: '$2,415k',
    country: 'United kingdom',
    change: '-6.2%',
    sales: '645k',
    color: 'error',
  },
  {
    abbr: 'SP',
    amount: '$865k',
    country: 'India',
    change: '+12.4%',
    sales: '148k',
    color: 'warning',
  },
  {
    abbr: 'JA',
    amount: '$745k',
    country: 'Japan',
    change: '-11.9%',
    sales: '86k',
    color: 'secondary',
  },
  {
    abbr: 'KO',
    amount: '$45k',
    country: 'Korea',
    change: '+16.2%',
    sales: '42k',
    color: 'error',
  },
]
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
          v-for="data in salesByCountries"
          :key="data.country"
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
            {{ data.country }}
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
