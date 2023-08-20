<template>
    <div class="pink-bg"></div>
    <div class="flex flex-row">
        <div class="content w-2/3">
            <FollowingCard />
            <RecommendedCard />
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
import { useHomeStore } from "@/stores/home";

export default {
    components: { FollowingCard, RecommendedCard, MyInfoCard },
    setup() {
        const homeStore = useHomeStore();
        return { homeStore };
    },
    mounted() {
        getFollowingComms().then((data) => {
            this.homeStore.setFollowingComms(data);
        });
        getRecommendedComms().then((data) => {
            this.homeStore.setRecommendedComms(data);
        });
    },
    created() {
        document.title = "Topico - Home";
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme";
.flex {
    .pink-bg {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        width: 100%;
        height: 296.5px;
        background-color: $primaryColor;
        z-index: 0;
    }
    > * {
        z-index: 1;
    }
}
</style>
