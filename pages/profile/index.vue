<template>

<v-container>
    <page-title :title="title" :icon="icon"></page-title>

    <profile-edit></profile-edit>
</v-container>
</template>

<script>
import PageTitle from '~/components/ui/PageTitle';
import ProfileEdit from '~/components/profile/ProfileEdit'
export default {
    head: {
        title: 'Update Profile'
    },
    components: {
        'page-title': PageTitle,
        'profile-edit': ProfileEdit
    },
    data: () => ({
        title: 'Profile',
        icon: 'mdi-account-edit-outline',
    })
}
</script>

<style>

</style>
