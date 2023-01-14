<script lang="ts">

import Login from '@/components/Login.vue'
import Register from '@/components/Register.vue'
import EntrepriseAjout from '@/components/EntrepriseAjout.vue'

export default {
    data: () => ({
        drawer: null,
        username: "",
        gravatar: "",
        token: "",
        loggedIn: false
    }),
    methods: {
        getUser() {
            this.username = (localStorage.username) ? localStorage.username : "";
            this.gravatar = (localStorage.gravatar) ? localStorage.gravatar : "https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?d=identicon&f=y";
            this.token = (localStorage.token) ? localStorage.token : "";
            this.loggedIn = (localStorage.username);
        },
        logout() {
            localStorage.clear();
            this.username = this.gravatar = this.token = "";
            this.loggedIn = false;
            location.reload();
        },
    },
    mounted() {
        this.getUser();
    },
}
</script>

<template>
    <v-app id="inspire">
        <v-navigation-drawer v-if="username != ''" v-model="drawer">
            <v-sheet color="grey-lighten-4" class="pa-4">
                <v-avatar class="mb-4" size="64">
                    <v-img :src="gravatar" :alt="username"></v-img>
                </v-avatar>
                <div>{{ username }}</div>
            </v-sheet>
            <v-divider></v-divider>
            <v-list>
                <v-list-item>
                    <v-btn block @click="logout">Déconnexion</v-btn>
                </v-list-item>
                <v-list-item>
                    <EntrepriseAjout v-bind:can-create="loggedIn"></EntrepriseAjout>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-navigation-drawer v-else v-model="drawer">
            <v-sheet color="grey-lighten-4" class="pa-4">
                <v-avatar class="mb-4" color="grey-darken-1" size="48">
                    <v-img :src="gravatar" alt="John Doe"></v-img>
                </v-avatar>
                <div class="d-inline ml-4">Invité</div>
                <v-spacer></v-spacer>
                <v-alert text="Inscription requise pour modifier les données." type="info"></v-alert>
            </v-sheet>
            <v-divider></v-divider>
            <v-list>
                <v-list-item>
                    <Login></Login>
                </v-list-item>
                <v-list-item>
                    <Register></Register>
                </v-list-item>
            </v-list>
        </v-navigation-drawer>
        <v-main>
            <v-container class="px-6" fluid>
                <default-bar />
                <default-view />
            </v-container>
        </v-main>
    </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from './AppBar.vue'
import DefaultView from './View.vue'
</script>