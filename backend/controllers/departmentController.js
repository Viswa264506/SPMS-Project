import Department from "../models/Department.js";

export const createDepartment = async (req, res) => {

  try {

    const department = new Department(req.body);

    const savedDepartment = await department.save();

    res.status(201).json(savedDepartment);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

export const getDepartments = async (req, res) => {

  try {

    const departments = await Department.find();

    res.status(200).json(departments);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

export const updateDepartment = async (req, res) => {

  try {

    const department = await Department.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json(department);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};

export const deleteDepartment = async (req, res) => {

  try {

    await Department.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Department deleted successfully" });

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

};