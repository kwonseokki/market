import React, { useState } from "react";
import "./style/authpage.scss";
import { Link, useHistory } from "react-router-dom";
import { useInput } from "../hooks/useInput";
import { signIn } from "../modules/auth";
import { useDispatch } from "react-redux";
import { loggedIn } from "../modules/authUser";

const Login = ({ setLoggedIn }) => {
  const [form, onChange, reset] = useInput({ email: "", password: "" });
  const [msg, setMsg] = useState();
  const history = useHistory();
  const dispatch = useDispatch();

  const onMemberSignIn = async (e) => {
    e.preventDefault();
    try {
      setMsg("로그인성공");
      await signIn(form).then((result) => {
        dispatch(
          loggedIn({
            ...form,
            uid: result.user.uid,
            displayName: result.user.displayName,
            url: result.user.photoURL,
          })
        );
        setLoggedIn(true);
        history.push("/");
      });
    } catch (e) {
      setMsg("로그인실패");
      console.log(e);
    }
  };
  return (
    <div className="item-container" style={{ overflow: "hidden" }}>
      <body className="antialiased">
        <div className="max-w-lg mx-auto  bg-white p-8 rounded-xl">
          <h1 className="text-4xl font-medium">로그인</h1>
          {msg}
          <p className="text-slate-500"></p>

          <div className="my-5"></div>
          <form
            onSubmit={(e) => {
              onMemberSignIn(e);
            }}
            className="my-10"
          >
            <div className="flex flex-col space-y-5">
              <label for="email">
                <p className="font-medium text-slate-700 pb-2">Email</p>
                <input
                  onChange={(e) => onChange(e)}
                  id="email"
                  name="email"
                  type="email"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="이메일을 입력해주세요."
                />
              </label>
              <label for="password">
                <p className="font-medium text-slate-700 pb-2">비밀번호</p>
                <input
                  onChange={(e) => onChange(e)}
                  id="password"
                  name="password"
                  type="password"
                  className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                  placeholder="비밀번호를 입력해주세요."
                />
              </label>
              <div className="flex flex-row justify-between">
                <div>
                  <label for="remember" class="">
                    <input
                      type="checkbox"
                      id="remember"
                      className="w-4 h-4 border-slate-200 focus:bg-indigo-600"
                    />
                    로그인 유지
                  </label>
                </div>
                <div></div>
              </div>
              <button
                type="submit"
                className="w-full py-3 font-medium text-white  rounded-lg  hover:shadow inline-flex space-x-2 items-center justify-center"
                style={{ background: "#FDBA74" }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  stroke-width="2"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"
                  />
                </svg>
                <span>로그인</span>
              </button>
              <p className="text-center">
                계정이 없으신가요?{" "}
                <Link
                  to="/register"
                  className="text-indigo-600 font-medium inline-flex space-x-1 items-center"
                >
                  <span>회원가입 </span>
                  <span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      stroke-width="2"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                      />
                    </svg>
                  </span>
                </Link>
              </p>
            </div>
          </form>
        </div>
      </body>
    </div>
  );
};

export default Login;
