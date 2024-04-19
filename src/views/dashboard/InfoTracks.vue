<script setup>
import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { onMounted, ref, computed } from 'vue'
import GraphicDonut from '../../components/GraphicDonut.vue'

const vuetifyTheme = useTheme()
const titulo = ref(null)

onMounted(() => {
  titulo.value = 'danko'
})

var chartOptions = null



const series = [
  95,
  80,
  20,
  40,
]

chartOptions = computed(() => {
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
      'Cloud Build',
      'Cloud Sell',
      'Cloud Service',
      'License and Hardware',
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
              label: 'Essa Semana',
              fontSize: '10px',
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
    amount: '82',
    title: 'Cloud Build',
    avatarColor: 'primary',
    subtitle: 'Descrição Da Track',
    avatarIcon: 'bx-bar-chart-alt-2',
  },
  {
    amount: '80',
    title: 'Cloud Service',
    avatarColor: 'success',
    subtitle: 'Descrição Da Track',
    avatarIcon: 'bx-bar-chart-alt-2',
  },
  {
    amount: 73,
    title: 'Cloud Service',
    avatarColor: 'info',
    subtitle: 'Descrição Da Track',
    avatarIcon: 'bx-bar-chart-alt-2',
  },
  {
    amount: 69,
    title: 'License and Hardware',
    avatarColor: 'secondary',
    subtitle: 'Descrição Da Track',
    avatarIcon: 'bx-bar-chart-alt-2',
  },
]


</script>

<template>
  <div>
    <GraphicDonut 
      :labels="[
      'Cloud Build',
      'Cloud Sell',
      'Cloud Service',
      'License and Hardware',
    ]"
      :orders="orders"
      :series="series"
      :chartOptions="chartOptions"
    />
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 21px;
}
</style>
