<template>
  <searchComponent @added-to-queue="getQueue" />
  <QueueList :queue="queue" :currentlyPlaying="currentlyPlaying.value" />
</template>

<script>
import searchComponent from '@/components/search/SearchBar.vue'
import QueueList from '@/components/queue/QueueList.vue'
import spotify from '@/api/api'
import { ref } from 'vue'

export default {
  components: {
    searchComponent,
    QueueList
  },
  data() {
    return {
      queue: ref([]),
      currentlyPlaying: ref({})
    }
  },
  created() {
    this.getQueue()
  },
  methods: {
    async getQueue() {
      try {
        const response = await spotify.player.getUsersQueue()
        this.currentlyPlaying.value = response.currently_playing
        this.queue.splice(0, this.queue.length)
        this.queue.push(...response.queue)
      } catch (error) {
        console.error('Error getting queue:', error)
      }
    }
  }
}
</script>
