import React, { useContext, useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import logo from "./../../../images/majesticVillas.png";
import { Helmet } from "react-helmet-async";
import { AuthContext } from "../AuthProvider/AuthProvider";
import GoogleLogin from "../GoogleLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Signin = () => {
  const { signIn, user } = useContext(AuthContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    signIn(email, password)
      .then((result) => {
        const user = result.user;
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(from, { replace: true });
      })
      .catch((error) => {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.message,
        });
      });
  };

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  return (
    <div>
      <Helmet>
        <title>Majestic Villas | Login</title>
      </Helmet>

      <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl my-10">
        <div
          className="hidden bg-cover bg-center lg:block rounded-md lg:w-1/2"
          style={{ backgroundImage: `url(${logo})` }}
        ></div>

        <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src={logo} alt="" />
          </div>

          <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome back!
          </p>

          <GoogleLogin />

          <div className="flex items-center justify-between mt-4">
            <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <a href="#" className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline">
              or login with email
            </a>

            <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>

          <form onSubmit={handleLogin}>
            <div className="mt-4">
              <label className="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200" htmlFor="LoggingEmailAddress">
                Email Address
              </label>
              <input
                id="LoggingEmailAddress"
                className="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
                name="email"
              />
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
                />
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
                value="Sign In"
              />
            </div>
            <p className="text-center text-xs text-gray-600 uppercase dark:text-gray-800 my-2 mt-4">or</p>
            <div className="flex items-center justify-between">
              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

              <Link to="/signup">
                <span className="text-xs text-gray-800 uppercase dark:text-gray-800 hover:underline font-bold">Sign Up</span>
              </Link>

              <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signin;
