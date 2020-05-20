<template>
    <v-layout row>
        <v-flex> 
            <v-card class="mb-4 pa-4 pt-8"> 
                <v-text-field class="mb-3 pb-0"
                    label="Add Sentence"
                    v-model="sen"
                    outlined
                    hide-details="auto"
                ></v-text-field>
                <div class="text-right">
                    <v-btn depressed :loading="$wait.is('addNewSentence')" :disabled="$wait.is('addNewSentence')" color="secondary" @click.stop="onSubmit">Add</v-btn>
                </div>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

import { mapActions } from 'vuex';
import types from "~/types/index";

export default {
    data: () => ({
        sen: ''
    }),

    methods: {
        ...mapActions('sentences', {
            addNewSentence: types.sentences.addNewSentence,
        }),
        onSubmit() {
            if (this.sen) {
                this.addNewSentence({ sentence: this.sen })
            }
            this.sen = '';
        }
    }
}
</script>