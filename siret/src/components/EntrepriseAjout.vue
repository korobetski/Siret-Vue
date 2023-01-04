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
      inseeAlertVisible: false,
      inseeErrorMessage: "",
      createAlertVisible: false,
      createErrorMessage: ""
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
      this.inseeAlertVisible = false;
      EntrepriseService.getInsee(this.entreprise.siret)
        .then((response: ResponseData) => {
          //console.log(response.data.datas);
          if (response.data.statut != 200) {
            this.inseeAlertVisible = true;
            this.inseeErrorMessage = response.data.error;
            return;
          }

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
    insert() {
      this.createAlertVisible = false;
      EntrepriseService.create(this.entreprise)
        .then((response: ResponseData) => {
          //console.log(response.data.datas);

          if (response.data.statut != 200) {
            this.createAlertVisible = true;
            this.createErrorMessage = response.data.datas;
            return;
          }

          this.$router.push('/');
        })
        .catch((e: Error) => {
          console.log(e);
          this.createAlertVisible = true;
          this.createErrorMessage = e.response.data.message;
        });
    }
  }
}

</script>

<template>
  <main>
    <h2>Ajouter une nouvelle entreprise</h2>   
      <div class="form-floating mb-3">        
        <input id="siret" class="form-control" aria-describedby="siretHelp" v-model.number="entreprise.siret" @keypress="validateNumber($event)"/>
        <label for="siret" class="form-label">N° SIRET</label>
        <div id="siretHelp" class="form-text">Le n° SIRET est un numéro à 14 chiffres.</div>
      </div>
      <div class="container">
        <div class="row align-items-start">
          <div class="col">
            <button class="btn btn-primary" @click="insee">Charger les informations depuis l'INSEE</button>
          </div>
          <div class="col">
            <div class="alert alert-danger" role="alert" :style="[inseeAlertVisible ? 'display:block' : 'display:none']">{{ inseeErrorMessage }}</div>
          </div>
        </div>
      </div>

      <hr/>
      
      <div class="container">
        <div class="row align-items-start">
          <div class="col form-floating mb-3" style="padding-left: 0;">
            <input id="siren" class="form-control form-control-sm" v-model.number="entreprise.siren"/>
            <label for="siren" class="form-label">N° SIREN</label>
          </div>
          <div class="col form-floating mb-3" style="padding-left: 0; padding-right: 0;">
            <input id="tva" class="form-control form-control-sm" v-model="entreprise.tva"/>
            <label for="tva" class="form-label">N° TVA</label>
          </div>
        </div>
      </div>
      <div class="form-floating mb-3">
        <input id="nom" class="form-control form-control-sm" v-model="entreprise.nom"/>
        <label for="nom" class="form-label">Nom</label>
      </div>

      <div class="mb-3">        
        <label class="form-label">Adresse</label>
      </div>
      <div class="input-group mb-3">
        <div class="form-floating mb-3">
          <input type="number" id="numeroVoie" class="form-control form-control-sm" placeholder="N° de voie" aria-label="N° de voie" v-model.number="entreprise.numeroVoie"/>
          <label for="numeroVoie" class="form-label">N° de voie</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" id="typeVoie" class="form-control form-control-sm" placeholder="Type de voie" aria-label="Type de voie" v-model="entreprise.typeVoie"/>
          <label for="typeVoie" class="form-label">Type de voie</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" id="libelleVoie" class="form-control form-control-sm" placeholder="Libellé de voie" aria-label="Libellé de voie" v-model="entreprise.libelleVoie"/>
          <label for="libelleVoie" class="form-label">Libellé de voie</label>
        </div>
        <div class="form-floating mb-3">
          <input type="number" id="codePostal" class="form-control form-control-sm" placeholder="Code postal" aria-label="Code postal" v-model.number="entreprise.codePostal"/>
          <label for="codePostal" class="form-label">Code postal</label>
        </div>
        <div class="form-floating mb-3">
          <input type="text" id="libelleCommune" class="form-control form-control-sm" placeholder="Commune" aria-label="Commune" v-model="entreprise.libelleCommune"/>
          <label for="libelleCommune" class="form-label">Commune</label>
        </div>
      </div>
      <div class="form-floating mb-3">        
        <input id="dateCreation" class="form-control form-control-sm" v-model="entreprise.dateCreation"/>
        <label for="dateCreation" class="form-label">Date de création</label>
      </div>

      <button class="btn btn-primary" @click="insert">Ajouter à la base de données</button>

      <div class="alert alert-danger" role="alert" :style="[createAlertVisible ? 'display:block' : 'display:none']">{{ createErrorMessage }}</div>
  </main>
</template>

<style scoped>

</style>
