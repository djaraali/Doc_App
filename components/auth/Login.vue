<template>
<v-container fill-height fluid>
    <v-row align="center" justify="center">
        <v-card width="700" color="primary" dark class="pa-5 py-12 py-sm-11 pa-sm-5 pa-md-12 ma-5">
            <v-card-title class="pa-0 mb-8">
                Login To Your Account
            </v-card-title>
            <v-card-text class="">
                <v-row class="mb-3">
                    <v-text-field v-model="form.email" label="Username Or Email" placeholder="Username Or Email"></v-text-field>
                </v-row>
                <v-row class="">
                    <v-text-field v-model="form.password" label="Password" placeholder="Password" type="password"></v-text-field>
                </v-row>
            </v-card-text>
            <v-card-actions class="pa-0">
                <v-btn block :loading="$wait.is('login')" :disabled="$wait.is('login')" color="secondary" depressed @click.stop="submit">Login</v-btn>
            </v-card-actions>
        </v-card>
    </v-row>
</v-container>
</template>

<script>
export default {
    props: ['form'],
    methods: {
        submit() {
            this.$emit('submit')
        }
    }
}
</script>

<style>

</style>
