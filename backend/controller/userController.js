import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../model/userModel.js';


// Utility to generate a simple random referral code
const generateReferralCode = () => {
  return Math.random().toString(36).substring(2, 8).toUpperCase(); // 6 character code
};

// Signup controller
export const signup = async (req, res) => {
  const { name, email, password, referralCode: referralInput } = req.body;

  try {
    const userExist = await User.findOne({ email });
    if (userExist) return res.status(400).json({ message: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUserData = {
      name,
      email,
      password: hashedPassword,
      referralCode: generateReferralCode(), // Generate new referral code
    };

    if (referralInput) {
      const referrer = await User.findOne({ referralCode: referralInput });

      if (referrer) {
        newUserData.referredBy = referralInput;

        // Add bonus to referralBonus instead of balance
        referrer.referralBonus += 5000;

        // (Optional) Track in balanceHistory
        referrer.balanceHistory.push({
          withdrawalAmount: 5000,
          status: 'deposit',
        });

        await referrer.save();
      }
    }

    const newUser = await User.create(newUserData);

    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    const { password: _, ...userWithoutPassword } = newUser.toObject();

    res.status(201).json({
      message: 'Signup successful',
      user: userWithoutPassword,
      token
    });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ error: err.message });
  }
};


// Login controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1d' });

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.json({
      message: 'Login successful',
      user: userWithoutPassword,
      token
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();  // Find all users in the database
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get user by ID
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update user by ID
export const updateUserById = async (req, res) => {
  const { id } = req.params;
  const { name, email, password, balance, withdrawalAmount, referralBonusWithdrawal } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Handle balance deposit
    if (balance !== undefined) {
      user.balance += balance;
      user.balanceHistory.push({
        withdrawalAmount: balance,
        status: 'deposit',
      });
    }

    // Handle normal withdrawal
    if (withdrawalAmount !== undefined) {
      if (user.balance < withdrawalAmount) {
        return res.status(400).json({ message: 'Insufficient funds for withdrawal' });
      }
      user.balance -= withdrawalAmount;
      user.balanceHistory.push({
        withdrawalAmount,
        status: 'withdrawal',
      });
    }

    // Handle referral bonus withdrawal
    if (referralBonusWithdrawal !== undefined) {
      if (user.referralBonus < referralBonusWithdrawal) {
        return res.status(400).json({ message: 'Insufficient referral bonus for withdrawal' });
      }
      user.referralBonus -= referralBonusWithdrawal;
      user.balanceHistory.push({
        withdrawalAmount: referralBonusWithdrawal,
        status: 'referral_bonus_withdrawal', // Custom status to track this action
      });
    }

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Update other user details
    user.name = name || user.name;
    user.email = email || user.email;

    await user.save();

    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: 'User updated successfully',
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Delete user by ID
export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Use deleteOne() to delete the user
    await User.deleteOne({ _id: id });

    // Alternatively, you can use findByIdAndDelete:
    // await User.findByIdAndDelete(id);

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Update demoBalance controller
export const updateDemoBalance = async (req, res) => {
  const { id } = req.params;
  const { demoBalance, withdrawalAmount } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    // Handle demoBalance deposit or update
    if (demoBalance !== undefined) {
      user.demoBalance += demoBalance; // Add the new demo balance to the existing demo balance
    }

    // Handle withdrawal for demoBalance
    if (withdrawalAmount !== undefined) {
      if (user.demoBalance < withdrawalAmount) {
        return res.status(400).json({ message: 'Insufficient balance for withdrawal' });
      }

      // Subtract the withdrawal amount from demoBalance
      user.demoBalance -= withdrawalAmount;
    }

    // Save the updated user data
    await user.save();

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: 'Updated successfully',
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Block or unblock user by ID
export const updateBlockStatus = async (req, res) => {
  const { id } = req.params;
  const { isBlocked } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: 'User not found' });

    user.isBlocked = isBlocked;

    await user.save();

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user.toObject();

    res.status(200).json({
      message: `User has been ${isBlocked ? 'blocked' : 'unblocked'} successfully`,
      user: userWithoutPassword,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



