/** 
 * This component help CartController to edit cart in cookie
 */
const Cart = require('../models/Cart');
exports.Assign = (oldCart) => {
    const newCart = new Cart();
    for (let i = 0; i < oldCart.items.length; i++) {
        newCart.items[i] = oldCart.items[i];
    }
    newCart.totalPrice = oldCart.totalPrice;
    newCart.totalQuantity = oldCart.totalQuantity;
    return newCart;
}