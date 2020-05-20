<template>
    <v-snackbar bottom v-model="snackbarStatus" :timeout="timeout" :color="snackbar.color"> 
        {{ snackbar.text }}
        <v-btn
            color="primary"
            text
            @click="snackbarStatus = false"
        >
        Close
        </v-btn>
    </v-snackbar>
</template>

<script>

import { mapState, mapActions } from 'vuex';

export default {
    data: () => ({
        timeout: 3000,
        snackbarStatus: false,
    }),

    computed: {
        ...mapState(['snackbar'])
    },

    methods: {
    },

    watch: {
        'snackbar': function(v) {
            this.snackbarStatus = true;
        }
    }
}
</script>
