<template>
    <RouterLink
        :class="`${hovered || active ? 'topico-btn hovered' : 'topico-btn'}`"
        :to="to"
        @mouseover="onHover"
        @mouseleave="onLeave"
        ><font-awesome-icon class="fa-icon" :icon="icon ?? ''" />{{ text }}
        <slot />
    </RouterLink>
</template>

<script lang="ts">
import { RouterLink } from "vue-router";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
export default {
    props: {
        icon: {
            type: String,
            required: false,
        },
        text: {
            type: String,
            required: true,
        },
        to: {
            type: String,
            required: true,
        },
        active: {
            type: Boolean,
            required: false,
        },
    },
    components: { RouterLink, FontAwesomeIcon },
    data() {
        return {
            hovered: false,
        };
    },
    methods: {
        onHover() {
            this.hovered = true;
        },
        onLeave() {
            this.hovered = false;
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/theme";
.topico-btn {
    user-select: none;
    outline: none;
    border: none;
    border-radius: 4px;
    font-size: 1.1em;
    font-weight: bold;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 3em;
    background-color: #f5f5f5;
    width: 90%;
    transition: 0.1s all ease-out;
    .fa-icon {
        display: block;
        font-size: 0.8em;
        text-align: right;
        margin-right: 0.5em;
    }

    a {
        text-align: left;
    }

    &.hovered {
        background-color: $primaryColor;
        color: #fff;
        .fa-icon {
            color: #fff !important;
            svg > path {
                color: #fff !important;
            }
        }
    }
}
</style>
