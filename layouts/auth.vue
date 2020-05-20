<template>
<v-app>
    <v-content class="indigo lighten-4">
        <nuxt />
    </v-content>
    <snackbar> </snackbar>
</v-app>
</template>

<script>
import Snackbar from '~/components/Snackbar';

export default {
    components: {
        'snackbar': Snackbar,
    },
}
</script>

<style>

</style>
