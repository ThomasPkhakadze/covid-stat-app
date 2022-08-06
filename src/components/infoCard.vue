<template>
    <div class="col px-0 ms-1">
          <div class="card text-center text-dark">
            <div class="card-header">
              Total {{ this.title }}
            </div>
            <div class="card-body">
              <p class="card-text ">{{ this.stat }}</p>
            </div>
            <div class="d-flex p-2">
              <div @click="callSort('asc', this.title)" class="btn btn-success me-1">Sort by ascending order</div>
              <div @click="callSort('desc', this.title)" class="btn btn-warning ms-1">Sort by descending order</div>
            </div>          
          </div>          
        </div>
</template>
<script>

export default {
    props: ['title', 'stat'],
    methods:{
      callSort(type, sortProp){
        this.$store.commit('SORT',{ type: type, sortProperty: sortProp})
      }
    }
}
</script>