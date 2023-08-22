<template>
    <div v-if="user" class="wrapper w-full h-full flex flex-row relative">
        <topico-nav-bar class="topico-nav h-full" />
        <main class="content h-full p-4 z-10">
            <router-view></router-view>
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
    max-width: 100vw;
    min-width: 1200px;
    background-color: #fcfcfc;
    .topico-nav {
        min-width: 240px;
        z-index: 999;
    }
    .content {
        width: 100vw;
        max-width: 1800px;
        min-width: 1215px;
        margin: auto;
    }
}

@media screen and (max-width: 1800px) {
    .topico-nav {
        width: 20%;
    }
    .content {
        padding-left: calc(20% + 16px);
    }
}

@media screen and (min-width: 1800px) {
    .topico-nav {
        width: 360px;
    }
    .content {
        padding-left: calc(360px + 16px);
    }
}
</style>
