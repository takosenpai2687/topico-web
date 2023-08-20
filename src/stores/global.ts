import { defineStore } from "pinia";

const useGlobalStore = defineStore("global", {
    state: () => {
        return {
            waterLevel: 0,
            showWaves: true,
        };
    },
    actions: {
        setWaterLevel(height: number) {
            this.waterLevel = height;
        },
        setShowWaves(show: boolean) {
            this.showWaves = show;
        },
    },
});

export default useGlobalStore;
