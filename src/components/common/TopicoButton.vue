<template>
    <button :disabled="disabled" class="btn-topico py-2 px-6" :style="{ backgroundColor }">
        <slot />
    </button>
</template>

<script lang="ts">
export default {
    name: 'TopicoButton',
    props: {
        disabled: {
            type: Boolean,
            default: false,
            required: false
        },
        color: {
            type: String,
            required: false
        }
    },
    computed: {
        backgroundColor: function () {
            if (this.disabled) return '#bbb';
            return this.color ?? 'var(--primary-color)';
        }
    }
};
</script>

<style lang="scss" scoped> .btn-topico {
     display: block;
     font-size: 1.1em;
     line-height: 1.2em;
     color: #fff;
     border-radius: 2em;
     letter-spacing: .1em;

     &:hover:not(:disabled) {
         cursor: pointer;
         transform: scale(1.05);
         color: #fcfcfc;
     }

     &:disabled {
         background-color: #bbb;

         &:hover {
             cursor: not-allowed;
         }
     }

     transition: all 0.16s ease-out;
 }
</style>
