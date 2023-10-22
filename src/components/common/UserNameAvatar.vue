<template>
    <div class="flex flex-row justify-center items-center gap-1">
        <img :src="avatarUrl" :alt="profileAlt" class="w-8 h-8 rounded-3xl" :draggable="false" />
        <span class="nickname">{{ user.nickName }}</span>
    </div>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
    name: "UserNameAvatar",
    props: {
        user: {
            type: Object as PropType<User>,
            required: true,
        },
    },
    data() {
        return {};
    },
    computed: {
        profileAlt: function () {
            return (this.user.nickName ?? "").charAt(0);
        },
        avatarUrl () {
            return `/api/v1/images/${this.user.avatar}`
        }
    },
};
</script>

<style lang="scss" scoped>
.nickname {
    font-size: 1.2em;
    margin-left: 0.2em;
}
</style>
