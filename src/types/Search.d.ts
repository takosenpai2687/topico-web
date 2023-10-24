declare type SearchResultVO = {
    communities: Community[];
    posts: Pager<Post[]>;
    sortBy: "MOST_LIKES" | "NEWEST";
};
