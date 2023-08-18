<template>
    <button class="btn-topico py-2 px-6">
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
    font-size: 1em;
    color: #fff;
    background-color: $primaryColor;
    border-radius: 8px;
    &:hover {
        background-color: $pink700;
        cursor: pointer;
        transform: scale(1.02);
    }
    transition: all 0.16s ease-out;
}
</style>
