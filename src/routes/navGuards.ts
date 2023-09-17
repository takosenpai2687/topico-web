import { logout } from "@/services/authService";
import { NavigationGuard, RouteLocationNormalized } from "vue-router";

const auth: NavigationGuard = (
    to: RouteLocationNormalized,
    _from: RouteLocationNormalized
) => {
    // Allow login page
    if (to.path.startsWith("/login")) return true;
    // Check login
    const isValidLogin = localStorage.getItem("token") !== null && localStorage.getItem('email') !== null;
    if (!isValidLogin) {
        logout();
        return "/login?redirect=" + (to.path || "/");
    }
    return true;
};

export default auth;
