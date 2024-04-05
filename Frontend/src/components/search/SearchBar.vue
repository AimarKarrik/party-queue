<script setup>
import spotify from '@/api/api'
import { ref } from 'vue'
import { getAllArtists } from '@/helpers/artistHelper'
</script>

<template>
  <input type="text" placeholder="Search" v-model="searchQuery" @keypress="handleKeypress" />
  <button @click="search">Search</button>
  <ul>
    <li v-for="song in lastSearch" :key="song.id" @click="addToQueue(song)">
      {{ song.name }} - {{ getAllArtists(song.artists) }}
    </li>
  </ul>
</template>

<script>
export default {
  emits: ['added-to-queue'],
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
    handleKeypress(event) {
      if (event.key === 'Enter') {
        this.search()
      }
    },
    async addToQueue(song) {
      try {
        const response = await spotify.player.addItemToPlaybackQueue(song.uri)
        this.$emit('added-to-queue')
      } catch (error) {
        console.error('Error adding to queue:', error)
      }
    }
  }
}
</script>
