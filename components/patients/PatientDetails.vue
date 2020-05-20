<template>
<!-- <v-row>
      <h1 class="title">Patient-123</h1>
      <p>Name: John Doe</p>
  </v-row> -->
<div class="patient">
    <div class="patient__details mb-8" v-if="patient">
        <p class="title">{{patient.patient.id}}</p>
        <h3 class="subtitle-1">Name: {{patient.patient.firstname}} {{patient.patient.lastname}}</h3>
        <h3 class="subtitle-1">Date Of Birth: {{calculateAge}}</h3>
        <h3 class="subtitle-1">Phone: {{patient.patient.phone}}</h3>
        <h3 class="subtitle-1">Email: {{patient.patient.email}}</h3>
        <h3 class="subtitle-1">Gender: {{patient.patient.sex}}</h3>
    </div>
    <div class="patient__appointment my-2">
        <h1 class="title heading font-weight-medium mb-3">All Appointments</h1>
    </div>
    <v-row v-if="patient">
        <v-card outlined ripple v-for="(item,i) in patient.appointments" :key="i" class="mr-3 py-3 px-2" @click.stop="openExpansion(item)">
            <v-card-title class="subtitle-1 font-weight-medium">
                {{item.date_time | moment("DD MMMM YYYY")}}
            </v-card-title>
            <v-card-text>
                <p class="mb-1">Appointment #{{i+1}}</p>
                {{item.date_time | moment("hh:mm A")}}
            </v-card-text>
        </v-card>
    </v-row>
    <v-row justify="center">
        <v-dialog v-model="dialog" scrollable max-width="900px" transition="dialog-transition" persistent="">
            <v-card>
                <v-card-title class="secondary">
                    <v-row>
                        <span class="white--text pl-4">
                            Appointment Report
                        </span>
                        <v-spacer></v-spacer>
                        <v-btn fab small color="transparent" @click.stop="close" depressed="" class="my-auto mr-3" dark="">
                            <v-icon size="30">mdi-close</v-icon>
                        </v-btn>
                    </v-row>
                </v-card-title>
                
                <v-card-text class="pt-5">
                    <v-expansion-panels accordion v-if="appointmentList" >
                        <v-expansion-panel v-if="appointmentList.consultation.details">
                            <v-expansion-panel-header>Consultation</v-expansion-panel-header>
                            <v-expansion-panel-content v-html="appointmentList.consultation.details" class="px-7">
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel v-if="appointmentList.diagnose.details">
                            <v-expansion-panel-header>Diagnose</v-expansion-panel-header>
                            <v-expansion-panel-content v-html="appointmentList.diagnose.details" class="px-7">
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel v-if="appointmentList.treatment.details">
                            <v-expansion-panel-header>Treatment</v-expansion-panel-header>
                            <v-expansion-panel-content v-html="appointmentList.treatment.details" class="px-7">
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                        <v-expansion-panel v-if="appointmentList.prescription">
                            <v-expansion-panel-header>Prescription</v-expansion-panel-header>
                            <v-expansion-panel-content class="px-7">
                                <p v-if="appointmentList && appointmentList.prescription && appointmentList.prescription.instructions && appointmentList.prescription.instructions.length > 2" class="mb-4"> <span> <b> Instructions:</b> {{ appointmentList.prescription.instructions }} </span> </p>
                                <template v-for="(med, index) in appointmentList.prescription.drugs">
                                    <prescriped-medicine :editMood="false" :index="index" :prescribed-medicine="med" :key="index"> </prescriped-medicine>
                                </template>
                            </v-expansion-panel-content>
                        </v-expansion-panel>
                    </v-expansion-panels>
                </v-card-text>

            </v-card>
        </v-dialog>
    </v-row>
</div>
</template>

<script>
import {
    mapState,
    mapActions,
    mapGetters
} from 'vuex'
import types from "~/types/index";
import PrescribedMedicine from '~/components/patients/PrescribedMedicine'

export default {
    components: {
        'prescriped-medicine': PrescribedMedicine,
    },
    data: () => ({
        dialog: false,
        patientDetails: null,
        appointmentList: null
    }),
    mounted() {
        // console.log(this.$route.params.id)
        this.getSinglePatient({
            id: this.$route.params.id
        })
        // console.log(this.patient)
    },

    computed: {
        // ...mapGetters('patients', {
        //     'getSinglePatient': types.patients.getSinglePatient
        // }),
        ...mapState('patients', ['patient']),
        calculateAge() {
            let currentDate = +new Date(Date.now())
            let birthdate = +new Date(this.patient.patient.birthdate)
            let age = currentDate - birthdate
            var ageDate = new Date(age);
            return Math.abs(ageDate.getUTCFullYear() - 1970);
        }
        // patient() {
        //     return this.getSinglePatient(this.$route.params.id);
        // }
    },
    methods: {
        ...mapActions('patients', {
            'getSinglePatient': types.patients.getSinglePatient
        }),
        openExpansion(data) {
            console.log(data)
            this.dialog = true
            this.appointmentList = data
        },
        close() {
            this.dialog = false
            this.appointmentList = null
        }
    },
    // async mounted() {
    //     //   this.getPatients();
    //     //   console.log(this.$route.params.id)
    //       if (this.$route.params.id) {
    //         if (this.patients.length == 0) await this.getPatients();

    //       }
    // },
}
</script>

<style>

</style>
