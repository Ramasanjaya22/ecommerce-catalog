<template>
  <div class="product-page">
    <SkeletonProductCard v-if="isLoading" />
    <div 
    v-else
    class="container-page"
    :class="
        !isProductAvailable ? 'bg-page-gray' : this.isMen ? 'bg-page-blue' : 'bg-page-magenta'
      "
    >
    <div class="bg-pattern">
      <img src="/bg-pattern.svg" alt="pattern background" />
    </div>
   <div class="product-card">
    <div
    v-if="!isProductAvailable"
    class="product-unavailable-container">
      <div class="bg-unavailable">
        <img src="/sad-face.png" alt="background-sad-face" />
      </div>
      <div class="detail-product">
        <p>This product is unavailable to show</p>
        <div class="buttons">
          <button 
          @click="getNextProduct" 
          class="button-next"
          >Next Product</button>
        </div>
      </div>
    </div>
    <div v-else class="product-available-container">
      <div class="product-image">
        <img :src="product.image" :alt="product.title" />
      </div>
      <div class="product-content" :class="isMen ? 'scrollbar-mens' : 'scrollbar-womens'">
        <div class="product-title" :class="isMen ? 'text-mens' : 'text-womens'">
          <p>{{ product.title }}</p>
        </div>
        <div class="product-label">
          <p>{{ product.category }}</p>
          <div class="product-rate">
            <p>{{ product.rating.rate }}/5</p>
            <div>
              <div class="circles-rate">
                <span
                  class="circle"
                  :class="
                    product.rating.rate < 0.5
                      ? isMen
                        ? 'dot-white-men'
                        : 'dot-white-women'
                      : isMen
                        ? 'dot-blue-men'
                        : 'dot-magenta-women'
                  "
                ></span>
                <span
                  class="circle"
                  :class="
                    product.rating.rate < 1.5
                      ? isMen
                        ? 'dot-white-men'
                        : 'dot-white-women'
                      : isMen
                        ? 'dot-blue-men'
                        : 'dot-magenta-women'
                  "
                ></span>
                <span
                  class="circle"
                  :class="
                    product.rating.rate < 2.5
                      ? isMen
                        ? 'dot-white-men'
                        : 'dot-white-women'
                      : isMen
                        ? 'dot-blue-men'
                        : 'dot-magenta-women'
                  "
                ></span>
                <span
                  class="circle"
                  :class="
                    product.rating.rate < 3.5
                      ? isMen
                        ? 'dot-white-men'
                        : 'dot-white-women'
                      : isMen
                        ? 'dot-blue-men'
                        : 'dot-magenta-women'
                  "
                ></span>
                <span
                  class="circle"
                  :class="
                    product.rating.rate < 4.5
                      ? isMen
                        ? 'dot-white-men'
                        : 'dot-white-women'
                      : isMen
                        ? 'dot-blue-men'
                        : 'dot-magenta-women'
                  "
                ></span>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div class="product-description">
          <p>{{ product.description }}</p>
        </div>
        <div class="product-checkout">
          <hr />
          <div class="product-price" :class="isMen ? 'text-mens' : 'text-womens'">
            <p>${{ product.price }}</p>
          </div>
          <div class="product-button">
            <button 
            class="btn-buy"
            :class="isMen ? 'btn-mens' : 'btn-womens'"
            >Buy Now</button>
            <button
              class="btn-next"
              :class="isMen ? 'btn-mens-border' : 'btn-womens-border'"
              @click="getNextProduct"
            >
              Next Product
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
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
