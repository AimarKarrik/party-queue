<template>
    <div class="song-item">
        <img :src="thumbnail" alt="thumbnail" class="thumbnail" />
        <div class="song-info">
            <h3>{{ title }}</h3>
            <p>{{ channel }}</p>
            <p>{{ length }}</p>
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
