const md5 = require('md5');
const User = require('../models/user.model');
const jwthelp = require("../helpers/jwt");
const jwt = require('jsonwebtoken');

module.exports.createUser = async (req, res) => {    
    try {
        const {name, email, password , phone} = req.body;
        console.log(req.body);
        const newUser = new User({
            name: name,
            email: email,
            password: md5(password),
            phone: phone,
            isAdmin: false,
        });
        const result = await newUser.save();
        if(result){
            return res.status(200).json({message: 'Tạo tài khoản thành công'});
        }
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports.signIn = async (req, res) => {
    try {
        const {email, password} = req.body;
        const user = await User.findOne({
            email: email
        });
        if(!user){
            return res.status(400).json({message: 'Email không tồn tại'});
        }
        if(user.password !== md5(password)){
            return res.status(400).json({message: 'Mật khẩu không đúng'});
        }
        const access_token = await jwthelp.generateAccessToken({
            id: user.id,
            isAdmin: user.isAdmin
        });
        const refresh_token = await jwthelp.generateRefreshToken({
            id: user.id,
            isAdmin: user.isAdmin
        });

        
        res.cookie('refresh_token', refresh_token,{
            httpOnly: true,
            maxAge: 7 * 24 * 60 * 60 * 1000,
            secure: false,
            samesite: 'strict'
        })
        return res.status(200).json({message: 'Đăng nhập thành công', access_token: access_token});
    }
    catch (error) {
        res.status(500).json({message: error.message});
    }

}

module.exports.updateUser = async (req, res) => {
    try {
        // console.log(req.body);
        const data = req.body;
        const id = req.params.id;
        const updateUser = await User.findByIdAndUpdate(id, {...data}, {new: true});
        // console.log(updateUser)
        if(updateUser){
            return res.status(200).json({message: 'Cập nhật thông tin thành công', user: updateUser});
        }
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports.deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const deleteUser = await User.findByIdAndDelete(id);
        if(deleteUser){
            return res.status(200).json({message: 'Xóa tài khoản thành công'});
        }
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports.getAllUser = async (req, res) => {
    try {
        const users = await User.find();
        if(users){
            return res.status(200).json({message: 'Lấy danh sách người dùng thành công', users: users});
        }

    } catch (error) {
        return res.status(500).json({message: error.message});
        
    }
}

module.exports.detailUser = async (req, res) => {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        // console.log(user)
        if(user){
            return res.status(200).json({message: 'Lấy thông tin người dùng thành công', user: user});
        }
    }
    catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports.refreshToken = async (req, res) => {
    try {
        // console.log("cookie", req.cookies.refresh_token)
        if(!req.cookies.refresh_token){
            return res.status(400).json({message: 'Vui lòng nhập token'});
        }
        const token = req.cookies.refresh_token;
        const data = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
        if(!data){
            return res.status(400).json({message: 'Token không hợp lệ'});
        }
        // console.log(data);
        const access_token = await jwthelp.generateAccessToken({
            id: data.id,
            isAdmin: data.isAdmin
        });
        // console.log("accessToken: ", access_token);
        return res.status(200).json({message: 'Lấy token mới thành công', access_token: access_token});
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}

module.exports.logOut = (req, res) => {
    try {
        res.clearCookie('refresh_token');
        return res.status(200).json({message: "LogOut thành công"})
    } catch (error) {
        return res.status(404).json({message: error})
    }
}