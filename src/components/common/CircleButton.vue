<template>
    <div class="btn">
        <font-awesome-icon v-if="icon" :icon="icon" />
        <slot />
    </div>
</template>

<script lang="ts">
export default {
    props: {
        icon: {
            required: false,
            type: String,
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";
.btn {
    width: 2.5em;
    height: 2.5em;
    display: flex;
    user-select: none;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
    border-radius: 1.25em;
    color: $primaryFontColor;
    transition: 0.24s all ease-out;
    &:hover {
        background-color: #eee;
        cursor: pointer;
    }
}
</style>
