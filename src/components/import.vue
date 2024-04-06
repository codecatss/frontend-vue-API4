<template>
    <input class="input" type="text" name="name" placeholder="File name" v-model="fileName" required>
    <input class="file-input" type="file" ref="file" name="file">
  </template>
  
  <script>
  // eslint-disable-next-line regex/invalid
  import axios from 'axios'
  
  export default {
    name: 'importComp',

    // eslint-disable-next-line vue/component-api-style
    data() {
      return {
        fileName: '',
        attachment: null,
        formData: null,
      }
    },
    // eslint-disable-next-line vue/component-api-style
    methods: {
      submitForm() {
        this.formData = new FormData()
        this.formData.append('name', this.fileName)
        this.formData.append('attachment', this.attachment)
  
        axios.post('files/add', this.formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(response => {
          console.log(response.data)
        }).catch(error => {
          console.log(error)
        })
      },
    },
  }
  </script>
  