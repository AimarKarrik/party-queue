<script setup lang="ts">
import { ref } from 'vue'
import SongItem from '@/components/songs/SongItem.vue'
</script>

<template>
    <div class="search">
        <div class="search-bar">
            <input
                type="text"
                placeholder="Search"
                v-model="searchQuery"
                @keypress="handleKeypress"
                class="search-box"
            />
            <button @click="search" class="search-button">
                <img src="@/assets/icons/search_FILL0_wght400_GRAD0_opsz24.svg" />
            </button>
        </div>
        <div v-if="lastSearch.length > 0" class="search-results">
            <SongItem
                v-for="song in lastSearch"
                :key="song.id"
                :title="song.title"
                :channel="song.channelTitle"
                :length="song.length.simpleText"
                :thumbnail="song.thumbnail.thumbnails[0].url"
                @click="addToQueue(song)"
                class="search-result"
            />
        </div>
    </div>
</template>

<script lang="ts">
import type Song from '@/types/song'
export default {
    emits: ['added-to-queue'],
    data() {
        return {
            searchQuery: '',
            lastSearch: ref<Song[]>([])
        }
    },
    methods: {
        async search() {
            try {
                this.lastSearch = []

                const response = await fetch(
                    `${import.meta.env.VITE_API_URL}/search?q=${this.searchQuery}`
                )
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const responseData: Song[] = await response.json()

                this.lastSearch = responseData
            } catch (error) {
                console.error('Error getting search result:', error)
            }
        },
        handleKeypress(event: KeyboardEvent) {
            if (event.key === 'Enter') {
                this.search()
            }
        },
        async addToQueue(song: Song) {
            try {
                await fetch(`${import.meta.env.VITE_API_URL}/queue`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(song)
                })
                this.$emit('added-to-queue')
            } catch (error) {
                console.error('Error adding to queue:', error)
            }
        }
    }
}
</script>

<style scoped>
.search {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 1rem 1rem;
}
.search-bar {
    display: flex;
    align-items: center;
    width: 100%;

    margin-bottom: 1rem;
    background-color: #2e2e38;
    border-radius: 1rem;
}
.search-box {
    width: 100%;
    padding: 0 1rem;
    font-size: 1rem;
    border-radius: 1rem 0 0 1rem;
}
.search-button {
    background-color: transparent;
    border: none;
    cursor: pointer;
    border-radius: 0 1rem 1rem 0;
}
.search-button:focus {
    outline: none;
}
.search-button:hover {
    background-color: #4e4e58;
}
.search-button:active {
    background-color: #3e3e48;
}

.search-results {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
    height: 52vh;
    overflow-y: scroll;
    border-radius: 1rem;
}
.search-result {
    cursor: pointer;
}
.search-result:hover {
    background-color: #4e4e58;
}
</style>
