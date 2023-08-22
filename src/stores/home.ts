import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
    state: () => {
        return {
            followingComms: [] as Community[],
            recommendedComms: [] as Community[],
            myPosts: [] as Post[],
            showSpoilers: false,
        };
    },
    actions: {
        setFollowingComms(comms: Community[]) {
            this.followingComms = comms;
        },
        setRecommendedComms(comms: Community[]) {
            this.recommendedComms = comms;
        },
        setMyPosts(posts: Post[]) {
            this.myPosts = posts;
        },
        setShowSpoilers(show: boolean) {
            this.showSpoilers = show;
        },
        toggleShowSpoilers() {
            this.showSpoilers = !this.showSpoilers;
        },
    },
});

export default useHomeStore;
