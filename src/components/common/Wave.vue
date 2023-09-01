<template>
    <canvas ref="canvas" class="wave-box" />
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";
import { debounce } from "lodash";
import { storeToRefs } from "pinia";
import { defineComponent } from "vue";

const FPS: number = 60;
const STEP_SIZE: number = 30;
const INTERVAL_MS: number = 1000 / FPS;
const AMPLITUDE = 12;

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
            waterLevel: 0,
            debouncedOnResize: debounce(this.onResize as any, 100),
            primaryRGB: { r: 0, g: 0, b: 0 }
        };
    },
    mounted() {
        this.initCanvas();
        this.$nextTick(() => {
            window.addEventListener("resize", this.debouncedOnResize);
        });
        this.onWaterChange(this.storeWaterLevel);
        this.setColor();
        // Watch theme change
        this.$watch(() => this.globalStore.primaryColor, (_n, _o) => {
            this.setColor();
        });
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


            ctx.beginPath();
            ctx.moveTo(0, this.waterLevel);
            for (let x = 0; x < width + STEP_SIZE; x += STEP_SIZE) {
                const y = this.waterLevel + Math.sin(x / 80 + t) * AMPLITUDE;
                ctx.lineTo(x, y);
            }

            ctx.lineTo(width, 0);
            ctx.lineTo(0, 0);
            ctx.closePath();

            ctx.fillStyle = `rgba(${this.primaryRGB.r},${this.primaryRGB.g},${this.primaryRGB.b}, ${opacity})`;
            ctx.fill();
        },
        onWaterChange(newValue: number) {
            this.waterLevel = newValue;
        },
        hexToRGB(hex: string) {
            let r = parseInt(hex.slice(1, 3), 16),
                g = parseInt(hex.slice(3, 5), 16),
                b = parseInt(hex.slice(5, 7), 16);
            return { r, g, b };
        },
        getPrimaryRGB() {
            const hex = this.globalStore.primaryColor;
            const rgb = this.hexToRGB(hex);
            return rgb;
        },
        setColor() {
            this.primaryRGB = this.getPrimaryRGB();
        }
    },
    watch: {
        storeWaterLevel(newValue, _oldValue) {
            this.onWaterChange(newValue);
        },
    },
});
</script>

<style lang="scss" scoped> .wave-box {
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
