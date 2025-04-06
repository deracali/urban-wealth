import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Admin from '../model/adminModel.js';

// Signup controller
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExist = await Admin.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await Admin.create({
      name,
      email,
      password: hashedPassword
    });

    const token = jwt.sign({ adminId: newUser._id }, process.env.JWT_SECRET_ADMIN, { expiresIn: '1d' });

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      message: 'Signup successful',
      admin: userWithoutPassword,
      token
    });
  } catch (err) {
    console.error('Error during signup:', err);  // Log errors
    res.status(500).json({ error: err.message });
  }
};

// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Admin.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ adminId: user._id }, process.env.JWT_SECRET_ADMIN, { expiresIn: '1d' });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      message: 'Login successful',
      admin: userWithoutPassword,
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
export const getAllAdmin = async (req, res) => {
  try {
    const users = await Admin.find();  // Find all users in the database
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
export const getAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Admin.findById(id);
    if (!user) return res.status(404).json({ message: 'Admin not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user by ID
export const updateAdminById = async (req, res) => {
  const { id } = req.params;
  const { name, email, password } = req.body;
  
  try {
    const user = await Admin.findById(id);
    if (!user) return res.status(404).json({ message: 'Admin not found' });

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: 'Admin updated successfully',
      user: userWithoutPassword
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete user by ID
export const deleteAdminById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await Admin.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Use deleteOne() to delete the user
    await Admin.deleteOne({ _id: id });

    // Alternatively, you can use findByIdAndDelete:
    // await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

