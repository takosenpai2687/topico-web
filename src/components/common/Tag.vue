<template>
    <div class="tag">
        <slot />
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({ name: 'Tag' });
</script>

<style scoped lang="scss">
@import "@/styles/theme.scss";

.tag {
    background-color: $primaryColor;
    padding: 0.1em 1em;
    border-radius: 3em;
    color: #fff;
    font-size: .8em;
}</style>
