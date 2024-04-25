<script setup lang="ts">
import SongItem from '@/components/songs/SongItem.vue'
</script>

<template>
    <div class="queue-list">
        <h2>Next in queue</h2>
        <div v-if="queue" class="queue">
            <SongItem
                v-for="song in queue"
                :key="song.id"
                :title="song.title"
                :channel="song.channelTitle"
                :length="song.length.simpleText"
                :thumbnail="song.thumbnail.thumbnails[0].url"
            />
        </div>
        <p v-if="!hasQueue">There is nothing in queue</p>
    </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import type Song from '@/types/song'

export default {
    data() {
        return {
            hasQueue: false,
            queue: ref<Song[]>([])
        }
    },
    updated() {
        if (this.queue === undefined) {
            return
        }
        this.hasQueue = this.queue.length > 0
    },
    created() {
        this.getQueue()
    },
    mounted() {
        setInterval(this.getQueue, 5000)
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

                this.queue.splice(0, this.queue.length)
                this.queue.push(...responseData)
            } catch (error) {
                console.error('Error getting queue:', error)
            }
        }
    }
}
</script>

<style scoped>
.queue-list {
    display: flex;
    flex-direction: column;
    margin: 1rem;
}
.queue-list h2 {
    margin-bottom: 1rem;
}
.queue {
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
</style>
