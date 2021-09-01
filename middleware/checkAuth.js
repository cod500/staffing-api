const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    try {
        const authHeader = req.header('Authorization').replace('Bearer ', '');

        const token = authHeader.substring(3)

        if (!token) return res.sendStatus(401);
        jwt.verify(token, process.env.SECRET, (error, user) => {
            if (error) return res.sendStatus(403)
            next();
        })
    } catch (error) {
        return res.status(401).json({
            message: 'Authrozation failed'
        });
    }
}

