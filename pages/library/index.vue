<template>

    <v-container>
        <v-row class="mx-1">
            <v-col>
                <page-title :title="title" :icon="icon"></page-title>
            </v-col>

            <v-col class="d-flex justify-end pr-0">
                <v-btn color="secondary" outlined to="/library/add">+ Add to Library</v-btn>
            </v-col>
        </v-row>
        <library-list :dialog="dialog" :deleteShow="true"></library-list>
    </v-container>

    <!-- <library-dialogue></library-dialogue> -->


</template>

<script>

import PageTitle from '~/components/ui/PageTitle'
// import LibraryDialogue from '~/components/ui/LibraryDialogue'
import { mapActions } from  'vuex'
import LibraryList from '~/components/library/LibraryList'
import types from "~/types";

export default {
    head: {
        title: 'Library'
    },

    components: {
        'page-title': PageTitle,
        'library-list': LibraryList,
        // 'library-dialogue': LibraryDialogue
    },

    data: () => ({
        title: 'Library',
        icon: '$library',
        dialog: false,
    }),

    methods: {
        ...mapActions('library', {
            setActiveTab: types.library.setActiveTab
        }),
    },

    mounted() {
        this.setActiveTab(null)
    }
}
</script>

<style>

</style>
