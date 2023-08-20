<template>
    <div class="flex flex-row justify-center items-center gap-1">
        <img
            :src="user.avatar"
            :alt="profileAlt"
            class="w-10 h-10 rounded-3xl"
            :draggable="false"
        />
        <span class="nickname">{{ user.nickName }}</span>
    </div>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
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
    },
};
</script>

<style lang="scss" scoped>
.nickname {
    line-height: 40px;
    font-size: 1.4em;
    margin-left: 0.4em;
    text-transform: capitalize;
}
</style>
