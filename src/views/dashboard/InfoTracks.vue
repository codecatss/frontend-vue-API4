<script setup>
import axios from 'axios'
import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import { useTheme } from 'vuetify'
import { onMounted, ref, computed } from 'vue'

const vuetifyTheme = useTheme()

const titulo = ref(null)


onMounted(async () => {
  await getTrackDataFromDatabase()
})

async function getTrackDataFromDatabase() {
  try {
    const response = await axios.get('http://localhost:8080/dash/opntrack/visualization');
    const data = response.data;
    let dataArray = [];
    for (let key in data) {
      data[key]['amount'] = parseInt(data[key]['amount']);
      dataArray.push(data[key]);
    }
    dataArray.sort((a, b) => b.amount - a.amount);
    orders.value = dataArray;
    series.value = [];
    labels.value = [];
    colors.value = [];
    for (let item of dataArray) {
      series.value.push(item['amount']);
      labels.value.push(item['title']);
      colors.value.push(item['avatarColor'])
    }
    totalDeTracks.value = orders.value.length;
  } catch (error) {
    console.error(error);
  }
}



let totalDeTracks = ref(0)

const series = ref([])

const labels = ref([])

const colors = ref([])

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
    colors: colors.value,
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
              fontSize: '20px',
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


const orders = ref([])
</script>

<template>
  <VCard>
    <VCardItem class="pb-3">
      <VCardTitle class="mb-1">
        Porcentagem De Parcerios Nas Tracks
      </VCardTitle>
     
      <template #append>
        <div class="me-n3 mt-n8">
          <MoreBtn :menu-list="moreList" />
        </div>
      </template>
    </VCardItem>

    <VCardText>
      <div class="d-flex align-center justify-space-between mb-3">
        <div class="flex-grow-1">
          <h4 class="text-h4 mb-1">
            {{ totalDeTracks }} Total De Tracks
          </h4>
        </div>

        <div>
          <VueApexCharts
            type="donut"
            :height="125"
            width="105"
            :options="chartOptions"
            :series="series"
          />
        </div>
      </div>

      <div class="colunasTitulo d-flex justify-space-between mt-5">
        <h3>Nome Do Parceiro</h3>
        <h3>Quantidade</h3>
      </div>

      <VList class="card-list mt-7">
        <VListItem
          v-for="order in orders"
          :key="order.title"
        >
          <template #prepend>
            <VAvatar
              rounded
              variant="tonal"
              :color="order.avatarColor"
            >
              <VIcon :icon="order.avatarIcon" />
            </VAvatar>
          </template>

          <VListItemTitle class="mb-1">
            {{ order.title }}
          </VListItemTitle>
          <VListItemSubtitle class="text-disabled">
            {{ order.subtitle }}
          </VListItemSubtitle>

          <template #append>
            <span>{{ order.amount }}</span>
          </template>
        </VListItem>
      </VList>
      
      <div class="d-flex justify-center mt-3">
        <v-btn color="primary">Ver Todas As Tracks</v-btn>
      </div>
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 21px;
}
</style>
