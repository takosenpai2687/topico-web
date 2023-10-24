<template>
    <TopicoTitleCard class="info-card" title="# My Info">
        <div class="avatar">
            <img :src="avatarUrl" :draggable="false" />
        </div>
        <p class="my-4 text-center"><strong>Nickname: </strong> {{ user.nickName }}</p>
        <p class="my-4 text-center"><strong>Gender: </strong> {{ gender }}</p>
        <p class="my-4 text-center"><strong>Role: </strong> {{ role }}</p>
        <p class="my-4 text-center"><strong>Location: </strong> {{ user.location }}</p>
        <p class="my-4 text-center"><strong>Description: </strong> {{ user.description }}</p>
        <p class="my-4 text-center"><strong>Cake Day: </strong> {{ cakeDay }}</p>
        <TopicoButton class="mx-auto px-6 py-1" @click="() => $router.push('/profile')">Edit Profile</TopicoButton>
    </TopicoTitleCard>
</template>

<script lang="ts">
import TopicoTitleCard from "@/components/common/TopicoTitleCard.vue";
import TopicoButton from "@/components/common/TopicoButton.vue";
import useGlobalStore from "@/stores/global";
import { parseFromUTC } from "@/util/dates";

const GENDER_MAP: any = {
    "NOT_KNOWN": "Unknown",
    "MALE": "Male",
    "FEMALE": "Female",
    "NOT_APPLICABLE": "Not Applicable"
};

const ROLE_MAP: any = {
    "ROLE_ADMIN": "Admin",
    "ROLE_USER": "User"
};


export default {
    name: 'MyInfoCard',
    components: { TopicoTitleCard, TopicoButton },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    computed: {
        user() {
            return this.globalStore.user
        },
        avatarUrl() {
            return `/api/v1/images/${this.user.avatar}`;
        },
        gender() {
            return GENDER_MAP[this.user.gender];
        },
        role() {
            return ROLE_MAP[this.user.role];
        },
        cakeDay() {
            return parseFromUTC(this.user.ctime).toLocaleDateString();
        }
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
