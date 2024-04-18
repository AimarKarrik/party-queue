<template>
    <searchComponent @added-to-queue="getQueue" />
    <button @click="getQueue">Refresh Queue</button>
    <QueueList :queue="queue" :currentlyPlaying="currentlyPlaying" />
</template>

<script lang="ts">
import searchComponent from '@/components/search/SearchBar.vue'
import QueueList from '@/components/queue/QueueList.vue'
import type Song from '@/types/song'
import { ref } from 'vue'

export default {
    components: {
        searchComponent,
        QueueList
    },
    data() {
        return {
            queue: ref<Song[]>([]),
            currentlyPlaying: ref<Song | undefined>(undefined)
        }
    },
    created() {
        this.getQueue()
    },
    mounted() {
        setInterval(this.getQueue, 10000)
    },
    methods: {
        async getQueue() {
            console.log('Getting queue')
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/queue`)
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const responseData: Song[] = await response.json()

                this.currentlyPlaying = responseData[0]
                this.queue.splice(0, this.queue.length)
                this.queue.push(...responseData)
            } catch (error) {
                console.error('Error getting queue:', error)
            }
        }
    }
}
</script>
