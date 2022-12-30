<script lang="ts">
import { defineComponent } from 'vue'
import EntrepriseService from '@/services/EntrepriseService'
import type ResponseData from '@/types/ResponseData'
export default defineComponent({
  props: {
    id:Number,
    siret:Number,
    siren:Number,
    tva:String,
    nom:String,
    numeroVoie:Number,
    typeVoie:String,
    libelleVoie:String,
    codePostal:Number,
    libelleCommune:String,
    dateCreation:Date
  },
  setup(props) {
    props.id,
    props.siret
  },
  methods: {
    supprimer(id:number | undefined) {
      EntrepriseService.delete(id)
        .then((response: ResponseData) => {
          console.log(response.data.datas);
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }
})
</script>


<template>
  <div :id="'entreprise-'+id" class="entreprise-item">
    <div class="details">
      <h3>{{ nom }}</h3>
      <div>N° SIRET : {{ siret }}</div>
      <div>N° SIREN : {{ siren }}</div>
      <div>N° TVA : {{ tva }}</div>
      <div>Adresse : {{ numeroVoie }} {{ typeVoie }} {{ libelleVoie }} {{ codePostal }} {{ libelleCommune }}</div>
      <div>Date de création : {{ dateCreation }}</div>
      <div class="controles">
        <router-link :to="'/'+id">Consulter</router-link>
        <router-link :to="'/edite/'+id">Editer</router-link>
        <button @click="supprimer(id)">Supprimer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
