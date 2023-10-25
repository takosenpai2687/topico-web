<template>
    <div>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue'

export default defineComponent({
    name: 'CommentCard',
    props: {
        comment: {
            type: Object as PropType<CommentVO>,
            required: true
        }
    },
    setup() {
        return {}
    }
})
</script>

<style scoped></style>