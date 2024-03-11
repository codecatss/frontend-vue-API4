<template>
    <div>
        <h1>Login</h1>
        <form @submit.prevent="login">
            <div>
                <label for="email">Email:</label>
                <input type="email" id="email" v-model="email" required>
            </div>
            <div>
                <label for="password">Password:</label>
                <input type="password" id="password" v-model="password" required>
            </div>
            <button type="submit">Login</button>
        </form>
    </div>

    <RouterView />
</template>

<script>
import { RouterLink, RouterView } from 'vue-router';

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