const userRouter = require('./user.route');
const productRouter = require('./product.route');

module.exports = (app) => {
    app.use('/api/user',userRouter);
    app.use('/api/product',productRouter);
}