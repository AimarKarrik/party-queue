<script setup>
import spotify from '@/api/api'
import { ref } from 'vue'
import { getAllArtists } from '@/helpers/artistHelper'
</script>

<template>
  <input type="text" placeholder="Search" v-model="searchQuery" />
  <button @click="search">Search</button>
  <ul>
    <li v-for="song in lastSearch" :key="song.id" @click="addToQueue(song)">
      {{ song.name }} - {{ getAllArtists(song.artists) }}
    </li>
  </ul>
</template>

<script>
export default {
  data() {
    return {
      searchQuery: '',
      lastSearch: ref([])
    }
  },
  methods: {
    async search() {
      try {
        this.lastSearch = []
        const response = await spotify.search(this.searchQuery, 'track')
        this.lastSearch.push(...response.tracks.items)
      } catch (error) {
        console.error('Error getting search result:', error)
      }
    },
    async addToQueue(song) {
      try {
        const response = await spotify.player.addItemToPlaybackQueue(song.uri)
      } catch (error) {
        console.error('Error adding to queue:', error) 
      }
    }
  }
}
</script>
