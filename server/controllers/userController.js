const { sendMail } = require('../helpers/sendMail');
const User = require('../models/user');
const comparePassword = require('../utils/comparePassword'); // Path to your comparePassword function
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    const { email, name, phone, password, type } = req.body;

    console.log('Received signup request:', req.body); // Log the request payload

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const newUser = new User({ email, name, phone, password, type });
        await newUser.save();
        sendMail(email, "Welcome to NeighbourNet", `Hi ${name} Thank you for joining us ! If you have any question feel free to reach us.`); // Send welcome email
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (err) {
        console.error('Error during signup:', err); // Log any errors
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const login = async (req, res) => {
    const { email, password, type } = req.body;

    console.log('Received login request:', req.body); // Log the request payload

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        if (user.type !== type) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Generate JWT
        const payload = { id: user._id, email: user.email, type: user.type }; // Add necessary fields
        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '30d' }); // Token expires in 30 days
        const user_type = user.type;

        res.status(200).json({ message: 'Login successful', token, type: user_type });
    } catch (err) {
        console.error('Error during login:', err); // Log any errors
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

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
        console.error('Error fetching profile:', error); // Log any errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const updateProfile = async (req, res) => {
    const { photo, hourlyRate, skills, experience, location, availability, description, certifications } = req.body;

    try {
        const authHeader = req.header('Authorization');
        if (!authHeader) {
            return res.status(401).json({ message: 'Authorization header missing' });
        }

        const token = authHeader.replace('Bearer ', '');
        let decoded;

        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
        } catch (error) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        const userId = decoded.id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Updating user fields
        user.photo = photo || user.photo;
        user.hourlyRate = hourlyRate || user.hourlyRate;
        user.skills = skills || user.skills;
        user.experience = experience || user.experience;
        user.location = location || user.location;
        user.availability = availability || user.availability;
        user.description = description || user.description;
        user.certifications = certifications || user.certifications;

        console.log('Before saving user:', user); // Log before saving
        await user.save();
        console.log('After saving user:', user); // Log after saving

        res.status(200).json({ message: 'Profile updated successfully', user });
    } catch (error) {
        console.error('Error updating profile:', error); // Log any errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

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
        console.error('Error fetching workers:', error); // Log any errors
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const resetPasswordRequest = async (req, res) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Generate reset token
        const resetToken = crypto.randomBytes(32).toString('hex');
        const resetTokenExpiry = Date.now() + 3600000; // Token valid for 1 hour

        // Save the token and expiry to the user record
        user.resetPasswordToken = resetToken;
        user.resetPasswordExpiry = resetTokenExpiry;
        await user.save();

        // Send reset email
        const resetURL = `${process.env.CLIENT_URL}/reset-password/${resetToken}`;
        await sendMail(
            email,
            'Password Reset Request',
            `Please use the following link to reset your password: <a href="${resetURL}">${resetURL}</a>. This link will expire in 1 hour.`
        );

        res.status(200).json({ message: 'Password reset email sent' });
    } catch (err) {
        console.error('Error sending password reset email:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

const resetPassword = async (req, res) => {
    const { token, newPassword } = req.body;

    try {
        const user = await User.findOne({
            resetPasswordToken: token,
            resetPasswordExpiry: { $gt: Date.now() }, // Check if token is still valid
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token' });
        }

        // Update the user's password
        user.password = newPassword; // Hash password as required
        user.resetPasswordToken = undefined;
        user.resetPasswordExpiry = undefined;
        await user.save();

        res.status(200).json({ message: 'Password reset successful' });
    } catch (err) {
        console.error('Error resetting password:', err);
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};



module.exports = { signup, login, profile, updateProfile, allWorkers,resetPasswordRequest, resetPassword };