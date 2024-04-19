<!-- eslint-disable import/no-unresolved -->
<script lang="ts" setup>
import ProgressCard from '@/components/ProgressCard.vue'
import AnalyticsCongratulations from '@/views/dashboard/AnalyticsCongratulations.vue'
import AnalyticsFinanceTabs from '@/views/dashboard/AnalyticsFinanceTab.vue'
import InfoExpertises from '@/views/dashboard/InfoExpertises.vue'
import InfoTracks from '@/views/dashboard/InfoTracks.vue'
import AnalyticsProfitReport from '@/views/dashboard/AnalyticsProfitReport.vue'
import AnalyticsTotalRevenue from '@/views/dashboard/AnalyticsTotalRevenue.vue'
import AnalyticsTransactions from '@/views/dashboard/AnalyticsTransactions.vue'
import AnalyticsTransactionsTop from '@/views/dashboard/AnalyticsTransactionsTop.vue'
import BestStates from '@/views/dashboard/BestStates.vue'


// 👉 Images
import chart from '@images/cards/chart-success.png'
import card from '@images/cards/credit-card-primary.png'
import paypal from '@images/cards/paypal-error.png'
import wallet from '@images/cards/wallet-info.png'
import ProgressDeadline from '@/components/ProgressDeadline.vue'
import Mapa from '@/layouts/components/Mapa.vue'

</script>

<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol
      cols="12"
      md="8"
    >
    <Mapa  />
    </VCol>

  </VRow>
</template>
