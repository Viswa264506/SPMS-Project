import mongoose from "mongoose";

const employeeSchema = new mongoose.Schema(
{
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    phone: {
        type: String
    },

    department: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Department"
    },

    position: {
        type: String
    },

    salary: {
        type: Number
    },

    joiningDate: {
        type: Date,
        default: Date.now
    },
status: {
  type: String,
  enum: ["Active", "On Leave", "Inactive"],
  default: "Active"
}
},
{ timestamps: true }
);

export default mongoose.model("Employee", employeeSchema);