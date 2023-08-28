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
    name: 'SearchHistory',
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
@import "@/styles/mixins.scss";

@keyframes shake {
    0% {
        transform: translateX(0) rotate(0);
    }

    50% {
        transform: translateX(2px) rotate(-2deg);
    }

    100% {
        transform: translateX(-2px) rotate(2deg);
    }
}

.history-tag {
    z-index: 1;
    user-select: none;

    a,
    span.tag-editing {
        display: block;
        background-color: #fff;
        color: var(--primary-font-color);
        width: 100%;
        height: 100%;
        padding: .25em 1.8em;
        border-radius: 2em;

        @include card-shadow;
    }

    span.tag-editing {
        animation: shake .3s linear infinite;
    }

    a {
        transition: all 0.16s ease-out;

        &:hover {
            background-color: var(--primary-color);
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
        color: var(--primary-color);
        outline: 1px solid var(--primary-color);
        width: 1.3em;
        height: 1.3em;

        &:hover {
            cursor: pointer;
            transform: scale(1.1);
            background-color: var(--primary-color);
            color: #fff;
        }
    }
}
</style>
