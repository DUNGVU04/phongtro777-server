import express from "express";
require("dotenv").config();
import cors from "cors";
import initRoutes from "./src/routes/index.js";
import connectDatabase from "./src/config/connectDatabase.js";
const app = express();
app.use(
  cors({
    origin: process.env.CLIENT_URL, // cho phép URL ở client lấy được data ở server
    methods: ["POST", "GET", "PUT", "DELETE"], // giới hạn 4 method
  })
);
app.use(express.json({ limit: "10mb" })); // đọc dữ liệu dạng json gửi từ client
app.use(
  express.urlencoded({ extended: true, limit: "10mb" })
); /*  xử lý dữ liệu biểu mẫu gửi đến máy chủ từ trình duyệt web.giúp lấy dữ liệu từ biểu mẫu và biến nó thành dạng đối tượng JavaScript có thể sử dụng trong ứng dụng
                                                      truy cập dữ liệu gửi từ biểu mẫu bằng cách sử dụng req.body */

initRoutes(app);
connectDatabase();

const port = process.env.PORT || 8888;

const listener = app.listen(port, () => {
  console.log(`Server is running on the port ${listener.address().port}`);
});
