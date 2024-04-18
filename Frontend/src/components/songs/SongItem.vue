<template>
    <div>
        <img :src="thumbnail" alt="thumbnail" />
        <div>
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
