<template>
    <button class="btn-topico py-1 px-4">
        <slot />
    </button>
</template>

<script lang="ts">
export default {
    setup() {
        return {};
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.btn-topico {
    display: block;
    font-size: 1em;
    color: #fff;
    background-color: $primaryColor;
    border-radius: 20px;
    &:hover {
        background-color: $pink700;
        cursor: pointer;
        transform: scale(1.05);
        color: #fcfcfc;
    }
    transition: all 0.16s ease-out;
}
</style>
