<template>
    <TopicoTitleCard :title="title" class="relative">
        <TopicoButton v-if="checkin" class="btn-checkin">Check in for all</TopicoButton>
        <div :class="`${expanded ? 'overflow-y-visible' : 'max-h-14 overflow-y-hidden'
            } pr-2  mt-1`">
            <div class="grid gap-4 p-1">
                <CommunityPlate v-for="comm in comms" :community="comm" />
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
import { PropType, defineComponent } from "vue";
import useGlobalStore from "@/stores/global";

export default defineComponent({
    name: 'CommsCard',
    components: {
        TopicoTitleCard,
        CommunityPlate,
        CircleButton,
        TopicoButton,
    },
    props: {
        comms: {
            type: Object as PropType<Community[]>,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        checkin: {
            type: Boolean,
            required: false
        }
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return { expanded: false };
    },
    computed: {
        showMore: function () {
            const { isWide, isMobile } = this.globalStore;
            const showMoreWide: boolean =
                isWide && this.comms.length > 4;
            const showMoreNarrow: boolean =
                !isWide && !isMobile && this.comms.length > 3;
            const showMoreMobile: boolean = !isWide && isMobile && this.comms.length > 2;
            return showMoreWide || showMoreNarrow || showMoreMobile;
        },
    }
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.btn-checkin {
    position: absolute;
    top: 1em;
    right: 1em;
    font-size: 0.95em;
    user-select: none;
}

// Mobile
@media screen and (max-width: $mobile-width) {
    .grid {
        grid-template-columns: repeat(2, 1fr);
    }
}

// PC Narrow
@media screen and (max-width: $wide-width) and (min-width: $mobile-width) {
    .grid {
        grid-template-columns: repeat(3, 1fr);
    }
}

// PC Wide
@media screen and (min-width: $wide-width) {
    .grid {
        grid-template-columns: repeat(4, 1fr);
    }
}
</style>
