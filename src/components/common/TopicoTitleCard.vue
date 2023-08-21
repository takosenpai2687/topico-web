<template>
    <div class="card-wrapper p-2">
        <div class="card px-4 p-2" ref="card">
            <h2 class="card-heading" v-if="title">{{ title }}</h2>
            <div class="card-content py-4"><slot /></div>
        </div>
    </div>
</template>

<script lang="ts">
import { gsap } from "gsap";
export default {
    props: {
        title: { type: String, required: false },
        delay: { type: Number, required: false },
    },
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
                    delay: this.delay ?? 0,
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

        .card-heading {
            font-weight: bolder;
            font-size: 1.4em;
            line-height: 1.8em;
        }
    }
}
</style>
