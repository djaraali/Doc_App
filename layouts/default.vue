<template>
<v-app>
    <v-navigation-drawer v-model="drawer" :mini-variant="miniVariant" :clipped="clipped" fixed app color="primary" dark>
        <v-row justify="center" class="mt-5 mb-3">
            <v-avatar size="150" @click.stop="$router.push('/profile')" v-if="profile && profile.profile && profile.profile.profile">
                <img :src="profile.profile.profile" alt="alt">
            </v-avatar>
        </v-row>
        <v-row justify="center" class="mb-5 white--text" v-if="profile && profile.profile">
            <span class="subtitle-1 font-weight-medium">{{ profile.profile.firstname }} {{ profile.profile.lastname }}</span>
        </v-row>
        <v-list>
            <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" nuxt exact active-class="active">
                <v-list-item-action>
                    <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-action>
                <v-list-item-content>
                    <v-list-item-title class="sidebar-item-text" v-text="item.title" />
                </v-list-item-content>
            </v-list-item>
        </v-list>
        <template v-slot:append>
            <v-row justify="center" class="mb-5">
                <v-btn class="secondary px-12" @click.stop="logout">Logout</v-btn>
            </v-row>
        </template>
    </v-navigation-drawer>
    <v-app-bar :clipped-left="clipped" fixed app color="white">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
        <v-spacer></v-spacer>
        <v-badge :content="messages" :value="messages" color="secondary" overlap class="mr-8">
            <v-icon large class="topnav--text">$message</v-icon>
        </v-badge>
        <v-badge :content="messages" :value="messages" color="secondary" overlap class="mr-8">
            <v-icon large class="topnav--text">$notification</v-icon>
        </v-badge>
        <v-icon>$settings</v-icon>
    </v-app-bar>
    <v-content class="primaryLight">
        <v-container class="px-sm-5 px-md-10 py-7">
            <nuxt />
        </v-container>
    </v-content>
    <snackbar> </snackbar>
    <!-- <delete-dialog> </delete-dialog> -->
    <!-- <v-footer :fixed="fixed" app>
        <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer> -->
     
</v-app>
</template>

<script>
import Snackbar from '~/components/Snackbar';
import DeleteDialog from '~/components/DeleteDialog';
import {
    mapActions,
    mapState
} from "vuex"
import types from "~/types/index";
export default {
    middleware: ['secured'],
    components: {
        'snackbar': Snackbar,
        'delete-dialog': DeleteDialog,
    },

    data() {
        return {
            clipped: false,
            fixed: false,
            messages: '5',
            drawer: false,
            items: [

                {
                    icon: '$home',
                    title: 'Home',
                    to: '/'
                },
                {
                    icon: '$appointments',
                    title: 'Appointments',
                    to: '/appointments'
                },
                {
                    icon: '$patient',
                    title: 'Patients',
                    to: '/patients'
                },
                {
                    icon: '$library',
                    title: 'Library',
                    to: '/library'
                },
                {
                    icon: '$medicines',
                    title: 'Medicines',
                    to: '/medicines'
                },
                {
                    icon: '$sentences',
                    title: 'Sentences',
                    to: '/sentences'
                },
                {
                    icon: '$drawings',
                    title: 'Drawings',
                    to: '/gallery'
                }
            ],
            miniVariant: false,
            right: true,
            rightDrawer: false,
            title: 'Vuetify.js'
        }
    },
    computed: {
        ...mapState([
            'profile'
        ])
    },
    mounted() {
        this.getProfile()
        if (window.innerWidth > 1500) {
            this.drawer = true
        } else {
            this.drawer = false
        }
    },
    methods: {
        ...mapActions('auth', ['logout']),
        ...mapActions('profile', ['getProfile'])
    }

}
</script>

<style lang="scss">
// @import '~/assets/variables.scss';
@import '~/assets/main.scss';

.sidebar-item-text {
    font-weight: 300;
    letter-spacing: 1px;
    // font-size: 14px;
    font-family: var(--font-title);
}
</style>
