<template>
  <VCard class="text-center text-sm-start">
    <VRow no-gutters>
      <VCol
        cols="12"
        sm="8"
        order="2"
        order-sm="1"
      >
        <VCardItem>
          <VCardTitle class="text-md-h5 text-primary">
            {{bemVindo}}
          </VCardTitle>
        </VCardItem>

        <VCardText>
          <span>
            Importe Seus Dados e 
            <br>
            Veja aqui os resultados
          </span>
          <br>
          <span class="fileinput-button"> 
            <VBtn
              variant="tonal"
              class="mt-4"
              size="small"
              @click="triggerFileInput"
            >
              <span ref="placeHolder">Importar seus dados</span>
              <input
                ref="fileInput"
                type="file"
                style="display: none;"
                @change="onFileChange"
              >
            </VBtn>
            <VBtn
              variant="tonal"
              class="mt-4 ml-2"
              size="small"
              @click="submitForm"
            >
              Enviar
            </VBtn>
          </span>
        </VCardText>
      </VCol>

      <VCol
        cols="12"
        sm="4"
        order="1"
        order-sm="2"
        class="text-center"
      >
        <img
          :src="illustrationJohn"
          :height="$vuetify.display.xs ? '150' : '175'"
          :class="$vuetify.display.xs ? 'mt-6 mb-n2' : 'position-absolute'"
          class="john-illustration flip-in-rtl"
        >
      </VCol>
    </VRow>

    <VSnackbar
      v-model="snackbar"
      :color="snackbarColor"
      :timeout="5000"
      top
    >
      {{ snackbarText }}
    </VSnackbar>
  </VCard>
</template>

<script setup>
import { useTheme } from 'vuetify'
import illustrationJohnDark from '@images/cards/illustration-john-dark.png'
import illustrationJohnLight from '@images/cards/illustration-john-light.png'

import axios from 'axios'

import { ref, computed, onMounted } from 'vue'

let bemVindo = null

onMounted(() => {
  
  bemVindo = 'Bem Vindo(a) de volta ' + localStorage.getItem('userName') + '!'

})

const { global } = useTheme()
const illustrationJohn = computed(() => global.name.value === 'dark' ? illustrationJohnDark : illustrationJohnLight)

let file = null
const fileInput = ref(null)
const placeHolder = ref(null)
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('')


const onFileChange = e => {

  file = e.target.files[0]

  if (!file.type.match('csv.*')) {
    snackbar.value = true
    snackbarText.value = 'Por favor, apenas arquivos CSV.'
    snackbarColor.value = 'error'

    return
  }

  const fileName = file.name

  const startIndex = fileName.lastIndexOf(".")
  const truncatedName = fileName.substring(0, startIndex)

  if (truncatedName.length > 10) {
    placeHolder.value.innerText = `${truncatedName.substring(0, 20)}...`
  } else {
    placeHolder.value.innerText = truncatedName
  }
}

const triggerFileInput = () => {
  fileInput.value.click()
}

const submitForm = () => {
  const formData = new FormData()

  formData.append("file", file)

  if (!file) {
    snackbar.value = true
    snackbarText.value = 'Selecione um arquivo para enviar'
    snackbarColor.value = 'info'

    return 
  }

  axios.post("http://localhost:8080/api/import-csv", formData)
    .then(function (result) {
      console.log(result)
      snackbar.value = true
      snackbarText.value = 'Arquivo foi enviado com sucesso! 🎉'
      snackbarColor.value = 'success'
    }, function (error) {
      console.log(error)
      snackbar.value = true
      snackbarText.value = 'Houve um erro ao enviar seu arquivo'
      snackbarColor.value = 'error'
    })
}
</script>

<style lang="scss" scoped>
.john-illustration {
  inset-block-end: -0.0625rem;
  inset-inline-end: 3rem;
}



.fileinput-button input {
  position: absolute;
  top: 0;
  right: 0;
  margin: 0;
  opacity: 0;
  font-size: 200px;
  direction: ltr;
  cursor: pointer;
}
</style>