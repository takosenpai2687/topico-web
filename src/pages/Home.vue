<template>
    <div class="flex flex-row">
        <div class="content w-2/3">
            <FollowingCard v-if="homeStore.followingComms.length" />
            <RecommendedCard v-if="homeStore.recommendedComms.length" />
            <MyPosts />
        </div>
        <div class="content w-1/3">
            <MyInfoCard />
        </div>
    </div>
</template>

<script lang="ts">
import FollowingCard from "@/components/home/FollowingCard.vue";
import RecommendedCard from "@/components/home/RecommendedCard.vue";
import MyInfoCard from "@/components/home/MyInfoCard.vue";

import { getFollowingComms, getRecommendedComms } from "@/services/userService";
import useHomeStore from "@/stores/home";
import useGlobalStore from "@/stores/global";
import MyPosts from "@/components/home/MyPosts.vue";
import { getMyPosts } from "@/services/userService";

export default {
    components: {
        FollowingCard,
        RecommendedCard,
        MyInfoCard,
        MyPosts,
    },
    setup() {
        const homeStore = useHomeStore();
        const globalStore = useGlobalStore();
        return { homeStore, globalStore };
    },
    created() {
        document.title = "Topico - Home";
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(312.47);
    },
    mounted() {
        getFollowingComms().then((data) => {
            this.homeStore.setFollowingComms(data);
        });
        getRecommendedComms().then((data) => {
            this.homeStore.setRecommendedComms(data);
        });
        getMyPosts().then((data) => {
            this.homeStore.setMyPosts(data);
        });
    },
};
</script>

<style lang="scss" scoped></style>
