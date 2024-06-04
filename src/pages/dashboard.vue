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
import GraphicBar from '@/views/dashboard/GraphicBar.vue'



// 👉 Images
import chart from '@images/cards/chart-success.png'
import card from '@images/cards/credit-card-primary.png'
import paypal from '@images/cards/paypal-error.png'
import wallet from '@images/cards/wallet-info.png'
import ProgressDeadline from '@/components/ProgressDeadline.vue'
</script>

<template>
  <VRow>
    <!-- 👉 Congratulations -->
    <VCol
      cols="12"
      md="8"
    >
      <AnalyticsCongratulations />
      <AnalyticsTransactionsTop class="mt-3" />
    </VCol>

    <!-- 👉 BestStates -->
    <VCol
      cols="12"
      sm="4"
      md="4"
      order="1"
      order-md="2"
    >
      <BestStates />
    </VCol>

    <!-- 👉 Order Statistics -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      order="2"
    >
      <InfoTracks />
    </VCol>

    <VCol
      cols="12"
      md="4"
      sm="6"
      order="2"
    >
      <InfoExpertises />
    </VCol>
    <!-- 👉 Tabs chart -->
    <VCol
      cols="12"
      md="4"
      sm="6"
      order="3"
    >
      <GraphicBar />
    </VCol>

    <!-- 👉 Transactions -->
    <VCol
      cols="12"
      md="8"
      sm="6"
      order="4"
    >
      <AnalyticsFinanceTabs />
    </VCol>
  </VRow>
</template>
