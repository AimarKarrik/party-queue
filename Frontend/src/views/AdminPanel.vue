<template>
    <YoutubePlayer />
    <QueueList :isAdmin="true" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import QueueList from '@/components/queue/QueueList.vue'
import YoutubePlayer from '@/components/player/YoutubePlayer.vue'

export default defineComponent({
    components: { YoutubePlayer, QueueList }
})
</script>
