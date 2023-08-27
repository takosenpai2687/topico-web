<template>
    <div class="history-tag  relative">
        <RouterLink v-if="!!!editing" :to="`/explore/${history}`">{{
            history
        }}</RouterLink>
        <span class="tag-editing" v-if="!!editing">{{
            history
        }}</span>
        <div v-if="!!editing" class="edit flex flex-row justify-center items-center" @click="handleClickRemove">
            <font-awesome-icon icon="fa-solid fa-xmark" />
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { RouterLink } from "vue-router";

export default defineComponent({
    props: {
        history: {
            required: true,
            type: String,
        },
        editing: {
            required: false,
            type: Boolean,
        },
    },
    setup() {
        return {};
    },
    components: { RouterLink },
    methods: {
        handleClickRemove() {
            let _searchHistory = JSON.parse(localStorage.getItem('searchHistory') ?? '[]') as string[];
            const idx = _searchHistory.indexOf(this.history);
            if (idx > -1) { _searchHistory.splice(idx, 1); }
            localStorage.setItem('searchHistory', JSON.stringify(_searchHistory));
            this.$emit('searchHistoryChange');
        }
    }
});
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

.history-tag {
    z-index: 1;
    user-select: none;


    a,
    span.tag-editing {
        display: block;
        background-color: #fff;
        color: $primaryFontColor;
        width: 100%;
        height: 100%;
        padding: .25em 1.8em;
        border-radius: 2em;
    }

    a {
        transition: all 0.16s ease-out;

        &:hover {
            background-color: $primaryColor;
            cursor: pointer;
            transform: scale(1.1);
            color: #fff;
            font-weight: bold;
        }
    }


    .edit {
        position: absolute;
        z-index: 2;
        top: -.5em;
        right: -.5em;
        border-radius: 2em;
        font-weight: bold;
        background-color: #fff;
        color: $primaryColor;
        outline: 1px solid $primaryColor;
        width: 1.3em;
        height: 1.3em;

        &:hover {
            cursor: pointer;
            transform: scale(1.1);
            background-color: $primaryColor;
            color: #fff;
        }
    }
}
</style>
