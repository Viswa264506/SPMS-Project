import express from "express";
import {
  createDepartment,
  getDepartments,
  updateDepartment,
  deleteDepartment
} from "../controllers/departmentController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= CREATE ================= */
// Admin only
router.post("/", protect, authorizeRoles("admin"), createDepartment);

/* ================= GET ================= */
// Admin + HR
router.get("/", protect, authorizeRoles("admin", "hr"), getDepartments);

/* ================= UPDATE ================= */
// Admin only
router.put("/:id", protect, authorizeRoles("admin"), updateDepartment);

/* ================= DELETE ================= */
// Admin only
router.delete("/:id", protect, authorizeRoles("admin"), deleteDepartment);

export default router;