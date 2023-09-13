import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Spinner,
  InputGroup,
  InputRightElement,
  Link,
  useToast,
} from "@chakra-ui/react";
import AuthWrapper from "../layouts/forms/authWrapper";
import { useEffect, useState } from "react";
import { useForgetPasswordMutation } from "../../features/api/apiSlice";
import SubmitBtn from "../layouts/forms/submitBtn";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import ErrorAlert from "../layouts/alerts/errorAlert";

export default function ForgetPassword() {
  const [emailCheck, setEmailCheck] = useState(false);
  const [formData, setFormData] = useState({
    emailId: "",
    userAuthorised: false,
    password: "",
    password2: "",
  });

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  return emailCheck ? (
    <ForgetSubmit formData={formData} onChange={onChange} />
  ) : (
    <EmailVerf
      setFormData={setFormData}
      formData={formData}
      onChange={onChange}
      setEmailCheck={setEmailCheck}
    />
  );
}

function EmailVerf({ formData, onChange, setEmailCheck, setFormData }) {
  const [forgetPassword, { data, isError, isLoading, error }] =
    useForgetPasswordMutation();
  const { emailId } = formData;

  function nextHandler(e) {
    e.preventDefault();
    console.log(formData);
    forgetPassword(formData);
  }

  useEffect(() => {
    if (data) {
      console.log(data);
      setFormData((prevState) => ({
        ...prevState,
        userAuthorised: data.userAuthorised,
      }));
      setEmailCheck(true);
    }

    if (isError) {
      console.log(error);
    }
  }, [isError, data, error]);

  return (
    <AuthWrapper authType="Forgot Password" onSubmit={nextHandler}>
      {isError && <ErrorAlert message={error?.data?.message} />}
      <FormControl w="50%">
        <FormLabel>Email-ID</FormLabel>
        <Input
          type="email"
          name="emailId"
          fontSize="0.875rem"
          fontWeight="500"
          placeholder="Enter your Email-ID"
          isRequired
          value={emailId}
          onChange={onChange}
          _placeholder={{ color: "#D9D9D9" }}
        />
      </FormControl>
      <Flex mt="1.25rem">
        <SubmitBtn disabled={isLoading}>
          {isLoading ? <Spinner /> : "Next"}
        </SubmitBtn>
      </Flex>
    </AuthWrapper>
  );
}

function ForgetSubmit({ formData, onChange }) {
  const [forgetPassword, { data, isError, isLoading, error }] =
    useForgetPasswordMutation();
  const navigate = useNavigate();
  const toast = useToast();
  const [showPass, setShowPass] = useState("password");
  const { emailId, password, password2 } = formData;

  function submitHandler(e) {
    e.preventDefault();
    if (password !== password2) {
      toast({
        description: "Passwords do not match!",
        status: "warning",
        duration: 4000,
        isClosable: true,
      });
      return;
    }

    console.log(formData);
    forgetPassword(formData);
  }

  useEffect(() => {
    if (data) {
      console.log(data);
      toast({
        description: "Password Updated successfully",
        status: "success",
        duration: 2000,
        isClosable: true,
      });

      setTimeout(() => {
        navigate("/auth/sign-in");
      }, 2000);
    }

    if (isError) {
      console.log(error);
    }
  }, [isError, data, error]);

  return (
    <AuthWrapper authType="Forgot Password" onSubmit={submitHandler}>
      <Flex w="100%" direction="column" gap="0.625rem" alignItems="flex-start">
        <FormControl>
          <FormLabel>Email-ID</FormLabel>
          <Input
            isReadOnly
            type="email"
            name="emailId"
            fontSize="0.875rem"
            fontWeight="500"
            isRequired
            value={emailId}
          />
        </FormControl>
        <FormControl>
          <FormLabel fontWeight="500">Enter Password</FormLabel>
          <InputGroup>
            <Input
              type={showPass}
              isRequired
              fontSize="0.875rem"
              fontWeight="500"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={(e) => onChange(e)}
              _placeholder={{ color: "#D9D9D9" }}
            />
            <InputRightElement>
              <Link
                as={Filter}
                onClick={() =>
                  showPass === "password"
                    ? setShowPass("text")
                    : setShowPass("password")
                }
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Re-Enter Password</FormLabel>
          <InputGroup>
            <Input
              type={showPass}
              isRequired
              fontSize="0.875rem"
              fontWeight="500"
              placeholder="Re-Enter your password"
              name="password2"
              value={password2}
              onChange={(e) => onChange(e)}
              _placeholder={{ color: "#D9D9D9" }}
            />
            <InputRightElement>
              <Link
                as={Filter}
                onClick={() =>
                  showPass === "password"
                    ? setShowPass("text")
                    : setShowPass("password")
                }
              />
            </InputRightElement>
          </InputGroup>
        </FormControl>
      </Flex>
      <Flex mt="1.563rem">
        <SubmitBtn>{isLoading ? <Spinner /> : "Submit"}</SubmitBtn>
      </Flex>
    </AuthWrapper>
  );
}
