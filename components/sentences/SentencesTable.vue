
<template>
    <v-layout row> 
        <v-flex>
            <v-card> 
                <v-card-title> 
                    <v-btn v-if="selected.length > 0" icon color="red" @click.stop="deleteItem(null)"> <v-icon> mdi-delete </v-icon>  </v-btn>
                    <v-spacer> </v-spacer>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details="auto"
                    ></v-text-field>
                </v-card-title>

                <v-data-table
                    v-model="selected"
                    :headers="headers"
                    :items="sentences"
                    :single-select="false"
                    :search="search"
                    item-key="sentence"
                    show-select
                    class="elevation-1 px-5">

                    <template v-slot:item.actions="{ item }">
                        <v-icon
                            small
                            class="mr-2"
                            @click="editItem(item)">
                            mdi-pencil
                        </v-icon>
                        <v-icon
                            small
                            @click="deleteItem(item)">
                            mdi-delete
                        </v-icon>
                    </template>

                    <template v-slot:top>  
                        <v-dialog v-model="dialog" max-width="500px"> 
                            <v-card> 
                                <v-card-title> 
                                    <span class="headline">{{ formTitle }}</span>
                                </v-card-title>

                                <v-card-text> 
                                    <v-container> 
                                        <v-col cols="12">
                                            <v-textarea
                                                v-model="editedItem.sentence"
                                                auto-grow
                                                outlined
                                                rows="5"
                                                row-height="45"
                                            ></v-textarea>
                                        </v-col>
                                    </v-container>
                                </v-card-text>
                                <v-card-actions>
                                    <v-spacer></v-spacer>
                                    <v-btn color="blue darken-1" text @click="close">Cancel</v-btn>
                                    <v-btn color="blue darken-1" text @click.stop="save">Save</v-btn>
                                </v-card-actions>
                            </v-card>
                        </v-dialog>
                    </template>
                </v-data-table>
                <delete-dialog :delete-function="deleteFun"> </delete-dialog>
            </v-card>
        </v-flex>
    </v-layout>
</template>

<script>

import { mapState, mapActions } from 'vuex'
import types from "~/types/index";
import DeleteDialog from '~/components/DeleteDialog';

export default {
    components: {
        'delete-dialog': DeleteDialog
    },

    data: () => ({
        singleSelect: false,
        editedIndex: -1,
        deletedIndexs: [],
        editedItem: {
            id: '',
            sentence: ''
        },
        selected: [],
        search: '',
        dialog: false,
        formTitle: 'Edit Sentense',
        headers: [
            {
                text: 'Sentences',
                align: 'start',
                sortable: false,
                value: 'sentence',
            },
            { text: 'Actions', value: 'actions', sortable: false },
        ],
        
        
    }),
    mounted() {
        this.getSentencesList()
    },
    methods: {
        ...mapActions('sentences', {
            getSentencesList: types.sentences.getSentencesList,
            updateSentense: types.sentences.updateSentense,
            deleteSentense: types.sentences.removeSentence,
        }),
        ...mapActions(['setDeleteConfirmationStatus']),
        editItem (item) {
            this.editedIndex = item._id;
            this.editedItem = Object.assign({}, item);
            this.dialog = true;
        },
        close() {
            this.dialog = false;
            this.editedIndex = -1;
            this.selected = []
        },
        save() {
            if (this.editedIndex != -1) {
                let payload = {};
                payload.sentence = this.editedItem.sentence;                      
                this.updateSentense({
                    id: this.editedItem._id,
                    data: payload
                });
            }
            this.close();
        },
        deleteItem(item) {
            this.deletedIndexs = [];
            if (item) {
                this.deletedIndexs.push(item._id);
            }
            console.log(this.selected)
            if (this.selected.length > 0) {
                this.selected.map(slItm => {
                    this.deletedIndexs.push(slItm._id);
                });
            }
            this.setDeleteConfirmationStatus(true);
        },
        deleteFun() {
            this.deleteSentense(this.deletedIndexs);
            this.selected = [];
        }
    },

    computed: {
        ...mapState('sentences',['sentences'])
    }
}
</script>