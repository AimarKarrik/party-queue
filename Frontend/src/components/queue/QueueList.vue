<script setup lang="ts">
import SongItem from '@/components/songs/SongItem.vue'
</script>

<template>
    <div class="queue-list">
        <h2>Queue List</h2>
        <div v-if="queue">
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
import type { PropType } from 'vue'
import type Song from '@/types/song'

export default {
    props: {
        queue: {
            type: Array as PropType<Song[]>
        }
    },
    data() {
        return {
            hasQueue: false
        }
    },
    updated() {
        if (this.queue === undefined) {
            return
        }
        this.hasQueue = this.queue.length > 0
    }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
