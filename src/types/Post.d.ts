declare type Post = {
    id: number;
    community: Community;
    author: User;
    tags?: string[];
    title: string;
    spoiler?: boolean;
    content?: string;
    images?: string[];
    ctime: Date;
    utime: Date;
    likes?: number;
    dislikes?: number;
    replies: number;
};

declare type PostDetail = {
    id: number;
    community: Community;
    author: User;
    tags: string[];
    title: string;
    spoiler: boolean;
    content: string;
    images: string[];
    ctime: Date;
    utime: Date;
    likes: number;
    dislikes: number;
    replies: number;
    comments: any[];
};


declare type CreatePostDto = {
    communityId: number,
    title: string,
    content: string,
    spoiler: boolean,
    images: number[],
    tags: string,
};
