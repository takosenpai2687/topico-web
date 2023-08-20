<template>
    <div class="card-wrapper p-2">
        <div class="card px-4 p-2"><slot /></div>
    </div>
</template>

<script lang="ts">
import { gsap } from "gsap";
export default {
    mounted() {
        this.animateCard();
    },
    methods: {
        animateCard() {
            gsap.fromTo(
                this.$refs.card!,
                {
                    scaleX: 1,
                    scaleY: 1,
                },
                {
                    duration: 0.1618,
                    scaleX: 0.95,
                    scaleY: 1.05,
                    repeat: 1,
                    yoyo: true,
                    ease: "power2.inOut",
                }
            );
        },
    },
};
</script>

<style lang="scss" scoped>
@import "@/styles/mixins.scss";
.card-wrapper {
    .card {
        width: 100%;
        @include card-shadow-rounded;
    }
}
</style>
