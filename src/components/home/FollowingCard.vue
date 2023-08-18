<template>
    <TopicoTitleCard title="# Following" class="relative">
        <TopicoButton class="btn-checkin">Check in for all</TopicoButton>
        <div
            :class="`${
                expanded ? 'overflow-y-visible' : 'max-h-16 overflow-y-hidden'
            } pr-2`"
        >
            <div class="grid gap-4 p-1">
                <TopicoCommunityTag
                    v-for="comm in homeStore.followingComms"
                    :community="comm"
                />
            </div>
        </div>
        <CircleButton
            class="mx-auto mt-2 -mb-2"
            :icon="`fa-solid ${expanded ? 'fa-angle-up' : 'fa-angle-down'}`"
            @click="() => (expanded = !expanded)"
        />
    </TopicoTitleCard>
</template>

<script lang="ts">
import TopicoCommunityTag from "@/components/common/CommunityTag.vue";
import CircleButton from "@/components/common/CircleButton.vue";
import TopicoTitleCard from "@/components/common/TopicoTitleCard.vue";
import TopicoButton from "@/components/common/TopicoButton.vue";
import { useHomeStore } from "@/stores/home";

export default {
    components: {
        TopicoTitleCard,
        TopicoCommunityTag,
        CircleButton,
        TopicoButton,
    },
    setup() {
        const homeStore = useHomeStore();
        return { homeStore };
    },
    data() {
        return { expanded: false };
    },
};
</script>

<style lang="scss" scoped>
.btn-checkin {
    position: absolute;
    top: 1em;
    right: 1em;
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
