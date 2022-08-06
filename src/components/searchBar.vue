<template>
    <div>
        <p v-show="this.errors.length">
            <b>Correct following errors to proceed:</b>
            <ul>
                <li v-for="(error, index) in errors" :key="index">{{ error }}</li>
            </ul>
        </p>
        <div class="d-flex">
            <input type="text" v-model="searchBar" placeholder="Insert country name" class="w-100">
            <button class="btn btn-primary ms-3" @click="checkForInputLength()">Search</button>    
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            errors: [],
            searchBar: null
        }
    },
    methods:{
        search(){
            this.$emit('goSearch', this.searchBar);
        },
        checkForInputLength(){
            this.errors = []
            // console.log(typeof this.searchBar)
            if(this.searchBar == null || (this.searchBar.length && this.searchBar.length < 3) ){
                this.errors.push('Query should be at least 3 characters')
            }else if(!isNaN(this.searchBar)){
                this.errors.push('City name can not consist of numeric values')
            }else{
                this.search()
            }
        }
    }
}
</script>