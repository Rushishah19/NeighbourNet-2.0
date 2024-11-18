const validateRequest = (req, res, next) => {
    const { email, name, phone, password } = req.body;
  
    if (!email || !name || !phone || !password || !type) {
      return res.status(400).json({ message: 'All fields are required' });
    }
  
    next();
  };
  
  module.exports = validateRequest;
  