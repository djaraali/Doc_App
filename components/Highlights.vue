<template>
<hooper :settings="hooperSettings" class="hooper">
    <slide v-for="(overview, index) in upcomingAppointments" :key="index">
        <highlight-card :overview="overview"> </highlight-card>
    </slide>
</hooper>
</template>

<script>
import 'hooper/dist/hooper.css';
import {
    Hooper,
    Slide
} from 'hooper';
import HighlightCard from '~/components/HighlightCard';
import { mapActions, mapState } from 'vuex'
import types from "~/types/index";
export default {
    components: {
        Hooper,
        Slide,
        'highlight-card': HighlightCard
    },

    data() {
        return {
            hooperSettings: {
                itemsToShow: 1,
                centerMode: true,
                // infiniteScroll: true,
                wheelControl: true,
                trimWhiteSpace: true,
                breakpoints: {
                    560: {
                        itemsToShow: 2,
                        centerMode: false
                    },
                    800: {
                        itemsToShow: 3,
                        centerMode: false
                    },
                    1200: {
                        itemsToShow: 5,
                        centerMode: false

                    }
                }
            }
        };
    },

    computed: {
        ...mapState('appointments', ['upcomingAppointments'])
    },

    mounted() {
        this.getUpcomingAppointment()
    },

    methods: {
        ...mapActions('appointments', {
            'getUpcomingAppointment': types.appointments.getUpcomingAppointment
        }),
    }
}
</script>

<style lang="scss" scoped>
.hooper {
    height: 240px;
}
</style>
