<script setup>
const sus = window.location.host
</script>

<template>
  <input type="text" v-model="search" placeholder="Search" />
  <button @click="handleSearch">Search</button>
  <h1>{{ sus }}</h1>
  <div v-if="searchResults">
    <h2>Search Results</h2>
    <ul>
      <li v-for="item in items" :key="result.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script>
//import { getToken } from '@/helpers/AuthHelper'

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
        const response = await fetch(
          `https://api.spotify.com/v1/search?q=run!&type=track&offset=0`,
          {
            method: 'GET',
            headers: {
              Authorization: `Bearer BQBOz3qtiirjblQD14UtB6Hof4evCm2FAttKsHabXlogb49hS0W9SUt2zJosl43vehONxjYkHj0e_lHO9f8CfKiqx7szp6QXE3SoIhovlMUT1ahKs4M`
            }
          }
        )
        if (!response.ok) {
          throw new Error('Failed to fetch items')
        }
        const data = await response.json()
        console.log(data)
        this.items = data.items
      } catch (error) {
        console.error('Error fetching items:', error)
      }
    }
  }
}
</script>
