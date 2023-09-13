import { useEffect, useState } from "react";
import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Text,
  Link,
  Spinner,
} from "@chakra-ui/react";
import { ReactComponent as Email } from "../../assets/email.svg";
import { ReactComponent as Passwd } from "../../assets/passwd.svg";
import { ReactComponent as Filter } from "../../assets/filter.svg";
import SubmitBtn from "../layouts/forms/submitBtn";
import AuthWrapper from "../layouts/forms/authWrapper";
import GoogleSignInBtn from "../layouts/GoogleSignInBtn";
import { useLoginUserMutation } from "../../features/api/apiSlice";
import { useDispatch } from "react-redux";
import ErrorAlert from "../layouts/alerts/errorAlert";
import { login } from "../../features/auth";
import { useNavigate, NavLink } from "react-router-dom";
import { individualKycCheck, companyKycCheck } from "../../utils/authCheck";

export default function SignIn() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loginUser, { isLoading, data, error }] = useLoginUserMutation();
  const [showPass, setShowPass] = useState("password");
  const [formData, setFormData] = useState({
    emailId: "",
    password: "",
  });

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  const { emailId, password } = formData;

  function submitHandler(e) {
    e.preventDefault();
    loginUser(formData);
  }

  useEffect(() => {
    if (data) {
      console.log(data.user.userType);
      dispatch(login(data));
      if (!data.user?.userType) {
        navigate("/auth/select-type");
      } else {
        data.user.userType === "individual"
          ? individualKycCheck({ user: data, navigate })
          : companyKycCheck({ user: data, navigate });
      }
    }
  }, [data]);

  return (
    <AuthWrapper authType="Sign In" onSubmit={submitHandler}>
      {error && <ErrorAlert message={error.data.message} />}
      <Flex w="100%" gap="0.938rem" alignItems="flex-start" direction="column">
        <FormControl>
          <FormLabel>Email-ID</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Email />
            </InputLeftElement>
            <Input
              type="email"
              isRequired
              fontSize="0.875rem"
              fontWeight="500"
              _active={{ bgColor: "transparent" }}
              _focus={{ bgColor: "transparent" }}
              placeholder="Enter your Email-ID"
              name="emailId"
              value={emailId}
              onChange={onChange}
              _placeholder={{ color: "#D9D9D9" }}
            />
          </InputGroup>
        </FormControl>
        <FormControl>
          <FormLabel>Password</FormLabel>
          <InputGroup>
            <InputLeftElement>
              <Passwd />
            </InputLeftElement>
            <Input
              type={showPass}
              isRequired
              fontSize="0.875rem"
              fontWeight="500"
              placeholder="Enter your password"
              name="password"
              value={password}
              onChange={onChange}
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
          <Flex w="100%" alignItems="center" justifyContent="flex-end">
            <Link
              as={NavLink}
              to="/auth/forget-password"
              color="lightGreen"
              textDecor="underline"
              fontSize="0.75rem"
            >
              Forgot Password
            </Link>
          </Flex>
        </FormControl>
        <SubmitBtn disabled={isLoading}>
          {isLoading ? <Spinner /> : "Sign in"}
        </SubmitBtn>
      </Flex>
      <Text py="0.938rem">Or</Text>
      <GoogleSignInBtn />
    </AuthWrapper>
  );
}
