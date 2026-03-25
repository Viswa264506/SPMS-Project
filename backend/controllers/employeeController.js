import Employee from "../models/Employee.js";

/* ================= CREATE EMPLOYEE ================= */
export const createEmployee = async (req, res) => {
  try {
    const employee = new Employee(req.body);
    const savedEmployee = await employee.save();

    res.status(201).json(savedEmployee);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET ALL EMPLOYEES ================= */
export const getEmployees = async (req, res) => {
  try {
    const employees = await Employee.find()
      .populate("department", "name");

    res.status(200).json(employees);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET MY PROFILE ================= */
export const getMyProfile = async (req, res) => {
  try {
    const employee = await Employee.findOne({ user: req.user.id })
      .populate("department", "name");

    if (!employee) {
      return res.status(404).json({ message: "Employee profile not found" });
    }

    res.json([employee]); // frontend expects array

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= GET BY ID ================= */
export const getEmployeeById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id)
      .populate("department");

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    res.json(employee);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= UPDATE ================= */
export const updateEmployee = async (req, res) => {
  try {
    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(updatedEmployee);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/* ================= DELETE ================= */
export const deleteEmployee = async (req, res) => {
  try {
    await Employee.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Employee deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};