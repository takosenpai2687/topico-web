<template>
    <div class="flex flex-row">
        <!-- Search bar -->
        <div class="w-full flex flex-row justify-start items-center">
            <SearchBar class="my-10 mx-auto" />
        </div>
    </div>
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";
import SearchBar from "@/components/common/SearchBar.vue";

export default {
    components: { SearchBar },
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
