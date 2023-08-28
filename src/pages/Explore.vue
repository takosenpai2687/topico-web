<template>
    <div class="wrapper justify-between items-start">
        <!-- Left Side -->
        <div class="content-main">
            <!-- Search bar -->
            <div class="w-full flex flex-row justify-start items-center pt-4 pb-1">
                <SearchBar class="search my-10 mx-auto" />
            </div>
            <!-- Search History -->
            <SectionHeader class="text-center pb-1 select-none mt-3 mb-4">
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
            <SectionHeader class="text-white py-4 px-2 flex flex-row items-center justify-start gap-3 select-none">
                <span class="text-white"># Trending</span>
                <font-awesome-icon :icon="`fa-solid ${globalStore.showSpoilers ? 'fa-eye' : 'fa-eye-slash'
                    }`" class="fa-eye" @click="handleClickToggle" />
            </SectionHeader>
            <!-- Trending Sorting Types -->
            <div class="sorts flex flex-row items-center justify-start gap-3 px-2 select-none">
                <TopicoButton class="btn-sort" :class="{ active: idx === sortTypeIdx }" v-for="(sortType, idx) in sortTypes"
                    @click="() => handleSetSortType(idx)">{{ sortType.name }}
                </TopicoButton>
            </div>
            <!-- Trending Posts -->
            <div class="py-4">
                <PostCard v-for="(post, idx) in trending" :post="post" :delay="idx * DELAY" />
            </div>
        </div>
        <!-- Right Side -->
        <div class="content-side">
            <div class="content-side-inner">
                <!-- Top Search -->
                <TopicoTitleCard title="# Top Search" :delay="0">
                    <ul class="px-2">
                        <li class="py-1 flex flex-row items-center justify-start gap-3"
                            v-for="(searchItem, idx) in topSearch">
                            <span class="text-lg select-none">{{ `${idx + 1}.` }}</span>
                            <RouterLink class="search-link text-lg" :to="`/explore/${searchItem}`">{{ searchItem }}
                            </RouterLink>
                        </li>
                    </ul>
                    <font-awesome-icon class="fa-refresh" icon="fa-solid fa-rotate-right" @click="fetchTopSearch" />
                </TopicoTitleCard>
                <!-- Top Communities -->
                <TopicoTitleCard title="# Top Communities" :delay="DELAY">
                    <ul class="px-2">
                        <li v-for="(comm, idx) in topComms" class="py-2 flex flex-row items-center justify-start gap-3">
                            <span class="text-lg select-none">{{ `${idx + 1}.` }}</span>
                            <CommunityPlate :community="comm" />
                        </li>
                    </ul>
                    <font-awesome-icon class="fa-refresh" icon="fa-solid fa-rotate-right" @click="fetchTopComms" />
                </TopicoTitleCard>
            </div>
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

import { DELAY, } from '@/config/config';


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
        this.globalStore.setWaterLevel(300);
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
            ],
            DELAY
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
        handleClickToggle() { this.globalStore.toggleShowSpoilers() },
        async fetchData() {
            this.fetchTopComms();
            this.fetchTopSearch();
            this.fetchTrending();
        },
        async fetchTrending() {
            this.trending = [];
            await this.sortTypes[this.sortTypeIdx].fetchFn();
        },
        async fetchTrendingHot() {
            this.trending = [];
            this.trending = await getTrendingHot();
        },
        async fetchTrendingNew() {
            this.trending = [];
            this.trending = await getTrendingNew();
        },
        async fetchTopSearch() {
            this.topSearch = [];
            this.topSearch = await getTopSearch();
        },
        async fetchTopComms() {
            this.topComms = [];
            this.topComms = await getTopComms();
        }
    },
};
</script>

<style lang="scss" scoped> @import "@/styles/mixins.scss";

 .fa-edit {
     transition: all 0.16s ease-out;

     &:hover {
         transform: scale(1.05);
         cursor: pointer;
         color: #fee;
     }
 }

 .fa-refresh {
     color: var(--primary-font-color);
     transition: all 0.16s ease-out;
     position: absolute;
     top: .8em;
     right: 1em;
     font-size: 1.2em;

     &:hover {
         transform: scale(1.1);
         cursor: pointer;
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

 .fa-eye {
     font-size: 0.9em;
     transition: all 0.16s ease-out;

     &:hover {
         cursor: pointer;
         transform: scale(1.1);
     }
 }

 .btn-sort {
     @include card-shadow;
     background-color: #fff;
     color: var(--primary-color);

     &.active {
         background-color: var(--primary-color);
         color: #fff;
         font-weight: bold;
         cursor: inherit;
     }
 }

 // PC
 @media screen and (min-width: $mobile-width) {
     .wrapper {
         display: flex;
         flex-direction: row;

         .content-main {
             width: 75%;
             height: 100%;
         }

         .content-side {
             width: 25%;
             position: relative;

             .content-side-inner {
                 position: fixed;
                 top: 1em;
             }
         }
     }


 }

 // Mobile
 @media screen and (max-width: $mobile-width) {
     .wrapper {
         display: flex;

         height: 100%;
         flex-direction: column;

         .content-main {
             width: 100%;
         }

         .content-side {
             width: 100%;

             .content-side-inner {}
         }
     }
 }
</style>
