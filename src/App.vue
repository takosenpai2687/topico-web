<template>
    <div id="app">
        <NMessageProvider>
            <NDialogProvider>
                <router-view />
            </NDialogProvider>
        </NMessageProvider>
    </div>
</template>

<script lang="ts">
import Layout from "@/layouts/Layout.vue";
import { NMessageProvider, NDialogProvider } from "naive-ui";

export default {
    components: { Layout, NMessageProvider, NDialogProvider },
};
</script>

<style lang="scss" scoped></style>
