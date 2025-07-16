import { Router } from 'express';
import {
  createStundentController,
  deleteStudentController,
  getStudentByIdController,
  getStudentsController,
  patchStudentController,
  upsertStudentController,
} from '../controllers/controller.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middleware/validateBody.js';
import {
  createStudentSchema,
  updateStudentSchema,
} from '../validation/students.js';
import { isValidId } from '../middleware/isValidId.js';

const router = Router();

router.get('/contacts', ctrlWrapper(getStudentsController));
router.get('/contacts/:studentId',
  isValidId,
   ctrlWrapper(getStudentByIdController));
router.post(
  '/contacts',
  validateBody(createStudentSchema),
  ctrlWrapper(createStundentController),
);
router.delete('/contacts/:studentId',
  isValidId,
  ctrlWrapper(deleteStudentController));
router.put(
  '/contacts/:studentId',
  isValidId,
  validateBody(createStudentSchema),
  ctrlWrapper(upsertStudentController),
);
router.patch(
  '/contacts/:studentId',
  isValidId,
  validateBody(updateStudentSchema),
  ctrlWrapper(patchStudentController),
);

export default router;
