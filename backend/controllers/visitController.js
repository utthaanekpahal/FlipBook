import Visit from "../models/Visit.js";

// CREATE NEW VISIT
export const createVisit = async (req, res) => {
  try {
    // Check photo uploaded or not
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Selfie photo is required",
      });
    }

    // Get data from form
    const {
      schoolName,
      teacher,
      principal,
      designation,
      phone,
      visitDate,
      outcome,
      notes,
      visitedBy,
      location,
       latitude,
      longitude,
    } = req.body;

    // Create visit record
    const newVisit = await Visit.create({
      schoolName,
      teacher,
      principal,
      designation,
      phone,
      visitDate,
      outcome,
      notes,
      visitedBy,
      location,
latitude: latitude ? Number(latitude) : undefined,
  longitude: longitude ? Number(longitude) : undefined,
      // Store uploaded photo URL
      photo: `${req.protocol}://${req.get(
        "host"
      )}/uploads/${req.file.filename}`,
    });

    // Send response
    res.status(201).json({
      success: true,
      message: "Visit added successfully",
      data: newVisit,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// GET ALL VISITS
export const getVisits = async (req, res) => {
  try {
        console.log("QUERY:", req.query);

    const { role, agentName } = req.query;
 console.log("ROLE:", role);
    console.log("AGENT:", agent);
    let visits;

    if (role === "admin") {
      // Admin -> All visits
      visits = await Visit.find().sort({
        createdAt: -1,
      });
    } else {
      // Agent -> Only own visits
      visits = await Visit.find({
        visitedBy: agentName,
      }).sort({
        createdAt: -1,
      });
    }

    res.status(200).json({
      success: true,
      count: visits.length,
      data: visits,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// GET SINGLE VISIT
export const getVisitById = async (req, res) => {
  try {
    const visit = await Visit.findById(req.params.id);

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      data: visit,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// UPDATE VISIT
export const updateVisit = async (req, res) => {
  try {
    const updateData = {
      schoolName: req.body.schoolName,
      teacher: req.body.teacher,
      principal: req.body.principal,
      designation: req.body.designation,
      phone: req.body.phone,
      visitDate: req.body.visitDate,
      outcome: req.body.outcome,
      notes: req.body.notes,
      visitedBy: req.body.visitedBy,
      location: req.body.location,
      latitude: req.body.latitude ? Number(req.body.latitude) : undefined,
  longitude: req.body.longitude ? Number(req.body.longitude) : undefined,
    };

    // Update photo if new photo uploaded
    if (req.file) {
      updateData.photo = `${req.protocol}://${req.get(
        "host"
      )}/uploads/${req.file.filename}`;
    }

    const visit = await Visit.findByIdAndUpdate(
      req.params.id,
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Visit updated successfully",
      data: visit,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// DELETE VISIT
export const deleteVisit = async (req, res) => {
  try {
    const visit = await Visit.findByIdAndDelete(
      req.params.id
    );

    if (!visit) {
      return res.status(404).json({
        success: false,
        message: "Visit not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Visit deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};