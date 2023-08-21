<template>
    <div class="flex flex-row">Explore</div>
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";

export default {
    components: {},
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    created() {
        document.title = "Topico - Explore";
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(196.5);
    },
};
</script>

<style lang="scss" scoped></style>
