<template>
    <div id="wrapper">
        <div id="formContainer">
            <h1>Login</h1>
            <form @submit.prevent="login">
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
                <button type="submit">Login</button>
            </form>
        </div>
    </div>
</template>

<script>

export default {
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        login() {
            // implemente a lógica de login aqui
        }
    }
}
</script>

<style>

    #wrapper {
        min-width: 100vw;
        min-height: 100vh;

        display: flex;
        align-items: center;
        justify-content: center;

        margin-bottom: 4vh;

        background-image: url("../assets/redwood.jpeg"); 

    }

    #formContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        background-color: var(--vt-c-white-mute);
        padding: 2rem;
        border-radius: 1rem;
        width: 40vw;
    }

    h1 {
        display: flex;
        flex-direction: column;
        align-items: center;

    }
    form {
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 1rem;
    }

    form button  {
        margin-top: 1rem;
        width: 10vw;
        height: 2rem;
        border-radius: 1rem;
        border-style: none;
        margin-bottom: 1rem;
        background-color: var(--singin-green-oracle);
        color: var(--vt-c-white-mute);
        font-weight: bold;
        cursor: pointer;
    }

    form button:hover {
        background-color: var(--singin-green-oracle-hover);
        border-style: solid;
        border-color: var(--singinBorder-oracle);
        
    }

    form label {
        font-weight: bold;

    }

    input {
        width: 20vw;
        height: 2rem;
        border-radius: 1rem;
        border-color: var(--vt-c-text-light-2);
        border-style: solid;
        margin-bottom: 1rem;
    }

    h1 {
        font-weight: bold;
    }
    

    div h1 label {
        color: var(--vt-c-text-light-2);
    }

    @media (max-width: 1023px) {

        #wrapper {
        background-image: none;
        }

        #formContainer {
            background-color: transparent;
        }

        form button  {
        width: 40vw;
        }

        input {
        width: 40vw;
        }
    }

</style>