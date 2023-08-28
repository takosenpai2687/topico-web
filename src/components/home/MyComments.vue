<template>
    <div>
        <SectionHeader class="px-4 py-1 gap-4 select-none">
            <span># My Comments</span>
        </SectionHeader>
        <TopicoCard v-for="(comment, i) in homeStore.myComments" :delay="i * 0.1" class="card-wrapper">
            <div class="flex flex-row justify-between items-center">
                <div class="flex flex-row justify-start items-center gap-2">
                    <!-- Community Icon-->
                    <img class="community-avatar" :src="comment.community.avatar" alt="" />
                    <!-- Comment Community -->
                    <RouterLink :to="`/community/${comment.community.id}/post/${comment.post.id}`" class="text-lg">{{
                        comment.post.title }}</RouterLink>
                </div>
                <p class="subtitle">
                    {{ `Posted ${timeAgo(comment)} ago` }}
                </p>
            </div>
            <div class="px-2 py-2 text-lg flex-row flex items-center justify-start">
                <span v-if="comment.replyTo">@{{ comment.replyTo?.nickName }}&nbsp;
                </span>
                <p class="leading-normal text-clip overflow-hidden whitespace-pre">
                    {{ comment.content }}
                </p>
            </div>
            <div class="img-row py-2">
                <div class="img-container" v-for="url in comment.images">
                    <img :src="url" alt="" :draggable="false" />
                </div>
            </div>
            <div>
                <PostButtonsTray :likes="comment.likes" :dislikes="comment.dislikes" :comments="comment.comments ?? 0" />
            </div>
        </TopicoCard>
    </div>
</template>

<script lang="ts">
import useHomeStore from "@/stores/home";
import { getTimeDiff } from "@/util/dates";
import TopicoCard from "@/components/common/TopicoCard.vue";
import SectionHeader from "@/components/common/SectionHeader.vue";
import PostButtonsTray from "@/components/common/PostButtonsTray.vue";

export default {
    name: 'MyComments',
    components: { TopicoCard, SectionHeader, PostButtonsTray },
    setup() {
        const homeStore = useHomeStore();
        return { homeStore };
    },
    methods: {
        timeAgo(comment: TopicoComment) {
            return getTimeDiff(comment.ctime, new Date());
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
@import "@/styles/theme.scss";

.card-wrapper {
    transition: all 0.16s ease-out;

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


// PC
@media screen and (min-width: $mobile-width) {

    span {
        color: $primaryFontColor;
    }
}

// Mobile
@media screen and (max-width: $mobile-width) {

    span {
        color: #fff;
    }
}
</style>
