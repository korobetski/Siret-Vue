<script lang="ts">

import type ResponseData from '@/types/ResponseData'
import UserService from '@/services/UserService'

export default {
  components: {
  },
  data() {
    return {
      registerModal: false,
      name: "",
      email: "",
      password: "",
      password_confirmation: "",
    }
  },
  methods: {
    register() {
      UserService.register(this.$data)
        .then((response: ResponseData) => {
            localStorage.username = response.data.user;
            localStorage.gravatar = response.data.gravatar;
            localStorage.token = response.data.token;
            this.$router.push('/').then(() => { this.$router.go(0) });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }
}
</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="registerModal">
      <template v-slot:activator="{ props }">
        <v-btn size="x-large" block v-bind="props">
          Inscription
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">Inscription</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="name" label="Nom*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="email" label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="password" label="Mot de Passe*" type="password" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="password_confirmation" label="Confirmation du Mot de Passe*" type="password"
                  required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>* = Champ requis</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="registerModal = false">
            Fermer
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="register">
            Connexion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>

</style>
