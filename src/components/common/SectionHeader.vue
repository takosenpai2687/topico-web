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
    font-size: 1.4rem;
    font-weight: bold;
    line-height: 3rem;
}
</style>
