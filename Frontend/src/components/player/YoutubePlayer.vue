<template>
    <YouTube
        src="https://www.youtube.com/watch?v=jNQXAC9IVRw"
        @ready="onReady"
        @state-change="onStateChange"
        ref="youtube"
    />
    <div>
        <button @click="playPreviousSong">Previous</button>
        <button @click="playNextSong">Next</button>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import YouTube from 'vue3-youtube'
import type Song from '@/types/song'

export default defineComponent({
    components: { YouTube },

    methods: {
        onReady() {
            ;(this.$refs.youtube as any).playVideo()
        },
        async onStateChange(event: { data: number }) {
            if (event.data === 0) {
                this.playNextSong()
            }
        },
        async playNextSong() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/queue/next`)
                if (response.status === 404) {
                    console.log('No songs in queue')
                    return
                }
                if (response.status === 400)
                    if (!response.ok) {
                        throw new Error('Network response was not ok')
                    }
                const responseData: Song = await response.json()
                ;(this.$refs.youtube as any).loadVideoById(responseData.id)
            } catch (error) {
                console.error('Error getting next song:', error)
            }
        },
        async playPreviousSong() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/queue/previous`)
                if (response.status === 404) {
                    throw new Error('No previous songs in queue')
                }
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
                const responseData: Song = await response.json()
                ;(this.$refs.youtube as any).loadVideoById(responseData.id)
            } catch (error) {
                console.error('Error getting previous song:', error)
            }
        }
    }
})
</script>
