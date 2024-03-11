<template>
    <header>

        <img src="../assets/oracle.svg" alt="Oracle Logo" />

        
        <nav>
            <ul>
                <RouterLink to="/auth">Login</RouterLink>
                <RouterLink to="/">Home</RouterLink>
            </ul>
        </nav>

    </header>
</template>

    <script>
    import { RouterLink, RouterView } from 'vue-router';

    export default {
        name: 'HeaderComponent',
    };
    </script>


<style>
header {
    width: 100%;
    background-color: var(--oracles-header-gray);
    padding: 10px;
    
    line-height: 1.5;
    position: fixed;
    top: 0;
    margin-right: 0%;
}

nav {
    display: flex;
    justify-content: right;
    width: 100%;
    text-align: center;
    padding: 1vh;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  font-size: 1vw;
  font-weight: 700;
  color: var(--vt-c-white-mute);
}

@media (max-width: 1023px) {

    nav a {
        font-size: 3vw;
        padding: 0,5vh;
    }

}

</style>