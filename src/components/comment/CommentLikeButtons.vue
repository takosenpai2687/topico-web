<template>
    <div class="flex flex-row justify-start items-center gap-8">
        <div class="tray-item flex flex-row justify-center items-center gap-1" @click="onClickLike">
            <font-awesome-icon class="fa-icon" :icon="`fa-${liked ? 'solid' : 'regular'} fa-thumbs-up`"
                :class="{ active: liked }" />
            <span> {{ likes }}</span>
        </div>
        <div class="tray-item flex flex-row justify-center items-center gap-1" @click="onClickDislike">
            <font-awesome-icon class="fa-icon" :icon="`fa-${disliked ? 'solid' : 'regular'} fa-thumbs-down`"
                :class="{ active: disliked }" />
            <span> {{ dislikes }}</span>
        </div>
    </div>
</template>

<script lang="ts">
import { dislikeComment, getCommentLikeStatus, likeComment, undislikeComment, unlikeComment } from '@/services/likeService';
import { PropType, defineComponent } from 'vue'

export default defineComponent({
    props: {
        comment: {
            type: Object as PropType<CommentVO>,
            required: true
        }
    },
    data() {
        return {
            liked: false,
            disliked: false,
            likes: NaN,
            dislikes: NaN
        }
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        async fetchData() {
            const likeVo: LikeVO = await getCommentLikeStatus(this.comment.id!);
            if (likeVo) {
                this.liked = likeVo.liked;
                this.disliked = likeVo.disliked;
                this.likes = likeVo.likes;
                this.dislikes = likeVo.dislikes;
            }
        },
        async onClickLike() {
            let likeVo: LikeVO;
            if (this.liked) {
                likeVo = await unlikeComment(this.comment.id!);
            } else {
                likeVo = await likeComment(this.comment.id!);
            }
            this.liked = likeVo.liked;
            this.disliked = likeVo.disliked;
            this.likes = likeVo.likes;
            this.dislikes = likeVo.dislikes;
        },
        async onClickDislike() {
            let likeVo: LikeVO;
            if (this.disliked) {
                likeVo = await undislikeComment(this.comment.id!);
            } else {
                likeVo = await dislikeComment(this.comment.id!);
            }
            this.liked = likeVo.liked;
            this.disliked = likeVo.disliked;
            this.likes = likeVo.likes;
            this.dislikes = likeVo.dislikes;
        }
    }
})
</script>

<style lang="scss" scoped>
.tray-item {
    cursor: pointer;
    font-size: 1.1em;
    transition: all 0.16s ease-out;

    &:hover {
        filter: brightness(1.2);
        -webkit-filter: brightness(1.2);
        transform: scale(1.1);
    }
}
</style>