<script lang="ts">
import type ResponseData from '@/types/ResponseData'
import EntrepriseItem from '@/components/EntrepriseItem.vue'
import EntrepriseService from '@/services/EntrepriseService'
import { EmptyEntreprise } from '@/types/Entreprise'

export default {
  components: {
    EntrepriseItem
  },
  data() {
    return {
      entreprise: EmptyEntreprise,
      canEdit: false,
      canDelete: false,
    }
  },
  methods: { 
    getEntreprise() {
      EntrepriseService.get(this.$route.params.id)
        .then((response: ResponseData) => {
          this.entreprise = response.data.datas;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.getEntreprise();
    this.canEdit = this.canDelete = (localStorage.username) ? true : false;
  },
}

</script>

<template>
  <header>
    <h1>{{ entreprise.nom }}</h1>
  </header>

  <main>
    <EntrepriseItem v-bind="entreprise" v-bind:can-edit="canEdit" v-bind:can-delete="canDelete"></EntrepriseItem>
  </main>
</template>

<style scoped>

</style>
