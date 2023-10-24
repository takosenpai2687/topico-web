import { parseFromUTC } from "@/util/dates";
import axios from "axios";

const MAX_TOP_COMMS = 5;

export const getTopSearch = async (): Promise<Object> => {
    return await axios
        .get("/api/v1/explore/top_search").then(r => r.data.data);
};

export const getTopComms = async (): Promise<Community[]> => {
    return await axios
        .get("/api/v1/explore/top_communities")
        .then((r) => r.data.data.slice(0, MAX_TOP_COMMS));;
};

export const getTrendingHot = async (page: number): Promise<Pager<Post[]>> => {
    const pager: Pager<any[]> = await axios.get(`/api/v1/explore/trending_posts?sortBy=MOST_LIKES&page=${page}&size=${10}`).then((r) => r.data.data);
    pager.data.forEach(post => {
        post.ctime = parseFromUTC(post.ctime);
        post.utime = parseFromUTC(post.utime);
        post.tags = JSON.parse(post.tags ?? "[]");
    })
    return pager as Pager<Post[]>;
};

export const getTrendingNew = async (page: number): Promise<Pager<Post[]>> => {
    const pager: Pager<any[]> = await axios.get(`/api/v1/explore/trending_posts?sortBy=NEWEST&page=${page}&size=${10}`).then((r) => r.data.data);
    pager.data.forEach(post => {
        post.ctime = parseFromUTC(post.ctime);
        post.utime = parseFromUTC(post.utime);
        post.tags = JSON.parse(post.tags ?? "[]");
    })
    return pager as Pager<Post[]>;
};

export const searchKeyword = async (keyword: string, page: number, size: number, sortBy: "MOST_LIKES" | "NEWEST"): Promise<SearchResultVO> => {
    return await axios
        .get(`/api/v1/explore/search?keyword=${keyword}&page=${page}&size=${size}&sortBy=${sortBy}`)
        .then((r) => r.data.data);
}
