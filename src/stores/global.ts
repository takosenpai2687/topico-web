import { DEFAULT_COLOR } from "@/styles/themes";
import { defineStore } from "pinia";

const useGlobalStore = defineStore("global", {
    state: () => {
        return {
            waterLevel: 0,
            showWaves: true,
            showSpoilers: localStorage.getItem("showSpoilers") === "true",
            isWide: false,
            isMobile: false,
            showSettings: false,
            primaryColor: localStorage.getItem("primaryColor") ?? DEFAULT_COLOR,
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
        setShowSpoilers(show: boolean) {
            this.showSpoilers = show;
            localStorage.setItem("showSpoilers", JSON.stringify(show));
        },
        toggleShowSpoilers() {
            this.showSpoilers = !this.showSpoilers;
            localStorage.setItem(
                "showSpoilers",
                JSON.stringify(this.showSpoilers)
            );
        },
        setIsWide(isWide: boolean) {
            this.isWide = isWide;
        },
        setIsMobile(isMobile: boolean) {
            this.isMobile = isMobile;
        },
        setShowSettings(show: boolean) {
            this.showSettings = show;
        },
        setPrimaryColor(color: string) {
            this.primaryColor = color;
        },
    },
});

export default useGlobalStore;
