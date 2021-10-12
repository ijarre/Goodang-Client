import React, { useState } from "react";
import { LoginRegisterForm } from "../components";
import { useRouter } from "next/router";
import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import app from "../firebase";

const Login = () => {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [fields, setFields] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const auth = getAuth(app);
  const router = useRouter();

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      const res = await signInWithEmailAndPassword(
        auth,
        fields.email,
        fields.password,
      );
      if (res) {
        router.push("/");
      }
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-main px-4 sm:px-6 lg:px-8">
      <LoginRegisterForm
        isSignup={false}
        fields={fields}
        handleInputChange={handleInputChange}
        handleSignin={handleSignin}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Login;
