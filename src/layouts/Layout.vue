<template>
    <div v-if="user" class="wrapper w-full h-full flex flex-row relative">
        <topico-nav-bar class="topico-nav h-full" />
        <main class="content-wrapper h-full p-4 z-10">
            <div class="content"><router-view></router-view></div>
        </main>
        <wave v-if="globalStore.showWaves" class="z-0" />
    </div>
</template>

<script lang="ts">
import Wave from "@/components/common/Wave.vue";
import TopicoNavBar from "@/components/nav/TopicoNavBar.vue";
import { getUserInfo } from "@/services/userService";
import useGlobalStore from "@/stores/global";
import { setLocalStorage } from "@/util/auth";
import { defineComponent } from "vue";

export default defineComponent({
    components: {
        TopicoNavBar,
        Wave,
    },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            user: undefined as User | undefined,
        };
    },
    async mounted() {
        const user = await getUserInfo();
        setLocalStorage(user);
        this.user = user;
    },
});
</script>

<style lang="scss" scoped>
.wrapper {
    background-color: #fcfcfc;
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
