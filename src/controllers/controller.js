import {
  createStudent,
  deleteStudent,
  getAllStudents,
  getStudentById,
  updateStudent,
} from '../services/students.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

export const getStudentByIdController = async (req, res) => {
  const { studentId } = req.params;
  const student = await getStudentById(studentId);

  if (!student) {
    throw createHttpError(404, 'Stundent not found');
  }

  res.json({
    status: 200,
    message: `Successfully found student with id ${studentId}!`,
    data: student,
  });
};

export const createStundentController = async (req, res) => {
  const students = await createStudent(req.body);
  res.status(201).json({
    status: 201,
    message: 'Successfully create students!',
    data: students,
  });
};

export const deleteStudentController = async (req, res) => {
  const { studentId } = req.params;
  const student = await deleteStudent(studentId);
  if (!student) {
    throw createHttpError(404, 'Stundent not found');
  }

  res.status(204).send();
};

export const upsertStudentController = async (req, res) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body, { upsert: true });

  if (!result) {
    throw createHttpError(404, 'Stundent not found');
  }
  const status = result.isNew ? 201 : 202;
  res.status(status).json({
    status,
    message: 'Successful upserd',
    data: result.student,
  });
};

export const patchStudentController = async (req, res) => {
  const { studentId } = req.params;
  const result = await updateStudent(studentId, req.body);

  if (!result) {
    throw createHttpError(404, 'Stundent not found');
  }
  res.json({ status: 200, message: 'Successful upserd', data: result.student });
};

export const getStudentsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const students = await getAllStudents({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });
  res.json({
    status: 200,
    message: 'Successfully found students!',
    data: students,
  });
};
