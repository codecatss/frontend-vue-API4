<template>
    <HeaderComponent :login="false"/>
  
      <div id="wrapper">
          <div id="bgForm">
              <h1>Iniciar sessão</h1>
              <form @submit.prevent="login">
                  <label for="email">Email:</label>
                  <input type="email" id="email" v-model="email" required>
                  <label for="password">Password:</label>
                  <input type="password" id="password" v-model="password" required>
                  <button id="confirm" type="submit">Login</button>
              </form>
              <button id="cadastrar">Criar conta</button>
          </div>
      </div>
  </template>
  
  
  <script>
  
      import HeaderComponent from '../components/Header.vue'
  
      export default {
          components: {
              HeaderComponent
          },
          
          data() {
              return {
                  email: '',
                  password: ''
              }
          },
  
          methods: {
  
              login() {
                  const credentials = {
                      email: this.email,
                      password: this.password
                  };
  
                      console.log(credentials.email);
                      console.log(credentials.password);
  
              },
              
              credentialsValidation() {
                  if (this.email === ''
                          || this.password === '') {
                      alert('Preencha todos os campos');
                      return false;
                  }
                  return true;
              }
          }
      }
  
  </script>
  
  <style scoped>
  
      @import '../assets/baseForm.css';
  
      #wrapper {
          min-width: 100vw;
          min-height: 100vh;
  
          display: flex;
          align-items: center;
          justify-content: center;
  
          margin-bottom: 4vh;
  
          background-image: url("../assets/login-bg.jpeg"); 
  
      }
  
      form {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
      }
  
      form button:hover {
          background-color: var(--singin-green-oracle-hover);
          border-style: solid;
          border-color: var(--singinBorder-oracle);
          
      }
  
      #cadastrar{
          width: 20vw;
          height: 2rem;
          border-radius: 1rem;
          border-style: none;
          background-color: var(--vt-c-white-mute);
          color: var(--vt-c-text-light-2);
          font-weight: bold;
          cursor: pointer;
      }
  
      @media (max-width: 1023px) {
  
          #wrapper {
          background-image:  url("https://static.oracle.com/cdn/apex/21.1.0/themes/theme_42/1.6/images/rw/textures/texture-13.png");
          background-size: 70% 50%;
          }
  
          input {
          width: 40vw;
          }
      }
  
  </style>