<template>
    <TopicoTitleCard title="# Notifications">
        <div class="pt-2"></div>
        <div class="notification-item" v-for="notification in notifications" :key="notification.id">
            <!-- Link -->
            <RouterLink class="notification-link" :to="notification.url">{{ notification.content }}</RouterLink>
            <div class="flex flex-row items-center justify-end gap-8">
                <!-- Time -->
                <span>{{ timeAgo(notification.ctime) }}</span>
                <!-- Delete notification -->
                <TopicoButton class="notification-btn" color="#E53935" @click="() => clickReadMessage(notification.id)">
                    <font-awesome-icon icon="fa-solid fa-trash-can" />
                    <span>Delete</span>
                </TopicoButton>
            </div>
        </div>
    </TopicoTitleCard>
</template>

<script lang="ts">
import { getNotifications, readNotification } from '@/services/notificationService';
import useGlobalStore from '@/stores/global';
import { useMessage, NButton } from 'naive-ui';
import { defineComponent } from 'vue';
import TopicoTitleCard from '@/components/common/TopicoTitleCard.vue';
import TopicoButton from '@/components/common/TopicoButton.vue';
import { getTimeDiff } from '@/util/dates';

const FETCH_INTERVAL_MS = 5000;


export default defineComponent({
    name: 'Notifications',
    setup() {
        const globalStore = useGlobalStore();
        const message = useMessage();
        return { globalStore, message }
    },
    data() {
        return {
            notifications: [] as TopicoNotification[],
            loading: false,
            timer: undefined as NodeJS.Timeout | undefined
        }
    },
    components: { NButton, TopicoTitleCard, TopicoButton },
    created() {
        document.title = "Topico - Notifications";
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(window.innerHeight * .382);
        this.timer = setInterval(() => {
            this.fetchData();
        }, FETCH_INTERVAL_MS);
        this.fetchData();
    },
    beforeUnmount() {
        if (this.timer) {
            clearInterval(this.timer);
        }
    },
    methods: {
        async fetchData() {
            this.loading = true;
            this.notifications = await getNotifications();
            this.loading = false;
        },
        async clickReadMessage(notificationId: number) {
            this.message.success('Removed notification ' + notificationId);
            if (!notificationId) return;
            const res: any = await readNotification(notificationId);
            if (res.code !== 200) {
                this.message.error('Failed to read notification.');
            } else {
                this.message.success('Read notification success.');
            }
            this.fetchData();
        },
        timeAgo(fromTime: Date) {
            return `${getTimeDiff(fromTime, new Date())} ago`;
        },
    }

})
</script>

<style lang="scss" scoped>
.notification-item {
    padding: 1em 0;
    border-top: 1px solid #eee;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;

    a.notification-link {
        color: var(--primary-color);
        text-decoration: none;
        font-weight: 500;
        font-size: 1.1em;
        transition: all .1s ease-out;
    }

    &:hover {

        a.notification-link {
            transform: scale(1.05);
            text-decoration: underline;
        }
    }

    .notification-btn {
        display: flex;
        justify-content: space-around;
        align-items: center;
        gap: .5em;

        span {
            color: #fff;
        }
    }
}
</style>