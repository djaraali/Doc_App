<template>
    <v-card outlined class="my-5">
        <div class="d-flex flex-no-wrap justify-space-between">
            <div class="pt-4 pl-4">
                <div>
                    <span class="title"> {{ prescribedMedicine.medicine_name }} </span> <span class="caption"> {{ prescribedMedicine.medicine_strength }} </span>
                </div>
                <div>
                    <span> <b>Dose :</b> {{ prescribedMedicine.dose }} </span>
                </div>
                <div>
                    <span> <b>Frequency :</b> {{ prescribedMedicine.frequency }} </span>
                </div>
                <div> 
                    <h4> Medicine Time: </h4>
                    <div v-for="(t, index) in prescribedMedicine.medicine_times" :key="index">
                        <div class="d-flex align-center">
                            <span class="mr-4">{{ t.time }}</span>
                            <img class="img-icon" v-if="t.day_time == 'morning'" src="/images/sunrise.svg" alt="morning">
                            <img class="img-icon" v-if="t.day_time == 'noon'" src="/images/sun.svg" alt="noon">
                            <img class="img-icon" v-if="t.day_time == 'night'" src="/images/moon.svg" alt="night">
                        </div>
                    </div>
                </div>
                <div>
                    <span> <b>Containue for :</b> {{ prescribedMedicine.duration }} </span>
                </div>
                <div>
                    <span> <b>Directon:</b> <span v-if="prescribedMedicine.beforeEat"> Before Meal</span>  <span v-else> After Meal</span>  </span>
                </div>
                <div>
                    <span> <b>Note:</b> <span> {{ prescribedMedicine.note }} </span> </span>
                </div>
            </div>

            <v-avatar class="ma-7" size="250" height="100%" tile >
                <v-img v-if="prescribedMedicine.image" :src="prescribedMedicine.image"></v-img>
                <v-img v-else :src="image"></v-img>
            </v-avatar>
        </div>
        <v-card-actions v-if="editMood">
            <!-- <v-spacer></v-spacer> -->
            <v-btn color="secondary" @click.stop="onEdit" text> Edit </v-btn>
            <v-btn color="secondary" @click.stop="onDelete" text> Delete </v-btn>
        </v-card-actions>
        <add-medicine :prescribed-medicine="editedItem" :dialog="medicineDialog" @close="onClose" @save="editMedicine" > </add-medicine>
        <delete-dialog :delete-function="deleteFun"> </delete-dialog>
    </v-card>
</template>

<script>

import AddPrescribedMedicine from "~/components/patients/AddPrescribedMedicine"
import { mapActions, mapState } from 'vuex'
import types from "~/types";
import DeleteDialog from '~/components/DeleteDialog';

export default {
    components: {
        'add-medicine': AddPrescribedMedicine,
        'delete-dialog': DeleteDialog
    },

    props: {
        prescribedMedicine: {
            type: Object
        },
        index: {
            types: Number
        },
        editMood: {
            type: Boolean,
            default: true
        }
    },

    data: () => ({
        image: '/t.jpg',
        medicineDialog: false,
        editedItem: { }
    }),

    computed: {

    },

    methods: {
        ...mapActions('library', {
            updatePrescribedMedicine: types.library.updatePrescribedMedicine,
            deletePrescribedMedicine: types.library.deletePrescribedMedicine
        }),
        ...mapActions(['setDeleteConfirmationStatus']),
        editMedicine() {
            this.updatePrescribedMedicine({ index: this.index, data: this.editedItem });
        },
        onEdit() {
            let { medicine_name,medicine_type,medicine_strength,dose,frequency,duration,beforeEat, note, image } = this.prescribedMedicine;

            let medicine_times = JSON.parse(JSON.stringify(this.prescribedMedicine.medicine_times));
            console.log(image)
            this.editedItem = { medicine_name,medicine_type,medicine_strength,dose,frequency,duration,beforeEat, note, image, medicine_times };
            console.log(this.editedItem)
            this.medicineDialog = true;
        },
        onClose() {
            this.editedItem = { };
            this.medicineDialog = false;
        },
        onDelete() {
            this.setDeleteConfirmationStatus(true);
        },
        deleteFun() {
            this.deletePrescribedMedicine(this.index);
        }
    },

}
</script>

<style lang="scss" scoped>
    .img-icon {
        width: 25px;
    }
</style>