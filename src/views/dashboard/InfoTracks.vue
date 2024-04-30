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
      let cont = 0;
      for (let key in data) {
        if(cont < 4){
          orders.value.push(data[key]);
          series.value.push(parseInt(data[key]['amount']));
          labels.value.push(data[key]['title']);
          colors.value.push(data[key]['avatarColor'])
          cont++;
        }
        else{
          break
        }
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
  <VCard>
    <VCardItem class="pb-3">
      <VCardTitle class="mb-1">
        Tracks
      </VCardTitle>
      <VCardSubtitle> Tracks </VCardSubtitle>

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
            {{ orders.length }}
          </h4>
          <span> Quantidade de Tracks usada pelas companias </span>
        </div>

        <div>
          <VueApexCharts
            type="donut"
            :height="125"
            width="105"
            :options="chartOptions.value"
            :series="series"
          />
        </div>
      </div>

      <VList class="card-list mt-7">
        <VListItem
          v-for="(order, ) in orders.slice(0, 4)"
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
    </VCardText>
  </VCard>
</template>

<style lang="scss" scoped>
.card-list {
  --v-card-list-gap: 21px;
}
</style>
