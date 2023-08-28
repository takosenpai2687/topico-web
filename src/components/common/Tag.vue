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
.tag {
    background-color: var(--primary-color);
    padding: 0.1em 1em;
    border-radius: 3em;
    color: #fff;
    font-size: .8em;
}</style>
