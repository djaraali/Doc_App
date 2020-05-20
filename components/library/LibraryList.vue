<template>
    <v-card>
        <v-sheet class="pa-4" color="primary">
            <v-text-field
                v-model="search"
                label="Search Medical Directory"
                dark
                flat
                solo-inverted
                hide-details
                clearable
                clear-icon="mdi-close-circle-outline"
            ></v-text-field>
        </v-sheet>
        <v-card-text>
            <v-row justify="end" class="mr-3" v-show="deleteShow">
                <v-btn
                    color="primary"
                    class="mr-4"
                    @click.stop="edit"
                    v-if="active"
                    depressed
                >Edit</v-btn>
                <v-btn
                    color="error"
                    @click.stop="deleteFromLibrary"
                    v-if="active"
                    depressed
                >Delete</v-btn>
            </v-row>
            <v-treeview :items="libraryfilter" item-key="id" :open.sync="open" activatable :active.sync="selection" :search="search" open-on-click="" transition>
                <template v-slot:prepend="{ item, open }">
                    <v-icon
                        v-if="!item.file && item.children"
                    >{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
                    <v-icon v-else>mdi-file-document-outline</v-icon>
                </template>
            </v-treeview>
        </v-card-text>
    </v-card>
</template>

<script>

import { mapActions, mapState, mapGetters } from "vuex";
import types from "@/types";

export default {
    props: ["deleteShow"],

    data: () => ({
        search: "",
        selection: [],
        selectionType: 'leaf',
        open: [],
        active: null
    }),

    computed: {
        ...mapState("library", ["library", 'activeTab']),
        ...mapGetters("library", ["getItemById"]),
        lastId() {
            if(this.library.length < 1) return 0;
            let lastItem = this.library[this.library.length - 1]
            if(lastItem.children && lastItem.children.length) {
                lastItem = lastItem.children[lastItem.children.length - 1];
                if(lastItem.children && lastItem.children.length) {
                    lastItem = lastItem.children[lastItem.children.length - 1];
                }
            }
            return lastItem.id ? lastItem.id : 0;
        },
        libraryfilter() {
            let list = [];
            if (this.activeTab && this.library && this.library.length > 0) {
                this.library.map(itm => {
                    if (itm.name === this.activeTab) {
                        list.push(itm)
                    }
                })
            } else {
                return this.library;
            }
            return list;
        }
    },

    mounted() {
        this.getLibrary();
    },

    methods: {
        ...mapActions("library", {
            getLibrary: types.library.getLibrary,
            removeConsultation: types.library.removeConsultation,
            removeTreatment: types.library.removeTreatment,
            removeDiagnose: types.library.removeDiagnose,
            addSelection: types.library.addSelection,
            setLibraryData: types.library.setLibraryData,
            setOnGetFromLibrary: types.library.setOnGetFromLibrary,

        }),
        onUpdate(selection) {
            // console.log(selection)
        },
        edit() {

            let file = this.active
            console.log(file)
            this.$router.push({path: '/library/add', query: {id: file._id, type: file.folder}})
        },
        deleteFromLibrary() {
            let file = this.active;
            if (file.folder.toLowerCase() == "consultation") {
                this.removeConsultation({
                    id: file._id
                });
            } else if (file.folder.toLowerCase() == "treatment") {
                this.removeTreatment({
                    id: file._id
                });
            } else if (file.folder.toLowerCase() == "diagnose") {
                this.removeDiagnose({
                    id: file._id
                });
            }
            this.getLibrary();
        }
    },

    watch: {
        selection: function(newValue) {
            this.onUpdate(newValue);
            this.addSelection(newValue);
            if(newValue.length)  console.log(this.getItemById(newValue[0]))
            if(newValue.length) {
                this.active = this.getItemById(newValue[0]);
                let { folder } = this.getItemById(newValue[0]);
                if (folder === 'Prescription') {
                    let { drugs, instructions } = this.getItemById(newValue[0]);
                    this.setLibraryData({ type: folder, drugs: JSON.parse(JSON.stringify(drugs)), instructions });
                } else {
                    let { details } = this.getItemById(newValue[0]);
                    this.setLibraryData({ type: folder, details });
                }
            }else {
                this.active = null
            }
        },
        search: function(v) {
            if (v.length > 0) {
                this.open = [];
                for(let i = 0; i <= this.lastId; i++) this.open.push(i)
            } else {
                this.open = [];
            }
        }
    }
};
</script>

<style>
</style>
