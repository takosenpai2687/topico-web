import auth from "@/routes/navGuards";
import LayoutVue from "@/layouts/Layout.vue";
import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Explore from "@/pages/Explore.vue";
import Profile from "@/pages/Profile.vue";
import Community from "@/pages/Community.vue";
import PostVue from "@/pages/Post.vue";
import SearchResultVue from "@/pages/SearchResult.vue";
import LoginVue from "@/pages/Login.vue";
import Notifications from "@/pages/Notifications.vue";

const routes = [
    {
        path: "/login",
        component: LoginVue,
    },
    {
        path: "/",
        component: LayoutVue,
        children: [
            { path: "/", component: Home },
            {
                path: "/login",
                component: LoginVue,
            },
            {
                path: "/explore/:search",
                component: SearchResultVue,
            },
            {
                path: "/explore",
                component: Explore,
                meta: { layout: LayoutVue },
            },
            {
                path: "/profile",
                component: Profile,
                meta: { layout: LayoutVue },
            },
            {
                path: "/community/:cid/post/:pid",
                component: PostVue,
            },
            {
                path: "/community/:id",
                component: Community,
            },
            {
                path: "/notifications",
                component: Notifications
            }
        ],
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Authentication
router.beforeEach(auth);

export default router;
