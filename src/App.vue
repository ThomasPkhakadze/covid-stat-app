<script setup>
import CountriesTable from './components/countriesTable.vue'
import InfoCard from './components/infoCard.vue'
import SearchBar from './components/searchBar.vue'


import { mapActions, mapGetters } from 'vuex'
</script>

<template>
  <header class="py-3">
    <SearchBar @goSearch="sendSearchRequest"/>
  </header>
    <div class="container-fluid my-3">
      <div class="row">
        <InfoCard :title="'Deaths'" :stat="this.getTotalDeaths" />
        <InfoCard :title="'Recovered'" :stat="this.getTotalRecoveries" />
        <InfoCard :title="'Confirmed'" :stat="this.getTotalConfirmeds" />        
      </div>
    </div>

  <main>
    <CountriesTable :countries="this.data" />
  </main>
</template>

<style>
  main{
    height: 500px;
    overflow-y: scroll;
  }
</style>

<script>
export default {
  data(){
    return{
      data: [],
      isGeorgian: true,
      search: false
    }
  },
  computed: {
    ...mapGetters([
      'getCountries',
      'getTotalDeaths',
      'getTotalRecoveries',
      'getTotalConfirmeds',
      'getSearchResult'
    ])
  },
  methods:{
    ...mapActions([
      'fetchCountries',
    ]), 
    sendSearchRequest(query){
      this.$store.dispatch('search', ({query: query}))
      this.data = this.getSearchResult
      if(this.getSearchResult.length == 0){
        alert('no countries were found, old man')
      }
    }      
  },
  async mounted(){
      await this.fetchCountries()
      this.data = this.getCountries
  },  
  components:{
    CountriesTable,
    InfoCard,
    SearchBar
  }
}
</script>
