<template>
    <RouterLink :to="`/community/${community.id}`" class="tag p-1">
        <img
            :src="community.avatar"
            :alt="community.name.charAt(0).toLocaleUpperCase()"
            :draggable="false"
        />
        <span>{{ community.name }}</span>
    </RouterLink>
</template>

<script lang="ts">
import { PropType } from "vue";

export default {
    props: {
        community: {
            type: Object as PropType<Community>,
            required: true,
        },
    },
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
    transition: all 0.16s ease-out;

    img {
        width: 3em;
        height: 3em;
        border-radius: 0.25em;
        user-select: none;
    }

    span {
        display: block;
        width: 10em;
        font-size: 0.9em;
        line-height: 1.2em;
        font-weight: bold;
        margin-left: 0.5em;
        overflow: hidden;
        text-overflow: ellipsis;
        text-underline-offset: 8px;
    }

    &:hover {
        cursor: pointer;
        span {
            color: #fff;
            text-decoration: underline !important;
        }
        background-color: $primaryColor;
    }
}
</style>
