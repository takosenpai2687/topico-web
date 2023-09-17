<template>
    <div v-if="user" class="wrapper w-full h-full flex flex-row relative">
        <topico-nav-bar class="topico-nav h-full" />
        <main class="content-wrapper h-full z-10  relative">
            <div class="content"><router-view></router-view></div>
            <!-- Back to top button -->
            <circle-button v-show="showBtnTop" class="btn-top" @click="handleClickTop">
                <font-awesome-icon color="#61666d" icon="fa-solid fa-angle-up" />
            </circle-button>
        </main>
        <wave v-if="globalStore.showWaves" class="wave" />
        <div class="wave-cover"></div>
        <!-- Settings Modal -->
        <Modal title="Settings" :show="globalStore.showSettings" @modalClose="() => globalStore.setShowSettings(false)">
            <Settings />
        </Modal>
    </div>

    <!-- Mobile -->
    <div v-if="user" class="wrapper-m w-full h-full relative">
        <main class="content-wrapper z-10">
            <div class="content"><router-view></router-view></div>
            <!-- Back to top button -->
            <circle-button v-show="showBtnTop" class="btn-top" @click="handleClickTop">
                <font-awesome-icon color="#61666d" icon="fa-solid fa-angle-up" />
            </circle-button>
        </main>
        <topico-nav-bar class="topico-nav" />
        <!-- Settings Modal -->
        <Modal title="Settings" :show="globalStore.showSettings" @modalClose="() => globalStore.setShowSettings(false)">
            <Settings />
        </Modal>
    </div>
</template>

<script lang="ts">
import Wave from "@/components/common/Wave.vue";
import TopicoNavBar from "@/components/nav/TopicoNavBar.vue";
import CircleButton from "@/components/common/CircleButton.vue";
import { getUserInfo } from "@/services/userService";
import useGlobalStore from "@/stores/global";
import { defineComponent } from "vue";
import { debounce, throttle } from "lodash";
import { DEFAULT_COLOR } from '@/styles/themes';
import Modal from "@/components/common/Modal.vue";
import Settings from '@/components/common/Settings.vue';
import { logout } from "@/services/authService";
import { useMessage } from 'naive-ui';

export default defineComponent({
    name: 'Layout',
    components: {
        TopicoNavBar,
        Wave,
        CircleButton,
        Modal,
        Settings
    },
    setup() {
        const globalStore = useGlobalStore();
        const message = useMessage();
        return { globalStore, message };
    },
    data() {
        return {
            user: undefined as User | undefined,
            showBtnTop: false,
            throttledOnScroll: throttle(this.checkScroll as any, 100),
            onResizeDebounced: debounce(this.onResize as any, 100)
        };
    },
    async created() {
        try {
            const user: User = await getUserInfo();
            this.user = user;
        } catch (err: any) {
            this.message.error(err.message);
            logout();
            this.$router.push('/login?redirect=' + this.$route.path);
            return;
        }
        this.$nextTick(() => {
            const body = document.body;
            if (body) {
                body.addEventListener("scroll", this.throttledOnScroll);
            }
            window.addEventListener("resize", this.onResizeDebounced);
            this.onResize();
            this.setTheme();
        });
        this.$watch(() => this.globalStore.primaryColor, (_newVal, _oldVal) => {
            this.setTheme();
        });
    },
    methods: {
        handleClickTop() {
            const body = document.body;
            if (!body) return;
            body.scrollTo({ top: 0, behavior: 'smooth' });
        },
        checkScroll() {
            const scrollTop = document.body.scrollTop;
            this.showBtnTop = scrollTop > 0;
        },
        onResize() {
            this.globalStore.setIsWide(window.innerWidth >= 1600);
            this.globalStore.setIsMobile(window.innerWidth < 1240);
        },
        setTheme() {
            const root = document.documentElement;
            const preferredColor = localStorage.getItem('primaryColor');
            if (!preferredColor) {
                root.style.setProperty('--primary-color', DEFAULT_COLOR);
                localStorage.setItem('primaryColor', DEFAULT_COLOR);
            } else {
                root.style.setProperty('--primary-color', preferredColor);
            }
        }
    },
    beforeDestroy() {
        const body = document.body;
        if (body) {
            body.removeEventListener("scroll", this.throttledOnScroll);
        }
        window.removeEventListener("resize", this.onResizeDebounced);
    }
});
</script>

<style lang="scss" scoped>
@import '@/styles/mixins.scss';

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
        z-index: 2;
        background-color: #fff;
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

    :global(html, body) {
        background-attachment: fixed;
        background-color: var(--primary-color);
    }

    :global(html) {
        padding-bottom: $nav-height + 1em;
    }

    .wrapper {
        display: none;
    }

    .wrapper-m {
        display: block;

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
