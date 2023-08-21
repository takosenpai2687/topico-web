<template>
    <div class="flex flex-row">Profile</div>
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
        document.title = "Topico - Profile";
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(496.5);
    },
};
</script>

<style lang="scss" scoped></style>
