<template>
  <div>
    <SkeletonProductCard v-if="isLoading" />
    <div v-else>
      <div v-if="isProductAvailable">
        <img :src="product.image" :alt="product.title" />
        <h2>{{ product.title }}</h2>
        <p>Category: {{ product.category }}</p>
        <p>Description: {{ product.description }}</p>
        <p>Rating: {{ product.rating.rate }}</p>
        <p>Price: {{ product.price }}</p>
        <button @click="buyProduct">Buy</button>
      </div>
      <div v-else>
        <p>No clothing products available.</p>
      </div>
      <button @click="getNextProduct">Next Product</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import SkeletonProductCard from './SkeletonProductCard.vue'
export default {
  name: 'ProductCard',
  components: {
    SkeletonProductCard
  },
  data() {
    return {
      products: {},
      currentProductId: 1,
      isLoading: true,
      isProductAvailable: false,
      isWomen: false,
      isMen: false,
    }
  },
  methods: {
    async getProducts() {
      this.isLoading = true;
      try {
        const response = await axios.get(
          `https://fakestoreapi.com/products/${this.currentProductId}`
        );
        const product = response.data;
        const isAvailable = product.category.includes("clothing");
        const isMen = product.category === "men's clothing";
        const isWomen = product.category === "women's clothing";

        // Update state
        this.product = product;
        this.isProductAvailable = isAvailable;
        this.isWomen = isWomen;
        this.isMen = isMen;

      } catch (error) {
        console.log(error);
      } finally {
        // Reset loading state
        this.isLoading = false;
      }
    },
    buyProduct() {
      // Add logic for buying the product
    },
    getNextProduct() {
      // Add logic for getting the next product
      this.currentProductId++;
      this.getProducts();
    },
  },
  mounted() {
    this.getProducts()
  }
}
</script>

<style scoped>
/* Add your component styles here */
</style>
