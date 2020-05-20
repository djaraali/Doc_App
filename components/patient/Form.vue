<template>
    <v-container fluid>
        <v-row>
            <v-col cols="12"> 
                <text-editor :editorData="editorData"></text-editor>
            </v-col>
        </v-row>
        <div class="text-right">
            <v-btn class="ma-2" outlined color="secondary"> Save to library </v-btn>
        </div>
    </v-container>
</template>

<script>

import TextEditor from '~/components/ui/TextEditor'

export default {
    components: {
        'text-editor': TextEditor
    },
    data: () => ({
        editorData: '<p>Content of the editor.</p>',
        
    })
}
</script>

<style lang="scss" scoped>

</style>