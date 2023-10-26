import axios from "axios";

export const getCommentLikeStatus = async (commentId: number): Promise<any> => {
    return await axios.get('/api/v1/comments/like_status/' + commentId).then((r) => r.data.data);
};

export const getPostLikeStatus = async (postId: number): Promise<any> => {
    return await axios.get('/api/v1/posts/like_status/' + postId).then((r) => r.data.data);
};

export const likeComment = async (commentId: number): Promise<any> => {
    return await axios.post(`/api/v1/comments/like/${commentId}`).then((r) => r.data.data);
};

export const unlikeComment = async (commentId: number): Promise<any> => {
    return await axios.delete(`/api/v1/comments/like/${commentId}`).then((r) => r.data.data);
};

export const dislikeComment = async (commentId: number): Promise<any> => {
    return await axios.post(`/api/v1/comments/dislike/${commentId}`).then((r) => r.data.data);
};

export const undislikeComment = async (commentId: number): Promise<any> => {
    return await axios.delete(`/api/v1/comments/dislike/${commentId}`).then((r) => r.data.data);
};

export const likePost = async (postId: number): Promise<any> => {
    return await axios.post(`/api/v1/posts/like/${postId}`).then((r) => r.data.data);
};

export const unlikePost = async (postId: number): Promise<any> => {
    return await axios.delete(`/api/v1/posts/like/${postId}`).then((r) => r.data.data);
};

export const dislikePost = async (postId: number): Promise<any> => {
    return await axios.post(`/api/v1/posts/dislike/${postId}`).then((r) => r.data.data);
};

export const undislikePost = async (postId: number): Promise<any> => {
    return await axios.delete(`/api/v1/posts/dislike/${postId}`).then((r) => r.data.data);
};
