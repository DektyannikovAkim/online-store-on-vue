let add = (cart, req) => {
    cart.contents.push(req.body);
    return JSON.stringify(countGoods(cart), null, 4);
};

let change = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    find.quantity += req.body.quantity;
    return JSON.stringify(countGoods(cart), null, 4);
};

let remove = (cart, req) => {
    let find = cart.contents.find(el => el.id_product === +req.params.id);
    if (find.quantity > 1) {
        find.quantity -= 1;
    } else {
        cart.contents.splice(cart.contents.indexOf(find), 1);
    }
    return JSON.stringify(countGoods(cart), null, 4);
};

let countGoods = (cart) => {
    cart.amount = 0;
    cart.countGoods = 0;
    for (cartItem of cart.contents) {
        cart.amount += cartItem.quantity;
        cart.countGoods += cartItem.quantity * cartItem.price;
    }
    return cart;
}

module.exports = {
    add,
    change,
    remove,
    countGoods
};