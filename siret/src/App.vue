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
    }
  },
  methods: { 
    listeEntreprises() {
      EntrepriseService.getAll()
        .then((response: ResponseData) => {
          this.entreprises = response.data.datas;
          console.log(this.entreprises);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.listeEntreprises();
  },
}

</script>

<template>
  <header>
    <h1>Base de données entreprises</h1>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link class="nav-link" to="/">Liste</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/ajout">Ajout</router-link>
          </li>
        </ul>
      </div>
    </nav>
  </header>
  
  <router-view></router-view>
</template>

<style scoped>

</style>
