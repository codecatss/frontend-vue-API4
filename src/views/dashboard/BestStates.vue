<script setup>
import { api } from '@/service/apiConfig';
import { hexToRgb } from '@layouts/utils';
import { onMounted, ref, computed } from 'vue';
import VueApexCharts from 'vue3-apexcharts';
import { useTheme } from 'vuetify';

let chartState = ref([]);
let orders = ref([]);

onMounted(async () => {
  const response = await api.get("/dash/state-per-company");
  const data = response.data;

  orders.value = data.sort((a, b) => b.companyCount - a.companyCount).map((item, index) => {
    return {
      amount: item.companyCount, 
      title: item.state,
      avatarColor: ['primary', 'secondary', 'secondary', 'secondary'][index % 4],
      subtitle: 'Subtitle', 
      avatarIcon: 'bx-mobile-alt', 
    }
  }).slice(0, 4); 
});

const labels = computed(() => orders.value.map(order => order.title));
const series = computed(() => orders.value.map(order => order.amount)); 


const vuetifyTheme = useTheme()
const chartHeight = 250
const chartWidth = 250

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
    labels: labels.value,
    colors: [
      currentTheme.primary,
      currentTheme.success,
      currentTheme.info,
      currentTheme.secondary,
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
              fontSize: '12px', 
              color: disabledTextColor,
              fontFamily: 'Public Sans',
            },
            value: {
              offsetY: -17,
              fontSize: '20px', 
              color: primaryTextColor,
              fontFamily: 'Public Sans',
            },
            total: {
              show: true,
              label: 'Aumento De Resultados',
              fontSize: '12px', 
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
          Onde Estamos? 
        </VCardTitle>
        <VCardSubtitle>Porcentagem de Parceiro Por Estado</VCardSubtitle>
      </VCardItem>

      <VCardText>
        <div class="d-flex flex-column align-center justify-center mb-3">
          <!-- Gráfico -->
          <VueApexCharts
            type="donut"
            :height="chartHeight"
            :width="chartWidth"
            :options="chartOptions"
            :series="series"
          />

          <!-- Legenda -->
          <div class="mt-3 d-flex flex-row flex-sm-column justify-space-between flex-wrap">
            <div v-for="order in orders" :key="order.title" class="d-flex align-center mb-sm-2">
              <VAvatar
                rounded
                variant="tonal"
                :color="order.avatarColor"
                size="20"
              >
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

/* Estilo para dispositivos móveis */
@media (max-width: 768px) {
  .justify-space-between {
    justify-content: center !important;
  }
  .flex-sm-column {
    flex-direction: column !important;
  }
}

/* Estilo para desktops */
@media (min-width: 769px) {
  .justify-space-between {
    justify-content: space-between !important;
  }
  .flex-sm-column {
    flex-direction: row !important;
  }
}

/* New rule for legend spacing */
.d-flex.align-center.mb-sm-2 {
  margin-right: 10px;
}
</style>