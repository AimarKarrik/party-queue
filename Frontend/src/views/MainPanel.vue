<template>
    <searchComponent />
    <QueueList />
</template>

<script lang="ts">
import searchComponent from '@/components/search/SearchBar.vue'
import QueueList from '@/components/queue/QueueList.vue'

export default {
    components: {
        searchComponent,
        QueueList
    }
}
</script>
