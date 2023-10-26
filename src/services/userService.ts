import axios from "axios";

import ROOT from "./root";
import { parseFromUTC } from "@/util/dates";

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
        r.data.data.data.map((post: any) => ({
            ...post,
            ctime: parseFromUTC(post.ctime),
            utime: parseFromUTC(post.utime),
            tags: JSON.parse(post.tags ?? "[]"),
        }))
    );
};

export const getMyComments = async (): Promise<CommentVO[]> => {
    return await axios.get("/api/v1/home/my_comments").then((r) =>
        r.data.data.data.map((comment: any) => ({
            ...comment,
            ctime: parseFromUTC(comment.ctime),
            utime: parseFromUTC(comment.utime),
        }))
    );
};

export const updateUser = async (updateUserDto: UpdateUserDto): Promise<User> => {
    const res = await axios.put("/api/v1/users", updateUserDto).then((r) => r.data);
    if (res.code !== axios.HttpStatusCode.Ok) throw new Error(res.message);
    return res.data;
};