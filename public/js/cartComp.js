const cartItem = {
    props: ['cartItem'],
    template: `
    <figure class="cart-item">
        <img :src="cartItem.img" alt="Фото товара">
        <figcaption class="cart-item-info">
            <div class="wrapper-for-info">
                <h3>{{ cartItem.product_name }}</h3>
                <span class="red">{{ cartItem.price }} &#36;</span>
            </div>
            <div class="wrapper-for-count-buttons">
                <button class="count-buttons__button remove-product" @click="$parent.removeCartItem(cartItem)"></button>
                <input class="number-of-goods" type="text" :value="cartItem.quantity" readonly>
                <button class="count-buttons__button add-product" @click="$parent.addCartItem(cartItem)"></button>
            </div>
        </figcaption>
    </figure>
    `
}

const cartItems = {
    components: {
        'cartItem': cartItem
    },
    data() {
        return {
            catalogUrl: '/api/cart',
            cartShown: false,
            cartItems: []
        }
    },

    methods: {
        removeCartItem(cartItem) {
            this.$root.remove(`/api/cart/${cartItem.id_product}`, cartItem)
        },

        addCartItem(cartItem) {
            this.$root.putJson(`/api/cart/${cartItem.id_product}`, { quantity: 1 })
                .then(data => {
                    if (data.result === 1) {
                        cartItem.quantity++;
                    }
                    if (data) {
                        this.cartItems = JSON.parse(data);
                    }
                })
        },
    },

    mounted() {
        this.$parent.getJson(this.catalogUrl)
            .then(data => {
                for (item of data.contents) {
                    item.img = `img/product-${item.id_product}.png`;
                }
                this.cartItems = data;
            });
    },

    template: `
    <button class="cart-button" type="button" @click="cartShown = !cartShown">Корзина</button>
    <div class="cart-list" v-show="cartShown">
        <div class="cart-content">
            <button class="close-cart-list" @click="cartShown = !cartShown"></button>
            <cartItem 
            v-for="cartItem of cartItems.contents"
            :key="cartItem.id_product"
            :cartItem="cartItem">
            </cartItem>
            <div v-show="cartItems.amount !== 0" class="payment-info"> 
            <span> Итого к оплате: {{ cartItems.countGoods }} &#36;</span>
            </div>
            <span class="no-product-in-cart" v-show="cartItems.amount === 0">У Вас пока что нет товаров в корзине</span>
        </div>
    </div>
    `
}