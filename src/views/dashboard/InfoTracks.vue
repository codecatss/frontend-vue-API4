<script setup>
import axios from 'axios';
import { useTheme } from 'vuetify'
import { hexToRgb } from '@layouts/utils'
import VueApexCharts from 'vue3-apexcharts'
import { onMounted, ref, computed } from 'vue'
import GraphicDonut from '../../components/GraphicDonut.vue'

const vuetifyTheme = useTheme()
const titulo = ref(null)

onMounted(() => {
  titulo.value = 'danko'
})

const currentTheme = vuetifyTheme.current.value.colors
const variableTheme = vuetifyTheme.current.value.variables
const disabledTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['disabled-opacity'] })`
const primaryTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['high-emphasis-opacity'] })`

var labels = ref([])
var series = ref([])
var orders = ref([])
var colors = ref([])
var chartOptions = ref({})

function getValuesFromDatabase(){
  axios
    .get('http://localhost:8080/dash/opntrack/visualization')
    .then((response) => {
      const data = response.data;
      for (let key in data) {
        const colorStr = data[key]['avatarColor'];
        orders.value.push(data[key]);
        series.value.push(parseInt(data[key]['amount']));
        labels.value.push(data[key]['title']);
        colors.value.push(
          colorStr === 'success' ? currentTheme.success :
          colorStr === 'primary' ? currentTheme.primary :
          colorStr === 'secondary' ? currentTheme.secondary :
          colorStr === 'info' ? currentTheme.info : currentTheme.warning
        );
      }
    })
    .catch((error) => {
      // console.log(error);
    });
}

function refreshVariables(){
  getValuesFromDatabase()

  chartOptions.value = computed(() => {
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
}

refreshVariables()

</script>

<template>
  <div>
    <GraphicDonut 
      title="Teste"
      subtitle="Testando"
      mainInformation="8"
      mainInformationSubtitle="Total De Tracks"
      :labels="labels"
      :series="series"
      :orders="orders"
      :chartOptions="chartOptions"
    />
  </div>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 21px;
}
</style>
