<template>
    <div id="app">
        <NMessageProvider>
            <router-view />
        </NMessageProvider>
    </div>
</template>

<script lang="ts">
import Layout from "@/layouts/Layout.vue";
import { NMessageProvider } from "naive-ui";

export default {
    components: { Layout, NMessageProvider },
};
</script>

<style lang="scss" scoped></style>
