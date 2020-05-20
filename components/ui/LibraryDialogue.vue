<template>
<div class="">
    
    <v-dialog v-model="dialog" scrollable persistent max-width="900px" transition="dialog-transition">
        
    </v-dialog>
</div>
</template>

<script>
import ClassicEditor from '@/components/@ckeditor/ckeditor5-build-classic';
export default {
    data: () => ({
        dialog: false,
        editor: ClassicEditor,
        editorData: '<p>Content of the editor.</p>',
        editorConfig: {
            // The configuration of the editor.
            // height: 800,
        },
    })
}
</script>

<style>

</style>
