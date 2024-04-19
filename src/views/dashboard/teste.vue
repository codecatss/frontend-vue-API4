<template>

    <VCard class="pb-3">
      <p>Mapa</p>
  
  
      
  
      
      <div>
        <div ref="infoBox" id="info-box" v-show="infoBoxVisible">{{ infoText }}</div>
        
      </div>
    </VCard>
   
  
    </template>
    
  
  
    <script>
  export default {
    mounted() {
      this.setupSVG();
      this.setupMap();
    },
    methods: {
      setupMap() {
        const brazilMap = this.$refs.brazilMap;
        const paths = brazilMap.querySelectorAll('path');
  
        paths.forEach((path) => {
          const valor = parseInt(path.getAttribute('valor'));
          if (valor < 30) {
            path.style.fill = "#FFB6B6"; // Vermelho claro
          } else if (valor >= 30 && valor < 35) {
            path.style.fill = "#FF7F7F"; // Vermelho médio-claro
          } else if (valor >= 36 && valor < 40) {
              
            path.style.fill = "#FF4C4C"; // Vermelho médio-escuro
          } else {
            path.style.fill = "#FF0000"; // Vermelho escuro
          }
          // Adicionar linha preta ao redor de cada estado
          path.style.stroke = "black";
          path.style.strokeWidth = "1px";
        });
  
        const infoBox = this.$refs.infoBox;
  
        brazilMap.addEventListener("mouseover", (event) => {
          if (event.target.tagName === 'path') {
            // Exibir o valor do estado
            infoBox.textContent = "Estado: " + event.target.getAttribute('id') + ", Valor: " + event.target.getAttribute('valor');
  
            infoBox.style.display = "block";
            // Armazenar a cor original
            event.target.dataset.originalColor = event.target.style.fill;
          }
        });
  
        brazilMap.addEventListener("mouseout", (event) => {
          if (event.target.tagName === 'path') {
            // Redefinir a cor de preenchimento para a cor original
            event.target.style.fill = event.target.dataset.originalColor;
            // Ocultar o valor do estado
            infoBox.style.display = "none";
          }
        });
  
        // Atualizar a posição do info-box ao mover o mouse
        brazilMap.addEventListener("mousemove", (event) => {
          infoBox.style.left = event.pageX + 'px';
          infoBox.style.top = event.pageY + 'px';
        });
      },
      setupSVG() {
        const lista = [
          {"NomeEstado": "Acre", "Valor": 25},
          {"NomeEstado": "Alagoas", "Valor": 30},
          {"NomeEstado": "Amapá", "Valor": 27},
          {"NomeEstado": "Amazonas", "Valor": 29},
          {"NomeEstado": "Bahia", "Valor": 35},
          {"NomeEstado": "Ceará", "Valor": 32},
          {"NomeEstado": "Distrito Federal", "Valor": 40},
          {"NomeEstado": "Espírito Santo", "Valor": 37},
          {"NomeEstado": "Goiás", "Valor": 38},
          {"NomeEstado": "Maranhão", "Valor": 31},
          {"NomeEstado": "Mato Grosso", "Valor": 36},
          {"NomeEstado": "Mato Grosso do Sul", "Valor": 39},
          {"NomeEstado": "Minas Gerais", "Valor": 42},
          {"NomeEstado": "Pará", "Valor": 33},
          {"NomeEstado": "Paraíba", "Valor": 32},
          {"NomeEstado": "Paraná", "Valor": 41},
          {"NomeEstado": "Pernambuco", "Valor": 34},
          {"NomeEstado": "Piauí", "Valor": 31},
          {"NomeEstado": "Rio de Janeiro", "Valor": 43},
          {"NomeEstado": "Rio Grande do Norte", "Valor": 32},
          {"NomeEstado": "Rio Grande do Sul", "Valor": 40},
          {"NomeEstado": "Rondônia", "Valor": 28},
          {"NomeEstado": "Roraima", "Valor": 26},
          {"NomeEstado": "Santa Catarina", "Valor": 39},
          {"NomeEstado": "São Paulo", "Valor": 44},
          {"NomeEstado": "Sergipe", "Valor": 30},
          {"NomeEstado": "Tocantins", "Valor": 28}
        ];
  
        const svgElement = this.$refs.brazilMap;
  
        const paths = svgElement.querySelectorAll('path');
  
        paths.forEach((path, index) => {
          if (lista[index]) {
            path.setAttribute('valor', lista[index].Valor);
            path.setAttribute('id', lista[index].NomeEstado);
          }
        });
      }
    }
  };
  </script>
  
  
    
  <style scoped>
  
  
  
    .pb-3 {
      display: flex;
      justify-content: center;
      padding: 70px;
      
    }
  
  
    #info-box {
      position: absolute;
      top: 10px;
      left: 10px;
      background-color: rgba(255, 255, 255, 0.9);
      padding: 10px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }
   
          #info-box {
              position: absolute;
              top: 10px;
              left: 10px;
              background-color: rgba(255, 255, 255, 0.9);
              padding: 10px;
              border: 1px solid #ccc;
              border-radius: 5px;
              display: none;
          }
  
          path:hover {
              filter: brightness(0.5); /* Ajuste o valor para aumentar ou diminuir o brilho */
  
          }
  
      </style>
  