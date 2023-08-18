import { defineStore } from "pinia";

export const useHomeStore = defineStore("home", {
    state: () => {
        return {
            followingComms: [] as Community[],
            recommendedComms: [] as Community[],
        };
    },
    actions: {
        setFollowingComms(comms: Community[]) {
            this.followingComms = comms;
        },
        setRecommendedComms(comms: Community[]) {
            this.recommendedComms = comms;
        },
    },
});
