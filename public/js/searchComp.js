const search = {

    data() {
        return {
            catalogUrl: "/catalogData.json",
            userSearch: ''
        }
    },

    methods: {
        searchProducts(userSearch) {
            this.$root.$refs.productComp.products.length = 0;
            this.$root.getJson(this.catalogUrl).then(data => {
                data.forEach(item => {
                    if (item.product_name.toLowerCase().includes(userSearch.toLowerCase())) {
                        this.$root.$refs.productComp.products.push(item);
                    }
                })
            })
        }
    },

    template: `
    <form class="search" @submit.prevent="searchProducts(userSearch)">
        <input type="text" class="search-text" v-model="userSearch">
        <button class="search-button"></button>
    </form>
    `
}