<template>
    <TopicoCard :delay="delay" class="card-wrapper">
        <div class="flex flex-row justify-between items-center">
            <div class="title-row gap-2 pb-2">
                <div class="flex flex-row justify-start items-center gap-2">
                    <!-- Community Icon-->
                    <img class="community-avatar" :src="commAvatar" alt="" />
                    <!-- Post Title -->
                    <RouterLink :to="`/community/${post.community.id}/post/${post.id}`" class="title text-xl">{{ post.title
                    }}
                    </RouterLink>
                </div>
                <!-- Tags -->
                <div class="tags-row flex flex-row justify-start items-center gap-1">
                    <Tag v-for="tag in post.tags">{{ tag }}</Tag>
                </div>
            </div>
            <p class="subtitle">
                {{ `Posted ${timeAgo} ago` }}
            </p>
        </div>
        <p class="post-content">
            {{ post.content }}
        </p>
        <div class="img-row py-2">
            <div class="img-container" v-for="imgId in post.images" :class="`${!globalStore.showSpoilers && post.spoiler ? 'spoiler' : ''
                }`">
                <img :src="`/api/v1/images/${imgId}`" alt="" :draggable="false" />
            </div>
        </div>
        <div>
            <PostButtonsTray :likes="post.likes ?? 0" :dislikes="post.dislikes ?? 0" :comments="post.comments ?? 0" />
        </div>
    </TopicoCard>
</template>

<script lang="ts">
import { PropType } from "vue";
import TopicoCard from "@/components/common/TopicoCard.vue";
import PostButtonsTray from "@/components/common/PostButtonsTray.vue";
import Tag from "@/components/common/Tag.vue";
import { getTimeDiff } from "@/util/dates";
import useGlobalStore from "@/stores/global";

export default {
    name: 'MyPostCard',
    components: { TopicoCard, PostButtonsTray, Tag },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
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
        commAvatar() {
            return `/api/v1/images/${this.post.community.avatar}`;
        },
    },
};
</script>

<style scoped lang="scss">
@import "@/styles/mixins.scss";

.card-wrapper {
    transition: all 0.16s ease-out;

    &:hover {
        transform: scale(1.01);
    }

    .post-content {
        overflow-wrap: break-word;
        white-space: normal;
        width: 100%;
    }

    .title:hover {
        text-decoration: underline;
        font-weight: bold;
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
            border-radius: 4px;
            position: relative;
            transition: all 0.2s ease-out;

            &:hover {
                transform: scale(1.05);

                &::before {
                    opacity: 0;
                }

                img {
                    border-radius: 0;
                    object-fit: contain;
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
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    pointer-events: none;
                }
            }

            img {
                height: 100%;
                width: 100%;
                border-radius: .5em;
                object-fit: cover;
            }
        }
    }

    .community-avatar {
        height: 2em;
        width: 2em;
        border-radius: 1em;
    }
}



// PC
@media screen and (min-width: $mobile-width) {
    .title-row {
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: flex-start;
    }

    .img-container {
        width: 11em;
        height: 11em;
    }
}

// Mobile
@media screen and (max-width: $mobile-width) {
    .title-row {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: flex-start;
    }

    .subtitle {
        position: absolute;
        top: .7em;
        right: 1em;
    }

    .img-container {
        width: 7em;
        height: 7em;
    }
}
</style>
