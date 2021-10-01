const product = {
    props: ['product'],
    template: `
    <figure class="products-item">
         <img :src="product.img" alt="Фото товара">
            <figcaption class="item-info">
                <h3>{{ product.product_name }}</h3>
                <span class="red">{{ product.price }} &#36;</span>
                <button class="product-buy" type="button" :data-id='product.id_product' @click="$parent.addInCart(product)">Купить</button>
            </figcaption>
    </figure>
    `
}

export const products = {
    components: {
        'product': product
    },

    data() {
        return {
            catalogUrl: '/api/products',
            products: [],
        }
    },

    methods: {
        addInCart(product) {
            let find = this.$root.$refs.cart.cartItems.contents.find(el => el.id_product === product.id_product);
            if (find) {
                this.$root.putJson(`/api/cart/${find.id_product}`, { quantity: 1 })
                    .then(data => {
                        if (data) {
                            this.$root.$refs.cart.cartItems = JSON.parse(data);
                        }
                    })
            } else {
                product.quantity = 1;
                this.$root.postJson(`/api/cart`, product)
                    .then(data => {
                        if (data) {
                            this.$root.$refs.cart.cartItems = JSON.parse(data);
                        }
                    })
            }
        }
    },

    mounted() {
        this.$parent.getJson('/api/products')
            .then(data => {
                for (let item of data) {
                    item.img = `img/product-${item.id_product}.png`;
                    this.products.push(item);
                }
            });
    },

    template: `
    <div class="products-list">
        <product 
            v-for= "product of products"
            :key="product.id_product"
            :product="product">
        </product>
    </div>
    `
}