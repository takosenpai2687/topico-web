declare type CommentVO = {
    id: number;
    postId: number;
    postTitle?: string;
    author: User;
    children?: CommentVO[];
    content: string;
    likes: number;
    dislikes: number;
    replies: number;
    location: string;
    ctime: Date;
    utime: Date;
}

declare type CreateCommentDto = {
    postId: number,
    content: string,
    parentId?: number | null,
    replyToUserId?: number | null,
    imageId?: number | null,
};
