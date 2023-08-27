<template>
    <canvas ref="canvas" class="wave-box" />
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";
import { debounce } from "lodash";

const FPS: number = 60;
const STEP_SIZE: number = 30;
const TRANSITION_TIME_MS: number = 160;
const INTERVAL_MS: number = 1000 / FPS;
const AMPLITUDE = 15;

export default defineComponent({
    name: 'Wave',
    setup() {
        const globalStore = useGlobalStore();
        const { waterLevel: storeWaterLevel } = storeToRefs(globalStore);
        return { globalStore, storeWaterLevel };
    },
    data() {
        return {
            ctx: null as CanvasRenderingContext2D | null,
            time: 0,
            transition: false,
            stepSize: 0,
            waterLevel: 0,
            targetLevel: 0,
            debouncedOnResize: debounce(this.onResize as any, 100),
        };
    },
    mounted() {
        this.initCanvas();
        this.$nextTick(() => {
            window.addEventListener("resize", this.debouncedOnResize);
        });
        this.onWaterChange(0, this.storeWaterLevel);
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.debouncedOnResize);
    },
    methods: {
        initCanvas() {
            const canvas: HTMLCanvasElement = this.$refs
                .canvas as HTMLCanvasElement;
            this.ctx = canvas.getContext("2d");
            this.onResize();
            this.render();
        },
        onResize() {
            const canvas: HTMLCanvasElement = this.$refs
                .canvas as HTMLCanvasElement;
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            this.ctx!.imageSmoothingEnabled = true;
        },
        render() {
            this.time += 1 / FPS;
            const { ctx } = this;
            if (!ctx) return;
            const width = ctx.canvas.width;
            const height = ctx.canvas.height;
            ctx.clearRect(0, 0, width, height);
            ctx.imageSmoothingEnabled = true;
            this.renderWave(this.time, 0.6);
            this.renderWave(this.time + 5, 0.2);
            this.renderWave(this.time + 10, 0.2);
            setTimeout(() => {
                requestAnimationFrame(this.render);
            }, INTERVAL_MS);
        },
        renderWave(t: number, opacity: number) {
            const { ctx } = this;
            if (!ctx) return;
            const width = ctx.canvas.width;

            // Transition
            if (this.transition) {
                this.waterLevel += this.stepSize;
            }

            if (
                Math.abs(this.waterLevel - this.targetLevel) <
                Math.abs(this.stepSize * 1.5)
            ) {
                this.transition = false;
                this.targetLevel = 0;
                this.stepSize = 0;
            }

            ctx.beginPath();
            ctx.moveTo(0, this.waterLevel);
            for (let x = 0; x < width + STEP_SIZE; x += STEP_SIZE) {
                const y = this.waterLevel + Math.sin(x / 80 + t) * AMPLITUDE;
                ctx.lineTo(x, y);
            }

            ctx.lineTo(width, 0);
            ctx.lineTo(0, 0);
            ctx.closePath();

            ctx.fillStyle = `rgba(251, 114, 153, ${opacity})`;
            ctx.fill();
        },
        onWaterChange(oldValue: number, newValue: number) {
            this.transition = true;
            this.targetLevel = newValue;
            this.stepSize =
                (newValue - oldValue) / (TRANSITION_TIME_MS / INTERVAL_MS);
        },
    },
    watch: {
        storeWaterLevel(newValue, oldValue) {
            this.onWaterChange(oldValue, newValue);
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.wave-box {
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100%;
    height: 100vh;
    background-color: #fcfcfc;
}
</style>
