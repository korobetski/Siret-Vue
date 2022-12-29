<script lang="ts">

import type Entreprise from '@/types/Entreprise'
import type ResponseData from '@/types/ResponseData'
import EntrepriseItem from './EntrepriseItem.vue'
import EntrepriseService from '@/services/EntrepriseService'

export default {
  components: {
    EntrepriseItem
  },
  data() {
    return {
      form: {
        siret:'',
        siren:'',
        tva:'',
        nom:'',
        numeroVoie:'',
        typeVoie:'',
        libelleVoie:'',
        codePostal:'',
        libelleCommune:'',
        dateCreation:'',
      }
    }
  },
  methods: {
    validateNumber: (event: { keyCode: any; preventDefault: () => void }) => {
      let keyCode = event.keyCode;
      if (keyCode < 48 || keyCode > 57) {
        event.preventDefault();
      }
    },
    insee() {
      EntrepriseService.getInsee(this.form.siret)
        .then((response: ResponseData) => {

          console.log(response.data.datas);

          this.form.siren = response.data.datas.siren;
          this.form.tva = response.data.datas.tva;
          this.form.nom = response.data.datas.nom;
          this.form.numeroVoie = response.data.datas.numeroVoie;
          this.form.typeVoie = response.data.datas.typeVoie;
          this.form.libelleVoie = response.data.datas.libelleVoie;
          this.form.codePostal = response.data.datas.codePostal;
          this.form.libelleCommune = response.data.datas.libelleCommune;
          this.form.dateCreation = response.data.datas.dateCreation;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }
}

</script>

<template>
  <header>
    <h1>Ajouter une nouvelle entreprise</h1>
  </header>

  <main>
    <form>
      <label for="siret">N° SIRET</label>
      <input id="siret" v-model.number="form.siret" @keypress="validateNumber($event)"/>
      <button @click="insee">Charger les informations depuis l'INSEE</button>
      <hr/>
      <label for="siren">N° SIREN</label>
      <input id="siren" v-model.number="form.siren"/>
      <label for="tva">N° TVA</label>
      <input id="tva" v-model.number="form.tva"/>
      <label for="nom">Nom</label>
      <input id="nom" v-model.number="form.nom"/>
      
      <label for="numeroVoie">N° de voie</label>
      <input id="numeroVoie" v-model.number="form.numeroVoie"/>
      <label for="typeVoie">Type de voie</label>
      <input id="typeVoie" v-model.number="form.typeVoie"/>
      <label for="libelleVoie">Libellé de voie</label>
      <input id="libelleVoie" v-model.number="form.libelleVoie"/>
      <label for="codePostal">Code postal</label>
      <input id="codePostal" v-model.number="form.codePostal"/>
      <label for="libelleCommune">Commune</label>
      <input id="libelleCommune" v-model.number="form.libelleCommune"/>

      <label for="dateCreation">Date de création</label>
      <input id="dateCreation" v-model.number="form.dateCreation"/>

    </form>
  </main>
</template>

<style scoped>

</style>
