<template>
    <div class="btn">
        <font-awesome-icon :icon="icon" />
    </div>
</template>

<script lang="ts">
export default {
    props: {
        icon: {
            required: true,
            type: String,
        },
    },
};
</script>

<style lang="scss" scoped>
.btn {
    width: 40px;
    height: 40px;
    display: flex;
    user-select: none;
    align-items: center;
    justify-content: center;
    background-color: #fff;
    box-shadow: 0 0 4px 1px rgba(0, 0, 0, 0.1);
    border-radius: 20px;
    color: #61666d;
    &:hover {
        background-color: #eee;
        cursor: pointer;
    }
}
</style>
