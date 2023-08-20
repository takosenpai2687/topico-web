<template>
    <div class="tag p-2">
        <img
            :src="community.avatar"
            :alt="community.name.charAt(0).toLocaleUpperCase()"
            :draggable="false"
        />
        <p>{{ community.name }}</p>
    </div>
</template>

<script lang="ts">
export default {
    props: ["community"],
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins";
@import "@/styles/theme";

.tag {
    @include card-shadow-rounded;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    user-select: none;
    transition: all 0.16s ease-out;

    img {
        width: 40px;
        height: 40px;
        border-radius: 8px;
    }

    p {
        display: block;
        width: 160px;
        font-size: 0.9em;
        line-height: 1.2em;
        font-weight: bold;
        margin-left: 0.5em;
        overflow: hidden;
        text-overflow: ellipsis;
    }

    &:hover {
        cursor: pointer;
        p {
            color: #fff;
        }
        background-color: $primaryColor;
    }
}
</style>
