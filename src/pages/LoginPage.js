import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import google from "../assets/images/logos/google.svg";
function LoginPage() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate(); // useNavigate 훅을 사용

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };
  function saveTokensFromResponse(response) {
    const Accesstoken = response.headers["accesstoken"]; // response.headers.get() 사용
    if (Accesstoken) {
      localStorage.setItem("Accesstoken", Accesstoken);
      console.log("Accesstoken:", Accesstoken);
    } else {
      console.error("응답에서 Accesstoken 헤더를 찾을 수 없습니다.");
    }
  }

  const onClickLogin = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8080/auth/login",
        {
          email: inputId,
          password: inputPw,
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          saveTokensFromResponse(response);
          navigate("/starter1");
        } else {
          throw new Error("로그인 실패");
        }
      })
      .catch((error) => console.error("로그인 중 에러 발생:", error));
  };

  const onClickRegister = () => {
    navigate("/Join");
  };

  return (
    <div>
      <div style={{ width: "200px" }}>
        <form
          style={{ display: "flex", flexDirection: "column" }}
          onSubmit={onClickLogin}
        >
          <h1>로그인</h1>
          <label className="labelStyle">UserName</label>
          <input
            type="text"
            value={inputId}
            onChange={handleInputId}
            placeholder="아이디를 입력하세요"
          />
          <label>Password</label>
          <input
            type="password"
            value={inputPw}
            onChange={handleInputPw}
            placeholder="비밀번호를 입력하세요"
          />
          <br />
          <button type="submit">Login</button>

          <button type="button" onClick={onClickRegister}>
            회원가입
          </button>
          <br />
          <a href="https://accounts.google.com/o/oauth2/v2/auth/oauthchooseaccount?response_type=code&client_id=377262399790-22fej88tjrehtu9krk5q0aa8bv6e5lp6.apps.googleusercontent.com&scope=profile%20email&state=L1x0ypyye_UT5F5HW6OU6UJxIO4VLZEha_mwqqgtjXM%3D&redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Flogin%2Foauth2%2Fcode%2Fgoogle&service=lso&o2v=2&theme=mn&flowName=GeneralOAuthFlow">
            <img src={google} alt="google" width="200" className="imageStyle" />
          </a>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;
