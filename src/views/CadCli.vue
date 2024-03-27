<template>
    <div id="bgForm">
        <h1>Cadastro de Clientes</h1>
        <form @submit.prevent="submitForm">
            <div id="metade">

                <div class="dado">
                    <label for="nome">Nome:</label>
                    <input type="text" id="nome" v-model="cliente.nome" required>
                </div>
                    
                <div class="dado">
                    <label for="cnpj">CNPJ:</label>
                    <input type="text" id="cnpj" v-model="cliente.cnpj" required>
                </div>

                <div class="dado">
                    <label for="contato">Contato:</label>
                    <input type="text" id="contato" v-model="cliente.contato" required>
                </div>

                <div class="dado">
                    <label for="email">Email:</label>
                    <input type="email" id="email" v-model="cliente.email" required>
                </div>
            </div>

            <div id="metade">
                
                <div class="dado">
                    <label for="sizeComp">Tamanho da empresa:</label>
                    <select id="sizeComp">
                        <option value="pequena">Até 100 funcionarios</option>
                        <option value="media">101 a 250 funcionarios</option>
                        <option value="grande">Mais de 251 funcionarios</option>
                    </select>
                </div>
                
                <div class="dado">
                    <label for="endereco">Endereço:</label>
                    <input type="text" id="endereco" v-model="cliente.endereco" required>
                </div>

                <div class="dado">
                    <label for="site">Site:</label>
                    <input type="text" id="site" v-model="cliente.site" required>
                </div>
                
            </div>

            <button id="confirm" type="submit">Cadastrar</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            cliente: {
                nome: '',
                cnpj: '',
                nFuncionarios: 0,
                contato: '',
                endereco: '',
                site: '',
                email: ''
            }
        };
    },
    methods: {
        submitForm() {
            // Lógica para enviar o formulário
            console.log(this.cliente);
        }
    }
};
</script>

<style >

    @import '../assets/baseForm.css';

    label{
        padding-right: 1vw;
    }

    form{
        display: grid;
        grid-template-columns: 1fr 1fr;
    }

    #metade{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        padding: 1vw;
    }
    
    .dado{
        display: flex;
        flex-direction: row;
        justify-content:space-between;
        width: 100%;
    }



</style>