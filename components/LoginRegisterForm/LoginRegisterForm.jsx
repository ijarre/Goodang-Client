import React from "react";
import Link from "next/link";
const LoginRegisterForm = ({
  isSignup = true,
  setIsSignup,
  handleSignup,
  handleSignin,
  fields,
  handleInputChange,
  loading,
  error,
}) => {
  // TODO: Field error handling
  const { firstName, lastName, email, password, confirmPassword } = fields;
  return (
    <div className="max-w-md w-full  px-5 py-8 border-2 border-gray-800 rounded-md shadow-lg bg-white">
      <div>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 pb-8">
          {!isSignup ? "Log in to your account" : "Register your account"}
        </h2>
      </div>
      {error && (
        <div className="-red-400 bg-red-200 p-3 text-sm rounded-sm">
          {" "}
          <span className="font-bold">Error! </span>
          {error}
        </div>
      )}
      <form
        className=" mt-6 space-y-6"
        onSubmit={isSignup ? handleSignup : handleSignin}
      >
        {/* all the label below is set to not visible sr-only means for screen readers pn;y */}
        <div className="rounded-md shadow-sm space-y-2">
          {isSignup && (
            <div className="flex justify-between gap-x-2">
              {/* First Name */}
              <label htmlFor="first-name" className="sr-only">
                First Name
              </label>
              <input
                id="first-name"
                name="firstName"
                type="firstName"
                value={firstName}
                onChange={handleInputChange}
                autoComplete="given-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="First Name"
              />
              {/* Last Name */}
              <label htmlFor="last-name" className="sr-only">
                Last Name
              </label>
              <input
                id="last-name"
                name="lastName"
                type="lastName"
                value={lastName}
                onChange={handleInputChange}
                autoComplete="family-name"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Last Name"
              />
            </div>
          )}
          {/* Email Address */}
          <div>
            <label htmlFor="email-address" className="sr-only">
              Email address
            </label>
            <input
              id="email-address"
              name="email"
              type="email"
              value={email}
              onChange={handleInputChange}
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          {/* Password */}
          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={handleInputChange}
              autoComplete="new-password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
          {/* Confirm Password */}
          {isSignup && (
            <div>
              <label htmlFor="confirm-password" className="sr-only">
                Confirm Password
              </label>
              <input
                id="confirm-password"
                name="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={handleInputChange}
                autoComplete="new-password"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                placeholder="Confirm Password"
              />
            </div>
          )}
        </div>

        <div className="flex items-center justify-between flex-row">
          <div className="text-sm ">
            {isSignup ? "Have" : "Don't have"} an account?{" "}
            <span className="font-bold cursor-pointer">
              {isSignup ? (
                <Link href="/login">Log in</Link>
              ) : (
                <Link href="/register">Sign up</Link>
              )}
            </span>
          </div>
        </div>

        <div>
          <button
            type="submit"
            className={`group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md  ${loading
              ? "bg-gray-600 text-black cursor-wait "
              : "bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 text-white"
              }`}
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginRegisterForm;
