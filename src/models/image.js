'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Image extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            /*
             - mỗi hình ảnh (Image) chỉ "có một" bài đăng (Post) liên quan
             - foreignKey: 'imagesId': Đây là tên của cột trong bảng của Post sẽ được sử dụng làm khóa ngoại để liên kết với bảng của Image. 
               Nghĩa là bảng Post sẽ có một cột có tên imagesId để lưu trữ thông tin liên kết với bảng Image.
             - as: 'images': Đây là biệt danh cho mối quan hệ. Nếu bạn đặt biệt danh này, bạn có thể sử dụng nó trong các truy vấn để tham chiếu 
               đến mối quan hệ này. Trong trường hợp này, biệt danh là 'images', vì vậy khi bạn truy vấn dữ liệu, bạn có thể sử dụng include: 'images' để lấy thông tin hình ảnh liên quan khi truy vấn bài đăng.
             */
            Image.hasOne(models.Post, { foreignKey: 'imagesId', as: 'images' })
        }
    }
    Image.init({
        image: DataTypes.TEXT,
    }, {
        sequelize,
        modelName: 'Image',
    });
    return Image;
};