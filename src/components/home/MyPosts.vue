<template>
    <div>
        <TopicoPostCard
            v-for="(post, i) in homeStore.myPosts"
            :post="post"
            :delay="i * 0.1"
        />
    </div>
</template>

<script lang="ts">
import TopicoPostCard from "@/components/common/TopicoPostCard.vue";
import useHomeStore from "@/stores/home";

export default {
    components: {
        TopicoPostCard,
    },
    setup() {
        const homeStore = useHomeStore();
        return { homeStore };
    },
};
</script>

<style lang="scss" scoped></style>
