import { defineComponent } from "vue";
import { routes } from "./TopicoNavBar.vue";

export default defineComponent({
    components: {
        TopicoNavButton,
        UserNameAvatar,
    },
    computed: {
        user: function () {
            return getUserFromLocalStorage();
        },
    },
    data() {
        return { activeIdx: -1, routes };
    },
    mounted() {
        this.activeIdx = routes.findIndex(
            (route) => route.to === window.location.pathname
        );
    },
    watch: {
        $route(to, from) {
            // This watcher function is called when the route changes
            this.$nextTick(() => {
                // Perform actions that need to be done after the component has been updated
                this.activeIdx = routes.findIndex(
                    (route) => route.to === to.path
                );
            });
        },
    },
});
