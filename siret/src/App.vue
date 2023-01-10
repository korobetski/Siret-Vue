<script lang="ts">
import type { PropType } from 'vue'

import type Entreprise from './types/Entreprise'
import type ResponseData from './types/ResponseData'
import EntrepriseItem from './components/EntrepriseItem.vue'
import EntrepriseService from './services/EntrepriseService'

export default {
  components: {
    EntrepriseItem
  },
  props: {
    entreprises: {
      type: Object as PropType<Array<Entreprise>>,
      required: true
    },
  },
  data() {
    return {
      entreprises: Array<Entreprise>,
      username: "",
      gravatar: "",
      token: "",
    }
  },
  methods: { 
    listeEntreprises() {
      EntrepriseService.getAll()
        .then((response: ResponseData) => {
          this.entreprises = response.data.datas;
          //console.log(this.entreprises);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    getUser() {
      this.username = (localStorage.username) ? localStorage.username : "";
      this.gravatar = (localStorage.gravatar) ? localStorage.gravatar : "";
      this.token = (localStorage.token) ? localStorage.token : "";
    },
    logout() {
      localStorage.clear();
      this.username = this.gravatar = this.token = "";
      location.reload();
    },
  },
  mounted() {
    this.listeEntreprises();
    this.getUser();
  },
}

</script>

<template>
  <header>
    <h1>Base de données entreprises</h1>
    <nav class="navbar navbar-expand-lg navbar-light bg-light mb-3">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Liste</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="username" class="nav-link" to="/ajout">Ajout</router-link>
          </li>
        </ul>
      </div>
      <div class="container-fluid float-end">
        <div v-if="username">
          <ul class="navbar-nav">
            <li class="nav-item">
              <img :src="gravatar" alt="" />
            </li>
            <li class="nav-item">
              {{ username }}
            </li>
            <li class="nav-item">
              <button class="nav-link" @click="logout">Logout</button>
            </li>
          </ul>
        </div>
        <div v-else>
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" to="/login">Login</router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/register">Register</router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="!username" class="alert alert-info" role="alert">Enregistrez-vous pour ajouter, éditer et supprimer des entrées.</div>
  </header>
  
  <router-view></router-view>
</template>

<style scoped>

</style>
