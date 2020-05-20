<template>
<v-layout row>
    <v-flex>
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="medicines" :search="search" class="px-5">
                <template v-slot:item.action="{ item }">
                    <v-btn class="mr-2" small color="secondary" outlined="" @click.stop="deleteItem(item)">
                        Delete
                    </v-btn>
                    <v-btn small color="ternary" outlined="" @click.stop="edit(item)">
                        Edit
                    </v-btn>
                </template>
            </v-data-table>
        </v-card>
    </v-flex>
    <delete-dialog :delete-function="deleteFun"> </delete-dialog>
    <medicine-dialog @closeDialog="dialog = false" :medicine-type="medicineType" :dialog="dialog" :form="eiditedItem" :items="items"></medicine-dialog>
</v-layout>
</template>

<script>

import types from "~/types/index"
import { mapActions, mapState } from 'vuex'
import DeleteDialog from '~/components/DeleteDialog'
import MedicinesDialog from './MedicinesDialog'

export default {
    props: ['items', 'medicineType'],

    components: {
        'delete-dialog': DeleteDialog,
        'medicine-dialog': MedicinesDialog
    },

    data: () => ({
        search: '',
        deletedIndexs: [],
        dialog: false,
        eiditedItem: {
            medicine_name: '',
            medicine_type: '',
            strength: [],
            image: '',
        },
        headers: [{
                text: 'Medicine Name',
                align: 'left',
                value: 'medicine_name',
            },
            {
                text: 'Medicine Type',
                value: 'medicine_type',
                align: 'left',
            },
            {
                text: 'Action',
                value: 'action',
                sortable: false,
                align: 'left',
            },
        ],

    }),

    computed: {
        ...mapState('medicines', ['medicines']),
    },

    methods: {
        ...mapActions('medicines', {
            deleteMedicine: types.medicines.removeMedicine,
            getMedicineList: types.medicines.getMedicineList
        }),
        ...mapActions(['setDeleteConfirmationStatus']),
        edit(item) {
            this.dialog = true;
            this.eiditedItem = JSON.parse(JSON.stringify(item));
        },
        deleteItem(item) {
            this.deletedIndexs = [];
            this.deletedIndexs.push(item._id)
            this.setDeleteConfirmationStatus(true);
        },
        deleteFun() {
            this.deleteMedicine(this.deletedIndexs);
        },
        removeImage() {
            console.log('working')
        }

    }
}
</script>

<style>

</style>
