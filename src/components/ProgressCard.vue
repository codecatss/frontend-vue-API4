<template>
    <div class="div">
      <div class="progress-circle">
        <VueApexCharts
          type="donut"
          :height="circleSize"
          :options="chartOptions"
          :series="circleSeries"
        />
      </div>
      <div class="div-2">
        <div class="div-3">Expertises Finalizadas</div>
        <div class="div-4">9,903</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { hexToRgb } from '@layouts/utils';
  import VueApexCharts from 'vue3-apexcharts';
  import { useTheme } from 'vuetify';
  
  const vuetifyTheme = useTheme()
  
  const circleSize = 200; // Tamanho do círculo
  const circlePercentage = 60; // Porcentagem do círculo preenchido
  
  const currentTheme = vuetifyTheme.current.value.colors
  const variableTheme = vuetifyTheme.current.value.variables
  const disabledTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['disabled-opacity'] })`
  const primaryTextColor = `rgba(${ hexToRgb(String(currentTheme['on-surface'])) },${ variableTheme['high-emphasis-opacity'] })`
  
  // Calculando a porcentagem de preenchimento do círculo
  const filledColorPercentage = circlePercentage > 0 ? circlePercentage : 0;
  const emptyColorPercentage = 100 - filledColorPercentage;
  
  // Definindo as séries com a porcentagem de preenchimento
  const circleSeries = [filledColorPercentage, emptyColorPercentage];
  
  const chartOptions = {
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
    labels: ['Progress'],
    colors: [currentTheme.success, currentTheme.background], 
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
              label: 'Progress',
              fontSize: '14px',
              formatter: () => `${circlePercentage}%`,
              color: disabledTextColor,
              fontFamily: 'Public Sans',
            },
          },
        },
      },
    },
  };
  </script>
  
  <style scoped>
  .div {
    border-radius: 8px;
    box-shadow: 0px 2px 0px 0px rgba(10, 10, 10, 0.04);
    background-color: #fff;
    display: flex;
    align-items: flex-start;
    gap: 20px;
    padding: 6px 45px 28px 19px;
    width: 100%;
  }
  .progress-circle {
    text-align: center;
  }
  .apexcharts-donut-slice {
    border-radius: 50px; /* Ajuste o valor do raio conforme necessário */
  }
  .div-2 {
    display: flex;
    flex-direction: column;
    flex: 1;
    margin: auto 0;
  }
  .div-3 {
    color: #8c9097;
    font: 400 13px/150% Inter, sans-serif;
  }
  .div-4 {
    color: #333335;
    margin-top: 11px;
    font: 600 20px/120% Inter, sans-serif;
  }
  </style>