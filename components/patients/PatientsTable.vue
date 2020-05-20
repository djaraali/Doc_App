<template>
<v-layout row>
    <v-flex>
        <v-card>
            <v-card-title>
                <v-spacer></v-spacer>
                <v-text-field v-model="search" append-icon="mdi-magnify" label="Search" single-line hide-details></v-text-field>
            </v-card-title>
            <v-data-table :headers="headers" :items="patients" :search="search" class="px-5">
                <template v-slot:item.name="{ item }">
                    <span>{{item.firstname}} {{item.lastname}}</span>
                </template>
                <template v-slot:item.action="{ item }">
                    <v-btn class="mr-2" small color="secondary" outlined="" @click.stop="edit(item._id)">
                        View
                    </v-btn>
                    <!-- <v-btn small color="ternary" outlined="">
                        Change
                    </v-btn> -->
                </template>
            </v-data-table>
        </v-card>
    </v-flex>
</v-layout>
</template>

<script>
import {
    mapActions,
    mapState
} from 'vuex'
import types from "~/types/index";
export default {
    props: ['headers'],
    data: () => ({
        search: '',
    }),
    mounted() {
        this.getPatients()
    },
    computed: {
        ...mapState('patients', ['patients'])
    },
    methods: {
        ...mapActions('patients', {
            'getPatients': types.patients.getPatients
        }),
        edit(id, data) {
            this.$router.push('/patients/view/' + id);
        }
    }
}
</script>

<style>

</style>
