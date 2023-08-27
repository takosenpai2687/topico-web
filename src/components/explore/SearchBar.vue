<template>
    <form class="search-container" @submit="handleSubmit">
        <input type="text" class="search-input" :placeholder="placeholder ?? 'Search'" v-model="searchTerm"
            @focus="expandSearchBar" @blur="collapseSearchBar" :class="{ expanded: isExpanded }" />
        <button type="submit" @mousedown="handleSubmit">
            <font-awesome-icon icon="search" class="search-icon" />
        </button>
    </form>
</template>

<script lang="ts">
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import { defineComponent } from "vue";

export default defineComponent({
    name: 'SearchBar',
    props: {
        placeholder: {
            type: String,
            required: false
        }
    },
    components: {
        FontAwesomeIcon,
    },
    data() {
        return {
            isExpanded: false,
            searchTerm: ""
        };
    },
    methods: {
        expandSearchBar() {
            this.isExpanded = true;
        },
        collapseSearchBar() {
            this.isExpanded = false;
        },
        handleSubmit(e: any) {
            e.preventDefault();
            const search = this.searchTerm.trim();
            if (search.length === 0) {
                this.$router.push('/explore');
            } else {
                this.$router.push("/explore/" + search);
            }

        },
    },
    computed: {
        searchIcon() {
            return faSearch;
        },
    },
});
</script>

<style lang="scss" scoped>
@import "@/styles/theme.scss";

$initial-width: 20em;
$expanded-width: 28em;

.search-container {
    display: flex;
    align-items: center;
    border: 1px solid #ccc;
    border-radius: 2em;
    background: white;
    padding: 0.5em 1em;
    color: $primaryFontColor;
    margin: 0 auto;

    .search-input {
        border: none;
        outline: none;
        background: transparent;
        width: $initial-width;
        transition: all 0.2s ease;

        &.expanded {
            width: $expanded-width;
        }
    }

    .search-icon {
        margin-left: 10px;
        color: #555;
        cursor: pointer;
    }
}
</style>
