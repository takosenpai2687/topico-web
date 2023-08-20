<template>
    <div class="flex flex-row">
        <div class="content w-2/3">
            <FollowingCard />
            <RecommendedCard />
            <SectionHeader class="px-4 py-1"># My Posts</SectionHeader>
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
import SectionHeader from "@/components/common/SectionHeader.vue";

export default {
    components: { FollowingCard, RecommendedCard, MyInfoCard, SectionHeader },
    setup() {
        const homeStore = useHomeStore();
        const globalStore = useGlobalStore();
        return { homeStore, globalStore };
    },
    created() {
        document.title = "Topico - Home";
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(296.5);
    },
    mounted() {
        getFollowingComms().then((data) => {
            this.homeStore.setFollowingComms(data);
        });
        getRecommendedComms().then((data) => {
            this.homeStore.setRecommendedComms(data);
        });
    },
};
</script>

<style lang="scss" scoped></style>
