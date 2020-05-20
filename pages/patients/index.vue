<template>
<v-container>
    <page-title :title="title" :icon="icon"></page-title>
    <patients-table :headers="headers" :patients="patients"></patients-table>
</v-container>
</template>

<script>
import PageTitle from '~/components/ui/PageTitle'
import PatientsTable from '~/components/patients/PatientsTable'
export default {
    head: {
        title: 'Patient List'
    },
    components: {
        'page-title': PageTitle,
        'patients-table': PatientsTable
    },
    data: () => ({
        title: 'Patient List',
        icon: '$patient',
        headers: [
            {
                text: 'Patient ID',
                align: 'start',
                value: 'id',
            },
            {
                text: 'Full Name',
                value: 'name'
            },
            
            
            {
                text: 'Action',
                value: 'action',
                sortable: false
            },
        ],
        patients: [{
                time: "10:00AM",
                id: '120',
                name: 'John Doe',
                email: 'john.doe@hotmail.com',
                phone: '1234567890',
                lastAppointment: '12 April,2020. 10:00AM'

            },
            {
                time: "11:00AM",
                id: '123',
                name: 'Jane Doe',
                email: 'jane@hotmail.com',
                phone: '1234567890',
                lastAppointment: '12 April,2020. 10:00AM'
                

            },
            {
                time: "12:00PM",
                id: '124',
                name: 'Chris Hamsworth',
                email: 'chris@hotmail.com',
                phone: '1234567890',
                lastAppointment: '17 April,2020. 1:00PM'

            },
            {
                time: "1:00PM",
                id: '125',
                name: 'Peter parker',
                email: 'peter@hotmail.com',
                phone: '1234567890',
                lastAppointment: '13 April,2020. 4:00PM'

            },
            {
                time: "3:00PM",
                id: '126',
                name: 'Mary Jane',
                email: 'mary@hotmail.com',
                phone: '1234567890',
                lastAppointment: '15 April,2020. 10:00AM'

            },
            {
                time: "4:00PM",
                id: '127',
                name: 'John Doe',
                email: 'john.doe@hotmail.com',
                phone: '1234567890',
                lastAppointment: '01 April,2020. 11:00AM'

            },
        ]
    })
}
</script>

<style>

</style>
