import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
    state: () => {
        return {
            followingComms: [] as Community[],
            recommendedComms: [] as Community[],
            myPosts: [] as Post[], 
            myComments: [] as CommentVO[],
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
        setMyComments(comments: CommentVO[]) {
            this.myComments = comments;
        },
    },
});

export default useHomeStore;
