<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <v-textarea
                    outlined
                    name="input-7-4"
                    label="Instructions"
                    hide-details="auto"
                    v-model="instructions"
                ></v-textarea>
            </v-col>
        </v-row>
        <v-btn class="mx-2 ml-0" dark depressed="" color="secondary" @click.stop="onAddMedcine">
            <v-icon dark>mdi-plus</v-icon>
            <span> Add New Medicine </span>
        </v-btn>
        <template v-for="(med, index) in prescribedMedicineList" >
            <prescriped-medicine :index="index" :prescribed-medicine="med"  :key="index"> </prescriped-medicine>
        </template>
        <div class="text-right">
            <v-btn class="ma-2 mr-0" @click.stop="saveTOLibrary" outlined color="secondary"> Save to library </v-btn>
        </div>
         <savelibrary-modal :function="addPrescription" type="prescription" :prescription-data="prescriptionData"  @close="saveToLibDialog = false" :dialog="saveToLibDialog"> </savelibrary-modal>
        <add-medicine :prescribed-medicine="prescribedMedicine" :dialog="medicineDialog" @close="medicineDialog = false" @save="addMedicine" > </add-medicine>
    </v-container>
</template>

<script>

import Form from '~/components/patient/Form'
import { mapActions, mapState } from 'vuex'
import types from "~/types/index"
import ImageUpload from '~/components/ui/ImageUpload'
import PrescribedMedicine from '~/components/patients/PrescribedMedicine'
import SaveLibraryModal from '~/components/patient/SaveLibraryModal'
import AddPrescribedMedicine from "~/components/patients/AddPrescribedMedicine";


export default {
    components: {
        'patient-form': Form,
        'prescriped-medicine': PrescribedMedicine,
        'savelibrary-modal': SaveLibraryModal,
        'add-medicine': AddPrescribedMedicine
    },

    data: () => ({
        saveToLibDialog: false,
        medicineDialog: false,

        instructions: '',

        prescribedMedicine: {
            medicine_name: '',
            medicine_type: '',
            medicine_strength: '',
            dose: '',
            frequency: '',
            duration: '',
            beforeEat: true,
            image: '',
            note: '',
            medicine_times: []
        },

        prescriptionData: {
            drugs: [],
            instructions: '',
        },
    }),

    computed: {
        ...mapState('library', ['prescribedMedicineList', 'onGetFromLibrary', 'libraryData']),
        ...mapState('appointments', ['getData', 'appointment'])
    },

    methods: {
        ...mapActions('library', {
            addPrescription: types.library.addPrescription,
            addPrescribedMedicine: types.library.addPrescribedMedicine,
            clearPrescribedMedicineList: types.library.clearPrescribedMedicine,
            setPrescribedMedicineList: types.library.setPrescribedMedicineList,
            updatePrescription: types.library.updatePrescription

        }),
        ...mapActions('appointments', {
            setSaveAbleData: types.appointments.setSaveAbleData,
        }),
        addMedicine() {
            console.log(this.prescribedMedicine);
            let med = JSON.parse(JSON.stringify(this.prescribedMedicine));
            this.addPrescribedMedicine(med);
        },
        clearPrescribedMedicine() {
            this.prescribedMedicine.medicine_name = '';
            this.prescribedMedicine.medicine_type = '';
            this.prescribedMedicine.medicine_strength = '';
            this.prescribedMedicine.dose = '';
            this.prescribedMedicine.frequency = '';
            this.prescribedMedicine.duration = '';
            this.prescribedMedicine.beforeEat = true;
            this.prescribedMedicine.image = '';
            this.prescribedMedicine.note = '';
        },
        saveTOLibrary() {
            this.saveToLibDialog = true;
            this.prescriptionData.drugs =  JSON.parse(JSON.stringify(this.prescribedMedicineList));
            this.prescriptionData.instructions = this.instructions;
        },
        onAddMedcine() {
            this.medicineDialog = true;
            this.clearPrescribedMedicine();
        }
    },

    watch: {
        getData(v) {
            let payload = {};
            payload.id = this.appointment.prescription._id;
            payload.data = { drugs: JSON.parse(JSON.stringify(this.prescribedMedicineList)), instructions: this.instructions, library: false, category: '', name: '' }
            this.setSaveAbleData( { tab: 'prescription', mainData: payload })
        },
        appointment(v) {
            if (v && v.prescription && v.prescription.drugs) {
                this.setPrescribedMedicineList(JSON.parse(JSON.stringify(v.prescription.drugs)))
            }
           
            if (v && v.prescription && v.prescription.instructions) {
                this.instructions = v.prescription.instructions
            }
        },
        onGetFromLibrary(v) {
            if (this.libraryData && this.libraryData.type === 'Prescription') {
                if (this.libraryData.drugs.length > 0) {
                    this.setPrescribedMedicineList(JSON.parse(JSON.stringify(this.libraryData.drugs)));
                }
                if (this.libraryData.instructions) {
                    this.instructions = this.libraryData.instructions;
                }
            }
        }
    },

    mounted() {
        this.clearPrescribedMedicineList();
        if (this.appointment && this.appointment.prescription && this.appointment.prescription.drugs) {
            this.setPrescribedMedicineList(JSON.parse(JSON.stringify(this.appointment.prescription.drugs)))
        }
        if (this.appointment && this.appointment.prescription && this.appointment.prescription.instructions) {
           this.instructions = this.appointment.prescription.instructions
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
