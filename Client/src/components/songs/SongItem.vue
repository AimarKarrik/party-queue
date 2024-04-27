<template>
    <div class="song-item">
        <img :src="thumbnail" alt="thumbnail" class="thumbnail" />
        <div class="song-info">
            <h3>{{ title }}</h3>
            <p>{{ channel }}</p>
            <p>{{ length }}</p>
        </div>
        <div v-if="isAdmin">
            <button @click="removeFromQueue">
                <img src="@/assets/icons/delete_FILL0_wght400_GRAD0_opsz24.svg" />
            </button>
        </div>
    </div>
</template>

<script lang="ts">
import type { PropType } from 'vue'

export default {
    props: {
        title: {
            type: String as PropType<string>,
            required: true
        },
        channel: {
            type: String as PropType<string>,
            required: true
        },
        length: {
            type: String as PropType<string>,
            required: true
        },
        thumbnail: {
            type: String as PropType<string>,
            required: true
        },
        isAdmin: {
            type: Boolean as PropType<boolean>,
            required: false,
            default: false
        }
    },
    methods: {
        async removeFromQueue() {
            try {
                const response = await fetch(`${import.meta.env.VITE_API_URL}/queue`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ title: this.title })
                })
                if (!response.ok) {
                    throw new Error('Network response was not ok')
                }
            } catch (error) {
                console.error('Error removing song from queue:', error)
            }
        }
    }
}
</script>

<style scoped>
.song-item {
    display: flex;
    background-color: #2e2e38;
    border-radius: 1rem;
    height: 9rem;
}
.song-info {
    display: flex;
    flex-direction: column;
    margin: 1rem;
}
.thumbnail {
    border-radius: 1rem;
    height: 100%;
    aspect-ratio: 16/9;
}

@media screen and (max-width: 600px) {
    .song-item {
        flex-direction: column;
        height: auto;
    }
}
</style>
