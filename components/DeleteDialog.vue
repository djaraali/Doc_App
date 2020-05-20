<template>
    <v-dialog v-model="deleteConfirmationStatus" max-width="470"> 
        <v-card> 
            <v-card-title>Delete Confirmation</v-card-title>
            <v-card-text> 
                Are you sure you want to delete?
            </v-card-text>
            <v-card-actions class="pa-4">
                <v-spacer></v-spacer>
                <v-btn color="grey" text depressed class="px-6" small dark @click="setDeleteConfirmationStatus(false)">Cancel</v-btn>
                <v-btn color="error" depressed class="px-6" small dark @click="onDelete">Delete</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>

import { mapState, mapActions } from 'vuex'

export default {
    props: {
        deleteFunction: {
            type: Function
        }
    },
    data: () => ({
        dialog: false,

    }),

    computed: {
        ...mapState(['deleteConfirmationStatus'])
    },

    methods: {
        ...mapActions(['setDeleteConfirmationStatus']),

        onDelete() {
            this.deleteFunction();
            this.setDeleteConfirmationStatus(false)
        }
    }
}
</script>

