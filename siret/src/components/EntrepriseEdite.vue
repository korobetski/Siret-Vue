<script lang="ts">

import type ResponseData from '@/types/ResponseData'
import EntrepriseService from '@/services/EntrepriseService'
import Entreprise from '@/types/Entreprise'

export default {
  props: {
    entreprise:Object as () => Entreprise
  },
  data() {
    return {
      inseeAlertVisible: false,
      inseeErrorMessage: "",
      updateAlertVisible: false,
      updateErrorMessage: ""
    }
  },
  methods: {
    update() {
      EntrepriseService.update(this.entreprise.id, this.entreprise)
        .then((response: ResponseData) => {
          console.log(response.data.datas);
          
          location.reload();
        })
        .catch((e: Error) => {
          console.log(e);
          this.updateAlertVisible = true;
          this.updateErrorMessage = e.response.data.message;
        });
    },
    insee() {
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
    close() {
      this.$parent.editModal = false;
    }
  },
}
</script>

<template>
  <!--EntrepriseEdite Modal-->
  <v-row justify="center">
    <v-dialog v-model="$parent.editModal">
      <v-card class="pa-md-4 mx-lg-auto" max-width="900px" min-width="600px">
        <v-card-title>
          <span class="text-h5">Edition | {{ entreprise.nom }}</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="n° Siret" v-model.number="entreprise.siret" prepend-icon="mdi-lock" variant="underlined" :readonly=true></v-text-field>
          <v-text-field label="n° Siren" v-model.number="entreprise.siren" prepend-icon="mdi-lock" variant="underlined" :readonly=true></v-text-field>
          <v-text-field label="n° TVA" v-model="entreprise.tva" prepend-icon="mdi-lock" variant="underlined" :readonly=true></v-text-field>
          
          <v-row class="formRow">
            <v-col cols="12"><v-btn block color="teal" variant="flat" @click="insee">
            Recharger les informations INSEE
          </v-btn></v-col>
          </v-row>
          <v-row class="formRow">
            <v-col cols="12"><v-text-field label="Nom" v-model="entreprise.nom" required></v-text-field></v-col>
          </v-row>
          <v-row class="formRow">
            <v-col cols="6"><v-text-field type="number" label="n° de voie" v-model.number="entreprise.numeroVoie"></v-text-field></v-col>
            <v-col cols="6"><v-text-field label="Type de voie" v-model="entreprise.typeVoie"></v-text-field></v-col>
          </v-row>
          <v-row class="formRow">
            <v-col cols="12"><v-text-field label="Libelle de voie" v-model="entreprise.libelleVoie" required></v-text-field></v-col>
          </v-row>
          <v-row class="formRow">
            <v-col cols="3"><v-text-field type="number" label="Code postal" v-model.number="entreprise.codePostal" required></v-text-field></v-col>
            <v-col cols="9"><v-text-field label="Commune" v-model="entreprise.libelleCommune" required></v-text-field></v-col>
          </v-row>
          <v-row class="formRow">
            <v-col cols="12"><v-text-field label="Date de création" v-model="entreprise.dateCreation" required></v-text-field></v-col>
          </v-row>          
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="close">
            Fermer
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="update" :disabled=saveDisabled>
            Mettre à jour
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>
.formRow {
  height: 80px;
}
</style>
