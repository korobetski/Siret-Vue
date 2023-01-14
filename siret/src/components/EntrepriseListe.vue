<script lang="ts">
import type Entreprise from '@/types/Entreprise'
import { EmptyEntreprise } from '@/types/Entreprise'
import type Link from '@/types/Link'
import type ResponseData from '@/types/ResponseData'
import EntrepriseItem from '@/components/EntrepriseItem.vue'
import EntrepriseService from '@/services/EntrepriseService'
import EntrepriseRecherche from '@/components/EntrepriseRecherche.vue'
import EntrepriseEdite from '@/components/EntrepriseEdite.vue'

export default {
  components: {
    EntrepriseItem,
    EntrepriseRecherche,
    EntrepriseEdite,
  },
  data() {
    return {
      entreprises: Array<Entreprise>,
      links: Array<Link>,
      currentPage: 1,
      canCreate: false,
      canEdit: false,
      canDelete: false,
      totalResult: 0,
      offset: 0,
      showModal: false,
      editModal: false,
      editedItem: EmptyEntreprise,
      searchLimit: 10,
      searchQuery: "",
      isMobile:false
    }
  },
  methods: {
    getPage(page: number) {
      EntrepriseService.getPage(page, this.searchLimit, this.searchQuery)
        .then((response: ResponseData) => {
          //console.log(response.data);
          this.entreprises = response.data.pagination.data;
          this.links = response.data.pagination.links;
          this.totalResult = response.data.pagination.total;
          this.offset = (this.currentPage - 1) * this.searchLimit;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    editItem(item: Entreprise) {
      this.editedItem = item || Object as () => Entreprise;
      this.editModal = !this.editModal;
    },
    showItem(item: Entreprise) {
      this.editedItem = item || Object as () => Entreprise;
      this.showModal = !this.showModal;
    },
    deleteItem(item: Entreprise) {
      if (confirm('Voulez vous vraiment supprimer ' + item.nom + " ?")) {
        EntrepriseService.delete(item.id)
          .then((response: ResponseData) => {
            console.log(response.data.datas);
            this.getPage(this.currentPage);
          })
          .catch((e: Error) => {
            console.log(e);
          });
      }
    },
    capitalize: function (value: string) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase()
    },
    onResize() {
          if (window.innerWidth < 960)
            this.isMobile = true;
          else
            this.isMobile = false;
        },
  },
  mounted() {
    this.onResize();
    this.getPage(this.currentPage);
    this.canCreate = this.canEdit = this.canDelete = (localStorage.username) ? true : false;
  },
}

</script>
<template>
  <EntrepriseRecherche v-bind:can-create="canCreate" v-bind:search-limit="searchLimit"></EntrepriseRecherche>
  <EntrepriseEdite v-bind:entreprise="editedItem"></EntrepriseEdite>
  <EntrepriseItem v-bind:entreprise="editedItem" v-bind:can-edit="canEdit" v-bind:can-delete="canDelete">
  </EntrepriseItem>
  <v-row v-resize="onResize">
    <v-col cols="12">
      <v-table theme="light" :class="{mobile: isMobile}">
        <thead>
          <tr class="text-left">
            <th id="name">Nom</th>
            <th id="address">Adresse</th>
            <th id="postalCode">Code Postal</th>
            <th id="city">Commune</th>
            <th id="siret">n° Siret</th>
            <th id="siren">n° Siren</th>
            <th id="tva">n° TVA</th>
            <!--
            <th>Date de création</th>
            -->
            <th id="actions">Actions</th>
          </tr>
        </thead>
        <tbody v-if="!isMobile">
          <tr v-for="entreprise in entreprises" :key="entreprise.id">
            <th :id="'entreprise' + entreprise.id" headers="name">{{ entreprise.nom }}</th>
            <td headers="address" class="address">{{ entreprise.numeroVoie }} {{ entreprise.typeVoie }} {{
              capitalize(entreprise.libelleVoie)
            }}</td>
            <td headers="postalCode">{{ entreprise.codePostal }}</td>
            <td headers="city" class="address">{{ capitalize(entreprise.libelleCommune) }}</td>
            <td headers="siret" class="legalNumbers">{{ entreprise.siret }}</td>
            <td headers="siren" class="legalNumbers">{{ entreprise.siren }}</td>
            <td headers="tva" class="legalNumbers">{{ entreprise.tva }}</td>
            <!--
            <td>{{ entreprise.dateCreation }}</td>
            -->
            <td headers="actions" style="width: 110px;">
              <v-btn block variant="plain" size="x-small" prepend-icon="mdi-file-outline" color="primary"
                @click="showItem(entreprise)">Afficher</v-btn>
              <v-btn block v-if="canEdit" variant="plain" size="x-small" prepend-icon="mdi-pencil" color="warning"
                @click="editItem(entreprise)">Éditer</v-btn>
              <v-btn block v-if="canDelete" variant="plain" size="x-small" prepend-icon="mdi-delete" color="error"
                @click="deleteItem(entreprise)">Supprimer</v-btn>
            </td>
          </tr>
        </tbody>
        <tbody v-else>
          <tr v-for="entreprise in entreprises" :key="entreprise.id" height="546px">
            <td>
            <v-list width="100%" height="546px">
              <v-list-item key="Nom" title="Nom" :subtitle="entreprise.nom"></v-list-item>
              <v-list-item key="Adresse" title="Adresse" :subtitle="entreprise.numeroVoie+' '+entreprise.typeVoie+' '+
              capitalize(entreprise.libelleVoie)"></v-list-item>
              <v-list-item key="Code Postal" title="Code Postal" :subtitle="entreprise.codePostal"></v-list-item>
              <v-list-item key="Commune" title="Commune" :subtitle="capitalize(entreprise.libelleCommune)"></v-list-item>
              <v-list-item key="n° Siret" title="n° Siret" :subtitle="entreprise.siret"></v-list-item>
              <v-list-item key="n° Siren" title="n° Siren" :subtitle="entreprise.siren"></v-list-item>
              <v-list-item key="n° TVA" title="n° TVA" :subtitle="entreprise.tva"></v-list-item>
              <v-list-item key="Date de création" title="Date de création"
                :subtitle="entreprise.dateCreation"></v-list-item>

              <v-list-item title="Afficher" color="primary" prepend-icon="mdi-file-outline" @click="showItem(entreprise)"></v-list-item>
              <v-list-item v-if="canEdit" title="Éditer" prepend-icon="mdi-pencil" @click="editItem(entreprise)"></v-list-item>
              <v-list-item v-if="canDelete" title="Supprimer" prepend-icon="mdi-delete" @click="deleteItem(entreprise)"></v-list-item>
            </v-list>
            </td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
  <v-divider></v-divider>
  <!--Pagination-->
  <v-row>
    <v-col cols="2">
      <v-select v-model="searchLimit" type="number" label="Limite" :items="[5, 10, 25, 50, 100]"
        variant="underlined"></v-select>
    </v-col>
    <v-col cols="8">
      <div class="text-center">
        <v-pagination v-model="currentPage" :length="links.length - 2" @update:model-value="getPage"
          :total-visible="10">{{ links.length }}</v-pagination>
      </div>
    </v-col>
    <v-col cols="2">
      <v-label>{{ offset+ 1 }}-{{ offset+ searchLimit }} sur {{ totalResult }}</v-label>
    </v-col>
  </v-row>
</template>


<style scoped>
.address {
  font-size: 14px;
  text-transform: capitalize;
}

#postalCode {
  font-size: 11px;
}

.legalNumbers {
  font-size: 12px;
}

@media screen and (max-width: 960px) {
  .v-table__wrapper tr {
    max-width: 100%;
    position: relative;
    display: block;
  }

  .mobile thead {
    display: none;
  }

  .v-table__wrapper tr:nth-child(odd) {
    background-color: white;
  }

  .v-table__wrapper tr:nth-child(even) {
    background-color: gainsboro;
  }

  .v-table__wrapper tr td {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #f5f5f5;
    padding: 10px;
    height: auto !important;
  }

  .v-table__wrapper tr td .v-list {
    background-color: transparent;
  }

  .v-table__wrapper tr td .v-list-item:before {
    content: attr(data-label);
    padding-right: .5em;
    text-align: left;
    display: block;
    color: #999;
  }
}
</style>
