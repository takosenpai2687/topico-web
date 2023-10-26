declare type NotificationType = 'LIKE_POST' | 'LIKE_COMMENT' | 'COMMENT_POST' | 'COMMENT_REPLY';

declare type TopicoNotification = {
    id: number;
    type: NotificationType;
    sender: User;
    receiver: User;
    post: Post;
    comment: CommentVO;
    replyToComment: CommentVO;
    total: number;
    content: string;
    unread: boolean;
    ctime: Date;
    utime: Date;
    url: string;
};
