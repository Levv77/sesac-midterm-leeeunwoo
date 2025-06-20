const { body, validationResult, param } = require('express-validator');

// 유효성 검사 후 오류 처리 미들웨어
exports.handleValidationResult = (req, res, next) => {
  const rs = validationResult(req).errors;

  // 에러 메시지 출력
  rs.forEach(err => {
    console.log(err.msg);
  });

  if (rs.length !== 0) {
    return next(new Error('InputValidationError'));
  }
  next();
}

// 회원가입 유효성 검사
exports.signUpValidation = [
  body('email')
    .isEmail().withMessage('이메일 형식이 아닙니다.')
    .notEmpty().withMessage('이메일을 입력해주세요.'),
  body('password')
    .isLength({ min: 6 }).withMessage('비밀번호가 6글자 이하입니다.')
    .notEmpty().withMessage('비밀번호를 입력해주세요.'),
  body('username')
    .notEmpty().withMessage('유저 이름을 입력해주세요.')
]

// 로그인 유효성 검사
exports.loginValidation = [
  body('email')
    .isEmail().withMessage('이메일 형식이 아닙니다.')
    .notEmpty().withMessage('이메일을 입력해주세요.'),
  body('password')
    .isLength({ min: 6 }).withMessage('비밀번호가 6글자 이하입니다.')
    .notEmpty().withMessage('비밀번호를 입력해주세요.')
]

// 할 일 생성 유효성 검사
exports.todoValidation = [
  body('title')
    .notEmpty().withMessage('제목을 입력해주세요.')
]