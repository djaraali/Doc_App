<template>
    <v-layout>
        <v-container fluid>
            <v-row>
                <v-col cols="12">
                    <!-- <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor> -->
                    <text-editor :editorData="editorData"></text-editor>
                </v-col>
            </v-row>
            <div class="text-right">
                <v-btn class="ma-2 mr-0" outlined color="secondary" @click="saveTOLibrary"> Save to library </v-btn>
            </div>
        </v-container>
        <savelibrary-modal :function="addDiagnose" :details="editorData.data" @close="saveToLibDialog = false" :dialog="saveToLibDialog"> </savelibrary-modal>
    </v-layout>
</template>

<script>

import Form from '~/components/patient/Form';
import SaveLibraryModal from '~/components/patient/SaveLibraryModal';
import TextEditor from '~/components/ui/TextEditor'
import { mapState, mapActions } from 'vuex'
import types from "~/types/index";


export default {
    components: {
        'patient-form': Form,
        'savelibrary-modal': SaveLibraryModal,
        'text-editor': TextEditor
    },

    data: () => ({
        // editor: ClassicEditor,
        editorData: {
            data: '<p> Data </p>'
        },
        // editorConfig: {
        //     // The configuration of the editor.
        //     height: 800,
        // },
        test: '',

        saveToLibDialog: false
    }),

    computed: {
        ...mapState('appointments', ['getData', 'appointment']),
        ...mapState('library', ['onGetFromLibrary', 'libraryData']),
        ...mapState('image-uploader', ['diagnoseDrawingImg']),
    },

    methods: {
        ...mapActions('library', {
	        addDiagnose: types.library.addDiagnose,
            updateDiagnose: types.library.updateDiagnose
        }),
        ...mapActions('appointments', {
            setSaveAbleData: types.appointments.setSaveAbleData,
        }),
        saveTOLibrary() {
            this.saveToLibDialog = true;
        }
    },

    watch: {
        getData(v) {
            let payload = {};
            payload.id = this.appointment.diagnose._id;
            payload.data = { details: this.editorData.data, library: false, category: '', name: '' }
            this.setSaveAbleData( { tab: 'diagnose', mainData: payload })
        },
        appointment(v) {
            if (v && v.diagnose && v.diagnose.details ) {
                this.editorData.data = v.diagnose.details;
            }
        },
        onGetFromLibrary(v) {
            if (this.libraryData && this.libraryData.type === 'Diagnose') {
                setTimeout(() => {
                    this.editorData.data = this.libraryData.details;
                }, 200)
            }
        },
        diagnoseDrawingImg(v) {
             if (v) {
                this.editorData.data += `<img src="${v}"></p>`
            }
        }
    },

    mounted() {
        setTimeout(() => {
            if (this.appointment && this.appointment.diagnose && this.appointment.diagnose.details) {
                this.editorData.data = this.appointment.diagnose.details
            }
        }, 200)
    }

}
</script>

<style lang="scss" scoped>

</style>
