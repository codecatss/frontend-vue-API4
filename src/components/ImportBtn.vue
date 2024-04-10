<template>
  <form @submit.prevent="submitForm">
    <span class="fileinput-button">
      <span ref="placeHolder">Importar seus dados</span>
      <input
        type="file"
        @change="onFileChange"
      >
    </span>

    <button @click="submitForm">
      Salvar
    </button>
  </form>
</template>
  
<script>
import axios from 'axios'
  
export default {

  // eslint-disable-next-line vue/component-api-style
  data() {
    return {
      file: null,
    }
  },

  // eslint-disable-next-line vue/component-api-style
  methods: {
    onFileChange(e) {
      this.file = e.target.files[0]

      const fileName = this.file.name

      const startIndex = fileName.lastIndexOf(".")
      const truncatedName = fileName.substring(0, startIndex)

      if (truncatedName.length > 10) {
        this.$refs.placeHolder.innerText = `${truncatedName.substring(0, 20)}...`

      }else{
        this.$refs.placeHolder.innerText = truncatedName
      }
    },

    submitForm() {
      const formData = new FormData()

      formData.append("file", this.file)
      axios.post("http://localhost:8080/api/import-csv", formData)
        .then(function (result) {
          console.log(result)
        }, function (error) {
          console.log(error)
        })
    },
  },
}
</script>

<style>
  form{
    display: flex;
    flex-direction: row;
    align-items: center;

    position: relative;
    top: 0;
    right: 0;
    }

  input{
    height: auto;
  }

  .fileinput-button input {
    position: relative;
    overflow: hidden;
    position: absolute;
    top: 0;
    right: 0;
    margin: 0;
    opacity: 0;
    font-size: 200px;
    direction: ltr;
    cursor: pointer;
    align-items: center;
  }
  button {
    padding: 2vw;
}
</style>
  