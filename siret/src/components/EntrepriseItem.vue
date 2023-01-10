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
    dateCreation:Date,
    canEdit:Boolean,
    canDelete:Boolean
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
          // après la suppression on retourne à l'index et on actualise la vue
          this.$router.push('/').then(() => { this.$router.go(0) });
        })
        .catch((e: Error) => {
          console.log(e);
        });
    }
  }
})
</script>


<template>
  <div class="col">
    <div :id="'entreprise-'+id" class="card mb-3">
      <div class="card-header">
        <h3 class="card-title">{{ nom }}</h3>
      </div>
      <div class="card-body">
        <div class="card-text">
          <div>N° SIRET : {{ siret }}</div>
          <div>N° SIREN : {{ siren }}</div>
          <div>N° TVA : {{ tva }}</div>
          <div>Adresse : {{ numeroVoie }} {{ typeVoie }} {{ libelleVoie }} {{ codePostal }} {{ libelleCommune }}</div>
          <div>Date de création : {{ dateCreation }}</div>
        </div>
        <div class="btn-group" role="group" aria-label="controles">
          <router-link class="btn btn-secondary" :to="'/'+id">Voir</router-link>
          <router-link v-if="canEdit" class="btn btn-secondary" :to="'/edite/'+id">Editer</router-link>
          <button v-if="canDelete" class="btn btn-secondary" @click="supprimer(id)">Supprimer</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.col {
  min-width: 25%;
}
.card {
  color: black;
}
</style>
