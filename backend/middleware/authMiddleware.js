const jwt = require('jsonwebtoken')


// verify token
const verifyToken = (req, res, next) => {
    // Target requester header token
    const requesterHeader = req.headers.token;
    if(requesterHeader) {
        // getting token from header
        const token = requesterHeader.split(" ")[1];

        // verify
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if(err) {
                res.status(403).json({message: "Invalid token!"})
            }
            else {
                req.user = user;
                // console.log(user);
                next();
            }
        })
    }
    else {
        res.status(401).json({message: "Unauthorized!"})
    }
}

const authorizedToken = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user._id === req.params._id || req.user.isAdmin) {
            // console.log("yah");
            next();
        }
        else {
            res.status(403).json({message: "Unauthorized"})
        }
    })
}

const authorizedAdminToken = (req, res, next) => {
    verifyToken(req, res, () => {
        if (req.user && req.user.isAdmin) {
            // console.log("yah");
            next();
        }
        else {
            res.status(403).json({message: "Unauthorized"})
        }
    })
}

module.exports = {
    verifyToken,
    authorizedToken,
    authorizedAdminToken
}