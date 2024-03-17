<script setup>
const location = window.location.host
</script>

<template>
  <div class="queue-list">
    <h2>Queue List</h2>
    <ul>
      <li>{{ currentlyPlaying.value }} - {{ currentlyPlaying.artist }}</li>
      <li v-for="song in queue" :key="song.id">
        {{ song.name }} - {{ getAllArtists(song.artists) }}
      </li>
    </ul>
  </div>
</template>

<script>
import spotify from '@/api/api'
import { ref } from 'vue'

export default {
  data() {
    return {
      currentlyPlaying: ref({}),
      queue: ref([])
    }
  },
  created() {
    this.getQueue()
  },
  methods: {
    async getQueue() {
      try {
        const response = await spotify.player.getUsersQueue()
        //this.currentlyPlaying.push(response.currently_playing)
        this.queue.push(...response.queue)
        console.log(response.currently_playing)
        console.log(this.currentlyPlaying)
      } catch (error) {
        console.error('Error getting queue:', error)
      }
    },
    getAllArtists(artists) {
      return artists.map((artist) => artist.name).join(', ')
    }
  }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
