const homeRouter = require('./home');
const menuRouter = require('./admin');
// const productsRouter = require('./product');
const cartRouter = require('./cart');
const loginRouter = require('./login');
const registerRouter = require('./register');
const loggoutRouter = require('./loggout');
const checkoutRouter = require('./checkout');
const paymentRouter = require('./payment');
const adminRouter = require('./admin');
function route(app) {
    // app.use('/products', productsRouter);
    app.use('/admin', adminRouter);

    app.use('/checkout', checkoutRouter);
    app.use('/cart', cartRouter);
    app.use('/login', loginRouter);
    app.use('/register', registerRouter);
    app.use('/loggout', loggoutRouter);
    app.use('/payment', paymentRouter);
    app.use('/', homeRouter);
    
}







module.exports = route;