import DefaulterAccount from '../model/defaultersAccountModel.js';

// Get all bank details
export const getBankDetails = async (req, res) => {
  try {
    const bankDetails = await DefaulterAccount.find();
    res.status(200).json(bankDetails);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching bank details', error });
  }
};

// Add a new bank detail
export const addBankDetail = async (req, res) => {
  try {
    const { bank, name, account, amount } = req.body;
    const newBankDetail = new DefaulterAccount({
      bank,
      name,
      account,
      amount,
    });

    await newBankDetail.save();
    res.status(201).json(newBankDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error adding bank detail', error });
  }
};

// Update bank detail (only fields with value)
export const updateBankDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = {};

    // Only add fields to update if they are provided in the request
    ['bank', 'name', 'account', 'amount'].forEach((field) => {
      if (req.body[field] !== undefined && req.body[field] !== '') {
        updates[field] = req.body[field];
      }
    });

    const updatedBankDetail = await DefaulterAccount.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    if (!updatedBankDetail) {
      return res.status(404).json({ message: 'Bank detail not found' });
    }

    res.status(200).json(updatedBankDetail);
  } catch (error) {
    res.status(500).json({ message: 'Error updating bank detail', error });
  }
};

// Delete bank detail
export const deleteBankDetail = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBankDetail = await DefaulterAccount.findByIdAndDelete(id);

    if (!deletedBankDetail) {
      return res.status(404).json({ message: 'Bank detail not found' });
    }

    res.status(200).json({ message: 'Bank detail deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting bank detail', error });
  }
};
