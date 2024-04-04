import db from "../models/index.js"; // sẽ đến file index.js trong models để lấy db
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { v4 } from "uuid";
import dotenv from "dotenv";
dotenv.config();

const hashPassword = (password) =>
  bcrypt.hashSync(password, bcrypt.genSaltSync(12));
export const registerService = ({ phone, password, name }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOrCreate({
        where: { phone },
        defaults: {
          phone,
          name,
          password: hashPassword(password),
          id: v4(),
        },
      });
      /* response là một mảng mà response[0] chứa thông tin về người dùng (nếu tìm thấy hoặc đã tạo mới), và response[1] 
         cho biết xem việc tạo mới đã thành công (true) hay không (false). 
         khi response[1] là true tức là chưa tồn tại user =>  tạo người dùng mới thì sẽ tạo token và gán vào biến token 
         response[1] là false thì gán false cho biến token*/
      const token =
        response[1] &&
        jwt.sign(
          {
            id: response[0].id,
            phone: response[0].phone,
          },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      /* đối số thứ nhất { id: response[0].id, phone: response[0].phone }, là 1 obj muốn mã hóa thành token 
           đối số thứ 2 process.env.SECRET_KEY, { expiresIn: '2d' } là secret key để giải mã 
    */
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Register is successfully !"
          : "Phone number has been aldready used !",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });

export const loginService = ({ phone, password }) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.User.findOne({
        // findOne sẽ trả về 1 instance của sequelize nên sẽ không lấy được => raw: true
        where: { phone },
        raw: true, // kết quả trả về dạng obj để có thể lấy được
      });
      const isCorrectPassword =
        response && bcrypt.compareSync(password, response.password); // so sánh password client gửi lên với password trong db
      const token =
        isCorrectPassword &&
        jwt.sign(
          {
            id: response.id,
            phone: response.phone,
          },
          process.env.SECRET_KEY,
          { expiresIn: "2d" }
        );
      resolve({
        err: token ? 0 : 2,
        msg: token
          ? "Login is successfully !"
          : response
          ? "Password is wrong !"
          : "Phone number not found !",
        token: token || null,
      });
    } catch (error) {
      reject(error);
    }
  });
