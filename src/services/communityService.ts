import axios from "axios";
import ROOT from "@/services/root";

export const getCommunityById = async (id: number): Promise<Community> => {
    const community = await axios.get(ROOT + '/api/v1/communities/' + id).then((r) => r.data.data);
    community.rank = await axios.get(ROOT + '/api/v1/communities/rank_by_size/' + id).then((r) => r.data.data);
    return community;
};

export const getTrendingHot = async (communityId: number, page: number, size: number): Promise<Pager<Post[]>> => {
    const pager = await axios.get(`/api/v1/communities/community_posts/${communityId}?page=${page}&size=${size}&sortBy=MOST_LIKES`).then((r) => r.data.data);
    pager.data.forEach((p: any) => p.tags = JSON.parse(p.tags));
    return pager;
};

export const getTrendingNew = async (communityId: number, page: number, size: number): Promise<Pager<Post[]>> => {
    const pager = await axios.get(`/api/v1/communities/community_posts/${communityId}?page=${page}&size=${size}&sortBy=NEWEST`).then((r) => r.data.data);
    pager.data.forEach((p: any) => p.tags = JSON.parse(p.tags));
    return pager;
};

export const createPost = async (postDto: CreatePostDto): Promise<any> => {
    return await axios.post(`/api/v1/posts`, postDto).then((r) => r.data);
};

export const getUserCommunity = async (communityId: number): Promise<UserCommunity | null> => {
    const userCommunity: UserCommunity = await axios.get(`/api/v1/communities/my/${communityId}`).then((r) => r.data.data);
    if (!userCommunity) return null;
    userCommunity.nextExp = await axios.get('/api/v1/communities/next_exp?level=' + userCommunity.level).then((r) => r.data.data);
    userCommunity.checkin = await axios.get('/api/v1/communities/checkin/' + communityId).then((r) => r.data.data);
    return userCommunity;
}

export const follow = async (communityId: number): Promise<any> => {
    return await axios.post(`/api/v1/communities/follow/${communityId}`).then((r) => r.data.data);
}

export const unfollow = async (communityId: number): Promise<any> => {
    return await axios.delete(`/api/v1/communities/follow/${communityId}`).then((r) => r.data.data);
}

export const getCheckins = async (communityId: number): Promise<boolean[]> => {
    return await axios.get(`/api/v1/communities/checkin/${communityId}`).then((r) => r.data.data);
};

export const checkin = async (communityId: number): Promise<any> => {
    return await axios.post(`/api/v1/communities/checkin/${communityId}`).then((r) => r.data.data);
};

