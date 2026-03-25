import Attendance from "../models/Attendance.js";

/* ================= CHECK-IN ================= */
export const checkIn = async (req, res) => {
  try {
    const userId = req.user.id; // 🔥 from JWT

    // prevent multiple check-in per day
    const existing = await Attendance.findOne({
      user: userId,
      date: {
        $gte: new Date().setHours(0, 0, 0, 0),
        $lte: new Date().setHours(23, 59, 59, 999)
      }
    });

    if (existing) {
      return res.status(400).json({ message: "Already checked in today" });
    }

    const attendance = new Attendance({
      user: userId,
      date: new Date(),
      checkIn: new Date(),
      status: "Present"
    });

    const saved = await attendance.save();

    res.status(201).json(saved);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= CHECK-OUT ================= */
export const checkOut = async (req, res) => {
  try {
    const userId = req.user.id;

    const attendance = await Attendance.findOne({
      user: userId,
      checkOut: null
    });

    if (!attendance) {
      return res.status(404).json({ message: "No active check-in found" });
    }

    attendance.checkOut = new Date();

    await attendance.save();

    res.json(attendance);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ATTENDANCE ================= */
export const getAttendance = async (req, res) => {
  try {
    let records;

    // 🔥 role-based filtering
    if (req.user.role === "employee") {
      records = await Attendance.find({ user: req.user.id })
        .populate("user", "name email");
    } else {
      records = await Attendance.find()
        .populate("user", "name email");
    }

    res.json(records);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};