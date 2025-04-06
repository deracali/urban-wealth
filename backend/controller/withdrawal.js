import Withdrawal from '../model/withdrawalModel.js';

// Create a withdrawal
export const createWithdrawal = async (req, res) => {
  const { accountNumber, bankName, accountHolderName, amount } = req.body;

  try {
    const newWithdrawal = new Withdrawal({
      accountNumber,
      bankName,
      accountHolderName,
      amount,
    });

    await newWithdrawal.save();
    res.status(201).json({
      message: 'Withdrawal request created successfully',
      withdrawal: newWithdrawal,
    });
  } catch (err) {
    console.error('Error creating withdrawal:', err);
    res.status(500).json({ error: err.message });
  }
};

// Get all withdrawals
export const getAllWithdrawals = async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find();
    res.status(200).json({
      message: 'Withdrawals fetched successfully',
      withdrawals,
    });
  } catch (err) {
    console.error('Error fetching withdrawals:', err);
    res.status(500).json({ error: err.message });
  }
};



// Update withdrawal status
export const updateWithdrawalStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!['pending', 'approved', 'rejected'].includes(status)) {
    return res.status(400).json({ error: 'Invalid status value' });
  }

  try {
    const updatedWithdrawal = await Withdrawal.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedWithdrawal) {
      return res.status(404).json({ error: 'Withdrawal not found' });
    }

    res.status(200).json({
      message: 'Withdrawal status updated successfully',
      withdrawal: updatedWithdrawal,
    });
  } catch (err) {
    console.error('Error updating withdrawal status:', err);
    res.status(500).json({ error: err.message });
  }
};
