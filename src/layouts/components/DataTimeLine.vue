<template>
    <div class="timeline">
      <v-timeline>
        <v-timeline-item
          v-for="(event, index) in events"
          :key="index"
          :reverse="index % 2 !== 0"
        >
          <template v-slot:icon>
            <v-avatar size="36">
              <v-icon color="primary">mdi-clock-time-five-outline</v-icon>
            </v-avatar>
          </template>
          <v-card>
            <v-card-title>{{ event.title }}</v-card-title>
            <v-card-text>{{ event.description }}</v-card-text>
          </v-card>
        </v-timeline-item>
      </v-timeline>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        events: [
          { title: 'Evento 1', description: 'Descrição do evento 1' },
          { title: 'Evento 2', description: 'Descrição do evento 2' },
          { title: 'Evento 3', description: 'Descrição do evento 3' },
          { title: 'Evento 4', description: 'Descrição do evento 4' },
          { title: 'Evento 5', description: 'Descrição do evento 5' },
          // Adicione mais eventos conforme necessário
        ]
      };
    }
  };
  </script>
  
  
  
  <style scoped>
  .timeline {
    padding: 20px;
  }
  
  .v-timeline-item::before {
    border-left: 2px dashed #000;
  }
  
  .v-timeline-item:first-child::before {
    top: 50% !important;
  }
  
  .v-timeline-item:last-child::before {
    height: 50% !important;
  }
  
  .v-card:hover {
    box-shadow: 0 0 10px rgba(255, 255, 255, 1);
  }
  </style>