<template>
    <div>
        <SectionHeader class="px-4 py-1 gap-4 select-none">
            <span># My Posts</span>
            <font-awesome-icon :icon="`fa-solid ${globalStore.showSpoilers ? 'fa-eye' : 'fa-eye-slash'
                }`" class="fa-eye ml-4" @click="handleClickToggle" />
        </SectionHeader>
        <MyPostCard v-for="(post, i) in posts" :key="`post-${post.id}`" :post="post" :delay="i * 0.1" />
        <!-- Pagination -->
        <div class="w-full flex flex-row justify-center items-center pb-8 pt-4">
            <n-pagination :default-page-size="size" class="mx-auto" v-model:page="page" :page-count="totalPages"
                @update-page="handleGoToPage" />
        </div>
    </div>
</template>

<script lang="ts">
import MyPostCard from "@/components/common/MyPostCard.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import { getMyPosts } from "@/services/userService";
import useGlobalStore from "@/stores/global";
import { NPagination } from "naive-ui";

export default {
    name: 'MyPosts',
    components: {
        MyPostCard,
        SectionHeader,
        NPagination
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    methods: {
        handleClickToggle() {
            this.globalStore.toggleShowSpoilers();
        },
        async fetchData() {
            this.posts = [];
            const pager: Pager<Post[]> = await getMyPosts(this.page, this.size);
            this.posts = pager.data;
            this.total = pager.total;
            this.size = pager.size;
        },
        handleGoToPage(page: number) {
            this.page = page;
            this.fetchData();
        },
    },
    data() {
        return {
            page: 1,
            total: 0,
            size: 10,
            posts: [] as Post[],
        };
    },
    created() {
        this.fetchData();
    },
    computed: {
        totalPages() {
            return Math.ceil(this.total / this.size);
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.fa-eye {
    font-size: 0.9em;
    transition: all 0.16s ease-out;

    &:hover {
        cursor: pointer;
        transform: scale(1.1);
    }
}

// PC
@media screen and (min-width: $mobile-width) {

    span,
    .fa-eye {
        color: var(--primary-font-color);
    }
}

// Mobile
@media screen and (max-width: $mobile-width) {

    span,
    .fa-eye {
        color: #fff;
    }
}
</style>
