import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
    state: () => {
        return {
            followingComms: [] as Community[],
            recommendedComms: [] as Community[],
            myPosts: [] as Post[],
            showSpoilers: localStorage.getItem("showSpoilers") === "true",
            myComments: [] as TopicoComment[],
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
            localStorage.setItem("showSpoilers", JSON.stringify(show));
        },
        toggleShowSpoilers() {
            this.showSpoilers = !this.showSpoilers;
            localStorage.setItem(
                "showSpoilers",
                JSON.stringify(this.showSpoilers)
            );
        },
        setMyComments(comments: TopicoComment[]) {
            this.myComments = comments;
        },
    },
});

export default useHomeStore;
