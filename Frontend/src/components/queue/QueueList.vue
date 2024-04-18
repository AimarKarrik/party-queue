<script setup></script>

<template>
    <div class="queue-list">
        <h2>Queue List</h2>
        <ul v-if="hasQueue">
            <li>{{ currentlyPlaying.name }} - {{}}</li>
            <li v-for="song in queue" :key="song.id">
                {{ song.name }} - {{ getAllArtists(song.artists) }}
            </li>
        </ul>
        <p v-if="!hasQueue">There is nothing in queue</p>
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
    },
    data() {
        return {
            hasQueue: false
        }
    },
    updated() {
        this.hasQueue = this.queue.length > 0
    }
}
</script>

<style scoped>
/* Add your component-specific styles here */
</style>
