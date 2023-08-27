<template>
    <TopicoTitleCard title="# Following" class="relative">
        <TopicoButton class="btn-checkin">Check in for all</TopicoButton>
        <div :class="`${expanded ? 'overflow-y-visible' : 'max-h-14 overflow-y-hidden'
            } pr-2  mt-1`">
            <div class="grid gap-4 p-1">
                <CommunityPlate v-for="comm in homeStore.followingComms" :community="comm" />
            </div>
        </div>
        <CircleButton :class="`${expanded ? 'rotate-180' : ''} mx-auto mt-2 -mb-2`" icon="fa-solid fa-angle-down"
            @click="() => (expanded = !expanded)" v-if="showMore" />
    </TopicoTitleCard>
</template>

<script lang="ts">
import CommunityPlate from "@/components/common/CommunityPlate.vue";
import CircleButton from "@/components/common/CircleButton.vue";
import TopicoTitleCard from "@/components/common/TopicoTitleCard.vue";
import TopicoButton from "@/components/common/TopicoButton.vue";
import useHomeStore from "@/stores/home";

export default {
    name: 'FollowingCard',
    components: {
        TopicoTitleCard,
        CommunityPlate,
        CircleButton,
        TopicoButton,
    },
    setup() {
        const homeStore = useHomeStore();
        return { homeStore };
    },
    data() {
        return { expanded: false, isWide: window.innerWidth >= 1600 };
    },
    computed: {
        showMore: function () {
            const showMoreWide: boolean =
                this.isWide && this.homeStore.followingComms.length > 4;
            const showMoreNarrow: boolean =
                !this.isWide && this.homeStore.followingComms.length > 3;
            return showMoreWide || showMoreNarrow;
        },
    },
    methods: {
        onResize() {
            this.isWide = window.innerWidth >= 1600;
        },
    },
    created() {
        this.$nextTick(() => {
            window.addEventListener("resize", this.onResize);
        });
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
    },
};
</script>

<style lang="scss" scoped>
.btn-checkin {
    position: absolute;
    top: 1em;
    right: 1em;
    font-size: 0.95em;
    user-select: none;
}

@media screen and (max-width: 1600px) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

@media screen and (min-width: 1600px) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>
