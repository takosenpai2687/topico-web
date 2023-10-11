<template>
    <div class="wrapper flex">
        <div class="content content-main">
            <CommsCard v-if="followingComms.length" title="# Subscribed" :comms="followingComms" checkin />
            <CommsCard v-if="recommendedComms.length" title="# Recommended" :comms="recommendedComms" />
            <MyPosts />
        </div>
        <div class="content content-side">
            <MyInfoCard />
            <MyComments />
        </div>
    </div>
</template>

<script lang="ts">
import MyComments from "@/components/home/MyComments.vue";
import MyInfoCard from "@/components/home/MyInfoCard.vue";
import CommsCard from '@/components/common/CommsCard.vue';

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
        MyInfoCard,
        MyPosts,
        MyComments,
        CommsCard
    },
    setup() {
        const homeStore = useHomeStore();
        const globalStore = useGlobalStore();
        return { homeStore, globalStore };
    },
    data() {
        return {
            followingComms: [] as Community[],
            recommendedComms: [] as Community[]
        }
    },
    created() {
        document.title = "Topico - Home";
        this.globalStore.setShowWaves(true);
    },
    mounted() {
        getFollowingComms().then((data) => {
            console.log(data);
            this.followingComms = data;
        });
        getRecommendedComms().then((data) => {
            this.recommendedComms = data;
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

<style lang="scss" scoped>
@import "@/styles/mixins.scss";


// PC
@media screen and (min-width: $mobile-width) {
    .wrapper {
        display: flex;
        flex-direction: row;

        .content-main {
            width: 66.66667%;
        }

        .content-side {
            width: 33.33333%;
        }
    }
}

// Mobile
@media screen and (max-width: $mobile-width) {
    .wrapper {
        display: flex;
        flex-direction: column;
    }
}
</style>
