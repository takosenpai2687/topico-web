<template>
    <div class="flex flex-row">Community</div>
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";

export default {
    name: 'Community',
    components: {},
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    created() {
        document.title = "Topico - Community"; // Change to community name
        this.globalStore.setShowWaves(false); // If no banner, then true
        // this.globalStore.setWaterLevel(296.5);
    },
};
</script>

<style lang="scss" scoped></style>
