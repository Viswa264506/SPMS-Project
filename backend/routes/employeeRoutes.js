import express from "express";
import {
  createEmployee,
  getEmployees,
  getMyProfile,
  updateEmployee,
  deleteEmployee,
  getEmployeeById
} from "../controllers/employeeController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= CREATE ================= */
// Admin only
router.post("/", protect, authorizeRoles("admin"), createEmployee);

/* ================= GET ALL ================= */
// Admin + HR
router.get("/", protect, authorizeRoles("admin", "hr"), getEmployees);

/* ================= GET MY PROFILE ================= */
// Employee only
router.get("/me", protect, getMyProfile);

/* ================= GET BY ID ================= */
router.get("/:id", protect, authorizeRoles("admin", "hr"), getEmployeeById);

/* ================= UPDATE ================= */
router.put("/:id", protect, authorizeRoles("admin", "hr"), updateEmployee);

/* ================= DELETE ================= */
router.delete("/:id", protect, authorizeRoles("admin"), deleteEmployee);

export default router;