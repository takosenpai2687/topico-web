<template>
    <button class="btn-topico py-1 px-4">
        <slot />
    </button>
</template>

<script lang="ts">
export default {
    name: 'TopicoButton'
};
</script>

<style lang="scss" scoped> .btn-topico {
     display: block;
     font-size: 1em;
     color: #fff;
     background-color: var(--primary-color);
     border-radius: 20px;

     &:hover {
         background-color: var(--primary-color);
         cursor: pointer;
         transform: scale(1.05);
         color: #fcfcfc;
     }

     transition: all 0.16s ease-out;
 }
</style>
