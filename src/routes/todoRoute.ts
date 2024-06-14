import { Router } from 'express';
import { deleteTodo, filterTodo, getTodo, getTodoById, postTodo, updateTodo } from '../controllers/todoController';

const router = Router()

router.post('/post', postTodo)
router.get('/get', getTodo)
router.get('/get-by-id', getTodoById)
router.get('/get-by-filter', filterTodo)
router.put('/update', updateTodo)
router.delete('/delete', deleteTodo)

export default router;