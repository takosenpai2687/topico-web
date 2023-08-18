<template>
    <TopicoTitleCard title="# Recommended">
        <div class="max-h-36 overflow-y-auto">
            <div class="grid grid-cols-3 gap-4 p-1 overflow-y-auto">
                <TopicoCommunityTag
                    v-for="comm in homeStore.recommendedComms"
                    :community="comm"
                />
            </div>
        </div>
    </TopicoTitleCard>
</template>

<script lang="ts">
import TopicoCommunityTag from "@/components/common/CommunityTag.vue";
import TopicoTitleCard from "@/components/common/TopicoTitleCard.vue";
import { useHomeStore } from "@/stores/home";

export default {
    components: { TopicoTitleCard, TopicoCommunityTag },
    setup() {
        const homeStore = useHomeStore();
        return { homeStore };
    },
};
</script>

<style lang="scss" scoped>
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
