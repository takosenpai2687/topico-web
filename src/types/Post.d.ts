declare type Post = {
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
    comments: number;
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
    comments: any[];
};
