<template>
<v-layout row>
    <v-flex>
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="appointments" :search="search" class="px-5">
                <template v-slot:item.date="{ item }">
                    <span>{{item.date_time | moment('hh: mm A')}}</span>
                </template>
                <template v-slot:item.name="{ item }">
                    <span>{{item.patient.firstname}} {{item.patient.lastname}}</span>
                </template>
                <template v-slot:item.action>
                    <v-btn class="mr-2" small color="secondary" outlined="">
                        View
                    </v-btn>
                    <!-- <v-btn small color="ternary" outlined="">
                        Change
                    </v-btn> -->
                </template>
            </v-data-table>
        </v-card>
    </v-flex>
    <!-- <change-appointment @closeModal="closeModal" :cng-app-modal="showChangeAppointment"> </change-appointment> -->
</v-layout>
</template>

<script>

import ChangeAppointment from '~/components/appointment/ChangeAppointment';

export default {
    components: {
        'change-appointment': ChangeAppointment,
    },

    props: ['headers', 'appointments'],

    data: () => ({
        search: '',
        showChangeAppointment: false
    }),

    methods: {
        navigate() {
            this.$router.push('/appointments/123')
        },

        showChangeAppointmentModal() {
            this.showChangeAppointment = true;
        },

        closeModal() {
            this.showChangeAppointment = false;
        },
    }
}
</script>

<style>

</style>
