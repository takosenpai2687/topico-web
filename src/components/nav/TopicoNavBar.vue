<template>
    <div class="nav-wrapper px-4 py-4">
        <div class="logo">
            <img src="@/assets/logo.webp" alt="" srcset="" :draggable="false" />
        </div>
        <div class="btn-group">
            <TopicoNavButton v-for="(route, i) in routes" :text="route.text" :to="route.to" :icon="route.icon"
                :active="i === activeIdx" />
        </div>
        <div class="user-row">
            <UserNameAvatar :user="user" />
        </div>
    </div>
</template>

<script lang="ts">
import UserNameAvatar from "@/components/common/UserNameAvatar.vue";
import TopicoNavButton from "@/components/nav/TopicoNavButton.vue";
import { getUserFromLocalStorage } from "@/util/auth";
import { defineComponent } from "vue";

const routes = [
    {
        to: "/",
        text: "Home",
        icon: "fa-solid fa-house",
    },
    {
        to: "/explore",
        text: "Explore",
        icon: "fa-magnifying-glass",
    },
    {
        to: "/profile",
        text: "Profile",
        icon: "fa-solid fa-user",
    },
];

export default defineComponent({
    name: 'TopicoNavBar',
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
        $route(to, _from) {
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
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";

.nav-wrapper {
    @include card-shadow;
    display: flex;
    align-items: center;
    justify-content: space-between;

    .btn-group {
        display: flex;
    }
}

// PC
@media screen and (min-width: $mobile-width) {
    .nav-wrapper {
        flex-direction: column;

        .logo {
            height: 33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            user-select: none;

            img {
                height: 10em;
            }
        }

        .btn-group {
            height: 33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: 1em;
            width: 100%;
        }

        .user-row {
            height: 33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;
        }
    }
}

// Mobile
@media screen and (max-width: $mobile-width) {
    .nav-wrapper {
        flex-direction: row;

        .logo {
            display: none;
        }

        .btn-group {
            height: 2em;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            gap: 1em;
            width: 100%;
        }

        .user-row {
            display: none;
        }
    }
}
</style>
