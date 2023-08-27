<template>
    <div class="flex flex-row">
        <div class="content w-2/3">
            <FollowingCard v-if="homeStore.followingComms.length" ref="followingCardRef" />
            <RecommendedCard v-if="homeStore.recommendedComms.length" />
            <MyPosts />
        </div>
        <div class="content w-1/3">
            <MyInfoCard />
            <MyComments />
        </div>
    </div>
</template>

<script lang="ts">
import FollowingCard from "@/components/home/FollowingCard.vue";
import MyComments from "@/components/home/MyComments.vue";
import MyInfoCard from "@/components/home/MyInfoCard.vue";
import RecommendedCard from "@/components/home/RecommendedCard.vue";

import MyPosts from "@/components/home/MyPosts.vue";
import {
    getFollowingComms,
    getMyComments,
    getMyPosts,
    getRecommendedComms,
} from "@/services/userService";
import useGlobalStore from "@/stores/global";
import useHomeStore from "@/stores/home";

export default {
    name: 'Home',
    components: {
        FollowingCard,
        RecommendedCard,
        MyInfoCard,
        MyPosts,
        MyComments,
    },
    setup() {
        const homeStore = useHomeStore();
        const globalStore = useGlobalStore();
        return { homeStore, globalStore };
    },
    created() {
        document.title = "Topico - Home";
        this.globalStore.setShowWaves(true);
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
        getMyComments().then((data) => {
            this.homeStore.setMyComments(data);
        });
        this.globalStore.setWaterLevel(280);
    },
};
</script>

<style lang="scss" scoped></style>
