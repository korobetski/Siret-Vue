<script lang="ts">

import type ResponseData from '@/types/ResponseData'
import EntrepriseService from '@/services/EntrepriseService'

export default {
  props: {
    canCreate:Boolean,
  },
  data() {
    return {
      createModal: false,
      rules: {
          required: value => !!value || 'Requis.',
          counter: value => value.toString().length == 14 || 'Le n° Siret doit contenir 14 chiffres.'
      },
      newSiret: 0,
      inseeShow: false,
      inseeAlertType: "success", // '"success" | "error" | "warning" | "info" | undefined'
      inseeMessage: "",
      saveDisabled: true,
    }
  },
  methods: {
    insee() {
      this.inseeShow = false;
      // si le format du siret ne correspond pas on évite de requeter l'api pour rien
      if (!Number.isInteger(this.newSiret) || this.newSiret.toString().length != 14) {
          console.log(Number.isInteger(this.newSiret));
          console.log(this.newSiret.toString().length);
            return;
      }

      EntrepriseService.getInsee(this.newSiret)
        .then((response: ResponseData) => {
          console.log(response.data.datas);
          if (response.data.statut != 200) {
            this.inseeShow = true;
            this.inseeAlertType = "error";
            this.inseeMessage = response.data.error;
            return;
          }
          this.saveDisabled = false;
          this.inseeShow = true;
          this.inseeAlertType = "success";
          this.inseeMessage = response.data.datas.nom+" "+response.data.datas.libelleCommune;
        })
        .catch((e: Error) => {
          console.log(e);
            this.inseeShow = true;
            this.inseeAlertType = "error";
            this.inseeMessage = e.message;
        });
    },
    insert() {
      //this.createModal = false;
      EntrepriseService.createAuto(this.newSiret)
        .then((response: ResponseData) => {
          //console.log(response.data.datas);

          if (response.data.statut != 201) {
            this.inseeAlertType = "warning";
            this.inseeMessage = response.data.error;
            return;
          }

          location.reload();
        })
        .catch((e: Error) => {
          console.log(e);
          this.inseeAlertType = "error";
          this.inseeMessage = e.message;
        });
    }
  }
}

</script>

<template>
  <v-row justify="center">
    <v-dialog v-model="createModal">
      <template v-slot:activator="{ props }">
        <v-btn v-if="canCreate" size="x-large" block prepend-icon="mdi-plus" color="primary" class="mb-2" elevation="2" v-bind="props">
          Ajouter
        </v-btn>
      </template>

      <v-card class="pa-md-4 mx-lg-auto" max-width="900px" min-width="400px">
        <v-card-title>
          <span class="text-h5">Ajouter une nouvelle entreprise</span>
        </v-card-title>
        <v-card-text>
          <v-text-field type="number" label="n° Siret" hint="Le n° Siret est un numéro à 14 chiffres." counter
            minlength="14" maxlength="14" :rules="[rules.required, rules.counter]" v-model.number="newSiret"
            @input="insee"></v-text-field>
          <v-spacer></v-spacer>
          <v-alert v-if="inseeShow" :title="inseeAlertType" :text="inseeMessage" :type="inseeAlertType"
            variant="tonal"></v-alert>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue-darken-1" variant="text" @click="createModal = false">
            Fermer
          </v-btn>
          <v-btn color="blue-darken-1" variant="text" @click="insert" :disabled=saveDisabled>
            Enregistrer
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<style scoped>

</style>
