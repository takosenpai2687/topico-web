import { parseFromUTC } from "@/util/dates";
import axios from "axios";

export const getTrendingHot = async (postId: number, page: number, size: number): Promise<Pager<CommentVO[]>> => {
    const pager = await axios.get(`/api/v1/comments/by_post/${postId}?page=${page}&size=${size}&sortBy=MOST_LIKES`).then((r) => r.data.data);
    pager.data.forEach((c: any) => {
        c.ctime = parseFromUTC(c.ctime);
        c.utime = parseFromUTC(c.utime);
        c.children.forEach((cc: any) => {
            cc.ctime = parseFromUTC(cc.ctime);
            cc.utime = parseFromUTC(cc.utime);
        });
    });
    return pager;
};

export const getTrendingNew = async (postId: number, page: number, size: number): Promise<Pager<CommentVO[]>> => {
    const pager = await axios.get(`/api/v1/comments/by_post/${postId}?page=${page}&size=${size}&sortBy=NEWEST`).then((r) => r.data.data);
    pager.data.forEach((c: any) => {
        c.ctime = parseFromUTC(c.ctime);
        c.utime = parseFromUTC(c.utime);
        c.children.forEach((cc: any) => {
            cc.ctime = parseFromUTC(cc.ctime);
            cc.utime = parseFromUTC(cc.utime);
        });
    });
    return pager;
}

export const getPost = async (postId: number): Promise<Post> => {
    const post = await axios.get(`/api/v1/posts/${postId}`).then((r) => r.data.data);
    post.tags = JSON.parse(post.tags);
    post.ctime = parseFromUTC(post.ctime);
    post.utime = parseFromUTC(post.utime);
    return post;
}

export const createComment = async (comment: CreateCommentDto): Promise<any> => {
    return await axios.post(`/api/v1/comments`, comment).then((r) => r.data);
}

