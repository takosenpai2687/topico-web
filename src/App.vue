<template>
    <div id="app">
        <component :is="$route.meta.layout || 'div'"> </component>
    </div>
</template>

<script lang="ts">
import Layout from "@/layouts/Layout.vue";

export default {
    components: { Layout },
};
</script>

<style lang="scss" scoped></style>
