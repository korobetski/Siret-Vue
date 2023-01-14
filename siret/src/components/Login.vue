<script lang="ts">

import type ResponseData from '@/types/ResponseData'
import UserService from '@/services/UserService'

export default {
  components: {
  },
  data() {
    return {
      loginModal: false,
      email: "",
      password: "",
      password_confirmation: "",
    }
  },
  methods: {
    login() {
      this.loginModal = false;
      UserService.login(this.$data)
        .then((response: ResponseData) => {
          localStorage.username = response.data.user;
          localStorage.gravatar = response.data.gravatar;
          localStorage.token = response.data.token;
          location.reload();
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
    <v-dialog v-model="loginModal">
      <template v-slot:activator="{ props }">
        <v-btn size="x-large" block v-bind="props">
          Login
        </v-btn>
      </template>

      <v-card>
        <v-card-title>
          <span class="text-h5">Login</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field v-model="email" label="Email*" required></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-text-field v-model="password" label="Mot de Passe*" type="password" required></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <small>* = Champ requis</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="loginModal = false">
            Fermer
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="login">
            Connexion
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>

</style>
