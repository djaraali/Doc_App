<template>
    <v-layout>
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <div class="d-flex mb-3">
                        <v-combobox
                            v-model="defaultSentence"
                            :items="sentenceList"
                            :search-input.sync="search"
                            hide-selected
                            label="Add default sentense"
                            :hide-no-data="true"
                            :clearable="true"
                            hide-details="auto"
                            persistent-hint
                            open-on-clear
                            dense
                            outlined
                            ref="addSentenceEl"
                            @keyup.enter="addSentence"
                            @blur="onBlur"
                            >
                            <template v-slot:no-data>
                                <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        No Data
                                    </v-list-item-title>
                                </v-list-item-content>
                            </v-list-item>
                        </template>
                    </v-combobox>

                        <v-btn depressed outlined color="secondary" class="ml-3 mr-3" @click.stop="addSentence">Add</v-btn>
                        <v-btn depressed outlined @click.stop="addAndSaveSentence" color="secondary">Add & Save</v-btn>
                    </div>
                    <!-- <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor> -->
                    <text-editor :editorData="editorData"></text-editor>
                </v-col>

        </v-row>
        <div class="text-right">
            <v-btn class="ma-2 mr-0" @click.stop="saveTOLibrary" outlined color="secondary"> Save to library </v-btn>
        </div>
    </v-container>
    <savelibrary-modal :function="addTreatment" :details="editorData.data" @close="saveToLibDialog = false" :dialog="saveToLibDialog"> </savelibrary-modal>
</v-layout>
</template>

<script>
import Form from '~/components/patient/Form';
import TextEditor from '~/components/ui/TextEditor'
import SaveLibraryModal from '~/components/patient/SaveLibraryModal';
import { mapActions, mapState } from 'vuex';
import types from "~/types/index";

export default {
    components: {
        'patient-form': Form,
        'savelibrary-modal': SaveLibraryModal,
        'text-editor': TextEditor
    },

    data: () => ({
        editorData: {
            data: '<p>  Hello </p>' 
        },
        saveToLibDialog: false,
        defaultSentence: '',
        search: null,
    }),

    methods: {
        ...mapActions('sentences', {
            addNewSentence: types.sentences.addNewSentence,
            getSentencesList: types.sentences.getSentencesList,
        }),
        ...mapActions('library', {
	        addTreatment: types.library.addTreatment,
            updateTreatment: types.library.updateTreatment
        }),
        
        ...mapActions('appointments', {
            setSaveAbleData: types.appointments.setSaveAbleData,
        }),

        addSentence() {
            setTimeout(() => {
                if (this.defaultSentence) {
                    this.editorData.data += `<p> ${this.defaultSentence} </p>`
                    this.defaultSentence = '';
                    this.$refs.addSentenceEl.blur()
                }
            }, 50);
            
        },
        addAndSaveSentence() {
            setTimeout(() => {
                if (this.defaultSentence) {
                    this.editorData.data += `<p> ${this.defaultSentence} </p>`
                    this.addNewSentence({
                        sentence: this.defaultSentence
                    })
                    this.defaultSentence = '';
                    this.$refs.addSentenceEl.blur()
                }
            }, 50);
        },
        onInput(e) {
            console.log(e)
        },
        onBlur(e) {
            console.log(this.defaultSentence)
        },
        saveTOLibrary() {
            this.saveToLibDialog = true;
        }
    },

    computed: {
        ...mapState('sentences', ['sentences']),
        ...mapState('appointments', ['getData', 'appointment']),
        ...mapState('library', ['onGetFromLibrary', 'libraryData']),
        ...mapState('image-uploader', ['treatmentDrawingImg']),
        sentenceList() {
            let list = [];
            if (this.sentences) {
                this.sentences.map(sen => {
                    list.push(sen.sentence)
                })
            }
            return list;
        }
    },

    watch: {
        model(val) {
            if (val.length > 5) {
                this.$nextTick(() => this.model.pop())
            }
        },
        getData(v) {
            let payload = {};
            payload.id = this.appointment.treatment._id;
            payload.data = { details: this.editorData.data, library: false, category: '', name: '' }
            this.setSaveAbleData( { tab: 'treatment', mainData: payload })
        },
        appointment(v) {
            if (v && v.treatment && v.treatment.details ) {
                this.editorData.data = v.treatment.details;
            }
        },
        onGetFromLibrary(v) {
            if (this.libraryData && this.libraryData.type === 'Treatment') {
                setTimeout(() => {
                    this.editorData.data = this.libraryData.details;
                }, 200)
            }
        },
        treatmentDrawingImg(v) {
            if (v) {
                this.editorData.data += `<img src="${v}"></p>`
            }
        }

    },

    mounted() {
        this.getSentencesList()
        setTimeout(() => {
            if (this.appointment && this.appointment.treatment && this.appointment.treatment.details) {
                this.editorData.data = this.appointment.treatment.details
            }
        }, 200)
    },
}
</script>

<style lang="scss" scoped>
.ac {
    width: 100%;
    height: 40px;
    border: 1px solid #c4c4c4;
    border-bottom: none;
}
</style>
