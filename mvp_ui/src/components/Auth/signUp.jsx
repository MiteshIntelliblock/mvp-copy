import { useEffect, useState } from "react";
import AuthWrapper from "../layouts/forms/authWrapper";
import SignUpForm from "./sign-up-form";
import { useRegisterUserMutation } from "../../features/api/apiSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { register } from "../../features/auth";
import { useToast } from "@chakra-ui/react";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const toast = useToast();
  const [registerUser, { isLoading, data, error }] = useRegisterUserMutation();
  const [showPass, setShowPass] = useState("password");
  const [activeTab, setActiveTab] = useState({
    individual: true,
    company: false,
  });
  const [formData, setFormData] = useState({
    userType: "individual",
    fullName: "",
    companyName: "",
    emailId: "",
    mobileNo: "",
    password: "",
    password2: "",
    companySize: "",
    country: "",
  });

  const { password, password2 } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (password !== password2) {
      toast({
        position: "bottom",
        status: "warning",
        description: "Passwords do not match",
        duration: 4000,
        isClosable: true,
      });
      return;
    }
    console.log(formData);
    registerUser(formData);
  }

  useEffect(() => {
    if (data) {
      data?.registerUser?.userType === "individual" &&
        navigate("/auth/individual-declaration");
      data?.registerUser?.userType === "company" &&
        navigate("/auth/company-declaration");
      console.log(data?.registerUser?.userType);
      dispatch(register(data));
    }
  });

  return (
    <>
      <AuthWrapper authType="Sign Up" onSubmit={onSubmit}>
        <SignUpForm
          error={error}
          isLoading={isLoading}
          formData={formData}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          setFormData={setFormData}
          showPass={showPass}
          onChange={onChange}
          setShowPass={setShowPass}
        />
      </AuthWrapper>
    </>
  );
}
