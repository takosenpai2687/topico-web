<template>
    <div class="tray flex flex-row justify-start items-center gap-8 px-0 py-2">
        <!-- Likes -->
        <div class="tray-item flex flex-row justify-center items-center gap-1">
            <font-awesome-icon class="fa-icon" icon="fa-solid fa-thumbs-up" />
            <span> {{ likes }}</span>
        </div>
        <!-- Dislikes -->
        <div class="tray-item flex flex-row justify-center items-center gap-1">
            <font-awesome-icon class="fa-icon" icon="fa-solid fa-thumbs-down" />
            <span> {{ dislikes }}</span>
        </div>
        <!-- Comments -->
        <div class="tray-item flex flex-row justify-center items-center gap-1">
            <font-awesome-icon class="fa-icon" icon="fa-solid fa-comments" />
            <span> {{ comments }}</span>
        </div>
        <!-- Share -->
        <div class="tray-item flex flex-row justify-center items-center gap-1">
            <font-awesome-icon class="fa-icon" icon="fa-solid fa-share-nodes" />
        </div>
    </div>
</template>

<script lang="ts">
// TODO: onclick $emit

import { defineComponent } from "vue";
export default defineComponent({
    name: 'PostButtonsTray',
    props: {
        readOnly: {
            type: Boolean,
            required: false,
        },
        likes: {
            type: Number,
            required: true,
        },
        dislikes: {
            type: Number,
            required: true,
        },
        comments: {
            type: Number,
            required: true,
        },
    },
});
</script>

<style lang="scss" scoped> .tray {
     .tray-item span {
         font-size: 0.82em;
     }

     color: var(--primary-color);

     .fa-icon {
         color: var(--primary-color);
     }
 }
</style>
