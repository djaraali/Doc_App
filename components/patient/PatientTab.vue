<template>
<v-container>
    <v-row class="mb-5 headline">
        <span>
            Previous Reports
        </span>
    </v-row>
    <v-row v-if="patient">
        <v-card ripple v-for="(item,i) in getPreviousReports" :key="i" class="mr-3" @click.stop="openExpansionDialog(item)">
            <v-card-title class="subtitle-1 font-weight-medium">
                {{item.date_time | moment("DD MMMM YYYY")}}
            </v-card-title>
            <v-card-text>
                <p class="mb-1">Appointment #{{i+1}}</p>
                {{item.date_time | moment("hh:mm A")}}
            </v-card-text>
        </v-card>
    </v-row>
    <v-row>
        <v-col cols="12">
            <div class="text-right mb-5">
                <v-btn v-if="tab != 3" class="mx-2 mr-0" dark depressed="" color="primary" @click.stop="openDialog">
                    <v-icon dark>mdi-plus</v-icon>
                    <span> Add a Drawing</span>
                </v-btn>
                <v-btn class="mx-2 mr-0" dark depressed="" color="secondary" @click.stop="dialog= true">
                    <v-icon dark>mdi-plus</v-icon>
                    <span> Add from Library </span>
                </v-btn>
            </div>

            <v-dialog v-model="dialog" scrollable max-width="900px" transition="dialog-transition">
                <v-card>
                    <v-card-title class="blue-grey lighten-3 px-3 fixed">

                        <v-row>
                            <!-- <v-card-title class="white--text">
                                    Library
                                </v-card-title> -->
                            <span class="white--text pl-4">
                                Library
                            </span>
                            <v-spacer></v-spacer>
                            <v-btn fab small color="transparent" @click.stop="dialog= false" depressed="" class="my-auto mr-3" dark="">
                                <v-icon size="30">mdi-close</v-icon>
                            </v-btn>

                        </v-row>

                    </v-card-title>
                    <v-container>
                        <v-row>
                            <v-col>
                                <library-list :deleteShow="false"></library-list>
                            </v-col>

                        </v-row>
                    </v-container>

                    <v-divider></v-divider>

                    <v-container class="fixed">
                        <v-row class="px-4">
                            <v-spacer></v-spacer>
                            <v-btn @click.stop="uploadFromLibrary" color="secondary" depressed="">Upload</v-btn>
                        </v-row>
                    </v-container>
                </v-card>
            </v-dialog>
            <!-- <v-row justify="center">
                <v-dialog v-model="dialog" width="600px">
                    <template v-slot:activator="{ on }">
                        <v-btn class="mx-2" dark color="#2C3248" v-on="on">
                            <v-icon dark>mdi-plus</v-icon>
                            <span> Add from Library </span>
                        </v-btn>
                    </template>
                    <v-card>

                    </v-card>
                </v-dialog>
            </v-row> -->
            <v-card>
                <v-tabs v-model="tab" dark background-color="primary" grow>
                    <v-tab v-for="item in items" :key="item">
                        {{ item }}
                    </v-tab>
                    <v-tabs-slider color="ternary"></v-tabs-slider>
                </v-tabs>

                <v-tabs-items v-model="tab">
                    <v-tab-item v-for="item in items" :key="item">
                        <v-card flat>
                            <v-card-text>
                                <consultation v-if="item === 'Consultation'"> </consultation>
                                <diagnosis v-if="item === 'Diagnose'"> </diagnosis>
                                <treatment v-if="item === 'Treatment'"> </treatment>
                                <prescription v-if="item === 'Prescription'"> </prescription>
                            </v-card-text>
                        </v-card>
                    </v-tab-item>
                </v-tabs-items>
            </v-card>
            <div class="text-right mt-5 mr-0">
                <v-btn @click.stop="saveAndPrint" large class="ma-1 px-10" dark depressed color="ternary"> Save & Print </v-btn>
                <v-btn large class="ma-1 px-10 mr-0" dark depressed color="secondary">Save & Email </v-btn>
            </div>
            <div class="d-none">
                <div id="printme" class="d-none">
                    <div v-html="print.consultation"></div>
                </div>
            </div>

        </v-col>
    </v-row>
    <v-row justify="center">
        <v-dialog v-model="appointmentDialog" scrollable max-width="900px" transition="dialog-transition" persistent="">
            <v-card>
                <v-card-title class="secondary">
                    <v-row>
                        <span class="white--text pl-4">
                            Appointment Report
                        </span>
                        <v-spacer></v-spacer>
                        <v-btn fab small color="transparent" @click.stop="closeAppoinmentDialog" depressed="" class="my-auto mr-3" dark="">
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
    <drawing-dialog :showImport="showImport" :drawings="drawings"></drawing-dialog>
</v-container>
</template>

<script>
import Consultation from '~/components/patient/Consultation'
import Diagnosis from '~/components/patient/Diagnosis'
import Treatment from '~/components/patient/Treatment'
import Prescription from '~/components/patient/Prescription'
import LibraryList from '~/components/library/LibraryList'
import DrawingCard from '~/components/ui/DrawingCard'
import PrescribedMedicine from '~/components/patients/PrescribedMedicine'
import {
    mapActions,
    mapState
} from 'vuex';
import types from "~/types/index";
import * as appointments from "~/types/appointments";

export default {
    props: ['appointmentData'],

    components: {
        'consultation': Consultation,
        'diagnosis': Diagnosis,
        'treatment': Treatment,
        'prescription': Prescription,
        'library-list': LibraryList,
        'drawing-dialog': DrawingCard,
        'prescriped-medicine': PrescribedMedicine,
    },

    data: () => ({
        tab: 0,
        dialog: false,
        appointmentDialog: false,
        drawing: false,
        showImport: true,
        items: [
            'Consultation', 'Diagnose', 'Treatment', 'Prescription',
        ],
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
        appointmentList: null,
        print: {
            consultation: '<p>Hallo test test 🔙⇡ ⇣ Rapidiously cultivate client-focused customer service with client-centric relationships. Objectively build multifunctional manufactured products for customer directed experiences. Quickly harness virtual systems for mission-critical human capital. Monotonectally revolutionize 2.0 imperatives with client-focused process improvements. Globally incubate interoperable communities for timely quality vectors.</p><p>Distinctively innovate diverse users with intuitive information. Rapidiously exploit extensible niche markets before optimal convergence. Monotonectally empower world-class platforms vis-a-vis B2B bandwidth. Interactively orchestrate world-class web services with mission-critical convergence. Credibly whiteboard orthogonal strategic theme areas and resource-leveling niches.</p><p>Globally revolutionize robust supply chains without fully tested resources. Synergistically recaptiualize unique strategic theme areas via cross-platform portals. Efficiently engage maintainable schemas whereas distributed.</p><p>&nbsp;</p><p>&nbsp;</p><figure class="image"><img src="http://http://localhost:4000/static/1589225755559.png"></figure><p>&nbsp;</p>'
        },

    }),
    computed: {
        ...mapState(["showDrawingCard", "drawings"]),
        ...mapState('appointments', ["saveAbleData", "appointment"]),
        ...mapState('patients', ['patient']),
        getPreviousReports() {
            if(this.patient && this.patient.appointments) {
                return this.patient.appointments.filter(item => {
                    if(item._id !== this.appointment._id) return item;
                })
            }
            return [];
        }
    },
    methods: {
        ...mapActions(["showDrawing", "getDrawings"]),
        ...mapActions('patients', {
            'getSinglePatient': types.patients.getSinglePatient
        }),
        ...mapActions('appointments', {
            getAppData: types.appointments.getAppData,
            setSaveAbleData: types.appointments.setSaveAbleData,
        }),
        ...mapActions('library', {
            setActiveTab: types.library.setActiveTab,
            setOnGetFromLibrary: types.library.setOnGetFromLibrary,
            updateConsultation: types.library.updateConsultation,
            updateDiagnose: types.library.updateDiagnose,
            updateTreatment: types.library.updateTreatment,
            updatePrescription: types.library.updatePrescription
        }),
        async saveAndPrint() {
            try {
                console.log('Save and print', '')
                await this.getAppData();

                let updateConsultation = this.updateConsultation(this.saveAbleData.consultation);
                let updateDiagnose = this.updateDiagnose(this.saveAbleData.diagnose)
                let updateTreatment = this.updateTreatment(this.saveAbleData.treatment)
                let updatePrescription = this.updatePrescription(this.saveAbleData.prescription)

                let r = await Promise.all([updateConsultation, updateDiagnose, updateTreatment, updatePrescription])
                if(r[0]) this.print.consultation = r[0].details;
                console.log(this.print.consultation)
                // this.$htmlToPaper('printme');
                console.log('r', r)
            } catch (e) {
                console.log('e', e)
            }
        },
        openExpansionDialog(data) {
            console.log(data)
            this.appointmentDialog = true
            this.appointmentList = data
        },
        closeAppoinmentDialog() {
            this.appointmentDialog = false
        },
        uploadFromLibrary() {
            this.setOnGetFromLibrary();
            this.dialog = false;
        },
        openDialog() {
            this.showDrawing(!this.showDrawingCard)
        },

        setData(type) {
            console.log(type)
            let {
                details,
                library,
                category,
                name,
                _id
            } = this.appointment[type];
            let payload = {};
            payload.id = _id;
            payload.data = {
                details,
                library,
                category,
                name
            }
            this.setSaveAbleData({
                tab: type,
                mainData: payload
            })
        }
    },

    watch: {
        tab(v) {
            if (v == 0) {
                this.setActiveTab('Consultation')
            } else if (v == 1) {
                this.setActiveTab('Diagnose')
            } else if (v == 2) {
                this.setActiveTab('Treatment')
            } else {
                this.setActiveTab('Prescription')
            }
        },
        appointment(v) {
            if (v) {
                console.log(v.patient._id);
                if (v.patient && v.patient._id) {
                    this.getSinglePatient({
                        id: v.patient._id
                    })
                }
                if (v.consultation) {
                    this.setData('consultation')
                }

                if (v.diagnose) {
                    this.setData('diagnose')
                }

                if (v.treatment) {
                    this.setData('treatment')
                }
                if (v.prescription) {
                    let payload = {};
                    payload.id = v.prescription._id;
                    payload.data = {
                        drugs: JSON.parse(JSON.stringify(v.prescription.drugs)),
                        instructions: v.prescription.instructions,
                        library: v.prescription.library,
                        category: v.prescription.category,
                        name: v.prescription.name
                    }
                    this.setSaveAbleData({
                        tab: 'prescription',
                        mainData: payload
                    })
                }
            }
        }
    },

    mounted() {
        this.setActiveTab('Consultation');
        this.getDrawings()

        if (this.appointment) {
            if (this.appointment.consultation) {
                this.setData('consultation')
            }

            if (this.appointment.diagnose) {
                this.setData('diagnose')
            }

            if (this.appointment.treatment) {
                this.setData('treatment')
            }
            if (this.appointment.prescription) {
                let payload = {};
                payload.id = this.appointment.prescription._id;
                payload.data = {
                    drugs: JSON.parse(JSON.stringify(this.appointment.prescription.drugs)),
                    instructions: this.appointment.prescription.instructions,
                    library: this.appointment.prescription.library,
                    category: this.appointment.prescription.category,
                    name: this.appointment.prescription.name
                }
                this.setSaveAbleData({
                    tab: 'prescription',
                    mainData: payload
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
