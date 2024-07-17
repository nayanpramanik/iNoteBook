var jwt = require('jsonwebtoken');
require('dotenv').config();


const fetchUser = (req, res, next) => {
    //Get usr token from req header
    const token = req.header('auth-token');
    if (!token) {
        res.status(401).send({ error: "Please authenticate with valid token" })
    }

    try {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "Please authenticate with valid token" })

    }

}

module.exports = fetchUser;