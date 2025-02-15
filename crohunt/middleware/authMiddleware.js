const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
    const authHeader = req.header('Authorization');  
  
    if (!authHeader) {
      return res.status(401).json({ message: 'No token, authorization denied' });  
    }
  
    try {
      const token = authHeader.split(' ')[1];  
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();  
    } catch (err) {
      res.status(401).json({ message: 'Token is not valid' });
    }
  };
  

module.exports = authMiddleware;
