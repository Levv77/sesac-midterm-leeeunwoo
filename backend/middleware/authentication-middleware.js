// const jwt = require('../utils/jwt');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {

  // 요청 할 때 header에 담겨 온 JWT 토큰: Bearer <TOKEN> 형태로 함께 옴
  const authHeader = req.headers['authorization'];
  // Bearer <TOKEN> 형태에서 공백으로 분리해서 배열 형식으로 만들고 첫 번째 인덱스 배열을 token에 할당
  // 0번 인덱스의 값에는 Bearer가 들어있을 것이고, 1번 인덱스에는 TOKEN이 들어있음
  const token = authHeader && authHeader.split(' ')[1];

  // 토큰을 인증: verifyToken함수로 토큰을 디코딩해서 할당 verifyToken에는 userId가 들어있음
  const verifiedToken = verifyToken(token);
  if (!verifiedToken) {
    return next(new Error('TokenNotMatched'))
  }

  // req.user는 개발자가 직접 만듦: 개발자가 요청 객체(req)에 직접 값을 추가
  req.user = verifiedToken.userId;

  next();

};

// 토큰을 인증하는 함수를 따로 작성
const verifyToken = (token) => {
  try {
    const user = jwt.verify(token, process.env.JWT_SECRET);
    return user;
  } catch (error) {
    return false;
  }
}