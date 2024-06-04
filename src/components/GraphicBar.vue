<template>
  <v-container>
    <v-card>
      <v-card-title>Gráfico de Barras Vertical</v-card-title>
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
          labels: ['Categoria 1', 'Categoria 2', 'Categoria 3'],
          datasets: [
            {
              label: 'Dataset 1',
              data: [12, 19, 3],
              backgroundColor: 'rgb(144,85,253)', // roxo
              borderColor: 'rgb(144,85,253)',
              borderWidth: 1,
              borderRadius: 10, // barras arredondadas
              categoryPercentage: 0.8, // largura das barras
            },
            {
              label: 'Dataset 2',
              data: [5, 10, 15],
              backgroundColor: 'rgb(22,177,255)', // azul
              borderColor: 'rgb(22,177,255)',
              borderWidth: 1,
              borderRadius: 10, // barras arredondadas
              categoryPercentage: 0.8, // largura das barras
            }
          ]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
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
