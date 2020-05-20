<template>
<v-container>
    <page-title :title="title" :icon="icon"></page-title>
    <create-sentence> </create-sentence>
    <sentences-table> </sentences-table>
</v-container>
</template>

<script>
import PageTitle from '~/components/ui/PageTitle';
import SentencesTable from '~/components/sentences/SentencesTable';
import CreateSentence from '~/components/sentences/CreateSentence';


export default {
    components: {
        'page-title': PageTitle,
        'sentences-table': SentencesTable,
        'create-sentence': CreateSentence
    },

    data: () => ({
        title: 'Sentence List',
        icon: '$sentences',
        
    }),
    methods: {
        
    }
}
</script>

<style lang="scss" scoped>

</style>
