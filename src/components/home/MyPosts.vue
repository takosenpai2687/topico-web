<template>
    <div>
        <SectionHeader class="px-4 py-1 gap-4 select-none">
            <span># My Posts</span>
            <font-awesome-icon :icon="`fa-solid ${globalStore.showSpoilers ? 'fa-eye' : 'fa-eye-slash'
                }`" class="fa-eye ml-4" @click="handleClickToggle" />
        </SectionHeader>
        <MyPostCard v-for="(post, i) in homeStore.myPosts" :post="post" :delay="i * 0.1" />
    </div>
</template>

<script lang="ts">
import MyPostCard from "@/components/common/MyPostCard.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import useHomeStore from "@/stores/home";
import useGlobalStore from "@/stores/global";

export default {
    name: 'MyPosts',
    components: {
        MyPostCard,
        SectionHeader,
    },
    setup() {
        const homeStore = useHomeStore();
        const globalStore = useGlobalStore();
        return { homeStore, globalStore };
    },
    methods: {
        handleClickToggle() {
            this.globalStore.toggleShowSpoilers();
        },
    },
};
</script>

<style lang="scss" scoped>
.fa-eye {
    font-size: 0.9em;
    transition: all 0.16s ease-out;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
}
</style>
