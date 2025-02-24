const Order = require('../models/order.model');

const createOrder = async (req, res) => {
    try {
        // console.log('req', req.body);
        const { orderItem, shippingAddress,
            paymentMethod, itemsPrice, ShippingPrice, totalMoney, user } = req.body;
        const newOrder = new Order({
            orderItem,
            shippingAddress,
            paymentMethod,
            itemsPrice,
            ShippingPrice,
            totalPrice: totalMoney,
            user
        });
        const respon = await newOrder.save();

        if (respon) {
            return res.status(200).json({message: "Đặt hàng thành công", data: respon})
        }
    } catch (error) {
        return res.status(500).json({message: error})
    }

};

module.exports = {
    createOrder
}