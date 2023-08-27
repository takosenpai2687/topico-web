<template>
    <div>explore result</div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

const MAX_HISTORY = 5;

export default defineComponent({
    setup() {
        return {};
    },
    data() {
        return {
            search: "",
        };
    },
    created() {
        // Resolve search param
        const search = ((this.$route.params.search as string) ?? "").trim();
        if (!search || search.length === 0) {
            this.$router.push("/explore");
        }
        // Push search history
        let _searchHistory = JSON.parse(
            localStorage.getItem("searchHistory") ?? "[]"
        ) as string[];
        this.search = search;
        // Remove existing
        const idx = _searchHistory.indexOf(search);
        if (idx > -1) _searchHistory.splice(idx, 1);
        // Insert
        _searchHistory.unshift(search);
        localStorage.setItem(
            "searchHistory",
            JSON.stringify(_searchHistory.slice(0, MAX_HISTORY))
        );
        // TODO: Request API
    },
});
</script>

<style lang="scss" scoped></style>
