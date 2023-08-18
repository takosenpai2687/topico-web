<template>
    <div v-if="user" class="wrapper w-full h-full flex flex-row">
        <topico-nav-bar class="topico-nav h-full" />
        <main class="content h-full p-4">
            <router-view></router-view>
        </main>
    </div>
</template>

<script lang="ts">
import TopicoNavBar from '@/components/nav/TopicoNavBar.vue'
import { getUserInfo } from '@/services/userService'
import { setLocalStorage } from '@/util/auth'
import { defineComponent } from 'vue'

export default defineComponent({
    components: {
        TopicoNavBar,
    },
    data() {
        return {
            user: undefined as User | undefined,
        }
    },
    async mounted() {
        const user = await getUserInfo()
        setLocalStorage(user)
        this.user = user
    },
})
</script>

<style lang="scss" scoped>
.wrapper {
    max-width: 100vw;
    min-width: 1200px;
    background-color: #fcfcfc;
    .topico-nav {
        min-width: 240px;
    }
    .content {
        max-width: 1400px;
        min-width: 1100px;
        margin: auto;
    }
}

@media screen and (max-width: 1800px) {
    .topico-nav {
        width: 20vw;
    }
    .content {
        width: 80vw;
    }
}

@media screen and (min-width: 1800px) {
    .topico-nav {
        width: 360px;
    }
    .content {
        width: calc(100vw - 360px);
    }
}
</style>
