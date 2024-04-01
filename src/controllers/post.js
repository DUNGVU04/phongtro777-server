import * as postService from "../services/post.js";

export const getPosts = async (req, res) => {
  try {
    const response = await postService.getAllPostsService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller" + error,
    });
  }
};
export const getPostsLimit = async (req, res) => {
  const { page, priceNumber, areaNumber, ...query } = req.query;
  try {
    const response = await postService.getPostsLimitService(page, query, {
      priceNumber,
      areaNumber,
    });
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller" + error,
    });
  }
};
export const getNewPosts = async (req, res) => {
  try {
    const response = await postService.getNewPostService();
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const createNewPost = async (req, res) => {
  try {
    const { categoryCode, title, priceNumber, areaNumber, label } = req.body;
    const { id } = req.user;
    if (!categoryCode || !id || !title || !priceNumber || !areaNumber || !label)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.createNewPostService(req.body, id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const getPostsLimitAdmin = async (req, res) => {
  /*req.query: Đây là một đối tượng chứa các tham số truy vấn (query parameters) được truyền đến từ yêu cầu HTTP. Ví dụ, nếu URL
     là http://example.com/api/data?page=2&limit=10, thì req.query có thể là { page: '2', limit: '10' }.

{ page, ...query }: Cú pháp này sử dụng destructuring để tách riêng biến page từ req.query, và sau đó, bất kỳ phần còn lại của req.query được gói vào biến query 
dưới dạng một đối tượng mới. Điều này có nghĩa là biến page sẽ chứa giá trị của thuộc tính page trong req.query, và biến query sẽ chứa tất cả các cặp khóa-giá trị còn lại. */
  const { page, ...query } = req.query;
  const { id } = req.user;
  try {
    if (!id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.getPostsLimitAdminService(
      page,
      id,
      query
    );
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const updatePost = async (req, res) => {
  const { postId, overviewId, imagesId, attributesId, ...payload } = req.body;
  const { id } = req.user;
  try {
    if (!postId || !id || !overviewId || !imagesId || !attributesId)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.updatePost(req.body);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: -1,
      msg: "Failed at post controller: " + error,
    });
  }
};
export const deletePost = async (req, res) => {
  const { postId } = req.query;
  const { id } = req.user;
  try {
    if (!postId || !id)
      return res.status(400).json({
        err: 1,
        msg: "Missing inputs",
      });
    const response = await postService.deletePost(postId);
    return res.status(200).json(response);
  } catch (error) {
    reject(error);
  }
};
