<template>
    <div v-if="user" class="wrapper w-full h-full flex flex-row relative overflow-y-hidden">
        <topico-nav-bar class="topico-nav h-full" />
        <main class="content-wrapper h-full p-4 z-10 overflow-y-auto relative" ref="main">
            <div class="content"><router-view></router-view></div>
            <!-- Back to top button -->
            <circle-button v-show="showBtnTop" class="btn-top" @click="handleClickTop">
                <font-awesome-icon color="#61666d" icon="fa-solid fa-angle-up" />
            </circle-button>
        </main>
        <wave v-if="globalStore.showWaves" class="z-0" />
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
import { throttle } from "lodash";

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
            throttledOnScroll: throttle(this.checkScroll as any, 100)
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
        }
    },
    beforeDestroy() {
        const container: any = this.$refs.main;
        if (container) {
            container.removeEventListener("scroll", this.throttledOnScroll);
        }
    }
});
</script>

<style lang="scss" scoped>
.wrapper {
    background-color: #fcfcfc;
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

        .btn-top {
            position: fixed;
            bottom: 3em;
            right: 3em;
            z-index: 999;
            padding: 1.4em;
            border-radius: 3em;
        }
    }
}

// Small
@media screen and (max-width: 1600px) {
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
</style>
