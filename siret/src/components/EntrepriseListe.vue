<script lang="ts">
import type { PropType } from 'vue'

import type Entreprise from '@/types/Entreprise'
import type ResponseData from '@/types/ResponseData'
import EntrepriseItem from '@/components/EntrepriseItem.vue'
import EntrepriseService from '@/services/EntrepriseService'

export default {
  components: {
    EntrepriseItem
  },
  data() {
    return {
      entreprises: Array<Entreprise>,
    }
  },
  methods: { 
    listeEntreprises() {
      // TODO pour mise en prod : limiter le nombre d'éléments retournés et gérer la pagination 
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
    <h1>Entreprises</h1>
  </header>

  <main>
    <div class="container">
      <div class="row align-items-start">
        <EntrepriseItem v-for="entreprise in entreprises" v-bind="entreprise"></EntrepriseItem>
      </div>
    </div>
    
  </main>
</template>

<style scoped>

</style>
