<script setup>
import { getAllArtists } from '@/helpers/artistHelper'
</script>

<template>
  <div class="queue-list">
    <h2>Queue List</h2>
    <ul>
      <li>{{ currentlyPlaying.name }} - {{ getAllArtists(currentlyPlaying.artists) }}</li>
      <li v-for="song in queue" :key="song.id">
        {{ song.name }} - {{ getAllArtists(song.artists) }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    queue: {
      type: Array,
      default: () => []
    },
    currentlyPlaying: {
      type: Object,
      default: () => ({})
    }
  }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
