<template>
  <!-- <div class="">
      <page-title :title="title" :icon="icon"></page-title> 
      
  </div> -->
  <v-container grid-list-xs>
      <v-row class="mx-2">
          <page-title :title="title" :icon="icon"></page-title> 
      </v-row>
      
      <library-add></library-add>
  </v-container>
</template>

<script>
import PageTitle from '~/components/ui/PageTitle'
import LibraryAdd from '~/components/library/LibraryAdd'

export default {
    head: {
        title: 'Library'
    },
    components: {
        'page-title': PageTitle,
        'library-add': LibraryAdd
    },
    data: () => ({
        title: 'Add New Library',
        icon: '$library',
    }),
}
</script>

<style>

</style>