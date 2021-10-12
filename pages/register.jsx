import React, { useState } from "react";
import { LoginRegisterForm } from "../components";
import { useRouter } from "next/router";
import {
  createUserWithEmailAndPassword,
  getAuth,
  updateCurrentUser,
} from "@firebase/auth";
import app from "../firebase";

const Register = () => {
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

  const handleSignup = async (e) => {
    e.preventDefault();
    if (fields.password !== fields.confirmPassword) {
      setLoading(true);
      setError("Password does not match");
    } else {
      setError("");
    }
    if (error === "") {
      try {
        setError("");
        setLoading(true);
        const data = await createUserWithEmailAndPassword(
          auth,
          fields.email,
          fields.password,
        );
        await registerToDB({
          id: data.user.uid,
          firstName: fields.firstName,
          lastName: fields.lastName,
          email: fields.email,
          password: fields.password,
        });

        router.push("/");
      } catch (err) {
        setError(err.message);
      }
    }

    setLoading(false);
  };

  const registerToDB = async (data) => {
    try {
      const response = await api.post("/user", data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-main px-4 sm:px-6 lg:px-8">
      <LoginRegisterForm
        isSignup={true}
        fields={fields}
        handleInputChange={handleInputChange}
        handleSignup={handleSignup}
        loading={loading}
        error={error}
      />
    </div>
  );
};

export default Register;
