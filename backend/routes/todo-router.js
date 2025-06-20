const express = require('express');
const prisma = require('../utils/prisma');
const authenticateToken = require('../middleware/authentication-middleware');
const { todoValidation, handleValidationResult } = require('../middleware/validation-handling-middleware')
const router = express.Router();

// 생성
router.post('/todos', authenticateToken, todoValidation, handleValidationResult, async (req, res, next) => {
  try {
    const { title, description } = req.body;
    const userId = req.user;

    const todo = await prisma.todos.create({
      data: {
        title,
        description,
        userId
      }
    });

    return res.status(201).json({
      message: "게시글 작성 완료",
      data: todo
    });

  } catch (error) {
    console.log(error);
    return next(error);
  }
})

// 조회
router.get('/todos', async (req, res, next) => {
  try {
    const userId = req.userId;

    console.log(userId);

    // const todoList = await prisma.todos.findUnique({
    //   where: { userId }
    // })

  } catch (error) {
    console.log(error);
    return next(error);
  }
})

module.exports = router;