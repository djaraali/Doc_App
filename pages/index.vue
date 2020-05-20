<template>
    <v-container>
        <v-layout column>
            <v-row class="mb-5 mt-2 px-4">
                <page-title :title="title" :icon="icon"></page-title>
                <v-spacer></v-spacer>
                <v-btn color="secondary" outlined medium class="" to="/appointments">View All Appointments</v-btn>
            </v-row>
            <v-row class="mb-2">
                <highlights> </highlights>
            </v-row>
        </v-layout>
    </v-container>
</template>

<script>
import PageTitle from '~/components/ui/PageTitle';
import Highlights from '~/components/Highlights';

export default {
    components: {
        'page-title': PageTitle,
        'highlights': Highlights

    },

    data: () => ({
        title: 'Upcoming Appointment',
        icon: '$appointments'
    }),
}
</script>
