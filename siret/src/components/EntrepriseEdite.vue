<script lang="ts">

import type ResponseData from '@/types/ResponseData'
import EntrepriseItem from './EntrepriseItem.vue'
import EntrepriseService from '@/services/EntrepriseService'
import { EmptyEntreprise } from '@/types/Entreprise'

export default {
  components: {
    EntrepriseItem
  },
  data() {
    return {
      entreprise: EmptyEntreprise,
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
    validateNumber: (event: { keyCode: any; preventDefault: () => void }) => {
      let keyCode = event.keyCode;
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      }
    },
    insee() {
      EntrepriseService.getInsee(this.entreprise.siret)
        .then((response: ResponseData) => {

          console.log(response.data.datas);

          this.entreprise.siren = response.data.datas.siren;
          this.entreprise.tva = response.data.datas.tva;
          this.entreprise.nom = response.data.datas.nom;
          this.entreprise.numeroVoie = response.data.datas.numeroVoie;
          this.entreprise.typeVoie = response.data.datas.typeVoie;
          this.entreprise.libelleVoie = response.data.datas.libelleVoie;
          this.entreprise.codePostal = response.data.datas.codePostal;
          this.entreprise.libelleCommune = response.data.datas.libelleCommune;
          this.entreprise.dateCreation = response.data.datas.dateCreation;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    update() {
      EntrepriseService.update(this.entreprise.id, this.entreprise)
        .then((response: ResponseData) => {
          console.log(response.data.datas);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.getEntreprise();
  },
}

</script>

<template>
  <header>
    <h1>Editer une entreprise</h1>
  </header>

  <main>
    <form>
      <label for="id">Id</label>
      <input id="id" v-model.number="entreprise.id" disabled="true"/>
      <label for="siret">N° SIRET</label>
      <input id="siret" v-model.number="entreprise.siret" @keypress="validateNumber($event)"/>
      <button @click="insee">Charger les informations depuis l'INSEE</button>
      <hr/>
      <label for="siren">N° SIREN</label>
      <input id="siren" v-model.number="entreprise.siren"/>
      <label for="tva">N° TVA</label>
      <input id="tva" v-model.number="entreprise.tva"/>
      <label for="nom">Nom</label>
      <input id="nom" v-model.number="entreprise.nom"/>
      
      <label for="numeroVoie">N° de voie</label>
      <input id="numeroVoie" v-model.number="entreprise.numeroVoie"/>
      <label for="typeVoie">Type de voie</label>
      <input id="typeVoie" v-model.number="entreprise.typeVoie"/>
      <label for="libelleVoie">Libellé de voie</label>
      <input id="libelleVoie" v-model.number="entreprise.libelleVoie"/>
      <label for="codePostal">Code postal</label>
      <input id="codePostal" v-model.number="entreprise.codePostal"/>
      <label for="libelleCommune">Commune</label>
      <input id="libelleCommune" v-model.number="entreprise.libelleCommune"/>

      <label for="dateCreation">Date de création</label>
      <input id="dateCreation" v-model.number="entreprise.dateCreation"/>

      <button @click="update">Mettre à jour la base de données</button>

    </form>
  </main>
</template>

<style scoped>

</style>
