<script lang="ts">

import type ResponseData from '@/types/ResponseData'
import UserService from '@/services/UserService'

export default {
  components: {
  },
  data() {
    return {
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
  <main>
    <h2>Inscription</h2>  
      <div class="form-floating mb-3">
        <input type="text" id="name" class="form-control" v-model="name"/>
        <label for="name" class="form-label">Nom</label>
      </div>
      <div class="form-floating mb-3">
        <input type="text" id="email" class="form-control" v-model="email"/>
        <label for="email" class="form-label">Adresse email</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" id="password" class="form-control" v-model="password"/>
        <label for="password" class="form-label">Mot de passe</label>
      </div>
      <div class="form-floating mb-3">
        <input type="password" id="password_confirmation" class="form-control" v-model="password_confirmation"/>
        <label for="password_confirmation" class="form-label">Confirmation</label>
      </div>
      
      <div class="form-floating mb-3">
        <button class="btn btn-primary" @click="register">Valider</button>
      </div>
  </main>
</template>

<style scoped>

</style>
