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
    return await axios.get("/mock/comms_following.json").then((r) => r.data);
};

export const getRecommendedComms = async (): Promise<Community[]> => {
    return await axios.get("/mock/comms_recommended.json").then((r) => r.data);
};

export const getMyPosts = async (): Promise<Post[]> => {
    return await axios.get("/mock/my_posts.json").then((r) =>
        r.data.map((post: Post) => ({
            ...post,
            ctime: new Date(post.ctime),
            utime: new Date(post.utime),
        }))
    );
};

export const getMyComments = async (): Promise<TopicoComment[]> => {
    return await axios.get("/mock/my_comments.json").then((r) =>
        r.data.map((comment: TopicoComment) => ({
            ...comment,
            ctime: new Date(comment.ctime),
            utime: new Date(comment.utime),
        }))
    );
};
