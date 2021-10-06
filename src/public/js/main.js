'use strict'
import { cartItems } from "./cartComp";
import { products } from "./productsComp";
import { search } from "./searchComp";
import { preloader } from "./preloader";

export const ProductList = {
    components: {
        'products': products,
        'cart-items': cartItems,
        'search': search,
        'preloader': preloader
    },
    methods: {

        getJson(url) {
            return fetch(url)
                .then(result => result.json()).catch(error => {
                    console.log(error);
                    return [];
                })
        },
        postJson(url, data) {

            return fetch(url, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        putJson(url, data) {
            return fetch(url, {
                    method: 'PUT',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        },
        remove(url, data) {
            return fetch(url, {
                    method: 'DELETE',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                })
                .then(result => {
                    result.json()
                    this.getJson('/api/cart')
                        .then(data => {
                            for (let item of data.contents) {
                                item.img = `img/product-${item.id_product}.png`;
                            }
                            this.$refs.cart.cartItems.amount = data.amount;
                            this.$refs.cart.cartItems.countGoods = data.countGoods;
                            this.$refs.cart.cartItems.contents = data.contents;
                        });
                })
                .catch(error => {
                    console.log(error)
                })
        },
    }
}