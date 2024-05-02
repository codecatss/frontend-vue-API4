<template>
  <v-card class="notificacaoBox" :variant="elevated">
    <div class="notificacao" v-if="notificacoes.length > 0">
      <div v-for="(notif, index) in notificacoes" :key="index" class="cardDiv" style="width: 90%;">
        <v-card-title class="notificacaoTitle pt-2 pb-0">
          {{ notif.company }}
        </v-card-title>
        <v-card-subtitle class="notificacaoSubtitle pt-0">
          {{ notif.name }}
        </v-card-subtitle>
        <v-card-text class="notificacaoText pt-1 pb-0">
          <p v-if="notif.expertise.length < 51">
            {{ notif.expertise }}
          </p>
          <p v-else class="expertiseBig">
            {{ notif.expertise }}
          </p>
        </v-card-text>
        <v-card-text class="notificacaoText pt-1 pb-2">
          vencimento em <p class="timeLeft">{{ notif.timeLeft }} dias</p>.
        </v-card-text>
        <v-card-text class="notificacaoText">
          <div class="line"></div>
        </v-card-text>
      </div>
    </div>
    <div v-else>
      Loading...
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
      timeLeft: item[5],
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
    width: 350%;
    text-align: left;
    box-shadow: 5px 5px 15px rgba(0,0,0,0.25);
  }

  .notificacaoTitle {
    font-size: 16px;
  }

  .notificacaoSubtitle {
    font-size: 12px;
  }

  .notificacaoText {
    font-size: 12px;
    overflow-wrap: break-word !important;
  }

  .timeLeft {
    display: inline;
    color: red;
  }

  .line {
    border-top: 1px dotted gray;
  }

  .expertiseBig {
    font-size: 11px !important;
    /* overflow:auto; */
    overflow-wrap: break-word;
  }
</style> 
