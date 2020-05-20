<template>
<v-layout>
    <v-container fluid>
        <v-row>
            <v-col cols="12">
                <text-editor :editorData="editorData"></text-editor>
            </v-col>
        </v-row>
        <div class="text-right">
            <v-btn class="ma-2 mr-0" outlined color="secondary" @click="saveTOLibrary"> Save to library </v-btn>
        </div>
    </v-container>
    <consultation-modal :function="addConsultation" :details="editorData.data" @close="conDialog = false" :dialog="conDialog"> </consultation-modal>
</v-layout>
</template>

<script>
import Form from '~/components/patient/Form';
import ConsultationSaveModal from '~/components/patient/SaveLibraryModal';
import TextEditor from '~/components/ui/TextEditor'
import {
    mapState,
    mapActions
} from 'vuex'
import types from "~/types/index";

export default {
    components: {
        'patient-form': Form,
        'consultation-modal': ConsultationSaveModal,
        'text-editor': TextEditor
    },

    data: () => ({
        editorData: {
            data: '<p> This is content </p>'
        },
        conDialog: false
    }),

    computed: {
        ...mapState('appointments', ['getData', 'appointment']),
        ...mapState('library', ['onGetFromLibrary', 'libraryData']),
        ...mapState('image-uploader', ['consultationDrawingImg']),
    },

    methods: {
        ...mapActions('library', {
            addConsultation: types.library.addConsultation,
            updateConsultation: types.library.updateConsultation
        }),
        ...mapActions('appointments', {
            setSaveAbleData: types.appointments.setSaveAbleData,
        }),

        saveTOLibrary() {
            this.conDialog = true;
        }
    },

    watch: {
        getData(v) {
            let payload = {};
            payload.id = this.appointment.consultation._id;
            payload.data = {
                details: this.editorData.data,
                library: false,
                category: '',
                name: ''
            }
            this.setSaveAbleData( { tab: 'consultation', mainData: payload })
        },
        appointment(v) {
            if (v && v.consultation && v.consultation.details) {
                this.editorData.data = v.consultation.details;
            }
        },
        onGetFromLibrary(v) {
            if (this.libraryData && this.libraryData.type === 'Consultation') {
                setTimeout(() => {
                    this.editorData.data = this.libraryData.details;
                }, 200)
            }
        },
        consultationDrawingImg(v) {
             if (v) {
                this.editorData.data += `<img src="${v}"></p>`
            }
        }

    }
}
</script>

<style lang="scss" scoped>

</style>
