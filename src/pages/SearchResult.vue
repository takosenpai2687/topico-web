<template>
    <div class="flex flex-row justify-between items-start">
        <!-- Left Side -->
        <div class="content-main">
            <!-- Search bar -->
            <div class="w-full flex flex-row justify-start items-center pt-4 pb-1">
                <SearchBar @searchHistoryChange="reloadSearchHistory" class="search my-10 mx-auto" />
            </div>
            <!-- Search History -->
            <SectionHeader class="text-center pb-1 select-none mt-3 mb-4">
                <span class="text-white mr-4"># Search History</span>
                <font-awesome-icon class="fa-edit text-xl" color="#fff" :icon="`fa-solid ${editing ? 'fa-ban' : 'fa-pen-to-square'
                    }`" @click="toggleEditing" />
            </SectionHeader>
            <div class="flex flex-row items-center justify-center gap-4">
                <SearchHistory v-if="searchHistory.length > 0" v-for="history in searchHistory" :history="history"
                    :editing="editing" @searchHistoryChange="reloadSearchHistory" />
                <p v-if="searchHistory.length === 0" class="text-lg text-white">
                    None
                </p>
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
import { getTopComms, getTopSearch, searchKeyword } from "@/services/searchService";
import { defineComponent } from "vue";
import SearchBar from "@/components/explore/SearchBar.vue";
import SearchHistory from "@/components/explore/SearchHistory.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import TopicoTitleCard from "@/components/common/TopicoTitleCard.vue";
import CommunityPlate from "@/components/common/CommunityPlate.vue";
import TopicoButton from "@/components/common/TopicoButton.vue";
import PostCard from "@/components/common/PostCard.vue";
import useGlobalStore from "@/stores/global";
import { DELAY, MAX_HISTORY } from '@/config/config';


export default defineComponent({
    name: 'SearchResult',
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
    data() {
        return {
            search: "",
            editing: false,
            searchHistory: [] as string[],
            topSearch: [] as string[],
            topComms: [] as Community[],
            comms: [] as Community[],
            sortBy: "MOST_LIKES" as "MOST_LIKES" | "NEWEST",
            posts: [] as Post[],
            page: 1,
            DELAY
        };
    },
    created() {
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(300);
        this.$watch(
            () => this.$route.params,
            (_toParams, _previousParams) => {
                this.onMounted();
            }
        );
    },
    mounted() {
        this.onMounted();
    },
    methods: {
        onMounted() {
            this.search = ((this.$route.params.search as string) ?? "").trim();
            document.title = "Topico Search - " + this.search;
            this.loadSearchHistory();
            this.fetchData();
        },
        toggleEditing() {
            this.editing = !!!this.editing;
        },
        async fetchData() {
            const keyword = this.search;
            if (!keyword || keyword.length === 0) {
                this.$router.push("/explore");
            }
            searchKeyword(keyword, this.page, 10, this.sortBy).then(searchResult => {
                this.comms = searchResult.communities;
                this.posts = searchResult.posts.data;
            });
            this.fetchTopSearch();
            this.fetchTopComms();
        },
        loadSearchHistory() {
            const { search } = this;
            // Resolve search param
            if (!search || search.length === 0) {
                this.$router.push("/explore");
            }
            // Push search history
            let _searchHistory = JSON.parse(
                localStorage.getItem("searchHistory") ?? "[]"
            ) as string[];
            // Remove existing
            const idx = _searchHistory.indexOf(search);
            if (idx > -1) _searchHistory.splice(idx, 1);
            // Insert
            _searchHistory.unshift(search);
            _searchHistory = _searchHistory.slice(0, MAX_HISTORY);
            localStorage.setItem(
                "searchHistory",
                JSON.stringify(_searchHistory)
            );
            this.searchHistory = _searchHistory
        },
        async fetchTopSearch() {
            this.topSearch = [];
            this.topSearch = await getTopSearch();
        },
        async fetchTopComms() {
            this.topComms = [];
            this.topComms = await getTopComms();
        },
        reloadSearchHistory() {
            let _searchHistory = JSON.parse(
                localStorage.getItem("searchHistory") ?? "[]"
            ) as string[];
            _searchHistory = _searchHistory.slice(0, MAX_HISTORY);
            this.searchHistory = _searchHistory;
        }
    }
});
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
