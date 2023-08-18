import axios from "axios";

export const getUserInfo = async (): Promise<User> => {
    return await axios.get("/mock/user.json").then((r) => r.data);
};

export const getFollowingComms = async (): Promise<Community[]> => {
    return await axios.get("/mock/comms_following.json").then((r) => r.data);
};

export const getRecommendedComms = async (): Promise<Community[]> => {
    return await axios.get("/mock/comms_recommended.json").then((r) => r.data);
};
