const express = require('express');
const prisma  = require('../utils/prisma');
const bcrypt = require('bcrypt');
const jwt = require('../utils/jwt');
const { loginValidation, signUpValidation, handleValidationResult } = require('../middleware/validation-handling-middleware')

const router = express.Router();

// 회원가입
router.post('/auth/signup', signUpValidation, handleValidationResult, async (req, res, next) => {
  try {
    const { email, password, username } = req.body;
    const user = await prisma.users.findUnique({
      where: { email }
    });

    if (user) {
      return next(new Error('ExistEmail'));
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const bcryptPassword = await bcrypt.hash(password, salt);

    const createUser = await prisma.users.create({
      data: {
        email,
        password: bcryptPassword,
        username
      }
    })

    // 비밀번호 숨김
    // const { password: _, ...userData } = createUser;

    return res.status(201).json({ message: "가입 완료", data: createUser });

  } catch (error) {
    console.log(error);
    return next(error);
  }
});

// 로그인
router.post('/auth/login', loginValidation, handleValidationResult, async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await prisma.users.findUnique({
      where: { email }
    });

    if (!user) {
      return next(new Error('UserNotFound'));
    }

    const verifyPassword = await bcrypt.compare(password, user.password);

    if (!verifyPassword) {
      return next(new Error('PasswordError'));
    }

    const token = jwt.generateTokens(user.userId);

    return res.status(200).json({ token });

  } catch (error) {
    console.log(error);
    return next(error);
  }
});

module.exports = router;