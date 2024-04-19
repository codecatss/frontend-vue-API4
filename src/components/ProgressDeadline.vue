<template>
  <v-card :class="cardClass" class="card-padding">
    <v-row>
      <v-col cols="6" class="progress-circle">
        <VueApexCharts
          type="donut"
          :height="circleSize"
          :options="chartOptions"
          :series="circleSeries"
        />
      </v-col>
      <v-col cols="6" class="div-2">
        <v-subheader class="div-3">Certificados Expirando</v-subheader>
        <v-headline class="div-4">54</v-headline>
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup>
import { hexToRgb } from '@layouts/utils';
import VueApexCharts from 'vue3-apexcharts';
import { useTheme } from 'vuetify';

const vuetifyTheme = useTheme()

const circleSize = 150; // Tamanho do círculo
const circlePercentage = 20; // Porcentagem do círculo preenchido

const currentTheme = vuetifyTheme.current.value.colors
const variableTheme = vuetifyTheme.current.value.variables

// Calculando a porcentagem de preenchimento do círculo
const filledColorPercentage = circlePercentage > 0 ? circlePercentage : 0;
const emptyColorPercentage = 100 - filledColorPercentage;

// Definindo as séries com a porcentagem de preenchimento
const circleSeries = [filledColorPercentage, emptyColorPercentage];

const cardClass = computed(() => {
  return {
    'theme--light': !vuetifyTheme.dark,
    'theme--dark': vuetifyTheme.dark
  }
});

const disabledTextColor = computed(() => {
  return `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['disabled-opacity'] })`
});

const primaryTextColor = computed(() => {
  return `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['high-emphasis-opacity'] })`
});

const textColor = computed(() => {
  return vuetifyTheme.dark ? '#ffffff' : '#333335';
});

const chartOptions = computed(() => {
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
    labels: [''],
    colors: [currentTheme.error, currentTheme.background], 
    grid: {
      padding: {
        top: -7,
        bottom: 5,
      },
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
          color: disabledTextColor.value,
          fontFamily: 'Public Sans',
        },
        value: {
          offsetY: -17,
          fontSize: '24px',
          color: primaryTextColor.value,
          fontFamily: 'Public Sans',
        },
        total: {
          show: true,
          label: '',
          fontSize: '14px',
          formatter: () => `${circlePercentage}%`,
          color: disabledTextColor.value,
          fontFamily: 'Public Sans',
        },
      },
    },
    fill: {
      type: 'solid',
      colors: [currentTheme.primary], 
    },
  },
},

  }
});
</script>

<style scoped>
.card-padding {
  padding: 10px; 
}

.progress-circle {
  text-align: center;
}

.apexcharts-donut-slice {
  border-radius: 50px; 
}

.div-2 {
  display: flex;
  flex-direction: column;
  flex: 1;
  margin: auto 0;
}

.div-3 {
  font: 400 19px/150% Inter, sans-serif;
  color: var(--v-background-base);
}

.div-4 {
  font: 600 20px/120% Inter, sans-serif;
  color: var(--v-background-base);
}
</style>
