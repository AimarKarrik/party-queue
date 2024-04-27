<template>
    <div class="player">
        <YouTube
            src="https://www.youtube.com/watch?v=jNQXAC9IVRw"
            @ready="onReady"
            @state-change="onStateChange"
            ref="youtube"
            class="youtube-player"
        />
        <div class="player-buttons">
            <button @click="playPreviousSong">
                <img src="@/assets/icons/skip_previous_FILL0_wght400_GRAD0_opsz24.svg" />
            </button>
            <button @click="playPausePlayer">
                <img src="@/assets/icons/play_pause_FILL0_wght400_GRAD0_opsz24.svg" />
            </button>
            <button @click="playNextSong">
                <img src="@/assets/icons/skip_next_FILL0_wght400_GRAD0_opsz24.svg" />
            </button>
        </div>
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
        },
        async playPausePlayer() {
            if ((this.$refs.youtube as any).getPlayerState() === 1) {
                ;(this.$refs.youtube as any).pauseVideo()
            }
            if ((this.$refs.youtube as any).getPlayerState() === 2) {
                ;(this.$refs.youtube as any).playVideo()
            }
            if ((this.$refs.youtube as any).getPlayerState() === -1) {
                ;(this.$refs.youtube as any).playVideo()
            }
        }
    }
})
</script>

<style scoped>
.player {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    margin-top: 2rem;
}

.player-buttons {
    background-color: #2e2e38;
    display: flex;
    margin-top: 1rem;
    border-radius: 1rem;
}

.player-buttons :nth-child(1) {
    border-radius: 1rem 0 0 1rem;
}
.player-buttons :nth-child(2) {
    border-radius: 0;
}
.player-buttons :nth-child(3) {
    border-radius: 0 1rem 1rem 0;
}
.player-buttons button {
    border: none;
    cursor: pointer;
}
.player-buttons button:active {
    background-color: #3e3e48;
}

.player-buttons button img {
    width: 2rem;
    height: 2rem;
}
</style>
