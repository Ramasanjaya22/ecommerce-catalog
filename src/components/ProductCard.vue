<template>
  <div>
    <h1>Let fetch api!</h1>
    <div>
      <h2>{{ products.title }}</h2>
      <p>{{ products.description }}</p>
      <img :src="products.image" alt="product image" />
      </div> 
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ProductCard',
  data() {
    return {
      products: {}
    }
  },
  methods: {
    async getProducts() {
      axios.get( `https://fakestoreapi.com/products/1`)
        .then(response => {
          this.products = response.data
        })
        .catch(error => {
          console.log(error)
        })
    }
  },
  mounted() {
    this.getProducts()
  }
}
</script>

<style scoped>
/* Add your component styles here */
</style>
