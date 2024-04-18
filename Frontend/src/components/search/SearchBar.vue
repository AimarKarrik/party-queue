<script setup lang="ts">
import { ref } from 'vue'
import SearchItem from '@/components/search/SearchItem.vue'
</script>

<template>
    <input type="text" placeholder="Search" v-model="searchQuery" @keypress="handleKeypress" />
    <button @click="search">Search</button>
    <div v-if="lastSearch.length > 0">
        <SearchItem
            v-for="song in lastSearch"
            :key="song.id"
            :title="song.title"
            :channel="song.channelTitle"
            :length="song.length.simpleText"
            :thumbnail="song.thumbnail.thumbnails[0].url"
            @click="addToQueue(song)"
        />
    </div>
</template>

<script lang="ts">
export default {
    emits: ['added-to-queue'],
    data() {
        return {
            searchQuery: '',
            lastSearch: ref<any[]>([])
        }
    },
    methods: {
        async search() {
            try {
                this.lastSearch = [] // Reset lastSearch array

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/search?q=${this.searchQuery}`
                )

                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }

                const data = await response.json()

                this.lastSearch = data
            } catch (error) {
                console.error('Error getting search result:', error)
            }
        },
        handleKeypress(event: KeyboardEvent) {
            if (event.key === 'Enter') {
                this.search()
            }
        },
        async addToQueue(song: any) {
            try {
                this.$emit('added-to-queue')
            } catch (error) {
                console.error('Error adding to queue:', error)
            }
        }
    }
}
</script>
