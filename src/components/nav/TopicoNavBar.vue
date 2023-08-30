<template>
    <div class="nav-wrapper px-4 py-4">
        <div class="logo">
            <font-awesome-icon class="logo-icon" icon="fa-brands fa-cloudversify" />
            <h1 class="logo-text">Topico</h1>
        </div>
        <div class="btn-group">
            <TopicoNavButton v-for="(route, i) in routes" :text="route.text" :to="route.to" :icon="route.icon"
                :active="i === activeIdx" />
            <font-awesome-icon icon="fa-solid fa-gear" class="fa-settings-mb"
                @click="() => globalStore.setShowSettings(true)" />
        </div>
        <div class="user-ctrl">
            <div class="user-row">
                <UserNameAvatar :user="user" />
                <font-awesome-icon icon="fa-solid fa-gear" class="fa-settings"
                    @click="() => globalStore.setShowSettings(true)" />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import UserNameAvatar from "@/components/common/UserNameAvatar.vue";
import TopicoNavButton from "@/components/nav/TopicoNavButton.vue";
import useGlobalStore from "@/stores/global";
import { getUserFromLocalStorage } from "@/util/auth";
import _ from "lodash";
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
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
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
            color: var(--primary-color);

            .logo-icon {
                font-size: 4.2em;
                color: inherit;
            }

            .logo-text {
                font-family: righteous;
                font-size: 3.6em;
                color: inherit;
                margin-top: -.2em;
                font-weight: bold;
                letter-spacing: .05em;
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

            .fa-settings-mb {
                display: none;
            }
        }

        .user-ctrl {
            height: 33%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: flex-end;

            .user-row {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1em;

                .fa-settings {
                    display: block;
                    font-size: 1.3em;
                    color: var(--primary-font-color);
                    transition: all 0.2s ease-out;

                    &:hover {
                        transform: scale(1.1);
                        cursor: pointer;
                        color: var(--primary-color);
                    }
                }
            }
        }
    }
}

// Mobile
@media screen and (max-width: $mobile-width) {
    .nav-wrapper {
        flex-direction: row;
        padding: 0 !important;

        .logo {
            display: none;
        }

        .btn-group {
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            width: 100%;
            height: 100%;
            gap: 0.3em;
            padding: 0.6em;

            .fa-settings-mb {
                width: 25%;
                font-size: 1.5em;
                display: block;
                color: var(--primary-font-color);
                transition: all 0.2s ease-out;

                &:hover {
                    transform: scale(1.1);
                    cursor: pointer;
                    color: var(--primary-color);
                }
            }

            a {
                display: flex;
                height: 100%;
                width: 25%;
                justify-content: center;
                align-items: center;
            }
        }

        .user-ctrl {
            display: none;

            .fa-settings {
                display: none;
            }
        }
    }
}
</style>
