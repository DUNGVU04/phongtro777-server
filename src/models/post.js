'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class Post extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here

            /* - Mỗi bài đăng (Post) sẽ "thuộc về" một hình ảnh (Image).
               - foreignKey: 'imagesId': Đây là tên cột trong bảng của Post sẽ được sử dụng làm khóa ngoại để liên kết với bảng của Image. 
                 Nghĩa là bảng Post sẽ có một cột có tên imagesId để lưu trữ thông tin liên kết với bảng Image
               - targetKey: 'id': Đây là tên cột trong bảng của Image sẽ được sử dụng làm khóa chính để liên kết với cột imagesId trong bảng Post.
                 Nghĩa là cột id trong bảng Image sẽ được so sánh với cột imagesId trong bảng Post để xác định liên kết.
               -  as: 'images': Đây là biệt danh cho mối quan hệ. Nếu bạn đặt biệt danh này, bạn có thể sử dụng nó trong các truy vấn để tham chiếu
                  đến mối quan hệ này. Ví dụ, bạn có thể sử dụng include: 'images' khi truy vấn cơ sở dữ liệu để lấy thông tin hình ảnh liên quan khi truy vấn bài đăng.*/
            Post.belongsTo(models.Image, { foreignKey: 'imagesId', targetKey: 'id', as: 'images' });
            Post.belongsTo(models.Attribute, { foreignKey: 'attributesId', targetKey: 'id', as: 'attributes' });
            Post.belongsTo(models.Overview, { foreignKey: 'overviewId', targetKey: 'id', as: 'overviews' });
            Post.belongsTo(models.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
            Post.belongsTo(models.Label, { foreignKey: 'labelCode', targetKey: 'code', as: 'labelData' });
        }
    }
    Post.init(
        {
            title: DataTypes.STRING,
            star: DataTypes.STRING,
            labelCode: DataTypes.STRING,
            address: DataTypes.STRING,
            attributesId: DataTypes.STRING,
            categoryCode: DataTypes.STRING,
            priceCode: DataTypes.STRING,
            areaCode: DataTypes.STRING,
            provinceCode: DataTypes.STRING,
            description: DataTypes.TEXT,
            userId: DataTypes.STRING,
            overviewId: DataTypes.STRING,
            imagesId: DataTypes.STRING,
            priceNumber: DataTypes.FLOAT,
            areaNumber: DataTypes.FLOAT,
        },
        {
            sequelize,
            modelName: 'Post',
        },
    );
    return Post;
};
