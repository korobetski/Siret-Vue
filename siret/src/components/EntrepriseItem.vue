<script setup lang="ts">

defineProps<{
    id:number
    siret:number
    siren:number
    tva:string
    nom:string
    numeroVoie?:number
    typeVoie?:string
    libelleVoie:string
    codePostal:number
    libelleCommune:string
    dateCreation:Date
}>()
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
        <button>Editer</button>
        <button>Supprimer</button>
      </div>
    </div>
  </div>
</template>

<style scoped>

</style>
