<template>
<v-row align="center" class="mb-5">
    <v-icon large>{{icon}}</v-icon>
    <span class="headline ml-4 font-weight-medium">{{title}}</span>
</v-row>
</template>

<script>
export default {
    props: ['icon', 'title']
}
</script>

<style>

</style>
