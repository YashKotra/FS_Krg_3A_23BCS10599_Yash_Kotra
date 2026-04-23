import Contact from "../models/Contact.js";

// @desc    Submit contact form
// @route   POST /api/contact
// @access  Public
export const submitContact = async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const contact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json(contact);
  } catch (error) {
    res.status(500).json({ message: "Server Error", error: error.message });
  }
};
