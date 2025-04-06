import cloudinary from '../middleware/cloudinaryConfig.js';
import Payment from '../model/paymentModel.js';

// Create payment
const createPayment = async (req, res) => {
  const { amount, userId } = req.body;
  const file = req.files?.image; // Access the uploaded image file from req.files using 'image'

  console.log("Received data:", { amount, userId, file }); // Log incoming data for debugging

  // Validation: Check if all required fields and image are present
  if (!amount || !userId || !file) {
    console.log("Missing required fields or file");
    return res.status(400).json({ message: 'Amount, userId, and image are required' });
  }

  // Validate file type (image or PDF)
  const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
  const validPdfTypes = ['application/pdf'];

  if (![...validImageTypes, ...validPdfTypes].includes(file.mimetype)) {
    console.log("Invalid file type:", file.mimetype); // Log invalid file type
    return res.status(400).json({ message: 'Invalid file type. Only images and PDFs are allowed.' });
  }

  try {
    let imageUrl;

    if (validImageTypes.includes(file.mimetype)) {
      // Upload image to Cloudinary
      console.log("Uploading image to Cloudinary...");
      const cloudinaryResult = await cloudinary.uploader.upload(file.tempFilePath, {
        folder: 'payments', // Store images in a folder called 'payments'
      });
      imageUrl = cloudinaryResult.secure_url; // Get the secure URL of the uploaded image
      console.log("Cloudinary upload successful:", imageUrl); // Log successful upload
    } else if (validPdfTypes.includes(file.mimetype)) {
      // Upload PDF to Cloudinary (Cloudinary supports automatic detection of file type)
      console.log("Uploading PDF to Cloudinary...");
      const cloudinaryResult = await cloudinary.uploader.upload(file.tempFilePath, {
        resource_type: 'auto', // Automatically detects file type (image or pdf)
        folder: 'payments', // Store PDFs in a folder called 'payments'
      });
      imageUrl = cloudinaryResult.secure_url; // Get the secure URL of the uploaded PDF
      console.log("Cloudinary upload successful:", imageUrl); // Log successful upload
    }

    // Save payment data to the database with the image URL (image or PDF)
    const newPayment = new Payment({
      amount,
      userId,
      image: imageUrl, // Store the URL of the uploaded image (or PDF)
    });

    console.log("Saving payment to database:", newPayment); // Log payment data before saving

    await newPayment.save();

    console.log("Payment saved successfully"); // Log success

    return res.status(201).json({
        status: 'success',
      message: 'Payment created successfully',
      payment: newPayment,
    });
  } catch (error) {
    console.error("Error during payment creation:", error); // Log the error if something goes wrong
    return res.status(500).json({ message: 'Server error', error: error.message });
  }
};

  

// Get all payments
const getAllPayments = async (req, res) => {
  try {
    const payments = await Payment.find();
    return res.status(200).json({ payments });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

// Get payment by ID
const getPaymentById = async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findById(id);
    if (!payment) {
      return res.status(404).json({ message: 'Payment not found' });
    }
    return res.status(200).json({ payment });
  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
};

export { createPayment, getAllPayments, getPaymentById };
