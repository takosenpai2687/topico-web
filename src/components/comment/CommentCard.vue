<template>
    <div>
        <TopicoCard>
            <div class="py-2">
                <!-- Author User Info -->
                <div class="flex flex-row justify-start items-center gap-4">
                    <!-- Avatar -->
                    <img v-if="comment.author.avatar" class="author-avatar" :src="avatarUrl(comment.author.avatar)"
                        alt="author-avatar">
                    <!-- Username -->
                    <span class="text-lg">{{ comment.author.nickName }}</span>
                    <!-- time -->
                    <span class="text-gray-400 text-sm">{{ timeAgo(comment.ctime) }}</span>
                </div>
                <!-- Comment -->
                <p class="py-2 px-1 text-lg">{{ comment.content }}</p>
                <!-- Buttons -->
                <div class="tray flex flex-row justify-start items-center gap-8 px-0 py-2">
                    <CommentLikeButtons :comment="comment" />
                    <!-- Comments -->
                    <div v-if="isParent" class="tray-item flex flex-row justify-center items-center gap-1"
                        @click="onClickComment">
                        <font-awesome-icon class="fa-icon" icon="fa-solid fa-comments" />
                        <span> {{ comment.replies }}</span>
                    </div>
                </div>
                <!-- Replies -->
                <div class="replies" :class="{ active: expanded }">
                    <!-- Replies -->
                    <div class="reply-item" v-for="reply in comment.children">
                        <!-- Author User Info -->
                        <div class="flex flex-row justify-start items-center gap-4">
                            <!-- Avatar -->
                            <img class="author-avatar" v-if="reply.author.avatar" :src="avatarUrl(reply.author.avatar)"
                                alt="author-avatar">
                            <!-- Username -->
                            <span class="text-lg">{{ reply.author.nickName }}</span>
                            <!-- time -->
                            <span class="text-gray-400 text-sm">{{ timeAgo(reply.ctime) }}</span>
                        </div>
                        <!-- Reply Content -->
                        <p class="py-2 px-1 text-lg">{{ reply.content }}</p>
                        <!-- Buttons -->
                        <div class="tray flex flex-row justify-start items-center gap-8 px-0 py-2">
                            <CommentLikeButtons :comment="reply" />
                            <!-- Reply -->
                            <div class="tray-item flex flex-row justify-center items-center gap-1"
                                @click="() => setReplyToUser(reply.author)">
                                <font-awesome-icon class="fa-icon" icon="fa-solid fa-comments" />
                            </div>
                        </div>
                    </div>
                    <!-- Reply Input -->
                    <CreateCommentForm class="mt-8" v-if="expanded" :parentId="comment.id!" :replyToUser="replyToUser"
                        :postId="comment.postId" :onclearReplyToUser="clearReplyToUser" :noImage="true" />
                </div>
            </div>
        </TopicoCard>
    </div>
</template>

<script lang="ts">
import { PropType, defineComponent } from 'vue';
import TopicoCard from '@/components/common/TopicoCard.vue';
import { getTimeDiff } from '@/util/dates';
import PostButtonsTray from '@/components/common/PostButtonsTray.vue';
import { useMessage } from 'naive-ui'
import CreateCommentForm from '@/components/comment/CreateCommentForm.vue';
import { likeComment, unlikeComment } from '@/services/likeService';
import CommentLikeButtons from '@/components/comment/CommentLikeButtons.vue';

export default defineComponent({
    props: {
        comment: {
            type: Object as PropType<CommentVO>,
            required: true
        },
        isParent: {
            type: Boolean,
            required: false
        }
    },
    setup() {
        const message = useMessage();
        return { message };
    },
    components: {
        TopicoCard, PostButtonsTray,
        CreateCommentForm,
        CommentLikeButtons
    },
    data() {
        return {
            expanded: false,
            replyToUser: undefined as User | undefined
        }
    },
    mounted() {
        console.log(this.comment);
    },
    methods: {
        onClickComment() {
            this.expanded = !this.expanded;
        },
        timeAgo(from: Date) {
            return `commented ${getTimeDiff(from, new Date())} ago.`;
        },
        avatarUrl(imgId: number) {
            return `/api/v1/images/${imgId}`;
        },
        setReplyToUser(user: User) {
            this.replyToUser = user;
        },
        clearReplyToUser() {
            this.replyToUser = undefined;
        },
        async onClickLikeComment(commentId: number) {
            const res = await likeComment(commentId);
            if (res.code !== 200) {
                this.message.error(res.message);
            } else {
                this.message.success(res.message);
                this.$emit('fetch-comments');
            }
        },
        async onClickUnlikeComment(commentId: number) {
            const res = await unlikeComment(commentId);
            if (res.code !== 200) {
                this.message.error(res.message);
            } else {
                this.message.success(res.message);
                this.$emit('fetch-comments');
            }
        }
    },
});
</script>

<style lang="scss" scoped>
img.author-avatar {
    width: 1.8em;
    height: 1.8em;
    border-radius: 50%;
}


.tray {
    .tray-item {
        span {
            font-size: 0.82em;
        }

        &:hover {
            filter: brightness(1.2);
            transform: scale(1.1);
            cursor: pointer;
        }
    }

    color: var(--primary-color);

    .fa-icon {
        color: var(--primary-color);
        transition: all 0.2s ease-out;
    }
}


.replies {
    transition: all 0.1s ease-out;
    transform: scaleY(0);
    overflow: hidden;
    height: 0;

    .reply-item {
        border-left: 1px solid #ddd;
        padding: 1em;
        margin: 0 1em;

        &:not(:last-child) {
            border-bottom: 1px solid #ddd;
        }
    }

    &.active {
        transform: scaleY(1);
        height: auto;
    }
}
</style>