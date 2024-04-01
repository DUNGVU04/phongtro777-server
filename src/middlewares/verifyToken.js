import jwt from 'jsonwebtoken';
const verifyToken = (req, res, next) => {
    let accessToken =
        req.headers.authorization?.split(
            ' ',
        )[1]; /* một chuỗi như "abc def", thì split(' ') sẽ tạo ra một mảng ["abc", "def"], và split(' ')[1] sẽ trả về phần tử thứ hai của mảng, tức là "def
                                                                 token sẽ ở dạng Bearer dfhdhfdlfdlkfhdlkfhdlkfhlfh*/
    if (!accessToken)
        return res.status(401).json({
            err: 1,
            msg: 'Missing access token',
        });
    jwt.verify(accessToken, process.env.SECRET_KEY, (err, user) => {
        if (err)
            return res.status(401).json({
                err: -1,
                msg: 'Access token failed',
            });
        req.user = user;
        next();
    });
};
export default verifyToken;
