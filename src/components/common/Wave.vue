<template>
    <canvas ref="canvas" class="wave-box" />
</template>

<script lang="ts">
import useGlobalStore from "@/stores/global";
import { defineComponent } from "vue";

const FPS: number = 60;

export default defineComponent({
    setup() {
        const globalStore = useGlobalStore();
        return { globalStore };
    },
    data() {
        return {
            ctx: null as CanvasRenderingContext2D | null,
            time: 0,
        };
    },
    computed: {
        waterLevel: function () {
            return this.globalStore.waterLevel;
        },
    },
    mounted() {
        this.initCanvas();
        this.$nextTick(() => {
            window.addEventListener("resize", this.onResize);
        });
    },
    beforeDestroy() {
        window.removeEventListener("resize", this.onResize);
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
            }, 1000 / FPS);
        },
        renderWave(t: number, opacity: number) {
            const { ctx } = this;
            if (!ctx) return;
            const width = ctx.canvas.width;

            ctx.beginPath();
            ctx.moveTo(0, this.waterLevel);
            for (let x = 0; x < width; x += 10) {
                const y = this.waterLevel + Math.sin(x / 80 + t) * 10;
                ctx.lineTo(x, y);
            }

            ctx.lineTo(width, 0);
            ctx.lineTo(0, 0);
            ctx.closePath();

            ctx.fillStyle = `rgba(251, 114, 153, ${opacity})`;
            ctx.fill();
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
