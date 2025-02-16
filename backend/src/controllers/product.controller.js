const Product = require('../models/product.model');
const cloudinary = require("../helpers/cloudinary");

const createProduct = async (req, res) => {
    try {
        // console.log(req.body);
        // console.log("ok");
        const { name, image, imageDetail, type, countInStock, price, description, discount, seller } = req.body;

        let newImage = "";
        if (image) {
            try {
                // Upload ảnh lên Cloudinary
                const uploadedImage = await cloudinary.uploader.upload(image);

                if (uploadedImage) {
                    newImage = uploadedImage.secure_url;
                }
            } catch (error) {
                console.error("Lỗi khi upload avatar:", error);
            }
        }
        // console.log(newImage);
        let arrayImageDetail = [];
        if (imageDetail) {
            const arrayImage = JSON.parse(imageDetail);
            // console.log(arrayImage)
            for (const image of arrayImage) {
                try {
                    // Kiểm tra nếu ảnh đã có URL (tránh upload trùng lặp)
                    if (!image.startsWith("http")) {
                        const uploadedImage = await cloudinary.uploader.upload(image);

                        if (uploadedImage) {
                            arrayImageDetail.push(uploadedImage.secure_url);
                        }
                    } else {
                        arrayImageDetail.push(image);
                    }
                } catch (error) {
                    console.error("Lỗi khi upload ảnh:", error);
                }
            };
        }
        // console.log("arrayImage:", arrayImageDetail);

        const newProduct = new Product({
            name: name,
            image: newImage,
            imageDetail: arrayImageDetail,
            type: type,
            countInStock: countInStock,
            price: price,
            description: description,
            discount: discount,
            seller: seller
        });
        const respon = await newProduct.save();
        if (respon) {
            return res.status(200).json({ message: 'Tạo sản phẩm thành công', data: respon });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
        // console.log(req.body);
        const { name, image, imageDetail, type, countInStock, price, description, discount, seller } = req.body;

        let newImage = "";
        if (image) {
            try {
                // Upload ảnh lên Cloudinary
                const uploadedImage = await cloudinary.uploader.upload(image);

                if (uploadedImage) {
                    newImage = uploadedImage.secure_url;
                }
            } catch (error) {
                console.error("Lỗi khi upload avatar:", error);
            }
        }
        console.log(newImage);

        let arrayImageDetail = [];
        if (imageDetail) {
            try {
                arrayImage = Array.isArray(imageDetail) ? imageDetail : JSON.parse(imageDetail);
            } catch (error) {
                return res.status(400).json({ message: "imageDetail không hợp lệ" });
            }
            // console.log(arrayImage)
            for (const image of arrayImage) {
                try {
                    // Kiểm tra nếu ảnh đã có URL (tránh upload trùng lặp)
                    if (!image.startsWith("http")) {
                        const uploadedImage = await cloudinary.uploader.upload(image);

                        if (uploadedImage) {
                           await arrayImageDetail.push(uploadedImage.secure_url);
                        }
                    } else {
                        arrayImageDetail.push(image);
                    }
                } catch (error) {
                    console.error("Lỗi khi upload ảnh:", error);
                }
            };
        }
        console.log("arrayImage:", arrayImageDetail);

         const data = {
            name,
            image: newImage,
            imageDetail: arrayImageDetail,
            type,
            countInStock,
            price,
            description,
            discount,
            seller
         }
        const respon = await Product.findByIdAndUpdate(id, data, { new: true });

        console.log("update: ", respon);
        if (respon) {
            return res.status(200).json({ message: 'Cập nhật sản phẩm thành công', data: respon });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const respon = await Product.findByIdAndDelete(id);
        if (respon) {
            return res.status(200).json({ message: 'Xóa sản phẩm thành công' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const getAllProduct = async (req, res) => {
    try {

        if (req.query) {
            let page = req.query.page || 1;
            let limit = req.query.limit || await Product.countDocuments();
            // console.log( page, limit);
            // console.log(req.query);
            if (req.query.sortKey && req.query.sortValue) {
                let sortKey = req.query.sortKey;
                let sortValue = req.query.sortValue;
                // const objectsort = {};
                objectsort[sortKey] = sortValue;
                // console.log(objectsort);
                const respon = await Product.find().limit(limit * 1).skip((page - 1) * limit).sort(objectsort);
                if (respon) {
                    return res.status(200)
                        .json({
                            message: 'Lấy theo sắp xếp sản phẩm thành công',
                            data: respon,
                            currentPage: page,
                            totalPages: Math.ceil(await Product.countDocuments() / limit)
                        });
                }
            } else if (req.query.searchKey && req.query.searchValue) {
                let searchKey = req.query.searchKey;
                let searchValue = req.query.searchValue;
                const respon = await Product.find({ [searchKey]: { $regex: searchValue, $options: 'i' } }).limit(limit * 1).skip((page - 1) * limit);
                if (respon) {
                    return res.status(200)
                        .json({
                            message: 'Lấy theo tìm kiếm sản phẩm thành công',
                            data: respon,
                            currentPage: page,
                            totalPages: Math.ceil(await Product.find({ [searchKey]: { $regex: searchValue, $options: 'i' } }).countDocuments() / limit)
                        });
                }
            } else {
                const respon = await Product.find().limit(limit * 1).skip((page - 1) * limit);
                if (respon) {
                    return res.status(200)
                        .json({
                            message: 'Lấy theo trang sản phẩm thành công',
                            data: respon,
                            currentPage: page,
                            totalPages: Math.ceil(await Product.countDocuments() / limit)
                        });
                }
            }


        } else {
            const respon = await Product.find();
            if (respon) {
                return res.status(200).json({ message: 'Lấy tất cả sản phẩm thành công', data: respon });
            }
        }
        // if (req.query.page && req.query.limit && !req.query.sort) {
        //     const { page , limit } = req.query;
        //     const respon = await Product.find().limit(limit * 1).skip((page - 1) * limit);
        //     if (respon) {
        //         return res.status(200)
        //             .json({
        //                 message: 'Lấy tất cả sản phẩm thành công',
        //                 data: respon,
        //                 currentPage: page,
        //                 totalPages: Math.ceil(await Product.countDocuments() / limit)
        //             });
        //     }
        // } else {
        //     const respon = await Product.find();
        //     if (respon) {
        //         return res.status(200).json({ message: 'Lấy tất cả sản phẩm thành công', data: respon });
        //     }
        // }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const detailProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const respon = await Product.findById(id);
        console.log("resp", respon);
        if (respon) {
            return res.status(200).json({ message: 'Lấy sản phẩm thành công', data: respon });
        } else {
            return res.status(404).json({ message: 'Không tìm thấy sản phẩm' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const typeProduct = async (req, res) => {
    try {
        const type = req.params.type;
        const respon = await Product.find({ type: type });
        if (respon) {
            return res.status(200).json({ message: 'Lấy sản phẩm theo loại thành công', data: respon });
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
module.exports = {
    createProduct,
    updateProduct,
    deleteProduct,
    getAllProduct,
    detailProduct,
    typeProduct
}