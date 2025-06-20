module.exports = function (err, req, res, next) {
  switch (err.message) {
    // 입력 형식 오류
    case "InputValidationError":
      return res.status(400).send({
        errMessage: "잘못된 입력입니다."
      })

    // 이메일이 존재
    case "ExistEmail":
      return res.status(409).send({
        errMessage: "이미 가입된 이메일입니다."
      });

    // 일치 하지 않거나 유효하지 않은 토큰
    case "TokenNotMatched":
      return res.status(401).send({
        errMessage: "토큰이 유효하지 않습니다."
      });

      // 비밀번호가 다름
    case "PasswordError":
      return res.status(400).send({
        errMessage: "패스워드가 일치하지 않습니다."
      });

    // 접근 권한이 없음
    case "Forbidden":
      return res.status(401).send({
        errMessage: "접근 권한이 없습니다."
      })

    // 유저를 찾을 수 없음
    case "UserNotFound":
      return res.status(404).send({
        errMessage: "유저를 찾을 수 없습니다."
      });

    // 게시글이 존재하지 않을 경우
    case "PostNotFound":
      return res.status(404).send({
        errMessage: "게시글을 찾을 수 없습니다."
      })

    // 예상하지 못한 오류
    default:
      return res.status(500).send({
        errMessage: "서버에 오류가 발생했습니다."
      });
  }
}