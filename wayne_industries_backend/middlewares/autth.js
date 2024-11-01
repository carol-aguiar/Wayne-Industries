const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET || 'secret_key', (err, user) => {
            if (err) {
                return res.sendStatus(403); 
            }
            req.user = user; 
            next();
        });
    } else {
        res.sendStatus(401); 
    }
};

const checkPermissions = (roles) => {
    return (req, res, next) => {
        const userRole = req.user.role; 

        console.log(`User role: ${userRole}`);
        console.log(`Required roles: ${roles}`);

        if (!roles.includes(userRole)) {
            return res.status(403).json({ message: 'Acesso negado' });
        }
        next();
    };
};


module.exports = {
    authenticateJWT,
    checkPermissions
};
