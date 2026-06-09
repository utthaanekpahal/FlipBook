import Visit from "../models/Visit.js";

export const createVisit = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "Photo required" });
    }

    const { name, email, phone, school, followUp } = req.body;

    const newVisit = await Visit.create({
      name,
      email,
      phone,
      school,
      followUp,
      photo: `${req.protocol}://${req.get("host")}/uploads/${req.file.filename}`,
    });

    res.status(201).json({
      success: true,
      data: newVisit,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getVisits = async (req, res) => {
  try {
    const visits = await Visit.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      data: visits,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};