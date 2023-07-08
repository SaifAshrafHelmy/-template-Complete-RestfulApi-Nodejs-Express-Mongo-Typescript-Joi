import express from 'express';
import controller from '../controllers/Author';
import { ValidateSchema, Schemas } from '../middleware/ValidateSchema';

const router = express.Router();

router.post('/create', ValidateSchema(Schemas.author.create), controller.CreateAuthor);
router.get('/get/:authorId', controller.readAuthor);
router.get('/get/', controller.readAll);
router.patch('/update/:authorId', ValidateSchema(Schemas.author.update), controller.updateAuthor);
router.delete('/delete/:authorId', controller.deleteAuthor);

export = router;
