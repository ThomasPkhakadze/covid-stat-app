<template>
  <div>
    <table class="table table-primary">
  <thead>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Country</th>
      <th scope="col">Code</th>
      <th scope="col">Deaths</th>
      <th scope="col">Recovered</th>
      <th scope="col">Confirmed</th>
    </tr>
  </thead>
  <tbody>
    <tr v-for="(country, index) in this.countries" :key="index">
      <th scope="row">{{ index + 1 }}</th>
      <td>{{ country.country }}</td>
      <td>{{ country.code }}</td>
      <td>{{ country.deaths }}</td>
      <td>{{ country.recovered }}</td>
      <td>{{ country.confirmed }}</td>
    </tr>
  </tbody>
</table>
  </div>
</template>
<script>
  export default {
    props: ['countries'],
  }
</script>