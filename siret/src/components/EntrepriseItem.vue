<script lang="ts">
import Entreprise from '@/types/Entreprise'
export default {
  props: {
    entreprise: Object as () => Entreprise,
    canEdit: Boolean,
    canDelete: Boolean
  },
  data: () => ({
    expand: false,
    time: 0,
  }),
}
</script>


<template>
  <!--EntrepriseItem Modal-->
  <v-row justify="center">
    <v-dialog v-model="$parent.showModal">
      <v-card class="mx-auto" width="500">
        <v-img height="140" :src="'https://picsum.photos/seed/' + entreprise.nom + '/1000/280?grayscale'" cover
          class="align-end">
          <v-card-title class="text-white pl-10" v-text="entreprise.nom"></v-card-title>
        </v-img>
        <v-card-subtitle class="pl-10 py-2">
          <div>{{ entreprise.numeroVoie }} {{ entreprise.typeVoie }} {{ entreprise.libelleVoie }}</div>
          <div>{{ entreprise.codePostal }} {{ entreprise.libelleCommune }}</div>
        </v-card-subtitle>
        <v-divider></v-divider>
        <v-card-text class="py-0">
          <v-list lines="one">
            <v-list-item key="n° Siret" title="n° Siret" :subtitle="entreprise.siret"></v-list-item>
            <v-list-item key="n° Siren" title="n° Siren" :subtitle="entreprise.siren"></v-list-item>
            <v-list-item key="n° TVA" title="n° TVA" :subtitle="entreprise.tva"></v-list-item>
            <v-list-item key="Date de création" title="Date de création"
              :subtitle="entreprise.dateCreation"></v-list-item>
          </v-list>
        </v-card-text>

        <v-divider></v-divider>
        <v-card-actions>
          <v-btn v-if="canEdit" @click="$parent.editItem(entreprise)" prepend-icon="mdi-pencil" color="warning">
            Éditer
          </v-btn>
          <v-btn v-if="canDelete" @click="$parent.deleteItem(entreprise)" prepend-icon="mdi-delete" color="error">
            Supprimer
          </v-btn>
        </v-card-actions>
      </v-card></v-dialog></v-row>
</template>

<style scoped>

</style>
