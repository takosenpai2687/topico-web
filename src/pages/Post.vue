<template>
    <div class="flex flex-row">Post</div>
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";

export default {
    name: 'Post',
    components: {},
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    created() {
        document.title = "Topico - Post";   // Change to post name
        this.globalStore.setShowWaves(false); // If no banner, then true
        // this.globalStore.setWaterLevel(296.5);
    },
};
</script>

<style lang="scss" scoped></style>
