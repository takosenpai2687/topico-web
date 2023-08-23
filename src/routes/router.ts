import auth from "@/routes/navGuards";
import LayoutVue from "@/layouts/Layout.vue";
import { createRouter, createWebHistory } from "vue-router";

import Home from "@/pages/Home.vue";
import Explore from "@/pages/Explore.vue";
import Profile from "@/pages/Profile.vue";
import Community from "@/pages/Community.vue";
import PostVue from "@/pages/Post.vue";

const routes = [
    { path: "/", component: Home, meta: { layout: LayoutVue } },
    { path: "/explore", component: Explore, meta: { layout: LayoutVue } },
    { path: "/profile", component: Profile, meta: { layout: LayoutVue } },
    {
        path: "/community/:cid/post/:pid",
        component: PostVue,
        meta: { layout: LayoutVue },
    },
    {
        path: "/community/:id",
        component: Community,
        meta: { layout: LayoutVue },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Authentication
router.beforeEach(auth);

export default router;
