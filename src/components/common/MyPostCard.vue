<template>
    <TopicoCard :delay="delay" class="card-wrapper">
        <div class="flex flex-row justify-between items-center">
            <div class="flex flex-row justify-start items-center gap-2">
                <!-- Community Icon-->
                <img
                    class="community-avatar"
                    :src="post.community.avatar"
                    alt=""
                />
                <!-- Post Title -->
                <RouterLink
                    :to="`/community/${post.community.id}/post/${post.id}`"
                    class="title text-2xl"
                    >{{ post.title }}</RouterLink
                >
                <!-- Tags -->
                <div
                    class="tags-row flex flex-row justify-start items-center gap-1"
                >
                    <Tag v-for="tag in post.tags">{{ tag }}</Tag>
                </div>
            </div>
            <p class="subtitle">
                {{ `Posted ${timeAgo} ago` }}
            </p>
        </div>
        <p>
            {{ post.content }}
        </p>
        <div class="img-row py-2">
            <div
                class="img-container"
                v-for="url in post.images"
                :class="`${
                    !homeStore.showSpoilers && post.spoiler ? 'spoiler' : ''
                }`"
            >
                <img :src="url" alt="" :draggable="false" />
            </div>
        </div>
        <div>
            <PostButtonsTray
                :likes="post.likes"
                :dislikes="post.dislikes"
                :comments="post.comments"
            />
        </div>
    </TopicoCard>
</template>

<script lang="ts">
import { PropType } from "vue";
import TopicoCard from "@/components/common/TopicoCard.vue";
import PostButtonsTray from "@/components/common/PostButtonsTray.vue";
import Tag from "@/components/common/Tag.vue";
import { getTimeDiff } from "@/util/dates";
import useHomeStore from "@/stores/home";

export default {
    components: { TopicoCard, PostButtonsTray, Tag },
    setup() {
        const homeStore = useHomeStore();
        return { homeStore };
    },
    props: {
        post: {
            type: Object as PropType<Post>,
            required: true,
        },
        delay: {
            type: Number,
            required: false,
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
.card-wrapper {
    transition: all 0.16s ease-out;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-direction: row;

    &:hover {
        transform: scale(1.01);
        a.title {
            text-decoration: underline;
        }
    }
    a.title {
        font-size: 1.4em;
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
        .img-container {
            width: 25%;
            border-radius: 4px;
            position: relative;
            transition: all 0.2s ease-out;
            &:hover {
                transform: scale(1.02);
                &::before {
                    opacity: 0;
                }
            }
            &.spoiler {
                &:hover::before {
                    opacity: 0;
                }
                &::before {
                    content: "Spoiler";
                    opacity: 1;
                    border-radius: 4px;
                    position: absolute;
                    display: block;
                    top: 50%;
                    transition: all 0.2s ease-out;
                    left: 50%;
                    transform: translate(-50%, -50%);
                    width: 101%;
                    height: 101%;
                    backdrop-filter: blur(20px);
                    -webkit-backdrop-filter: blur(20px);
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    font-size: 1.2em;
                    text-align: center;
                    line-height: 1.5;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                }
            }
            img {
                height: 100%;
                border-radius: 4px;
            }
        }
    }

    .community-avatar {
        height: 2em;
        width: 2em;
        border-radius: 1em;
    }
}
</style>
