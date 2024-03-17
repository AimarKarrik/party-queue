<script setup>
const location = window.location.host
</script>

<template>
  <div class="queue-list">
    <h2>Queue List</h2>
    <ul>
      <li>{{ currentlyPlaying.name }} - {{ currentlyPlaying.artist }}</li>
      <li v-for="song in queue" :key="song.id">{{ song.name }} - {{ song.artists[0].name }}</li>
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
        //this.currentlyPlaying = response.currentlyPlaying
        this.queue.push(...response.queue)
      } catch (error) {
        console.error('Error getting queue:', error)
      }
    }
  }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
