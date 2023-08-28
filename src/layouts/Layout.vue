<template>
    <div v-if="user" class="wrapper w-full h-full flex flex-row relative overflow-y-hidden">
        <topico-nav-bar class="topico-nav h-full" />
        <main class="content-wrapper h-full z-10 overflow-y-auto relative" ref="main">
            <div class="content"><router-view></router-view></div>
            <!-- Back to top button -->
            <circle-button v-show="showBtnTop" class="btn-top" @click="handleClickTop">
                <font-awesome-icon color="#61666d" icon="fa-solid fa-angle-up" />
            </circle-button>
        </main>
        <wave v-if="globalStore.showWaves" class="wave" />
        <div class="wave-cover"></div>
    </div>

    <!-- Mobile -->
    <div v-if="user" class="wrapper-m w-full h-full  overflow-y-hidden">
        <main class="content-wrapper z-10 overflow-y-auto " ref="main">
            <div class="content"><router-view></router-view></div>
            <!-- Back to top button -->
            <circle-button v-show="showBtnTop" class="btn-top" @click="handleClickTop">
                <font-awesome-icon color="#61666d" icon="fa-solid fa-angle-up" />
            </circle-button>
        </main>
        <topico-nav-bar class="topico-nav" />
    </div>
</template>

<script lang="ts">
import Wave from "@/components/common/Wave.vue";
import TopicoNavBar from "@/components/nav/TopicoNavBar.vue";
import CircleButton from "@/components/common/CircleButton.vue";
import { getUserInfo } from "@/services/userService";
import useGlobalStore from "@/stores/global";
import { setLocalStorage } from "@/util/auth";
import { defineComponent } from "vue";
import { debounce, throttle } from "lodash";

export default defineComponent({
    name: 'Layout',
    components: {
        TopicoNavBar,
        Wave,
        CircleButton
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            user: undefined as User | undefined,
            showBtnTop: false,
            throttledOnScroll: throttle(this.checkScroll as any, 100),
            onResizeDebounced: debounce(this.onResize as any, 100)
        };
    },
    async mounted() {
        const user = await getUserInfo();
        setLocalStorage(user);
        this.user = user;
        this.$nextTick(() => {
            const container: any = this.$refs.main;
            if (container) {
                container.addEventListener("scroll", this.throttledOnScroll);
            }
            window.addEventListener("resize", this.onResizeDebounced);
            this.onResize();
        })
    },
    methods: {
        handleClickTop() {
            const main: any = this.$refs.main;
            if (!main) return;
            main.scrollTo({ top: 0, behavior: 'smooth' });
        },
        checkScroll() {
            const main: any = this.$refs.main;
            if (!main) return;
            const scrollTop = main.scrollTop;
            this.showBtnTop = scrollTop > 0;
        },
        onResize() {
            this.globalStore.setIsWide(window.innerWidth >= 1600);
            this.globalStore.setIsMobile(window.innerWidth < 1240);
        },
    },
    beforeDestroy() {
        const container: any = this.$refs.main;
        if (container) {
            container.removeEventListener("scroll", this.throttledOnScroll);
        }
        window.removeEventListener("resize", this.onResizeDebounced);
    }
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';
@import '@/styles/theme.scss';

.wrapper {
    max-height: 100vh;

    .topico-nav {
        position: fixed;
        z-index: 999;
        min-width: 240px;
        width: 15%;
    }

    .content-wrapper {
        min-width: 1000px;
        position: absolute;

        .content {
            margin: 0 auto;
            width: 100%;
            max-width: 75em;
        }


    }

    .wave {
        z-index: 0;
    }

    .wave-cover {
        width: 100%;
        height: 100%;
        position: fixed;
        z-index: 1;
        background-color: inherit;
        opacity: 0;
    }
}

// Small
@media screen and (min-width: $mobile-width) and (max-width: 1600px) {
    .content-wrapper {
        left: 240px;
        width: calc(100% - 240px);
    }
}

// Medium
@media screen and (min-width: 1600px) {
    .content-wrapper {
        left: 15%;
        width: 85%;
    }
}

// 1080P
@media screen and (min-width: 1919px) {
    .content-wrapper {
        .content {
            max-width: 1300px !important;
        }
    }
}

// Mobile
@media screen and (max-width: $mobile-width) {
    $nav-height: 5em;

    .wrapper {
        display: none;
    }

    .wrapper-m {
        display: block;
        background-color: $primaryColor;

        .content-wrapper {
            height: calc(100vh - $nav-height);
            padding: .5em;

            .content {
                display: block;
            }
        }

        .btn-top {
            position: fixed;
            bottom: 5em;
            right: 1em;
            z-index: 999;
            border-radius: 3em;
            font-size: 1.4em;
        }

        .topico-nav {
            position: fixed;
            bottom: 0;
            left: 0;
            right: 0;
            height: $nav-height;
        }
    }
}

// PC
@media screen and (min-width: $mobile-width) {
    .wrapper {
        display: block;

        .content-wrapper {
            padding: 1em;
        }

        .btn-top {
            position: fixed;
            bottom: 3em;
            right: 3em;
            z-index: 999;
            border-radius: 3em;
            font-size: 1.4em;
        }
    }

    .wrapper-m {
        display: none;
    }
}
</style>
