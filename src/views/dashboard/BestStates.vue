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
  console.log(data)

  const topThree = data.sort((a, b) => b.companyCount - a.companyCount).slice(0, 3);
  const others = data.slice(3);

  const othersCount = others.reduce((total, item) => total + item.companyCount, 0);

  orders.value = [...topThree, {
    companyCount: othersCount,
    state: "Outros",
    avatarColor: 'secondary',
    subtitle: 'Subtitle', 
    avatarIcon: 'bx-mobile-alt', 
  }].map((item, index) => {
    return {
      amount: item.companyCount, 
      title: item.state,
      avatarColor: ['primary', 'secondary', 'secondary', 'secondary'][index % 4],
      subtitle: 'Subtitle', 
      avatarIcon: 'bx-mobile-alt', 
    }
  });
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
              label: '',
              fontSize: '10px', 
              formatter: () => 'Passe O Mouse',
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



           <div 
              v-for="(order, index) in orders" 
              :key="order.title" 
              class="d-flex align-center mb-sm-2"
              :class="`filho ${index + 1}`"
            >
              <VAvatar
                rounded
                variant="tonal"
                :color="`filho${index + 1}`"
                size="20"
                :style="{ backgroundColor: order.avatarColor }"
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



.v-avatar--variant-plain, .v-avatar--variant-outlined, .v-avatar--variant-text, .v-avatar--variant-tonal {
  
}


.text-filho1 {
  background-color: rgb(105, 108, 255);
}

.text-filho2 {
  background-color: rgb(113, 221, 55);;
}

.text-filho3 {
  background-color: rgb(3, 195, 236);
  ;
}

.text-filho4 {
  background-color: rgb(133, 146, 163);
}

</style>