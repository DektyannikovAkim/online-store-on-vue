'use strict'

const API = "https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses";

const ProductList = {
    components: {
        'products': products,
        'cart-items': cartItems,
        'search': search,
        'feedback-form': feedbackForm
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
            console.log(url)

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
            console.log(url)
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
                            console.log(data)
                                // this.cartGoods.push({ amount: data.amount, countGoods: data.countGoods });                          
                            for (item of data.contents) {
                                item.img = `img/product-${item.id_product}.png`;
                            }
                            this.$refs.cart.cartItems = data.contents;
                        });
                })
                .catch(error => {
                    console.log(error)
                })
        },
    },
}

Vue.createApp(ProductList).mount('#app');