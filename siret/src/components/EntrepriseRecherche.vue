<script lang="ts">

import type ResponseData from '@/types/ResponseData'
import EntrepriseService from '@/services/EntrepriseService'

export default {
    props: {
        searchLimit: Number,
    },
    data() {
        return {
            searchQuery: "",
            loading: false,
        }
    },
    methods: {
        search() {
            this.$parent.searchQuery = this.searchQuery;
            EntrepriseService.getPage(1, this.searchLimit, this.searchQuery)
                .then((response: ResponseData) => {
                    //console.log(response.data);
                    this.$parent.entreprises = response.data.pagination.data;
                    this.$parent.links = response.data.pagination.links;
                    this.$parent.currentPage = response.data.current_page;
                    this.$parent.totalResult = response.data.pagination.total;
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        },
    },
}

</script>
<template>
    <!-- Recherche -->
    <v-row>
        <v-col cols="12">
            <v-card class="mx-auto" color="grey-lighten-3">
                <v-card-text>
                    <v-row>
                        <v-col lg="6" md="6" sm="12" xs="12">
                            <v-text-field class="d-inline" :loading="loading" variant="solo" label="Recherche"
                                append-inner-icon="mdi-magnify" hide-details v-model="searchQuery"
                                @click:append-inner="search" v-on:keyup.enter="search"></v-text-field>
                        </v-col>
                        <v-col lg="6" md="5" sm="12" xs="12" class="d-none d-sm-flex">
                            <v-alert text="La recherche s'applique sur le nom, la commune et le code postal."
                                type="info" variant="tonal"></v-alert>
                        </v-col>
                    </v-row>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>