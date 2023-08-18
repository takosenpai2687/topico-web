<template>
    <div class="flex flex-row justify-center align-middle gap-1">
        <img
            :src="avatarUrl"
            :alt="profileAlt"
            class="w-10 h-10 rounded-3xl"
            :draggable="false"
        />
        <span class="nickname">{{ nickName }}</span>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        avatarUrl: { type: String, required: true },
        nickName: { type: String, required: true },
    },
    data() {
        return {};
    },
    computed: {
        profileAlt: function () {
            return this.nickName.charAt(0) ?? "";
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
