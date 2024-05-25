<template>
    <div class="timeline">
        <v-timeline>
        <v-timeline-item
            v-for="(item, key) in this.data"
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
                <hr>
                <v-card-text> <strong> Change By:</strong> {{ item.changeBy }}</v-card-text>
                <v-card-text> <strong> Change Type:</strong> {{ item.changeType }}</v-card-text>
                <hr>
                <v-card v-for="(info, keyInfo) in item.newValue"> 
                   <v-card-text> <strong> {{ keyInfo }}:</strong> {{ info }}</v-card-text>
                </v-card>
            </v-card>
        </v-timeline-item>
        </v-timeline>
    </div>
</template>

<script>
import { api } from '@/service/apiConfig.js';

export default {
    props: {
        tableName: {
            required: true
        },
        recordId: {
            required: true
        }
    },
    data() {
        return {
            data: {}
        };
    },
    methods: {
        async fetchData(){
            const response = await api.get('/historical/data/'+this.tableName+'-'+this.recordId)
            return response.data
        },
        async refreshData(){
            const dataFromDatabase = await this.fetchData();
            this.data = {}
            for(let key in dataFromDatabase){
                this.data[`Modificado em: ${dataFromDatabase[key]["lastChange"]}`] = {
                    newValue: JSON.parse(dataFromDatabase[key]["newValue"]),
                    changeBy: dataFromDatabase[key]["changeBy"],
                    changeType: dataFromDatabase[key]["changeType"],
                    lineName: dataFromDatabase[key]["lineName"]
                }
            }
        },
        showDescription(description) {
            alert(description);
        }
    },
    mounted() {
        this.refreshData()
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

