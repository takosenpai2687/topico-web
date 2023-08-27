<template>
    <div>
        <!-- Search bar -->
        <div class="w-full flex flex-row justify-start items-center pt-4 pb-1">
            <SearchBar class="search my-10 mx-auto" />
        </div>
        <!-- Search History -->
        <SectionHeader class="text-center pb-1 select-none">
            <span class="text-white mr-4"># Search History</span>
            <font-awesome-icon class="fa-edit text-xl" color="#fff"
                :icon="`fa-solid ${editing ? 'fa-ban' : 'fa-pen-to-square'}`" @click="toggleEditing" />
        </SectionHeader>
        <div class="flex flex-row items-center justify-center gap-4">
            <SearchHistory v-if="searchHistory.length > 0" v-for="history in searchHistory" :history="history"
                :editing="editing" @searchHistoryChange="loadSearchHistory" />
            <p v-if="searchHistory.length === 0" class="text-lg text-white">None</p>
        </div>
    </div>
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";
import SearchBar from "@/components/explore/SearchBar.vue";
import SearchHistory from "@/components/explore/SearchHistory.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";

export default {
    components: { SearchBar, SearchHistory, SectionHeader },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    created() {
        document.title = "Topico - Explore";
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(233);
    },
    mounted() {
        this.loadSearchHistory();
    },
    data() {
        return { searchHistory: [] as string[], editing: false };
    },
    methods: {
        loadSearchHistory() {
            const _searchHistory = JSON.parse(
                localStorage.getItem("searchHistory") ?? "[]"
            ) as string[];
            this.searchHistory = _searchHistory;
        },
        toggleEditing() {
            this.editing = !!!this.editing;
        },
    },
};
</script>

<style lang="scss" scoped>
.fa-edit {
    transition: all 0.16s ease-out;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
        color: #fee;
    }
}
</style>
