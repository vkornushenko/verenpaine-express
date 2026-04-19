import mongoose from "mongoose";

const measurementSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    systolic: { type: Number, required: true },
    diastolic: { type: Number, required: true },
    pulse: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
});

export const MeasurementModel = mongoose.model("Measurement", measurementSchema);