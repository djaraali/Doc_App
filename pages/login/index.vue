<template>
    <login-page :form="form" @submit="onSubmit"></login-page>
</template>

<script>
import Login from "~/components/auth/Login";
import { mapActions } from "vuex";
export default {
    layout: "auth",
    components: {
        "login-page": Login
    },
    data: () => ({
        form: {
            email: "",
            password: ""
        }
    }),
    methods: {
        ...mapActions("auth", ["login"]),
        onSubmit() {
            console.log(this.form);
            this.login(this.form);
        }
    }
};
</script>

<style>
</style>