<template>
  <form @submit.prevent="submitForm">
    <span class="fileinput-button">
      <span
        ref="placeHolder"
        class="spanInnterno">Importar seus dados
      </span>
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
// eslint-disable-next-line regex/invalid
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
    justify-content: space-around;

    position: relative;
    top: 0;
    right: 0;

    background-color: #efefff;
    width: fit-content;
    height: 5vh;
    border-radius: 1vh;
  }

  .fileinput-button input {
    overflow: hidden;
    position: absolute;
    top: 0;
    left: 0;
    margin-left: 10%;

    opacity: 0;

    font-size: 200px;
    direction: ltr;
    cursor: pointer;

    width: 50%;
    height: 100%;
  }

  .spanInnterno {
    cursor: pointer;
  }

  button {
    padding: 1vw;
}
</style>

  