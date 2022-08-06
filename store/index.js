import { createStore } from 'vuex'
import axios from 'axios'

const store = createStore({
  state () {
    return {
      countries: [],
      searchResult: [],
      totalDeaths: 0,
      totalRecoveries: 0,
      totalConfirmeds: 0 
    }
  },
  getters:{
    getCountries(state){
      return state.countries
    },
    getSearchResult(state){
      return state.searchResult
    },
    getTotalDeaths(state){
      return state.totalDeaths
    },
    getTotalRecoveries(state){
      return state.totalRecoveries      
    },
    getTotalConfirmeds(state){
      return state.totalConfirmeds
    }
  },
  mutations: {
    INCREMENT_DEATH(state, incrementValue){
      state.totalDeaths += incrementValue
    },
    INCREMENT_RECOVERIES(state, incrementValue){
      state.totalRecoveries += incrementValue
    },
    INCREMENT_CONFIRMEDS(state, incrementValue){
      state.totalConfirmeds += incrementValue
    },
    SAVE_COUNTRY(state, country){
      state.countries.push(country)
    },
    SORT(state, payload){
      if(state.searchResult.length == 0){
        const countries = state.countries
        const sortProperty = payload.sortProperty.toLowerCase()
        if(payload.type == 'asc'){
          countries.sort((a, b) => parseFloat(a[sortProperty]) - parseFloat(b[sortProperty]))
        }else{
          countries.sort((a, b) => parseFloat(b[sortProperty]) - parseFloat(a[sortProperty]))
        }
      }else{
        const countries = state.searchResult
        const sortProperty = payload.sortProperty.toLowerCase()
        if(payload.type == 'asc'){
          countries.sort((a, b) => parseFloat(a[sortProperty]) - parseFloat(b[sortProperty]))
        }else{
          countries.sort((a, b) => parseFloat(b[sortProperty]) - parseFloat(a[sortProperty]))
        }
      }
    },
    POPULATE_SEARCH_RESULT(state, result){
      state.searchResult.push(result)
    },
    CLEAR_SEARCH_RESULT(state){
      state.searchResult = []
    }    
  },
  actions: {
    async fetchCountries({commit}){
      axios.get('https://devtest.ge/countries').then((response) => response.data.map(async (e) => {
        let country = e;
        await axios.post('https://devtest.ge/get-country-statistics', {code: e.code}).then((response) => {
          Object.assign(country,response.data)          
          commit('INCREMENT_DEATH', country.deaths)
          commit('INCREMENT_RECOVERIES', country.recovered)
          commit('INCREMENT_CONFIRMEDS', country.confirmed)
        })
        commit('SAVE_COUNTRY', country)
      })) 
    },
    search({getters, commit}, payload){
        commit('CLEAR_SEARCH_RESULT')
        let countries = getters.getCountries
        countries.map(country => {
          if(country.name.en.toLowerCase().includes(payload.query.toLowerCase())){
            commit('POPULATE_SEARCH_RESULT', country)
          }
        })
      }
  }
})

export default store;