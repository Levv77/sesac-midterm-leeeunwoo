import { users } from "./data.js";

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users));
}

// 로그인
document.getElementById('login-form').addEventListener('submit', (event) => {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  const msg = document.getElementById('login-msg');

  const userList = JSON.parse(localStorage.getItem('users'));

  // 항목이 비어있으면 경고!
  if (!email || !password) {
    msg.innerText = '모든 항목을 입력해주세요.';
    return;
  }

  const exist = userList.find( user => {
    return email === user.email && password === user.password;
  });

  if (exist) {
    localStorage.setItem('currentUser', JSON.stringify(exist));
    msg.textContent = `${exist.email}님 로그인에 성공하셨습니다.`;
    window.location.href = 'todo.html';
  } else {
    msg.textContent = '아이디 및 비밀번호가 일치하지 않습니다.';
  }

});

// Todo