<template>
    <div>
        <MyPostCard
            v-for="(post, i) in homeStore.myPosts"
            :post="post"
            :delay="i * 0.1"
        />
    </div>
</template>

<script lang="ts">
import MyPostCard from "@/components/common/MyPostCard.vue";
import useHomeStore from "@/stores/home";

export default {
    components: {
        MyPostCard,
    },
    setup() {
        const homeStore = useHomeStore();
        return { homeStore };
    },
};
</script>

<style lang="scss" scoped></style>
