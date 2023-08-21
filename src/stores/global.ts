import { defineStore } from "pinia";

const TRANSITION_TIME_MS = 160;
const FPS = 60;
const INTERVAL_MS = 1000 / FPS;

const useGlobalStore = defineStore("global", {
    state: () => {
        return {
            waterLevel: 0,
            showWaves: true,
            transitionInterval: undefined as NodeJS.Timeout | undefined,
        };
    },
    actions: {
        setWaterLevel(targetLevel: number) {
            // this.waterLevel = targetLevel;
            if (this.transitionInterval) clearInterval(this.transitionInterval);
            const fromLevel = this.waterLevel;
            const STEP_SIZE =
                (targetLevel - fromLevel) / (TRANSITION_TIME_MS / INTERVAL_MS);
            this.transitionInterval = setInterval(() => {
                this.waterLevel += STEP_SIZE;
                if (
                    Math.abs(this.waterLevel - targetLevel) <
                        Math.abs(STEP_SIZE * 1.5) &&
                    this.transitionInterval
                ) {
                    clearInterval(this.transitionInterval);
                }
            }, INTERVAL_MS);
        },
        setShowWaves(show: boolean) {
            this.showWaves = show;
            if (!show) this.waterLevel = -10;
        },
    },
});

export default useGlobalStore;
