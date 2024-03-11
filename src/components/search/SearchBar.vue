<script setup></script>

<template>
  <input type="text" v-model="search" placeholder="Search" />
  <button @click="search">Search</button>
  <div v-if="searchResults">
    <h2>Search Results</h2>
    <ul>
      <li v-for="result in searchResults" :key="result.id">
        {{ result.name }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  data() {
    return {
      items: []
    }
  },
  mounted() {
    this.handleSearch()
  },
  methods: {
    async handleSearch() {
      try {
        const response = await fetch('https://api.example.com/items')
        if (!response.ok) {
          throw new Error('Failed to fetch items')
        }
        const data = await response.json()
        this.items = data
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }
  }
}
</script>
