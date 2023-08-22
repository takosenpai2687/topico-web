<template>
    <RouterLink :to="`/community/${community.id}`" class="tag p-1">
        <img
            :src="community.avatar"
            :alt="community.name.charAt(0).toLocaleUpperCase()"
            :draggable="false"
        />
        <span>{{ community.name }}</span>
        <div v-if="community.level" class="level">{{ community.level }}</div>
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
    position: relative;

    img {
        width: 2em;
        height: 2em;
        border-radius: 0.25em;
        user-select: none;
    }

    span {
        display: block;
        width: 10em;
        font-size: 0.8em;
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

    .level {
        position: absolute;
        width: 2em;
        height: 2em;
        border-radius: 1em;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 0.8em;
        color: #fff;
        background-color: $primaryColor;
        font-weight: bold;
        top: 50%;
        right: 0.5em;
        transform: translateY(-50%);
    }
}
</style>
