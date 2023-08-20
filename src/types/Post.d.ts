declare type Post = {
    id: number;
    community: Community;
    author: User;
    tags: string[];
    title: string;
    content: string;
    images: string[];
    ctime: Date;
    utime: Date;
};
