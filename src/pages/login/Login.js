import { useRef, useState, useEffect } from "react";
import classes from "./Login.module.css";
import axios from "axios";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const Login = () => {
  const dispatch = useDispatch();

  const userNameRef = useRef();
  const passwordRef = useRef();
  const [isWrong, setIsWrong] = useState();
  const navigate = useNavigate();

  const loginHandler = (e) => {
    e.preventDefault();

    axios
      .post("/admin/getAdmin", {
        username: userNameRef.current.value,
        password: passwordRef.current.value,
      })
      .then((result) => {
        if (!result.data) {
          setIsWrong(true);
        } else {
          dispatch({ type: "login" });
          navigate("/");
          setIsWrong(false);
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className={classes.container}>
      <form onSubmit={loginHandler} className={classes["form-login"]}>
        <h1>Login</h1>
        <input placeholder="Admin" type="text" ref={userNameRef} />
        <input placeholder="Password" type="password" ref={passwordRef} />
        {isWrong && <p>User name or Password went wrong!</p>}
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;
