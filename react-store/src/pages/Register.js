import React from "react";
import axios from "commons/axios";
import useForm from "react-hook-form";
import { toast } from "react-toastify";

export default function Login(props) {
  const { register, handleSubmit, errors } = useForm();

  const onSubmit = async (data) => {
    //handles register logic
    try {
      //define register required fields
      const { nickname, email, password } = data;
      const res = await axios.post("/auth/register", {
        nickname,
        email,
        password,
        type: 0,
      });
      //store into react-store-api
      const jwToken = res.data;
      global.auth.setToken(jwToken);
      //shjow success message
      toast.success("Register Success");
      //redirect to home page
      props.history.push("/");
    } catch (error) {
      const message = error.response.data.message;
      toast.error(message);
    }
  };

  return (
    <div className="login-wrapper">
      <form className="box login-box" onSubmit={handleSubmit(onSubmit)}>
        <div className="field">
          {/* User name input field */}
          <label className="label">Username</label>
          <div className="control">
            <input
              className={`input ${errors.nickname && "is-danger"}`}
              type="text"
              placeholder="Nickname"
              name="nickname"
              ref={register({
                required: "nickname is required",
              })}
            />
            {errors.nickname && (
              <p className="helper has-text-danger">
                {errors.nickname.message}
              </p>
            )}
          </div>
        </div>
        {/* Email input field*/}
        <div className="field">
          <label className="label">Email</label>
          <div className="control">
            <input
              className={`input ${errors.email && "is-danger"}`}
              type="text"
              placeholder="Email"
              name="email"
              ref={register({
                //email field cant be empty
                required: "email is required",
                //emial must be in format "xxxxxxxxx@xxx.xxx"
                pattern: {
                  value:
                    /^[A-Za-z0-9]+([_\\.][A-Za-z0-9]+)*@([A-Za-z0-9\\-]+\.)+[A-Za-z]{2,6}$/,
                  message: "invalid email",
                },
              })}
            />
            {errors.email && (
              <p className="helper has-text-danger">{errors.email.message}</p>
            )}
          </div>
        </div>
        <div className="field">
          <label className="label">Password</label>
          <div className="control">
            <input
              className={`input ${errors.password && "is-danger"}`}
              type="password"
              placeholder="Password"
              name="password"

              ref={register({
                //password field cant be empty
                required: "password is required",
                //minimum length requiremnet for password
                minLength: {
                  value: 6,
                  message: "cannot be less than 6 digits",
                },
              })}
            />

            {/* error message container */}
            {errors.password && (
              <p className="helper has-text-danger">
                {errors.password.message}
              </p>
            )}
          </div>
        </div>
        <div className="control">
          <button className="button is-fullwidth is-primary">Register</button>
        </div>
      </form>
    </div>
  );
}
