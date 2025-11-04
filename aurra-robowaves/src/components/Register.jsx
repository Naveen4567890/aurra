import React, { use, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../slice/slice"; 
import toast from 'react-hot-toast';
import {validatePassword} from 'val-pass';
import { Link, useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";
import { IoMdMail } from "react-icons/io";
import { FaLock } from "react-icons/fa";

const RegisterPage = () => {
  let nagivate=useNavigate();
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.user);
  const [errorMessage,setErrorMessage]=useState("");

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    image: null,
  });

  const [preview, setPreview] = useState(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image" && files.length > 0) {
      setFormData({ ...formData, image: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } 
    else if(name=='password'){
        let{validateAll,getAllValidationErrorMessage}=validatePassword(value,8)
        validateAll()?setErrorMessage(""):setErrorMessage(getAllValidationErrorMessage)
        value==""&&setErrorMessage("")
    }
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let { fullName, email, password, confirmPassword,image } = formData;
    if (!fullName || !email || !password || !confirmPassword,!image) {
      toast.error("All fields are mandatory");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    dispatch(registerUser(formData));
    toast.success("Registration successful! Please log in.");
    console.log(formData);
    
    nagivate("/login");
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      <div className="hidden md:flex w-1/2 bg-indigo-200 text-center flex-col justify-center items-center p-10 ">
        <img
          src="/4575caffe972bdbd2209c4926317bbc8c6b180e0-removebg-preview.png"
          alt="Logo"
          className="w-40 h-40 sm:w-60 sm:h-60 md:w-80 md:h-80 object-contain"
        />
        <h1 className="text-3xl font-bold text-indigo-700 mb-2">Welcome To Our Platform</h1>
        
        <p className="mt-4 text-xl text-indigo-500 text-center max-w-sm">
          Join thousands of users who are already experiencing the future of
          productivity.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center w-full md:w-1/2 bg-white p-6 sm:p-8 h-screen md:h-auto">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col rounded-2xl  shadow-blue-300 justify-center w-full h-full md:h-auto md:max-w-md md:shadow-xl md:rounded-2xl md:p-8 p-6 overflow-y-auto"
        >
          <h2 className="text-2xl font-bold text-center mb-2 text-gray-800">
            Create your account
          </h2>
          <p className="text-center text-sm text-gray-500 mb-6">
            Already have an account?{" "}
            <Link to="/login" className="text-indigo-600 hover:underline">
              Sign in
            </Link>
          </p>

          
          <div className="flex justify-center mb-4">
            <div className="relative w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-300">
              {preview ? (
                <img
                  src={preview}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-10 h-10 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M12 4v16m8-8H4"
                  />
                </svg>
              )}
            </div>
            
          </div>

          {/* <div className="text-center mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Upload profile image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-600"
            />
          </div> */}

          <div className="space-y-4">
            <div ><h3 className="flex gap-2  "><FaUserAlt   className="text-blue-700 text-xl " />Full Name</h3>
            <input
              type="text"
              name="fullName"
              placeholder="e.g. John Doe"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            /></div>

            <div><h3 className="flex gap-2  "><IoMdMail  className="text-blue-700  text-xl " />Email Address</h3>
              <input
              type="email"
              name="email"
              placeholder="e.g. johndoe@example.com"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            /></div>

            <div><h3 className="flex gap-2  "><FaLock className="text-blue-700 text-xl "/>Password</h3>
              <input
              type="password"
              name="password"
              placeholder="Enter a strong password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            /></div>
                
                <div className={`flex w-full h-2/3 rounded-lg ${!errorMessage?'hidden':''} `}><span className='border-red-700'>*{errorMessage}</span></div>
                
            <div><h3 className="flex gap-2 "><FaLock  className="text-blue-700 text-xl "/>Confirm Password</h3>
              <input
              type="password"
              name="confirmPassword"
              placeholder="Re-enter your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400"
            /></div>
            
             <div className="text-center mb-4">
            <label className="block text-sm text-gray-600 mb-1">
              Upload profile image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleChange}
              className="block w-full text-sm text-gray-600"
            />
          </div>
          </div>

            

          <div className="flex items-center mt-4">
            <input type="checkbox" required className="mr-2 accent-indigo-500" />
            <p className="text-sm text-gray-600">
              I agree to the{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:underline">
                Privacy Policy
              </a>
              .
            </p>
          </div>


          <button
            type="submit"
            disabled={loading}
            className={`w-full relative overflow-hidden bg-linear-to-r from-indigo-500 to-purple-500 text-white py-2 mt-6 rounded-lg 
              transition-all duration-300 ease-in-out transform 
              hover:scale-105 active:scale-95 focus:outline-none shadow-lg`}
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                Creating Account...
              </span>
            ) : (
              <span className="relative z-10">Create Account</span>
            )}
            <span
              className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity"
            ></span>
          </button>

  
          <div className="flex items-center justify-center my-4">
            <div className="border-t w-1/4"></div>
            <p className="mx-2 text-sm text-gray-500">Or continue with</p>
            <div className="border-t w-1/4"></div>
          </div>

         
          <button
            type="button"
            className="flex items-center justify-center w-full border border-gray-300 py-2 rounded-lg hover:bg-gray-50"
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5 mr-2"
            />
            Continue with Google
          </button>
        </form>

    
        <p className="text-xs text-gray-500 mt-6 text-center">
          © {new Date().getFullYear()} AURRA. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
