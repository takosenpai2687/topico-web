<template>
    <TopicoTitleCard :title="title" class="relative">
        <TopicoButton v-if="checkin" class="btn-checkin" @click="handleCheckinForAll">Check in for all</TopicoButton>
        <div :class="`${expanded ? 'overflow-y-visible' : 'max-h-12 overflow-y-hidden'
            } pr-2  mt-1`">
            <div class="comms-flex flex flex-row flex-wrap justify-between gap-x-3 gap-y-4 ">
                <CommunityPlate :class="`${globalStore.isMobile ? 'w-1/3' : 'w-1/4'} grow flex-item`"
                    v-for="comm in  comms " :community="comm" :key="Date.now()"/>
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
import { checkinForAll } from "@/services/communityService";
import { useMessage } from "naive-ui";

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
        },
        onCheckin: {
            type: Function as PropType<() => Promise<void>>,
            required: false
        }
    },
    setup() {
        const globalStore = useGlobalStore();
        const message = useMessage();
        return { globalStore, message };
    },
    data() {
        return { expanded: false };
    },
    computed: {
        showMore: function () {
            const THRESHOLD = this.globalStore.isMobile ? 2 : 3;
            return this.comms.length > THRESHOLD;
        },
    },
    methods: {
        async handleCheckinForAll(e: MouseEvent) {
            e.stopPropagation();
            const res = await checkinForAll();
            this.message.success(res.message);
            this.onCheckin?.();
        }
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

.comms-flex {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;

    .flex-item {
        flex: 0 0 30%;
    }
}

// // Mobile
// @media screen and (max-width: $mobile-width) {
//     .grid {
//         grid-template-columns: repeat(2, 1fr);
//     }
// }

// // PC Narrow
// @media screen and (max-width: $wide-width) and (min-width: $mobile-width) {
//     .grid {
//         grid-template-columns: repeat(3, 1fr);
//     }
// }

// // PC Wide
// @media screen and (min-width: $wide-width) {
//     .grid {
//         grid-template-columns: repeat(4, 1fr);
//     }
// }
</style>
