const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    rec_id: { type: Number },
    emp_id: { type: Number },
    date: { type: Date },
    time_in: { type: String },
    time_out: { type: String },
    total_hours: { type: Number },
    weekday: { type: Number, default: 0 },
    name: { type: String },
    gender: { type: String },
    designation: { type: String },
    department: { type: String },
    calculate: { type: String },
    basic_salary: { type: Number },
    per_day_salary: { type: Number },
}, { timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' } });


module.exports = {
    name: 'User',
    schema: userSchema,
};