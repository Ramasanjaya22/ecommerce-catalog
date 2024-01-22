import { shallowMount } from '@vue/test-utils'
import axios from 'axios'
import ProductCard from '@/components/ProductCard.vue'
import { jest, describe, beforeEach, afterEach, it, expect } from '@jest'
jest.mock('axios')

describe('ProductCard', () => {
  let wrapper

  beforeEach(() => {
    wrapper = shallowMount(ProductCard)
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('should fetch product data and update state correctly', async () => {
    const mockProduct = {
      id: 1,
      title: 'Example Product',
      category: 'clothing'
      // ... other properties
    }

    axios.get.mockResolvedValueOnce({ data: mockProduct })

    await wrapper.vm.getProducts()

    expect(axios.get).toHaveBeenCalledWith(
      `https://fakestoreapi.com/products/${wrapper.vm.currentProductId}`
    )

    expect(wrapper.vm.product).toEqual(mockProduct)
    expect(wrapper.vm.isProductAvailable).toBe(true)
    expect(wrapper.vm.isWomen).toBe(false)
    expect(wrapper.vm.isMen).toBe(false)
    expect(wrapper.vm.isLoading).toBe(false)
  })

  it('should handle error and reset loading state', async () => {
    const mockError = new Error('Failed to fetch product')

    axios.get.mockRejectedValueOnce(mockError)

    await wrapper.vm.getProducts()

    expect(axios.get).toHaveBeenCalledWith(
      `https://fakestoreapi.com/products/${wrapper.vm.currentProductId}`
    )

    expect(console.log).toHaveBeenCalledWith(mockError)
    expect(wrapper.vm.isLoading).toBe(false)
  })
})
