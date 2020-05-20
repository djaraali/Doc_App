<template>
    <v-container>
        <v-layout>
            <v-row justify="space-between">
                <v-col xs="4" sm="4" md="3" lg="2">
                    <v-select
                        @change="chnagePatient"
                        v-model="selectedPatient"
                        :items="patientList"
                        item-text="id"
                        item-value="value"
                        label="Patient id"
                        outlined
                        dense
                        hide-details
                    ></v-select>
                </v-col>
                <v-col xs="2" sm="2" md="1">
                    <div class="d-flex flex-row-reverse">
                        <v-btn v-if="lastAppointment" @click.stop="nextPatient" class="mx-2" fab dark small color="#2C3248">
                            <v-icon dark>mdi-chevron-right</v-icon>
                        </v-btn>
                    </div>
                </v-col>
            </v-row>
        </v-layout>
        <patient-tab :appointment-data="appointment"> </patient-tab>
    </v-container>
</template>

<script>

import PatientTab from '~/components/patient/PatientTab'
import  { mapActions, mapState } from 'vuex'
import types from "~/types/index"

export default {
    components: {
        'patient-tab': PatientTab
    },

    data: () => ({
        selectedPatient: '',
        dialog: false,
        patientId: '',
    }),
    

    computed: {
        ...mapState('appointments', ['appointment', 'upcomingAppointments']),
        ...mapState('patients', ['patient']),
        patientList() {
            let list = [];
            if (this.upcomingAppointments && this.upcomingAppointments.length > 0) {
                list = this.upcomingAppointments.map(p => {
                    return { id: p.patient.id, value: p._id }
                })
            }
            return list;
        },
        lastAppointment() {
            let index = this.upcomingAppointments.findIndex(app => app._id == this.patientId);
            if (index === this.upcomingAppointments.length-1) return false 
            else return true;
        }
    },

    methods: {
        ...mapActions('appointments', {
            getAAppointment: types.appointments.getAAppointment,
            getUpcomingAppointment: types.appointments.getUpcomingAppointment,
        }),
       ...mapActions('patients', {
            'getSinglePatient': types.patients.getSinglePatient
        }),

        chnagePatient() {
            console.log(this.selectedPatient)
            this.$router.push(`/appointments/${this.selectedPatient}`)
        },

        nextPatient() {
            let index = this.upcomingAppointments.findIndex(app => app._id == this.patientId);
            if(this.upcomingAppointments[index+1]) {
                this.$router.push(`/appointments/${this.upcomingAppointments[index+1]._id}`)
            }
        }
    },

    watch: {
        '$route.params.id': function (v) {
            this.getAAppointment(v)
            this.getUpcomingAppointment();
        }
    },

    mounted() {
        this.patientId = this.$route.params.id;
        this.getAAppointment(this.$route.params.id)
        this.getUpcomingAppointment();
        this.selectedPatient = this.$route.params.id;
        // this.getSinglePatient({
        //     id: this.appointment.patient._id
        // })
        console.log("patient",this.selectedPatient)
    }

}
</script>

<style lang="scss" scoped>

</style>

