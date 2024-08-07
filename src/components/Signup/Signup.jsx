import React, { useContext, useState } from "react";
import { Helmet } from "react-helmet-async";

import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import magesticLogo from "./../../../images/majesticVillas.png";
import GoogleLogin from "../GoogleLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
const Signup = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const location = useLocation();
  const [passwordVisible, setPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const result = await createUser(data.email, data.password);
      await updateUserProfile(data.name, data.photoURL);
      const loggedUser = result.user;
      console.log(loggedUser);
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "User created successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      console.log("Profile updated successfully");
      console.log(data.name, data.photoURL);
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Error during signup", error);
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  };
  return (
    <div>
      <Helmet>
        <title>Majestic Villas | signup</title>
      </Helmet>

      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl my-10">
        <div
          className="hidden bg-cover bg-center lg:block rounded-md lg:w-1/2"
          style={{
            backgroundImage: `url(${magesticLogo})`,
          }}></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={magesticLogo} alt="" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">Welcome back!</p>

          {/* <SocialLogin></SocialLogin> */}
          <GoogleLogin></GoogleLogin>

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
              or login with email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="Name">
                Name
              </label>
              <input
                id="Name"
                {...register("name", { required: true })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                name="name"
              />{" "}
              {errors.name && <span className="text-red-400">name is required*</span>}
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="photoURL">
                Photo Url
              </label>
              <input
                id="photoURL"
                {...register("photoURL", { required: true })}
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="text"
                name="photoURL"
              />{" "}
              {errors.photoURL && <span className="text-red-400">photo url is required*</span>}
            </div>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                name="email"
                {...register("email", { required: true })}
              />
              {errors.email && <span className="text-red-400">email is required*</span>}
            </div>

            <div className="mt-4">
              <div className="flex justify-between">
                <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="loggingPassword">
                  Password
                </label>
                <a href="#" className="text-xs text-gray-500 dark:text-gray-300 hover:underline">
                  Forget Password?
                </a>
              </div>
              <div className="flex flex-row items-center">
                <input
                  id="loggingPassword"
                  className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type={passwordVisible ? "text" : "password"}
                  name="password"
                  {...register("password", {
                    required: true,
                    minLength: 6,
                    pattern: /(?=.*[A-Z])(?=..*[a-z])/,
                  })}
                />
                {errors.password?.type === "required" && (
                  <p role="alert" className="text-red-600">
                    Password is required
                  </p>
                )}
                {errors.password?.type === "minLength" && (
                  <p role="alert" className="text-red-600">
                    Password must have minimum length of 6
                  </p>
                )}
                {errors.password?.type === "pattern" && (
                  <p role="alert" className="text-red-600">
                    Password must consist one upper case and one lower case alphabet.
                  </p>
                )}

                <div className="text-md px-4">
                  <button type="button" onClick={togglePasswordVisibility} className="focus:outline-none">
                    {passwordVisible ? <FaEyeSlash /> : <FaEye />}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6">
              <input
                type="submit"
                className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                value="Sign Up"
              />

              <input type="text" />
            </div>

            <div className="flex items-center justify-between mt-4">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <Link to="/login" className="text-center">
                <a href="#" className="text-xs text-gray-800 uppercase dark:text-gray-800 hover:underline text-center">
                  Already have an account? <br />
                  <span className="font-bold mx-auto">sign In</span>
                </a>
              </Link>

              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
