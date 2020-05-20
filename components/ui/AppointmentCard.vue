<template>
<div class="appointment">
    <div class="appointment__title mb-2">
        <h1 class="title heading font-weight-medium">Upcoming Appointment</h1>
    </div>
    <div class="appointment__list">
        <v-card elevation="2" max-width="600" class="pa-5 mb-3" ripple="" v-for="(item, i) in appointment" :key="i">
            <span class="date body-2 grey--text lighten-4">{{item.date}}, {{item.time}}</span>
            <h3 class="subtitle-1 font-weight-bold consultant">{{item.name}}</h3>
            <span class="text-right d-block mt-3 subtitle-2 grey--text lighten-1">{{item.patientName}}</span>
        </v-card>
    </div>

</div>
</template>

<script>
export default {
    props: ['appointment']
}
</script>
<style lang="scss" scoped>
.consultant {
    letter-spacing: 1px !important;
}
</style>