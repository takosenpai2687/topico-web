<template>
    <div>
        <TopicoPostCard v-for="post in homeStore.myPosts" :post="post" />
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
