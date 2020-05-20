<template>
<v-row justify="center">
    <v-dialog v-model="cngAppModal" persistent max-width="600px">
        <v-card>
            <v-card-title>
                <span class="headline">Change Appointment</span>
            </v-card-title>
            <v-card-text>
                <v-container>
                    <v-row>
                        <v-col cols="12" sm="6">
                            <v-menu ref="menu" v-model="menu2" :close-on-content-click="false" :nudge-right="40" :return-value.sync="time" transition="scale-transition" offset-y max-width="290px" min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="time" label="Appointment Time" prepend-icon="access_time" readonly v-on="on"></v-text-field>
                                </template>
                                <v-time-picker v-if="menu2" v-model="time" full-width @click:minute="$refs.menu.save(time)"></v-time-picker>
                            </v-menu>
                        </v-col>
                        <v-col cols="12" sm="6">
                            <v-menu v-model="menu3" :close-on-content-click="false" :nudge-right="40" transition="scale-transition" offset-y min-width="290px">
                                <template v-slot:activator="{ on }">
                                    <v-text-field v-model="date" label="Appointment Date" prepend-icon="event" readonly v-on="on"></v-text-field>
                                </template>
                                <v-date-picker v-model="date" @input="menu3 = false"></v-date-picker>
                            </v-menu>
                        </v-col>
                    </v-row>
                </v-container>
            </v-card-text>
            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeModal">Close</v-btn>
                <v-btn color="blue darken-1" text @click="save">Save</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</v-row>
</template>

<script>
import { mapActions } from 'vuex'
import types from "~/types/index";
export default {
    props: {
        cngAppModal: {
            type: Boolean
        },
        appointmentId: {
            type: String
        }
    },

    data: () => ({
        dialog: true,
        time: null,
        menu2: false,
        menu3: false,
        modal2: false,
        date: '',
        menu: false,
        modal: false,
        menu2: false,
    }),

    methods: {
        ...mapActions('appointments', {
            'changeAppointmentDate': types.appointments.changeAppointmentDate
        }),
        closeModal() {
            this.$emit('closeModal')
        },
        save() {
            var date = new Date(this.date + ' ' + this.time); 
            date = +new Date(date)
            this.changeAppointmentDate({
                id: this.appointmentId,
                data: date
            })
            this.$emit('closeModal')
        }
    },

}
</script>
