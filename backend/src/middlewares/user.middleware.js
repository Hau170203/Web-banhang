const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

module.exports.createUser = async (req, res, next) => {
    try {
        console.log(req.body);
        const {name, email, password ,checkPassword, phone} = req.body;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        const checkUser = await User.findOne({
            email: email
        });

        if(checkUser){
            return res.status(400).json({message: 'Email đã tồn tại'});
        }

        if(!name || !email || !password || !checkPassword || !phone){
            return res.status(400).json({message: 'Vui lòng nhập đầy đủ thông tin'});
        } else if(password.length < 6){
            return res.status(400).json({message: 'Vui lòng nhập mật khẩu lớn hơn 6 ký tự'});
        } else if(password !== checkPassword){
            return res.status(400).json({message: 'Mật khẩu không khớp'});
        } else if(!emailRegex.test(email)) {
            return res.status(400).json({message: 'Email không đúng định dạng'});
        }

        next();
    } catch (error) {
        return res.status(500).json({message: "Lỗi Middleware: " + error.message});
    }
}

module.exports.signIn = (req, res, next) => {
    try {
        const {email, password} = req.body;
         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!email || !password){
            return res.status(400).json({message: 'Vui lòng nhập đầy đủ thông tin'});
        } else if(!emailRegex.test(email)){
            return res.status(400).json({message: 'Email không đúng định dạng'});
        }
        next();
    } catch (error) {
        return res.status(500).json({message: "Lỗi Middleware: " + error.message});
    }
}

module.exports.updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        console.log(id)
        const checkUser = await User.findOne({
            _id: id
        });
        console.log(checkUser)
        if(!checkUser){
            return res.status(400).json({message: 'Người dùng không tồn tại'});
        }
        next();
    } catch (error) {
        return res.status(500).json({message: "Lỗi Middleware: " + error.message});
    }
}

module.exports.deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        if(!req.headers.authorization){
            return res.status(400).json({message: 'Vui lòng nhập token'});
        }
        const auth = req.headers.authorization;
        const token = auth.split(" ")[1];
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!data ){
            return res.status(400).json({message: 'token không hợp lệ'});
        } else if(data.isAdmin === false){
            return res.status(400).json({message: 'Bạn không có quyền xóa người dùng'});
        }
        const checkUser = await User.findOne({
            _id: id
        });
        if(!checkUser){
            return res.status(400).json({message: 'Người dùng không tồn tại'});
        };
        next();
    }  catch (error) {
        return res.status(500).json({message: "Lỗi Middleware: " + error.message});
    }
}

module.exports.auth =  (req, res, next) => {
    try {
        console.log(req.headers.authorization)
        if(!req.headers.authorization){
            return res.status(400).json({message: 'Vui lòng nhập token'});
        }
        const auth = req.headers.authorization;
        const token = auth.split(" ")[1];
        // console.log(token)
        const data = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        if(!data) {
            return res.status(400).json({message: 'Token không hợp lệ'});
        } else if(data.isAdmin === false){
            return res.status(400).json({message: 'Bạn không có quyền truy cập'});
        }
        next();
    } catch (error) {
        return res.status(500).json({message: "Lỗi Middleware: " + error.message});
    }
}