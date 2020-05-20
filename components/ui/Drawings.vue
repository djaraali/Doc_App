<template>
<div>
    <v-row class="mb-5">
        <v-card>
            <v-card-actions>

                <v-menu offset-y nudge-bottom="10">
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small color="transparent" v-on="on">
                            <v-icon :color="colorPicker">mdi-checkbox-blank</v-icon>
                        </v-btn>

                    </template>
                    <v-color-picker class="ma-2 elevation-0" canvas-height="300" v-model="colorPicker"></v-color-picker>

                </v-menu>
                <v-btn depressed small color="transparent" @click.stop="$refs.editor.undo">
                    <v-icon>mdi-rotate-left</v-icon>
                </v-btn>
                <v-btn depressed small color="transparent" @click.stop="$refs.editor.redo">
                    <v-icon>mdi-rotate-right</v-icon>
                </v-btn>
                <v-btn depressed small color="transparent" @click.stop="$refs.editor.clear">
                    <v-icon>mdi-delete</v-icon>
                </v-btn>
                <!-- <v-btn depressed small color="transparent" @click.stop="mode ='freeDrawing'">
                    <v-icon>mdi-pencil</v-icon>
                </v-btn> -->
                <v-menu offset-y="" min-width="300" nudge-bottom="10">
                    <template v-slot:activator="{ on }">
                        <v-btn depressed small color="transparent" v-on="on">
                            <v-icon>mdi-pencil</v-icon>
                        </v-btn>

                    </template>
                    <v-row class="px-3 pt-6">
                        <v-col cols="12">
                            <v-slider v-model="strokeWidth" min="0" max="50" thumb-label></v-slider>
                        </v-col>
                    </v-row>

                </v-menu>
                <v-btn depressed small color="transparent" @click.stop="onText">
                    <v-icon size="30">mdi-alpha-a</v-icon>
                </v-btn>
                <v-btn depressed small color="transparent" @click.stop="mode ='circle'">
                    <v-icon>mdi-checkbox-blank-circle-outline</v-icon>
                </v-btn>
                <v-btn depressed small color="transparent" @click.stop="mode ='rect'">
                    <v-icon>mdi-checkbox-blank-outline</v-icon>
                </v-btn>
                <v-btn depressed small color="transparent" @click.stop="mode ='arrow'">
                    <v-icon>mdi-arrow-down</v-icon>
                </v-btn>
                <v-btn depressed small color="transparent" @click.stop="$refs.editor.set('selectMode')">
                    <v-icon>mdi-arrow-all</v-icon>
                </v-btn>
                <v-btn depressed small color="transparent" @click.stop="$refs.editor.set('crop')">
                    <v-icon>mdi-crop</v-icon>
                </v-btn>
                <v-btn class="text-none" depressed small color="transparent" @click.stop="$refs.uploader.click">
                    <v-icon>mdi-file-upload</v-icon>
                    <input ref="uploader" class="d-none" type="file" @change="processFile($event)">
                </v-btn>
                <v-btn depressed small color="transparent" @click.stop="onSave">
                    <v-icon>mdi-content-save</v-icon>
                </v-btn>

            </v-card-actions>
        </v-card>
    </v-row>
    <v-row>
        <Editor :canvasWidth="canvasWidth" :canvasHeight="canvasHeight" ref="editor" />
    </v-row>

</div>
</template>

<script>
import Editor from 'vue-image-markup';
import {
    mapActions,
    mapState
} from 'vuex'
import types from "~/types/index";
export default {
    props: ['onUpload'],
    data: () => ({
        canvasWidth: "700",
        canvasHeight: "600",
        textModeOptions: {
            fill: 'red',
            fontFamily: 'Roboto',
            fontSize: 16,
            placeholder: 'Type something'
        },
        strokeWidth: 1,
        colorPicker: '',
        mode: 'freeDrawing'
    }),
    components: {
        Editor
    },
    computed: {
        ...mapState('library', ['activeTab']),
        options() {
            return {
                stroke: this.colorPicker,
                strokeWidth: this.strokeWidth,
            }
        }
    },
    methods: {
        ...mapActions('image-uploader', {
            'uploadDrawing': types.imageUploader.uploadDrawing
        }),
        onText() {
            try {
                this.$refs.editor.set('text', {
                    fill: 'red',
                    fontStyle: 'normal',
                    fontFamily: 'Roboto',
                    fontSize: 16,
                });
            } catch (e) {
                console.log(e)
            }
        },
        processFile(e) {
            this.$refs.editor.uploadImage(e)
        },
        applyCrop() {
            this.$refs.editor.applyCropping();
        },
        onSave() {
            let x = this.$refs.editor.saveImage()
            fetch(x)
                .then(res => res.blob())
                .then(blb => {
                    if (blb) {
                        let formData = new FormData()
                        formData.append('file', blb, "drawing-image.png")
                        console.log(this.activeTab)
                        this.uploadDrawing({
                            formData,
                            activeTab: this.activeTab
                        })
                    }
                })
        },
        atImport() {
            this.onSave();
        }
        // async uploadDrawing(payload) {
        //     try {
        //         this.$store.dispatch("start", this.uploadLoading, {
        //             root: true
        //         });
        //         let f = await this.$axios.$post(`/drawings`, payload);
        //         let newFile = f.url;
        //         this.$store.dispatch("handleSuccess", {
        //             text: "Successfully saved!"
        //         }, {
        //             root: true
        //         });

        //     } catch (e) {
        //         this.$store.dispatch("handleErrors", e, {
        //             root: true
        //         });
        //     } finally {
        //         this.$store.dispatch("end", this.uploadLoading, {
        //             root: true
        //         });
        //     }
        // },
    },
    mounted() {
        this.$refs.editor.set(this.mode, this.options);
        // this.$refs.editor.set('circle')
    },
    watch: {
        strokeWidth: function (v) {
            // console.log(v)
            this.$refs.editor.set(this.mode, this.options)
        },
        mode: function (v) {
            this.$refs.editor.set(this.mode, this.options)
        },
        colorPicker: function (v) {
            this.$refs.editor.set(this.mode, this.options)
        },
        onUpload: function() {
            this.atImport();
        }
    }
}
</script>

<style>

</style>
