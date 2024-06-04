<template>
  <v-container>
    <v-card>
      <v-card-title>Gráfico de Barras Horizontal</v-card-title>
      <v-card-text>
        <canvas id="myChart"></canvas>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

export default {
  name: 'BarChart',
  mounted() {
    this.renderChart();
  },
  methods: {
    renderChart() {
      const ctx = document.getElementById('myChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['Nome 1', 'Nome 2', 'Nome 3', 'Nome 4'], // Nomes para o eixo Y
          datasets: [
            {
              label: 'Valores',
              data: [12, 19, 3, 5], // Valores para o eixo X
              backgroundColor: ['rgb(144,85,253)', 'rgb(22,177,255)', 'rgb(86,202,0)', 'rgb(255,105,180)'],
              borderWidth: 1,
              borderRadius: 10,
              barPercentage: 0.8, // Ajuste a porcentagem da largura das barras
            }
          ]
        },
        options: {
          indexAxis: 'y', // Orientação horizontal
          scales: {
            x: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: true,
              labels: {
                generateLabels: function (chart) {
                  return ['Nome 1', 'Nome 2', 'Nome 3', 'Nome 4'].map(function (label, i) {
                    return {
                      text: label,
                      fillStyle: ['rgb(144,85,253)', 'rgb(22,177,255)', 'rgb(86,202,0)', 'rgb(255,105,180)'][i],
                      hidden: false,
                      index: i,
                      // Define o borderRadius para as barras da legenda
                      borderRadius: 5
                    };
                  });
                }
              }
            }
          }
        }
      });
    }
  }
};
</script>

<style scoped>
#myChart {
  max-width: 100%;
}
</style>
