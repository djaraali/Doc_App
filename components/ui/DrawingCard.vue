<template>
<v-dialog v-model="drawingDialog" scrollable max-width="750px" transition="dialog-transition" persistent="">
    <v-card>
        <v-card-title class="secondary">
            <v-row>
                <span class="white--text pl-4">
                    Add Drawings
                </span>
                <v-spacer></v-spacer>

                <v-btn fab small color="transparent" @click.stop="close" depressed="" class="my-auto mr-3" dark="">
                    <v-icon size="30">mdi-close</v-icon>
                </v-btn>

            </v-row>

        </v-card-title>
        <v-card-text>
            <v-tabs v-model="tab" background-color="transparent" color="basil" grow>
                <v-tab>
                    Add Drawings
                </v-tab>
                <v-tab>
                    Drawings List
                </v-tab>
            </v-tabs>
            <v-tabs-items v-model="tab">
                <v-tab-item>

                    <v-container>

                        <v-row justify="center">
                            <drawing-page :onUpload="onUpload"></drawing-page>
                        </v-row>
                    </v-container>

                    <!-- <v-btn color="success" v-if="showImport" block="">Import</v-btn> -->
                </v-tab-item>
                <v-tab-item>

                    <v-row justify="center">
                        <v-col v-for="(image, index) in drawings" :key="index" cols="4" sm="4" class="ma-1">
                            <v-img :src="image.url" :class="{'active-img': selectedIndex == index}" class="images" @click.stop="activeImage(index, image)"></v-img>
                        </v-col>
                    </v-row>

                </v-tab-item>

            </v-tabs-items>
        </v-card-text>

        <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="secondary" depressed class="mr-8" @click.stop="importImage">Import</v-btn>
        </v-card-actions>
    </v-card>
</v-dialog>
</template>

<script>
// import Editor from 'vue-image-markup';
import {
    mapActions,
    mapState,
    mapMutations
} from 'vuex'
import types from "~/types/index";
const imageUploader = types.imageUploader;
import Drawings from './Drawings'
export default {
    props: ['showImport', 'drawings'],
    components: {
        'drawing-page': Drawings
    },
    data: () => ({
        drawingDialog: false,
        tab: null,
        selectedImage: null,
        selectedIndex: null,
        onUpload: 0,
    }),
    computed: {
        ...mapState(["showDrawingCard"]),
        ...mapState('library', ['activeTab']),
    },
    methods: {
        ...mapActions(["showDrawing"]),
        ...mapMutations('image-uploader', {
            setImageUrl: imageUploader.SET_DRAWING_LINK
        }),
        close() {
            this.showDrawing(!this.showDrawingCard)
        },
        activeImage(i, data) {
            this.selectedIndex = i
            this.selectImage = data

        },
        importImage() {
            if(this.tab == 0) {
                this.onUpload = Math.random() * 100;
            } else if (this.selectImage && this.selectImage.url) {
                this.setImageUrl({
                    url: this.selectImage.url,
                    active_tab: this.activeTab.toLowerCase()
                });
            }
            this.close()
        }
    },
    watch: {
        showDrawingCard: function (v) {
            this.drawingDialog = v;
        }
    }
    // props: ['showImport', 'drawings'],
    // data: () => ({
    //     drawing: true,
    //     drawingDialog: false,
    //     canvasWidth: "700",
    //     canvasHeight: "600",
    //     tab: null,
    //     textModeOptions: {
    //         fill: 'red',
    //         fontFamily: 'Roboto',
    //         fontSize: 16,
    //         placeholder: 'Type something'
    //     },
    //     strokeWidth: 1,
    //     colorPicker: '',
    //     mode: 'freeDrawing',
    // }),
    // components: {
    //     // Editor
    // },
    // computed: {
    //     ...mapState(["showDrawingCard"]),
    //     options() {
    //         return {
    //             stroke: this.colorPicker,
    //             strokeWidth: this.strokeWidth,
    //         }
    //     }
    // },
    // methods: {
    //     ...mapActions(["showDrawing"]),
    //     ...mapActions('image-uploader', {
    //         'uploadDrawing': types.imageUploader.uploadDrawing
    //     }),
    //     onText() {
    //         // this.$refs.editor.set('text', this.textModeOptions);
    //     },
    //     close() {
    //         this.showDrawing(!this.showDrawingCard)
    //     },
    //     processFile(e) {
    //         this.$refs.editor.uploadImage(e)
    //     },
    //     applyCrop() {
    //         this.$refs.editor.applyCropping();
    //     },
    //     onSave() {
    //         let x = this.$refs.editor.saveImage()
    //         fetch(x)
    //             .then(res => res.blob())
    //             .then(blb => {
    //                 if (blb) {
    //                     let formData = new FormData()
    //                     formData.append('file', blb, "genesys.png")
    //                     this.uploadDrawing(formData)
    //                 }
    //             })
    //     }
    // },
    // mounted() {
    //     // this.$refs.editor.set(this.mode, this.options);
    //     // this.$refs.editor.set('circle')
    //     var self = this;
    //     console.log('Hello ', this.$refs)
    //     this.$nextTick(() => {
    //         console.log('Hello ', self.$refs)
    //         setTimeout(() => {
    //             // self.$refs.editor.set(this.mode, this.options);
    //             console.log('Hello ', self.$refs)
    //         }, 3* 1000)
    //     })
    // },
    // watch: {
    //     strokeWidth: function (v) {
    //         console.log('Hello ', this.$refs)
    //         this.$refs.editor.set(this.mode, this.options)
    //     },
    //     mode: function (v) {
    //         this.$refs.editor.set(this.mode, this.options)
    //     },
    //     colorPicker: function (v) {
    //         this.$refs.editor.set(this.mode, this.options)
    //     },
    //     showDrawingCard: function (v) {
    //         this.drawingDialog = v;
    //     }
    // }

}
</script>

<style lang="scss" scoped>
.images {
    border: 1px solid rgba($color: #000000, $alpha: 0.15);
}

.active-img {
    border: 1px solid rgba($color: #7c4dff, $alpha: 0.8);
}
</style>
