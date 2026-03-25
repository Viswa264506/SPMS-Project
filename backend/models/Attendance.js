import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  employee: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },

  date: {
    type: Date,
    default: Date.now
  },

  checkIn: {
    type: Date
  },

  checkOut: {
    type: Date
  },

  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present"
  }

}, { timestamps: true });

export default mongoose.model("Attendance", attendanceSchema);