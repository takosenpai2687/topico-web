import { defineStore } from "pinia";

const useGlobalStore = defineStore("global", {
    state: () => {
        return {
            waterLevel: 0,
            showWaves: true,
        };
    },
    actions: {
        setWaterLevel(targetLevel: number) {
            this.waterLevel = targetLevel;
        },
        setShowWaves(show: boolean) {
            this.showWaves = show;
            if (!show) this.waterLevel = -10;
        },
    },
});

export default useGlobalStore;
