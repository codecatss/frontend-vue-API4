<template>
  <v-card class="notificacaoBox">
    <div class="notificacao" v-if="notificacoes.length > 0">
      <v-card-subtitle class="pa-3">
        <div v-for="(notif, index) in notificacoes" :key="index">
          {{ notif.name }} - {{ notif.company }} - {{ notif.expertise }}
        </div>
      </v-card-subtitle>
    </div>
    <div v-else>
      <v-card-subtitle class="pa-3">
        example2
      </v-card-subtitle>
    </div>
  </v-card>
</template>

<script setup>
import { api } from '@/service/apiConfig';
import { onMounted, ref } from 'vue';

const notificacoes = ref([]);

const fetchData = async () => {
  try {
    const response = await api.get("/dash/certification-per-user");

    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

onMounted(async () => {
  try {
    const response = await fetchData();

    notificacoes.value = response.map(item => ({
      name: item[0],
      company: item[1],
      expertise: item[2],
    }))
  } catch (error) {
    console.error("Error fetching and populating data:", error);
  }
});
</script>

<!-- <template>
  <v-card class="notificacaoBox">
    <div class="notificacao" v-if="notificacoes.length > 0">
      <v-card-subtitle class="pa-3">
        <div v-for="index in notificacoes.length" :key="index">
          {{ names[index - 1] }} - {{ companies[index - 1] }} - {{ expertises[index - 1] }}
        </div>
      </v-card-subtitle>
    </div>

    <div v-else>
      <v-card-subtitle class="pa-3">
        example2
      </v-card-subtitle>
    </div>
  </v-card>
</template>


<script setup>
import { api } from '@/service/apiConfig';
import { onMounted, ref } from 'vue';

const fetchData = async function() {
  const response = await api.get("/dash/certification-per-user");

  return response.data;
};

const notificacoes = ref([]);

const notificacoesArray = async function() {

  try {
    const response = await fetchData();

    response.forEach(obj => {
      notificacoes.value.push(obj)
    })
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  };

}

const populateNotifBox = async () => {
  try {
    await notificacoesArray();
  } catch (error) {
    console.error("Error: ", error)
  };

  notificacoes.value.forEach(arr => {
    names.push(arr[0])
  })

  notificacoes.value.forEach(arr => {
    companies.push(arr[1])
  })

  notificacoes.value.forEach(arr => {
    expertises.push(arr[2])
  })
}

const names = []
const companies = []
const expertises = []

onMounted(async () => {
  populateNotifBox()

  console.log(names)
  console.log(companies)
  console.log(expertises)

  console.log(notificacoes.value)
})
</script> -->

<style scoped>
  .notificacaoBox {
    width: 250%;
    text-align: left;
  }
</style> 
