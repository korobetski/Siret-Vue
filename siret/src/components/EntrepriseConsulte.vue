<script lang="ts">
import type ResponseData from '@/types/ResponseData'
import EntrepriseItem from '@/components/EntrepriseItem.vue'
import EntrepriseService from '@/services/EntrepriseService'

export default {
  components: {
    EntrepriseItem
  },
  data() {
    return {
      entreprise: null,
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
  },
}

</script>

<template>
  <header>
    <h1>Entreprise</h1>
  </header>

  <main>
    <EntrepriseItem v-bind="entreprise"></EntrepriseItem>
  </main>
</template>

<style scoped>

</style>
