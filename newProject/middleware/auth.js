import jwt from "jsonwebtoken";

export const applyMiddleware = (req, res, next) => {
    const token = req.headers.authorisation;
    if (!token) {
        return res.status(400).json({ message: "token not found" });
    }
    try {
        const tokenWithoutBearer = token.split(" ")[1];
        const decode = jwt.verify
            (tokenWithoutBearer, process.env.JWT_SECRET_KEY);
        req.user = decode.userId;
        next();
    }
    catch (err) {
        console.log(err, "something went wrong")
        return res.status(400).json({ message: "Token is not valid" });
    }

}
