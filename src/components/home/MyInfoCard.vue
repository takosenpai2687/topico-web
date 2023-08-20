<template>
    <TopicoTitleCard class="info-card" title="# My Info">
        <div class="avatar">
            <img :src="user.avatar" :draggable="false" />
        </div>
        <p class="nickName">{{ user.nickName }}</p>
    </TopicoTitleCard>
</template>

<script lang="ts">
import { getUserFromLocalStorage } from "@/util/auth";
import TopicoTitleCard from "../common/TopicoTitleCard.vue";

export default {
    components: { TopicoTitleCard },
    computed: {
        user() {
            return getUserFromLocalStorage();
        },
    },
};
</script>

<style lang="scss" scoped>
.info-card {
    width: 100%;

    .avatar {
        img {
            width: 64px;
            height: 64px;
            border-radius: 32px;
            margin: 0 auto;
            user-select: none;
        }
    }

    .nickName {
        margin: 1em auto;
        text-align: center;
    }
}
</style>
