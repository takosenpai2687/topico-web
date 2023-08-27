import axios from "axios";

const MAX_TOP_SEARCH = 5;
const MAX_TOP_COMMS = 5;

export const getTopSearch = async (): Promise<string[]> => {
    return await axios
        .get("/mock/top_search.json")
        .then((r) => r.data.slice(0, MAX_TOP_SEARCH));
};

export const getTopComms = async (): Promise<Community[]> => {
    return await axios
        .get("/mock/top_comms.json")
        .then((r) => r.data.slice(0, MAX_TOP_COMMS));
};

export const getTrendingHot = async (): Promise<Post[]> => {
    return await axios.get("/mock/trending_hot.json").then((r) =>
        r.data.map((post: Post) => ({
            ...post,
            ctime: new Date(post.ctime),
            utime: new Date(post.utime),
        }))
    );
};

export const getTrendingNew = async (): Promise<Post[]> => {
    return await axios.get("/mock/trending_new.json").then((r) =>
        r.data.map((post: Post) => ({
            ...post,
            ctime: new Date(post.ctime),
            utime: new Date(post.utime),
        }))
    );
};
