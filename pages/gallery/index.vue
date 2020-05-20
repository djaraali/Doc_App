<template>
<v-container fluid>
    <v-row justify="end">
        <v-btn class="mx-2 mr-0" dark depressed="" color="primary" @click.stop="openDrawing">
            <v-icon dark>mdi-plus</v-icon>
            <span> Add a Drawing</span>
        </v-btn>
    </v-row>
    <v-row>
        <v-col v-for="(image, index) in drawings" :key="index" cols="6" sm="4">
            <v-img :src="image.url"></v-img>
        </v-col>
    </v-row>
    
    <drawing-dialog :showImport="showImport"></drawing-dialog>
</v-container>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex'
import DrawingCard from '~/components/ui/DrawingCard'
export default {
    data: () => ({
        drawing: false,
        showImport: false
    }),
    components: {
        'drawing-dialog': DrawingCard
    },
    computed: {
        ...mapState(['drawings', 'showDrawingCard'])
    },

    methods: {
        ...mapActions(['getDrawings', 'showDrawing']),
        openDrawing() {
            this.showDrawing(!this.showDrawingCard)
        }
        // ...mapActions(["showDrawing"]),
    },

    mounted() {
        this.getDrawings();
    }
}
</script>

<style scoped>
.bottom-gradient {
    background-image: linear-gradient(to top, rgba(0, 0, 0, 0.4) 0%, transparent 72px);
}

.repeating-gradient {
    background-image: repeating-linear-gradient(-45deg,
            rgba(255, 0, 0, .25),
            rgba(255, 0, 0, .25) 5px,
            rgba(0, 0, 255, .25) 5px,
            rgba(0, 0, 255, .25) 10px);
}
</style>
