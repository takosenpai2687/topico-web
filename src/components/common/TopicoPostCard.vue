<template>
    <TopicoCard>
        <div class="flex flex-row justify-between items-center">
            <h2 class="title text-2xl">{{ post.title }}</h2>
            <p class="subtitle">
                {{ `Posted ${timeAgo} ago` }}
            </p>
        </div>
        <p>
            {{ post.content }}
        </p>
        <div class="img-row py-2">
            <img
                v-for="url in post.images"
                :src="url"
                alt=""
                :draggable="false"
            />
        </div>
        // TODO: likes, dislikes, comments, share
    </TopicoCard>
</template>

<script lang="ts">
import { PropType } from "vue";
import TopicoCard from "@/components/common/TopicoCard.vue";
import { getTimeDiff } from "@/util/dates";

export default {
    components: { TopicoCard },
    props: {
        post: {
            type: Object as PropType<Post>,
            required: true,
        },
    },
    computed: {
        timeAgo() {
            return getTimeDiff(this.post.ctime, new Date());
        },
    },
};
</script>

<style scoped lang="scss">
h2.title {
    line-height: 1.8em;
}

.subtitle {
    font-style: italic;
}

.img-row {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 0.5em;
    img {
        height: 10em;
        border-radius: 4px;
    }
}
</style>
