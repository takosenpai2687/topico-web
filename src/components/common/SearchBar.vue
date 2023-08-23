<template>
    <div class="search-container">
        <input
            type="text"
            class="search-input"
            placeholder="Search"
            v-model="searchTerm"
            @focus="expandSearchBar"
            @blur="collapseSearchBar"
            :class="{ expanded: isExpanded }"
        />
        <font-awesome-icon icon="search" class="search-icon" />
    </div>
</template>

<script lang="ts">
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent } from "vue";

export default defineComponent({
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            isExpanded: false,
            searchTerm: "",
        };
    },
    methods: {
        expandSearchBar() {
            this.isExpanded = true;
        },
        collapseSearchBar() {
            this.isExpanded = false;
        },
    },
    computed: {
        searchIcon() {
            return faSearch;
        },
    },
});
</script>

<style scoped>
.search-container {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 2em;
    background: white;
    padding: 0.3em 1em;

    .search-input {
        border: none;
        outline: none;
        background: transparent;
        width: 14em;
        transition: all 0.2s ease;
        &.expanded {
            width: 16em;
        }
    }
    .search-icon {
        margin-left: 10px;
        color: #555;
        cursor: pointer;
    }
}
</style>
