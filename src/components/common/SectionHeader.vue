<template>
    <h1>
        <slot />
    </h1>
</template>

<script lang="ts">
export default {
    name: 'SectionHeader'
};
</script>

<style lang="scss" scoped>
h1 {
    font-weight: bold;
    font-size: 1.25em;
    line-height: 1.5em;
}
</style>
