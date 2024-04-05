<script setup>
import { hexToRgb } from '@layouts/utils';
import VueApexCharts from 'vue3-apexcharts';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()
const chartHeight = 250
const chartWidth = 250
const series = [
  200,
  10,
  20,
  40,
]

const chartOptions = computed(() => {
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const disabledTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['disabled-opacity'] })`
  const primaryTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['high-emphasis-opacity'] })`
  
  return {
    chart: {
      sparkline: { enabled: true },
      animations: { enabled: false },
    },
    stroke: {
      width: 6,
      colors: [currentTheme.surface],
    },
    legend: { show: false },
    tooltip: { enabled: false },
    dataLabels: { enabled: false },
    labels: [
      'SP',
      'Electronic',
      'Sports',
      'Decor',
    ],
    colors: [
      currentTheme.success,
      currentTheme.primary,
      currentTheme.secondary,
      currentTheme.info,
    ],
    grid: {
      padding: {
        top: -7,
        bottom: 5,
      },
    },
    states: {
      hover: { filter: { type: 'none' } },
      active: { filter: { type: 'none' } },
    },
    plotOptions: {
      pie: {
        expandOnClick: false,
        donut: {
          size: '75%',
          labels: {
            show: true,
            name: {
              offsetY: 17,
              fontSize: '14px',
              color: disabledTextColor,
              fontFamily: 'Public Sans',
            },
            value: {
              offsetY: -17,
              fontSize: '24px',
              color: primaryTextColor,
              fontFamily: 'Public Sans',
            },
            total: {
              show: true,
              label: 'Weekly',
              fontSize: '14px',
              formatter: () => '38%',
              color: disabledTextColor,
              fontFamily: 'Public Sans',
            },
          },
        },
      },
    },
  }
})

const orders = [
  {
    amount: '82.5k',
    title: 'Electronic',
    avatarColor: 'primary',
    subtitle: 'Mobile, Earbuds, TV',
    avatarIcon: 'bx-mobile-alt',
  },
  {
    amount: '23.8k',
    title: 'Fashion',
    avatarColor: 'success',
    subtitle: 'Tshirt, Jeans, Shoes',
    avatarIcon: 'bx-closet',
  },
  {
    amount: 849,
    title: 'Decor',
    avatarColor: 'info',
    subtitle: 'Fine Art, Dining',
    avatarIcon: 'bx-home',
  },
  {
    amount: 99,
    title: 'Sports',
    avatarColor: 'secondary',
    subtitle: 'Football, Cricket Kit',
    avatarIcon: 'bx-football',
  },
]

const moreList = [
  {
    title: 'Share',
    value: 'Share',
  },
  {
    title: 'Refresh',
    value: 'Refresh',
  },
  {
    title: 'Update',
    value: 'Update',
  },
]
</script>


<template>
    <div class="parent-component">

    <VCard>
      <VCardItem class="pb-3">
        <VCardTitle class="mb-1">
          Order Statistics
        </VCardTitle>
        <VCardSubtitle>42.82k Total Sales</VCardSubtitle>
      </VCardItem>
  
      <VCardText>
        <div class="d-flex flex-column align-center justify-center mb-3">
          <VueApexCharts
            type="donut"
            :height="chartHeight"
            :width="chartWidth"
            :options="chartOptions"
            :series="series"
          />
  
          <!-- Legenda -->
          <div class="mt-3 d-flex justify-space-between">
            <div v-for="order in orders" :key="order.title" class="d-flex align-center">
              <VAvatar
                rounded
                variant="tonal"
                :color="order.avatarColor"
                size="20"
              >
                <VIcon :icon="order.avatarIcon" />
              </VAvatar>
              <span class="ml-2">{{ order.title }}</span>
            </div>
          </div>
        </div>
      </VCardText>
    </VCard>
    </div>
  </template>
  
  <style lang="scss" scoped>
  .parent-component > * {
    margin-bottom: 15px;
  }
  .card-list {
    --v-card-list-gap: 21px;
  }
  </style>
<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 21px;
}
</style>
  
  <style lang="scss" scoped>
  .parent-component > * {
    margin-bottom: 15px;
  }
  .card-list {
    --v-card-list-gap: 21px;
  }
  </style>
<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 21px;
}
</style>
