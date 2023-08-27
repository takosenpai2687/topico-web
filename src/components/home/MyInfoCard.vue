<template>
    <TopicoTitleCard class="info-card" title="# My Info">
        <div class="avatar">
            <img :src="user.avatar" :draggable="false" />
        </div>
        <p class="nickName">{{ user.nickName }}</p>
        <p class="nickName">{{ user.nickName }}</p>
        <p class="nickName">{{ user.nickName }}</p>
        <p class="nickName">{{ user.nickName }}</p>
        <p class="nickName">{{ user.nickName }}</p>
        <p class="nickName">{{ user.nickName }}</p>
        <p class="nickName">{{ user.nickName }}</p>
        <p class="nickName">{{ user.nickName }}</p>
        <TopicoButton class="mx-auto px-6 py-1">Edit Profile</TopicoButton>
    </TopicoTitleCard>
</template>

<script lang="ts">
import { getUserFromLocalStorage } from "@/util/auth";
import TopicoTitleCard from "@/components/common/TopicoTitleCard.vue";
import TopicoButton from "@/components/common/TopicoButton.vue";

export default {
    name: 'MyInfoCard',
    components: { TopicoTitleCard, TopicoButton },
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
            width: 4em;
            height: 4em;
            border-radius: 2em;
            margin: 0 auto;
            user-select: none;
        }
    }

    .nickName {
        margin: .5em auto;
        text-align: center;
    }
}
</style>
