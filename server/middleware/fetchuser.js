const jwt = require('jsonwebtoken');
const JWT_SECRET = "rakhitshrivastava2698@gmail.com";

function fetchuser(req, res, next) {
    const token = req.header('token');
    if (!token) {
        res.status(401).send({ error: "Invalid token" });
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal server error");
    }
}


module.exports = fetchuser;