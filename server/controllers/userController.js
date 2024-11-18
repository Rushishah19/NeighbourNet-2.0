const User = require('../models/user');
const comparePassword = require('../utils/comparePassword'); // Path to your comparePassword function
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { email, name, phone, password, type } = req.body;

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ email, name, phone, password, type });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password ,type} = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if(user.type !== type){
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const payload = { id: user._id, email: user.email, type: user.type }; // Add necessary fields
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' }); // Token expires in 30 days
        const user_type = user.type
        
        res.status(200).json({ message: 'Login successful', token,"type":user_type });

    }
    catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
}

const profile = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId).select('-password'); // Exclude password

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(user);
    } catch (error) {
       
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    // add extra fileds to update the profile
    const {  photo, hourlyRate, skills, experience, location, availability,description, certifications  } = req.body;
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const userId = decoded.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.photo = photo;
        user.hourlyRate = hourlyRate;
        user.skills = skills;
        user.experience = experience;
        user.location = location;
        user.availability = availability;
        user.description = description;
        user.certifications = certifications;

        await user.save();

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
}

const allWorkers = async (req, res) => {
    try {
        // Extract query parameters for search and filtering
        const { search, location, minRating, maxRating } = req.query;

        // Build the query object dynamically
        const query = { type: 'worker' };

        // Search by name
        if (search) {
            query.name = { $regex: search, $options: 'i' }; // Case-insensitive search
        }

        // Filter by location
        if (location) {
            query.location = location;
        }

        // Filter by rating
        if (minRating || maxRating) {
            query.rating = {};
            if (minRating) query.rating.$gte = Number(minRating);
            if (maxRating) query.rating.$lte = Number(maxRating);
        }

        // Fetch workers based on query
        const workers = await User.find(query).select('-password');

        res.status(200).json(workers);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { signup, login,profile,updateProfile,allWorkers };
