<template>
    <div>
        <TopicoCard v-for="notification in notifications" :key="notification.id">
            <RouterLink :to="notification.url">{{ notification.content }}</RouterLink>
        </TopicoCard>
    </div>
</template>

<script lang="ts">
import { getNotifications } from '@/services/notificationService';
import useGlobalStore from '@/stores/global';
import { useMessage, NButton } from 'naive-ui';
import { defineComponent } from 'vue';
import TopicoCard from '@/components/common/TopicoCard.vue';


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
            loading: false
        }
    },
    components: { NButton, TopicoCard },
    created() {
        document.title = "Topico - Notifications";
        this.globalStore.setShowWaves(true);
        this.globalStore.setWaterLevel(496.5);
        this.fetchData();
    },
    methods: {
        async fetchData() {
            this.loading = true;
            this.notifications = await getNotifications();
            this.loading = false;
        }
    }

})
</script>

<style lang="scss" scoped></style>