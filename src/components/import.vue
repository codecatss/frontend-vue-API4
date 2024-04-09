<template>
   <form  @submit.prevent="submitForm">
      <input type="file" @change="onFileChange">
    <button @click="submitForm">Submit</button>
   </form>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    name: 'importComp',

    data() {
      return {
        file: null
      }
    },

    methods: {
      onFileChange(e) {
      this.file = e.target.files[0];
    },

    submitForm() {
      const formData = new FormData();
      formData.append("file", this.file);
      axios.post("http://localhost:8080/api/import-csv", formData)
         .then(function (result) {
            console.log(result);
         }, function (error) {
            console.log(error);
         });
      }
    },
  }
  </script>
  