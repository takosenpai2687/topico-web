declare type TopicoComment = {
    id: number;
    post: {
        id: number;
        title: string;
    };
    community: {
        id: number;
        name: string;
        avatar?: string;
    };
    author: {
        id: number;
        nickName: string;
    };
    images: string[];
    replyTo?: {
        commentId: number;
        userId: number;
        nickName: string;
        content: string;
    };
    content: string;
    likes: number;
    dislikes: number;
    comments?: number;
    ctime: Date;
    utime: Date;
};
