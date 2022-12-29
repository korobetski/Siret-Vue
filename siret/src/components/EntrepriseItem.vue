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
  <div :id="'entreprise '+id" class="entreprise-item">
    <div class="details">
      <h3>{{ nom }}</h3>
    </div>
  </div>
</template>

<style scoped>

</style>
