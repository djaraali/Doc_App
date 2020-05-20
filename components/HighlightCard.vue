<template>
<v-card class="mr-2 ml-1 pt-2 px-2">
    <v-card-title>
        <v-icon left color="primary">
            mdi-clock-outline
        </v-icon>
        <span color="primary" class="card__time"> {{overview.date_time | moment("dddd, hh:mm A")}} </span>
    </v-card-title>
    <v-card-text>
        <p class="card__patient mb-1"> {{overview.patient.id}} </p>
        <h2 class="card__desc"> Sex: {{overview.patient.sex}} </h2>
        <h2 class="card__desc"> Age: {{calculateAge}} </h2>
    </v-card-text>
    <v-divider></v-divider>
    <v-card-actions>
        <v-btn @click="navigate" small text>view</v-btn>
        <v-btn small text @click="showChangeAppointmentModal">change</v-btn>
    </v-card-actions>
    <change-appointment @closeModal="closeModal" :cng-app-modal="showChangeAppointment" :appointmentId="overview._id"> </change-appointment>
</v-card>
</template>

<script>
import ChangeAppointment from '~/components/appointment/ChangeAppointment';

export default {
    props: ["overview"],
    components: {
        'change-appointment': ChangeAppointment,
    },

    data: () => ({
        showChangeAppointment: false
    }),
    mounted() {
        console.log(this.overview._id)
    },

    computed: {
        calculateAge() {
            let currentDate = + new Date(Date.now())
            let birthdate = + new Date(this.overview.patient.birthdate)
            let age = currentDate - birthdate
            var ageDate = new Date(age);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
    },

    methods: {
        showChangeAppointmentModal() {
            this.showChangeAppointment = true;
        },
        closeModal() {
            this.showChangeAppointment = false;
        },
        navigate() {
            this.$router.push('/appointments/'+ this.overview._id)
        },
    }
}
</script>

<style lang="scss" scoped>
.card {
    &__time {
        // color: black;
        font-weight: 700;
        font-family: var(--font-title);
        font-size: 14px;
    }

    &__patient {
        font-weight: 700;
        letter-spacing: 1px;
    }

    &__desc {
        font-size: 14px;
        font-weight: 400;
    }
}
</style>
