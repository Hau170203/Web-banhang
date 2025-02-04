const Product = require('../models/product.model');

module.exports.createProduct = async (req, res, next) => {
    try {
        const {name, image, type, countInStock, price, rating, description} = req.body;
        if(!name || !image || !type || !countInStock || !price || !rating) {
            return res.status(400).json({message: "Vui lòng điền đầy đủ thông tin"});
        } else if(price < 0 ){
            return res.status(400).json({message: "Giá tiền không hợp lệ"});
        }
        const data = await Product.findOne({
            name: name
        })
        if(data){
            return res.status(400).json({message: "Sản phẩm đã tồn tại"});
        }
        next();
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports.updateProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Product.findOne({
            _id: id
        });
        if(!data){
            return res.status(404).json({message: "Không tìm thấy sản phẩm"});
        }
        next();
    } catch (error) {
       return res.status(500).json({message: error.message});
    }
}

module.exports.deleteProduct = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await Product.findOne({
            _id: id
        });
        if(!data){
            return res.status(404).json({message: "Không tìm thấy sản phẩm"});
        }
        next();
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}