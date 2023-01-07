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
      searchQuery: "",
      searchLimit: 6,
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
    search() {
      EntrepriseService.getAllPagination("/entreprises?query="+this.searchQuery+"&limit="+this.searchLimit)
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
        <div class="form-floating mb-3 col">
          <!-- @input="insee" si on veut tester le siret dès que l'input est modifié -->
          <!-- @change="insee" si on veut tester le siret dès que l'input n'est plus on focus -->
          <input type="text" id="recherche" class="form-control" aria-describedby="rechercheHelp" v-model="searchQuery" placeholder="Recherche" v-on:keyup.enter="search"/>
          <label for="recherche" class="form-label">Recherche</label>
          <div id="rechercheHelp" class="form-text">La recherche s'applique sur le nom, la commune et le code postal.</div>
        </div>
        <div class="mb-3 col">
          <div class="row">
            <div class="form-floating col">
              <input type="number" id="limit" class="form-control" v-model="searchLimit"/>
              <label for="limit" class="form-label">Limite</label>
            </div>
            <div class="col">
              <button class="btn btn-primary" @click="search">Rechercher</button>
            </div>

          </div>
        </div>
      </div>
    </div>
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
