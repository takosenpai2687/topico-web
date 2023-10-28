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
            <!-- Comms Card -->
            <CommsCard :comms="comms" title="# Communities" />
            <!-- Trending Sorting Types -->
            <div class="sorts flex flex-row items-center justify-start gap-3 px-2 select-none">
                <TopicoButton class="btn-sort" :class="{ active: idx === sortTypeIdx }" v-for="(sortType, idx) in sortTypes"
                    @click="() => handleSetSortType(idx)">{{ sortType.name }}
                </TopicoButton>
            </div>
            <!-- Posts -->
            <PostCard v-for="post in posts" :post="post" title="# Posts" />
            <!-- Pagination -->
            <div class="w-full flex flex-row justify-center items-center pb-8 pt-4">
                <n-pagination class="mx-auto" v-model:page="page" :page-count="totalPages" @update-page="handleGoToPage" />
            </div>
        </div>
        <!-- Right Side -->
        <div class="content-side">
            <div class="content-side-inner">
                <!-- Top Search -->
                <TopicoTitleCard title="# Top Search" :delay="0">
                    <ul class="px-2">
                        <li class="py-1 flex flex-row items-center justify-start gap-3"
                            v-for="(searchItem, idx) in Object.keys(topSearch)">
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
import CommsCard from "@/components/common/CommsCard.vue";
import { NPagination } from "naive-ui";


export default defineComponent({
    name: 'SearchResult',
    components: {
        SearchBar,
        SearchHistory,
        SectionHeader,
        TopicoTitleCard,
        CommunityPlate,
        TopicoButton,
        PostCard,
        CommsCard,
        NPagination
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
            posts: [] as Post[],
            page: 1,
            total: 0,
            size: 0,
            DELAY,
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
        };
    },
    created() {
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(300);
        this.$watch(
            () => this.$route.params,
            (_toParams, _previousParams) => {
                const path = this.$route.path;
                if (path.startsWith('/explore/'))
                    this.onMounted();
            }
        );
    },
    mounted() {
        this.onMounted();
    },
    computed: {
        totalPages() {
            return Math.ceil(this.total / this.size);
        }
    },
    methods: {
        onMounted() {
            this.search = ((this.$route.params.search as string) ?? "").trim();
            if (!this.search || this.search.length === 0) {
                this.$router.push("/explore");
                return;
            }
            document.title = "Topico Search - " + this.search;
            this.loadSearchHistory();
            this.fetchData();
        },
        toggleEditing() {
            this.editing = !!!this.editing;
        },
        handleSetSortType(idx: number) {
            if (idx === this.sortTypeIdx) return;
            this.sortTypeIdx = idx;
            this.fetchPosts();
        },
        async fetchPosts() {
            this.posts = [];
            await this.sortTypes[this.sortTypeIdx].fetchFn();
        },
        async fetchTrendingHot() {
            searchKeyword(this.search, this.page, 10, "MOST_LIKES").then(searchResult => {
                this.comms = searchResult.communities;
                this.posts = searchResult.posts.data;
                this.page = searchResult.posts.page;
                this.total = searchResult.posts.total;
                this.size = searchResult.posts.size;
            });
        },
        async fetchTrendingNew() {
            searchKeyword(this.search, this.page, 10, "NEWEST").then(searchResult => {
                this.comms = searchResult.communities;
                this.posts = searchResult.posts.data;
                this.page = searchResult.posts.page;
                this.total = searchResult.posts.total;
                this.size = searchResult.posts.size;
            });
        },
        async fetchData() {
            const keyword = this.search;
            if (!keyword || keyword.length === 0) {
                this.$router.push("/explore");
            }
            this.fetchTopSearch();
            this.fetchTopComms();
            this.fetchPosts();
        },
        loadSearchHistory() {
            const { search } = this;
            if (!search || search.length === 0) {
                this.$router.push("/explore");
                return;
            }
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
            this.topSearch = {} as any;
            this.topSearch = await getTopSearch() as any;
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
        },
        async handleGoToPage(page: number) {
            this.page = page;
            this.fetchData();
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
     background-color: #fff !important;
     color: var(--primary-color) !important;

     &.active {
         background-color: var(--primary-color) !important;
         color: #fff !important;
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

         }
     }
 }
</style>
