<script lang="ts">
import type Entreprise from '@/types/Entreprise'
import type Link from '@/types/Link'
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
      links: Array<Link>,
      currentPage: Number,
    }
  },
  methods: { 
    listeEntreprises(url: string) {
      EntrepriseService.getAllPagination(url)
        .then((response: ResponseData) => {
          //console.log(response.data);
          this.entreprises = response.data.pagination.data;
          this.links = response.data.pagination.links;
          this.currentPage = response.data.current_page;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
  },
  mounted() {
    this.listeEntreprises("/entreprises?page=1");
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
    <br/>
    <nav>
      <ul class="pagination">
        <li v-for="link in links" class="page-item" v-bind:class="{ 'active': link.active, 'disabled': link.url == null }"><button class="page-link" @click="listeEntreprises(link.url)">{{ link.label }}</button></li>
      </ul>
    </nav>
  </main>
</template>

<style scoped>

</style>
