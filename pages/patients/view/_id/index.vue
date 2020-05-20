<template>
<div class="patient-details">
    <page-title :title="title" :icon="icon"></page-title>
    <patient-details></patient-details>
</div>
</template>

<script>
import PageTitle from '~/components/ui/PageTitle'
import PatientDetails from '~/components/patients/PatientDetails'
export default {
    head: {
        title: 'Patient Detail'
    },
    components: {
        'page-title': PageTitle,
        'patient-details': PatientDetails
    },
    data: () => ({
        title: 'Patient Details',
        icon: 'mdi-home',
    }),
    // mounted() {
    //     console.log(this.$route.params.id)
    // }
    
    
}
</script>

<style>

</style>
