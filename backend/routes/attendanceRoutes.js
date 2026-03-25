import express from "express";
import {
  checkIn,
  checkOut,
  getAttendance
} from "../controllers/attendanceController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= CHECK-IN ================= */
// All roles
router.post("/checkin", protect, checkIn);

/* ================= CHECK-OUT ================= */
// All roles
router.post("/checkout", protect, checkOut);

/* ================= GET ATTENDANCE ================= */
// Admin + HR → all
// Employee → own (handle in controller)
router.get("/", protect, authorizeRoles("admin", "hr", "employee"), getAttendance);

export default router;