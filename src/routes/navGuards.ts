import { NavigationGuard, RouteLocationNormalized } from "vue-router";

const auth: NavigationGuard = (
    _to: RouteLocationNormalized,
    _from: RouteLocationNormalized
) => {
    return true;
};

export default auth;
