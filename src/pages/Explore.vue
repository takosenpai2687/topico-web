<template>
    <div class="flex flex-row justify-between items-start">
        <!-- Left Side -->
        <div class="w-3/4 h-full">
            <!-- Search bar -->
            <div class="w-full flex flex-row justify-start items-center pt-4 pb-1">
                <SearchBar class="search my-10 mx-auto" />
            </div>
            <!-- Search History -->
            <SectionHeader class="text-center pb-1 select-none">
                <span class="text-white mr-4"># Search History</span>
                <font-awesome-icon class="fa-edit text-xl" color="#fff" :icon="`fa-solid ${editing ? 'fa-ban' : 'fa-pen-to-square'
                    }`" @click="toggleEditing" />
            </SectionHeader>
            <div class="flex flex-row items-center justify-center gap-4">
                <SearchHistory v-if="searchHistory.length > 0" v-for="history in searchHistory" :history="history"
                    :editing="editing" @searchHistoryChange="loadSearchHistory" />
                <p v-if="searchHistory.length === 0" class="text-lg text-white">
                    None
                </p>
            </div>
            <!-- Trending -->
            <SectionHeader class="text-white"># Trending</SectionHeader>
            <!-- Trending Sorting Types -->
            <div class="sorts flex flex-row items-center justify-start gap-3">
                <TopicoButton class="btn-sort" :class="{ active: idx === sortTypeIdx }" v-for="(sortType, idx) in sortTypes"
                    @click="() => handleSetSortType(idx)">{{ sortType.name }}
                </TopicoButton>
            </div>
            <!-- Trending Posts -->
            <div class="py-4">
                <PostCard v-for="post in trending" :post="post" />
            </div>
        </div>
        <!-- Right Side -->
        <div class="w-1/4 h-full">
            <!-- Top Search -->
            <TopicoTitleCard title="# Top Search">
                <ul>
                    <li class="py-1 flex flex-row items-center justify-start gap-3" v-for="(searchItem, idx) in topSearch">
                        <span class="text-lg">{{ `${idx + 1}.` }}</span>
                        <RouterLink class="search-link text-lg" :to="`/explore/${searchItem}`">{{ searchItem }}</RouterLink>
                    </li>
                </ul>
            </TopicoTitleCard>
            <!-- Top Communities -->
            <TopicoTitleCard title="# Top Communities">
                <ul>
                    <li v-for="(comm, idx) in topComms" class="py-2 flex flex-row items-center justify-start gap-3">
                        <span class="text-lg">{{ `${idx + 1}.` }}</span>
                        <CommunityPlate :community="comm" />
                    </li>
                </ul>
            </TopicoTitleCard>
        </div>
    </div>
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";
import SearchBar from "@/components/explore/SearchBar.vue";
import SearchHistory from "@/components/explore/SearchHistory.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import TopicoTitleCard from "@/components/common/TopicoTitleCard.vue";
import CommunityPlate from "@/components/common/CommunityPlate.vue";
import TopicoButton from "@/components/common/TopicoButton.vue";
import PostCard from "@/components/common/PostCard.vue";
import { getTopSearch, getTopComms, getTrendingHot, getTrendingNew } from "@/services/searchService";

export default {
    name: 'Explore',
    components: {
        SearchBar,
        SearchHistory,
        SectionHeader,
        TopicoTitleCard,
        CommunityPlate,
        TopicoButton,
        PostCard
    },
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
        this.fetchData();
    },
    data() {
        return {
            searchHistory: [] as string[],
            editing: false,
            topSearch: [] as string[],
            topComms: [] as Community[],
            trending: [] as Post[],
            sortTypeIdx: 0,
            sortTypes: [
                {
                    name: "Hot",
                    fetchFn: this.fetchTrendingHot
                },
                {
                    name: "New",
                    fetchFn: this.fetchTrendingNew
                }
            ]
        };
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
        handleSetSortType(idx: number) {
            if (idx === this.sortTypeIdx) return;
            this.sortTypeIdx = idx;
            this.fetchTrending();
        },
        async fetchData() {
            this.topSearch = await getTopSearch();
            this.topComms = await getTopComms();
            this.fetchTrending();
        },
        async fetchTrending() {
            await this.sortTypes[this.sortTypeIdx].fetchFn();
        },
        async fetchTrendingHot() {
            this.trending = await getTrendingHot();
        },
        async fetchTrendingNew() {
            this.trending = await getTrendingNew();
        }
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
@import "@/styles/mixins.scss";

.fa-edit {
    transition: all 0.16s ease-out;

    &:hover {
        transform: scale(1.05);
        cursor: pointer;
        color: #fee;
    }
}

.search-link {
    transition: all 0.16s ease-out;

    &:hover {
        text-decoration: underline;
        font-weight: bold;
        transform: scale(1.05);
    }
}

.btn-sort {
    @include card-shadow;
    background-color: #fff;
    color: $primaryColor;

    &.active {
        background-color: $primaryColor;
        color: #fff;
        font-weight: bold;
        cursor: inherit;
    }
}
</style>
