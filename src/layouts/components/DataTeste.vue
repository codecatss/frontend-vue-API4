<template>
    <div class="timeline">
        <v-timeline>
        <v-timeline-item
            v-for="(item, key) in data"
            :key="key"
            :reverse="key % 2 !== 0"
        >
            <template v-slot:icon>
            <v-avatar size="36">
                <v-icon color="primary">mdi-clock-time-five-outline</v-icon>
            </v-avatar>
            </template>
            <v-card>
            <v-card-title>{{ key }}</v-card-title>
            <v-card-text>{{ item.tipo }}</v-card-text>
            </v-card>
        </v-timeline-item>
        </v-timeline>
    </div>
</template>

<script>
export default {
    // props: {
    //     data: {
    //         type: Array,
    //         required: true
    //     }
    // },
    data() {
        return {
            data: {
                "Objeto 1": {
                    tipo: "Teste Array",
                    mostrar: false
                },
                "Objeto 2": {
                    tipo: "Teste String",
                    mostrar: true
                },
                "Objeto 3": {
                    tipo: "Teste Objeto",
                    mostrar: true
                },
                "Objeto 4": {
                    tipo: "Teste Array",
                    mostrar: false
                },
                "Objeto 5": {
                    tipo: "Teste String",
                    mostrar: true
                },
                "Objeto 6": {
                    tipo: "Teste Objeto",
                    mostrar: true
                },
                "Objeto 7": {
                    tipo: "Teste Array",
                    mostrar: false
                },
                "Objeto 8": {
                    tipo: "Teste String",
                    mostrar: true
                },
                "Objeto 9": {
                    tipo: "Teste Objeto",
                    mostrar: true
                },
                "Objeto 10": {
                    tipo: "Teste Array",
                    mostrar: false
                }
            }
        };
    },
    methods: {
        showDescription(description) {
            alert(description);
        }
    },
    created() {
        // this.showDescription('Página carregada!');
    },

};
</script>

<style scoped>
.timeline {
padding: 20px;
}

.v-timeline-item::before {
border-left: 2px dashed #000;
}

.v-timeline-item:first-child::before {
top: 50% !important;
}

.v-timeline-item:last-child::before {
height: 50% !important;
}

.v-card:hover {
box-shadow: 0 0 10px rgba(255, 255, 255, 1);
}
</style>

