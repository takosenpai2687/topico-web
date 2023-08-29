<template>
    <div class="px-4">
        <!-- Show Spoilers -->
        <div class="row mb-4">
            <span class="text-lg">Show Spoilers: </span>
            <Switch v-model="showSpoilers" class="switch relative inline-flex h-6 w-11 items-center rounded-full"
                :style="{ 'background-color': showSpoilers ? globalStore.primaryColor : '#ddd', 'transform': 'scale(1.1)' }">
                <span class="sr-only">Enable notifications</span>
                <span :class="showSpoilers ? 'translate-x-6' : 'translate-x-1'"
                    class="inline-block h-4 w-4 transform rounded-full bg-white transition" />
            </Switch>
        </div>
        <!-- Colors -->
        <div class="row colors flex flex-row items-center justify-start pb-4">
            <div v-for="color in colors" :style="{ backgroundColor: color }" class="color-icon"
                :class="{ active: color === primaryColor }" @click="setColor(color)">
                <font-awesome-icon v-if="globalStore.primaryColor === color" class="text-white" icon="fa-solid fa-check" />
            </div>
        </div>
        <!-- Button Save -->
        <div class="row flex flex-row items-center justify-center my-2">
            <TopicoButton @click="handleSave">Save</TopicoButton>
        </div>
    </div>
</template>

<script lang="ts">
import useGlobalStore from '@/stores/global';
import { defineComponent } from 'vue'
import { Switch } from '@headlessui/vue'
import themes, { DEFAULT_COLOR } from '@/styles/themes';
import TopicoButton from '@/components/common/TopicoButton.vue';


export default defineComponent({
    name: 'Settings',
    components: { Switch, TopicoButton },
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            showSpoilers: false,
            primaryColor: DEFAULT_COLOR,
            colors: Object.values(themes)
        }
    },
    created() {
        this.showSpoilers = this.globalStore.showSpoilers;
        this.primaryColor = this.globalStore.primaryColor;
    },
    methods: {
        setColor(color: string) {
            this.primaryColor = color;
        },
        handleSave() {
            // Spoilers
            this.globalStore.setShowSpoilers(this.showSpoilers);
            localStorage.setItem('showSpoilers', JSON.stringify(this.showSpoilers));
            // PrimaryColor
            const root = document.documentElement;
            if (root) {
                localStorage.setItem('primaryColor', this.primaryColor);
                this.globalStore.setPrimaryColor(this.primaryColor);
            }
            this.globalStore.setShowSettings(false);
        }
    }
})
</script>

<style lang="scss" scoped>
.row {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1em;
}


.colors {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 2em;
    padding: 1em 0;

    .color-icon {
        width: 3em;
        height: 3em;
        border-radius: 3em;
        border: 3px solid #fff;
        box-shadow: 0 0 8px 1px rgba(0, 0, 0, .3);
        transition: all 0.2s ease-out;
        display: flex;
        align-items: center;
        justify-content: center;



        &:hover,
        &.active {
            transform: scale(1.2);
        }


        &.active {
            box-shadow: 0 0 16px 2px var(--primary-color);
        }
    }
}
</style>