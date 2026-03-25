import mongoose from "mongoose";

const projectSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },

    description: {
      type: String
    },

    employees: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
      }
    ],

    startDate: {
      type: Date
    },

    endDate: {
      type: Date
    }
  },
  { timestamps: true }
);

export default mongoose.model("Project", projectSchema);