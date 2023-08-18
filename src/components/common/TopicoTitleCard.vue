<template>
    <div class="card-wrapper p-2">
        <div class="card px-4 p-1">
            <h2 class="card-heading" v-if="title">{{ title }}</h2>
            <div class="py-4"><slot /></div>
        </div>
    </div>
</template>

<script lang="ts">
export default {
    props: {
        title: { type: String, required: false },
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
