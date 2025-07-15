import mongoose from 'mongoose';

// const contactSchema = new mongoose.Schema(
//   {
//     name: { type: String, required: true },
//     phoneNumber: { type: String, required: true },
//     email: { type: String },
//     isFavourite: { type: Boolean, default: false },
//     contactType: {
//       type: String,
//       enum: ['work', 'home', 'personal'],
//       default: 'personal',
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

const studentSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String },
    age: { type: Number, required: true },
    gender: { type: String },
    avgMark: { type: Number },
    onDuty: { type: Boolean },
    isFavourite: { type: Boolean, default: false },
  },
  { timestamps: true },
);

export const StudentsCollection = mongoose.model('Students', studentSchema);
// export const Contact = mongoose.model('Contact', contactSchema);
