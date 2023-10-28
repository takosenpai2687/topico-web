<template>
    <div class="flex flex-row items-start justify-between relative">
        <div class="content-main z-10">
            <!-- Community Name -->
            <TopicoCard>
                <h2 class="p-2 font-bold text-xl">#&nbsp;{{ community?.name }}</h2>
            </TopicoCard>
            <!-- Create a Post -->
            <TopicoTitleCard title="# Create a Post">
                <CreatePostForm :community-id="communityId" />
            </TopicoTitleCard>
            <!-- Trending -->
            <SectionHeader class="py-4 px-2 flex flex-row items-center justify-start gap-3 select-none">
                <span class="text-xl font-bold"># Trending in {{ community?.name }}</span>
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
                <PostCard v-for="post in trending" :post="post" />
            </div>
            <!-- Pagination -->
            <div class="w-full flex flex-row justify-center items-center pb-8 pt-4">
                <n-pagination :default-page-size="size" class="mx-auto" v-model:page="page" :page-count="totalPages"
                    @update-page="handleGoToPage" />
            </div>
        </div>
        <div class="content-side z-10">

            <!-- Community Info -->
            <TopicoTitleCard :title="`# ${community?.name}`">
                <!-- Description -->
                <p>{{ community?.description }}</p>

                <!-- Created -->
                <div class="flex flex-row justify-between my-4 mx-auto">
                    <strong>Created: </strong>
                    <span>{{ communityCDate }}</span>
                </div>

                <!-- Followers -->
                <div class="flex flex-row justify-between my-4 mx-auto">
                    <strong>Followers: </strong>
                    <span>{{ community?.followers }}</span>
                </div>

                <!-- Ranking -->
                <div class="flex flex-row justify-between my-4 mx-auto">
                    <strong>Rank by size: </strong>
                    <span>{{ community?.rank ?? 'N/A' }}</span>
                </div>

                <!-- Follow Button -->
                <div>
                    <TopicoButton v-if="!isFollowed" class="w-full" @click="handleFollow">Follow</TopicoButton>
                    <TopicoButton v-if="isFollowed" class="w-full" color="#333" @click="handleUnfollow">Unfollow
                    </TopicoButton>
                </div>

                <!-- Admin: Delete Button -->
                <div>
                    <TopicoButton v-if="isAdmin" class="w-full mt-4" color="#E53935" @click="handleDelete">ADMIN: Delete
                    </TopicoButton>
                </div>

            </TopicoTitleCard>

            <!-- My Community Info -->
            <TopicoTitleCard v-if="userCommunity" title="# My Stats">

                <!-- Username and Avatar -->
                <UserNameAvatar :user="globalStore.user" />

                <!-- Stats -->
                <p class="my-4 text-center"><strong>Cake Day: </strong> {{ joinDate }}</p>

                <!-- Exp -->

                <p class="font-bold text-center">Level {{ userCommunity.level }}</p>
                <div class="flex flex-row justify-between items-center my-4 mx-auto gap-2 w-4/5">
                    <strong>Exp: </strong>
                    <n-progress type="line" :percentage="expPercentage" :indicator-placement="'inside'" processing />
                </div>

                <!-- Checkin -->
                <TopicoButton class="mx-auto" :disabled="isCheckedin" @click="handleCheckin">Checkin</TopicoButton>

            </TopicoTitleCard>
        </div>
    </div>
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";
import TopicoTitleCard from "@/components/common/TopicoTitleCard.vue";
import { checkin, deleteCommunity, follow, getCommunityById, getUserCommunity, unfollow } from "@/services/communityService";
import TopicoCard from "@/components/common/TopicoCard.vue";
import CreatePostForm from '@/components/post/CreatePostForm.vue';
import { getTrendingHot, getTrendingNew } from '@/services/communityService';
import TopicoButton from '@/components/common/TopicoButton.vue';
import PostCard from "@/components/common/PostCard.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import { useDialog, useMessage, NDialog, NProgress, NPagination } from "naive-ui";
import UserNameAvatar from "@/components/common/UserNameAvatar.vue";
import { parseFromUTC } from "@/util/dates";

export default {
    name: 'Community',
    components: {
        TopicoTitleCard, TopicoCard, CreatePostForm, TopicoButton,
        PostCard, SectionHeader, NDialog, UserNameAvatar, NProgress, NPagination
    },
    setup() {
        const globalStore = useGlobalStore();
        const message = useMessage();
        const dialog = useDialog();
        return { globalStore, message, dialog };
    },
    async created() {
        document.title = `Topico - loading...`;
        this.globalStore.setShowWaves(true);
        this.fetchData();
    },
    data() {
        return {
            communityId: Number(this.$route.params.id),
            sortTypeIdx: 0,
            community: undefined as Community | undefined,
            userCommunity: undefined as UserCommunity | undefined | null,
            isFollowed: false,
            trending: [] as Post[],
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
            page: 1,
            size: 10,
            total: 0
        };
    },
    computed: {
        communityCDate() {
            return parseFromUTC(this.community?.ctime).toLocaleDateString();
        },
        joinDate() {
            if (!this.isFollowed || !this.userCommunity) return "N/A";
            return parseFromUTC(this.userCommunity.ctime).toLocaleDateString();
        },
        expPercentage() {
            if (!this.userCommunity) return 0;
            return this.userCommunity.exp / this.userCommunity.nextExp * 100;
        },
        isCheckedin() {
            return this.userCommunity?.checkin.checkedToday;
        },
        checkinDays() {
            return this.userCommunity?.checkin.checkinDays;
        },
        totalPages() {
            return Math.ceil(this.total / this.size);
        },
        isAdmin() {
            return this.globalStore.user?.role === "ROLE_ADMIN";
        }
    },
    beforeUnmount() {
        this.globalStore.setShowBanner(false);
        this.globalStore.setBanner("");
    },
    methods: {
        handleClickToggle() { this.globalStore.toggleShowSpoilers() },
        async fetchData() {
            getCommunityById(this.communityId!).then(c => {
                this.community = c;
                this.globalStore.setShowBanner(this.community.banner !== null);
                this.globalStore.setWaterLevel((window.innerHeight ?? 400) * 0.382);
                this.globalStore.setBanner(`/api/v1/images/${this.community.banner}`);
                document.title = `Topico - ${this.community.name}`;
            });
            getUserCommunity(this.communityId!).then(uc => {
                this.userCommunity = uc;
                this.isFollowed = this.userCommunity !== null;
            });
            this.fetchTrending();
        },
        handleSetSortType(idx: number) {
            if (idx === this.sortTypeIdx) return;
            this.sortTypeIdx = idx;
            this.fetchTrending();
        },
        async fetchTrending() {
            this.trending = [];
            await this.sortTypes[this.sortTypeIdx].fetchFn();
        },
        async fetchTrendingHot() {
            this.trending = [];
            const trendingPager = await getTrendingHot(this.communityId, this.page, this.size);
            this.trending = trendingPager.data;
            this.page = trendingPager.page;
            this.size = trendingPager.size;
            this.total = trendingPager.total;
        },
        async fetchTrendingNew() {
            this.trending = [];
            const trendingPager = await getTrendingNew(this.communityId, this.page, this.size);
            this.trending = trendingPager.data;
            this.page = trendingPager.page;
            this.size = trendingPager.size;
            this.total = trendingPager.total;
        },
        handleFollow() {
            follow(this.communityId).then(_ => {
                this.isFollowed = true;
                this.message.success("Followed community: " + this.community?.name);
                this.fetchData();
            }).catch(err => {
                console.error(err);
                this.message.error("Failed to follow community");
            });
        },
        handleUnfollow() {
            this.dialog.warning({
                title: 'Warning',
                content: `Are you sure to unfollow ${this.community?.name ?? 'this community'}? All your exp will be gone!`,
                positiveText: 'Yes',
                negativeText: 'No',
                onPositiveClick: () => {
                    unfollow(this.communityId).then(_ => {
                        this.isFollowed = false;
                        this.message.success("Unfollowed community: " + this.community?.name);
                        this.fetchData();
                    }).catch(err => {
                        console.error(err);
                        this.message.error("Failed to unfollow community");
                    });
                }
            });

        },
        async handleCheckin() {
            checkin(this.communityId).then(_ => {
                this.message.success("Checkin success");
                this.fetchData();
            }).catch(err => {
                console.error(err);
                this.message.error("Failed to checkin");
                this.fetchData();
            });
        },
        handleGoToPage(page: number) {
            this.page = page;
            this.fetchData();
        },
        async handleDelete() {
            this.dialog.warning({
                title: 'Warning',
                content: `Are you sure to delete ${this.community?.name ?? 'this community'}?`,
                positiveText: 'Yes',
                negativeText: 'No',
                onPositiveClick: async () => {
                    const res = await deleteCommunity(this.communityId);
                    if (res.code !== 200) {
                        this.message.error('Failed to delete community: ' + res.message);
                    } else {
                        this.message.success('Community deleted');
                        this.$router.push('/');
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped> @import "@/styles/mixins.scss";

 .banner {
     width: 100%;
     height: 320px;
     background-size: cover;
 }

 .content-main {
     width: 66.67%;
     height: 100%;

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
 }

 .content-side {
     width: 33.3%;
     height: 100%;
 }
</style>
