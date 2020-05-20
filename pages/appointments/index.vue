<template>
<v-container>
    <page-title :title="title" :icon="icon"></page-title>
    <v-layout row class="mb-5">
        <v-flex>
            <v-date-picker v-model="date" full-width :landscape="$vuetify.breakpoint.smAndUp" class="mt-4" color="primary"></v-date-picker>
        </v-flex>
    </v-layout>
    <appointment-table :headers="headers" :appointments="appointmentList"></appointment-table>
</v-container>
</template>

<script>
// import ClassicEditor from '@/components/@ckeditor/ckeditor5-build-classic';
import AppointmentTable from '~/components/appointment/AppointmentTable'
import PageTitle from '~/components/ui/PageTitle'
import {
    mapActions,
    mapState
} from 'vuex'
import types from "~/types/index";
export default {
    components: {
        'appointment-table': AppointmentTable,
        'page-title': PageTitle,
    },
    data: () => ({
        title: 'Appointment List',
        icon: '$appointments',
        date: new Date().toISOString().substr(0, 10),
        // editor: ClassicEditor,
        // editorData: '<p>Content of the editor.</p>',
        // editorConfig: {
        //     // The configuration of the editor.
        // },
        headers: [{
                text: 'Schedule',
                value: 'date',
            },
            {
                text: 'ID',
                align: 'start',
                value: 'patient.id',
            },
            {
                text: 'Name',
                value: 'name'
            },
            {
                text: 'Gender',
                value: 'patient.sex'
            },
            //   { text: 'Change', value: 'change' },
            {
                text: 'Action',
                value: 'action',
                sortable: false,
                width: '200px'
            },

        ],
        //     appointments: [{
        //             time: "10:00AM",
        //             id: '120',
        //             name: 'John Doe',
        //             age: '50',
        //             gender: 'male',

        //         },
        //         {
        //             time: "11:00AM",
        //             id: '123',
        //             name: 'Jane Doe',
        //             age: '50',
        //             gender: 'female',

        //         },
        //         {
        //             time: "12:00PM",
        //             id: '124',
        //             name: 'Chris Hamsworth',
        //             age: '50',
        //             gender: 'male',

        //         },
        //         {
        //             time: "1:00PM",
        //             id: '125',
        //             name: 'Peter parker',
        //             age: '50',
        //             gender: 'male',

        //         },
        //         {
        //             time: "3:00PM",
        //             id: '126',
        //             name: 'Mary Jane',
        //             age: '50',
        //             gender: 'female',

        //         },
        //         {
        //             time: "4:00PM",
        //             id: '127',
        //             name: 'John Doe',
        //             age: '50',
        //             gender: 'male',

        //         },
        //     ]
    }),
    mounted() {
        this.getAppointmentList(+new Date(this.date))
        console.log(this.appointmentList)
    },
    computed: {
        ...mapState('appointments', ['appointmentList'])
    },
    methods: {
        ...mapActions('appointments', {
            'getAppointmentList': types.appointments.getAppointmentList
        }),
    },
    watch: {
        date: function () {
            
            this.getAppointmentList(+new Date(this.date))
            console.log(this.appointmentList)
        }
    }
}
</script>

<style lang="scss" scoped>

</style>
