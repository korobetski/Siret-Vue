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
      inseeAlertType: "primary",
      inseeMessage: "",
      createAlertVisible: false,
      createErrorMessage: ""
    }
  },
  methods: {
    insee() {
      this.inseeAlertVisible = false;
      // si le format du siret ne correspond pas on évite de requeter l'api pour rien
      if (!Number.isInteger(this.entreprise.siret) || this.entreprise.siret.toString().length != 14) {
            return;
      }

      EntrepriseService.getInsee(this.entreprise.siret)
        .then((response: ResponseData) => {
          //console.log(response.data.datas);
          if (response.data.statut != 200) {
            this.inseeAlertVisible = true;
            this.inseeAlertType = "danger";
            this.inseeMessage = response.data.error;
            return;
          }

          this.inseeAlertVisible = true;
          this.inseeAlertType = "primary";
          this.inseeMessage = response.data.datas.nom+" "+response.data.datas.libelleCommune;
        })
        .catch((e: Error) => {
          console.log(e);
        });
    },
    insert() {
      this.createAlertVisible = false;
      EntrepriseService.createAuto(this.entreprise.siret)
        .then((response: ResponseData) => {
          //console.log(response.data.datas);

          if (response.data.statut != 201) {
            this.createAlertVisible = true;
            this.createErrorMessage = response.data.error;
            return;
          }

          this.$router.push('/'+response.data.datas.id);
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
        <!-- @input="insee" si on veut tester le siret dès que l'input est modifié -->
        <!-- @change="insee" si on veut tester le siret dès que l'input n'est plus on focus -->
        <input id="siret" class="form-control" aria-describedby="siretHelp" v-model.number="entreprise.siret" @input="insee"/>
        <label for="siret" class="form-label">N° SIRET</label>
        <div id="siretHelp" class="form-text">Le n° SIRET est un numéro à 14 chiffres.</div>
      </div>
      
      <div :class="'alert alert-'+inseeAlertType" role="alert" :style="[inseeAlertVisible ? 'display:block' : 'display:none']">{{ inseeMessage }}</div>
      <div class="form-floating mb-3">
        <button class="btn btn-primary" @click="insert">Ajouter à la base de données</button>
      </div>
      <div class="alert alert-danger" role="alert" :style="[createAlertVisible ? 'display:block' : 'display:none']">{{ createErrorMessage }}</div>
  </main>
</template>

<style scoped>

</style>
