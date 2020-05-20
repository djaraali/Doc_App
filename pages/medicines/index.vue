<template>
<v-container>
    <page-title :title="title" :icon="icon"></page-title>
    <medicine-create :medicine-type="medicineType"  :items="items"></medicine-create>

    <medicines-table :medicine-type="medicineType" :items="items"> </medicines-table>
</v-container>
</template>

<script>
import types from "~/types/index";
import MedicineCreate from '~/components/medical/MedicineCreate';
import PageTitle from '~/components/ui/PageTitle';
import MedicinesTable from '~/components/medicines/MedicinesTable';
import { mapState, mapActions } from 'vuex';

export default {
    head: {
        title: 'medicines'
    },
    components: {
        'medicine-create': MedicineCreate,
        'page-title': PageTitle,
        'medicines-table': MedicinesTable
    },
    data: () => ({
        title: 'Medicines',
        icon: '$medicines',
        items: [{
                header: 'Select an option or create one'
            },
            '200mg',
            '500mg',
        ],
        medicineType: ['Tablet', 'Liquid', 'Capsules', 'Drops', 'Injection', 'Suppositories', 'Inhalers']
    }),
    methods: {
        ...mapActions('medicines', {
            getMedicineList: types.medicines.getMedicineList
        }),
        submit() {
            console.log(this.form)
        }
    },
    mounted() {
        this.getMedicineList();
    }
}
</script>

<style>

</style>
