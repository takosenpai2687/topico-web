<template>
    <div class="mask" v-if="show" @click="handleClose">
        <div class="modal" @click="e => e.stopPropagation()">
            <div class="ctl">
                <span class="title">{{ title ?? '' }}</span>
                <font-awesome-icon class="fa-close" @click="handleClose" icon="fa-solid fa-xmark" />
            </div>
            <div class="pt-2">
                <slot />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    name: 'Modal',
    props: {
        title: {
            type: String,
            required: false
        },
        show: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        handleClose(e: MouseEvent) {
            e.stopPropagation();
            this.$emit('modalClose');
        }
    }
})
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

.mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 9999999;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    backdrop-filter: blur(2em);
    -webkit-backdrop-filter: blur(2em);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease-out;

    .modal {
        @include card-shadow;
        padding: 1em;
        border-radius: .75em;
        min-width: 20vw;
        margin: auto;

        .ctl {
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;

            .title {
                font-weight: bold;
                font-size: 1.2em;
                line-height: 1.5em;
            }

            .fa-close {
                font-size: 1.2em;
                line-height: 1.5em;
                color: var(--primary-font-color);
                transition: all 0.2s ease-out;

                &:hover {
                    transform: scale(1.2);
                    cursor: pointer;
                }
            }
        }
    }
}
</style>