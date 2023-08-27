import axios from "axios";

export const getTopSearch = async (): Promise<string[]> => {
    return await axios.get("/mock/top_search.json").then((r) => r.data);
};

export const getTopComms = async (): Promise<Community[]> => {
    return await axios.get("/mock/top_comms.json").then((r) => r.data);
};
