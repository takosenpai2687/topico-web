import axios from "axios";

import ROOT from "./root";

const GET_USER_BY_EMAIL = (email: string) => ROOT + "/api/v1/users/" + email;

export const getUserInfo = async (): Promise<User> => {
    const email: string | null = localStorage.getItem("email");
    if (!email) throw new Error("login required");
    const userRes: CommonResponse<User> = await axios
        .get(GET_USER_BY_EMAIL(email))
        .then((r) => r.data);
    if (userRes.code !== axios.HttpStatusCode.Ok || !userRes.data)
        throw new Error(userRes.message);
    const user: User = userRes.data;
    localStorage.setItem("user", JSON.stringify(user));
    return user;
};

export const getFollowingComms = async (): Promise<Community[]> => {
    return await axios.get("/api/v1/home/communities_following").then((r) => r.data.data);
};

export const getRecommendedComms = async (): Promise<Community[]> => {
    return await axios.get("/api/v1/home/communities_recommended").then((r) => r.data.data);
};

export const getMyPosts = async (): Promise<Post[]> => {
    return await axios.get("/api/v1/home/my_posts").then((r) =>
        r.data.data.map((post: Post) => ({
            ...post,
            ctime: new Date(post.ctime),
            utime: new Date(post.utime),
        }))
    );
};

export const getMyComments = async (): Promise<TopicoComment[]> => {
    return await axios.get("/api/v1/home/my_comments").then((r) =>
        r.data.data.map((comment: TopicoComment) => ({
            ...comment,
            ctime: new Date(comment.ctime),
            utime: new Date(comment.utime),
        }))
    );
};
