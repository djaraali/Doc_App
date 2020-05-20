<template>
<div class="texteditor">
    <ckeditor :editor="editor" v-model="editorData.data" :config="editorConfig"></ckeditor>
</div>
</template>

<script>
import ClassicEditor from '@/components/@ckeditor/ckeditor5-build-classic';
export default {

    props: {
        editorData: {
            type: Object
        }
    },

    data: () => ({
        editor: ClassicEditor,
        // editorData: '<p>Content of the editor.</p>',
        editorConfig: {
            // The configuration of the editor.

            height: 800,
            simpleUpload: {
                // The URL that the images are uploaded to.
                uploadUrl: 'http://localhost:4000/upload',

                // Headers sent along with the XMLHttpRequest to the upload server.
                headers: {
                    // 'X-CSRF-TOKEN': 'CSFR-Token',
                    // Authorization: 'Bearer <JSON Web Token>'
                }
            },
            mention: {
                feeds: [{
                        marker: '@',
                        feed: ['@Barney', '@Lily', '@Marshall', '@Robin', '@Ted'],
                        minimumCharacters: 1
                    },
                    {
                        marker: '#',
                        feed: ['#Barney', '#Lily', '#Marshall', '#Robin', '#Ted'],
                        minimumCharacters: 1
                    }
                ]
            }
        },
    }),
}
</script>

<style>

</style>
