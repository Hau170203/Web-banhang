const userRouter = require('./user.route');
const productRouter = require('./product.route');
const orderRouter = require("./order.route")

module.exports = (app) => {
    app.use('/api/user',userRouter);
    app.use('/api/product',productRouter);
    app.use('/api/order', orderRouter);
}