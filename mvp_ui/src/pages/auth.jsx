import { Flex, Image, Text } from "@chakra-ui/react";
import authBg from "../assets/auth-bg.jpg";
import bnzLogo from "../assets/BNZ-logo.svg";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import SignIn from "../components/Auth/signIn";
import SignUp from "../components/Auth/signUp";
import GreenBtn from "../components/layouts/greenBtn";
import { useEffect, useState } from "react";
import CompanyDeclaration from "../components/Auth/companyDeclaration";
import IndividualDeclaration from "../components/Auth/individualDeclaration";
import RegistrationSuccess from "../components/Auth/registrationSuccess";
import ForgetPassword from "../components/Auth/forgetPassword";
import { useDispatch } from "react-redux";
import { loadUser } from "../features/auth";
import { authCheck } from "../utils/authCheck";
import SelectUserType from "../components/Auth/selectTypeofUser";
import { useFetchUserMutation } from "../features/api/apiSlice";

export default function Authentication() {
  const [authType, setAuthType] = useState();
  const location = useLocation();
  const navigate = useNavigate();
  // const [fetchUser, { data, isError, error }] = useFetchUserMutation();
  // const dispatch = useDispatch();

  // const token = localStorage.getItem("auth-token");

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   } else {
  //     fetchUser();
  //   }
  // }, [token]);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     dispatch(loadUser(data));
  //     authCheck({ isAuthenticated: true, user: data.user, navigate });
  //   }

  //   if (isError) {
  //     console.log(error);
  //     // navigate("/auth/sign-in");
  //   }
  // }, [data, isError, error]);

  useEffect(() => {
    const type = getAuthType(location.pathname);
    setAuthType(type);
  }, [location.pathname]);

  const getAuthType = (url) => {
    const parts = url.split("/");
    return parts.pop();
  };

  return (
    <Flex w="100%" h="100%" alignItems="center">
      <Flex w="45%" h="100%" justifyContent="center" pos="relative">
        <Image
          h="100vh"
          maxH="100%"
          objectFit="cover"
          objectPosition="center"
          src={authBg}
        />
        <Flex
          w="100%"
          h="100%"
          pos="absolute"
          backgroundImage="linear(180deg, #587505 0.52%, rgba(125, 153, 44, 0.60) 100%)"
          padding="3.75rem 4rem 3.75rem 1.875rem"
          direction="column"
          alignItems="flex-start"
          justifyContent="center"
          gap="1.875rem"
        >
          <Image h="3.75rem" src={bnzLogo} pos="absolute" top="3.75rem" />
          <Flex
            w="100%"
            h="100%"
            mt="4.25rem"
            direction="column"
            gap="0.625rem"
          >
            <Text color="white" fontWeight="700" fontSize="3rem">
              Perfect Platform for Better Tomorrow
            </Text>
            <Text fontSize="1.25rem" color="white">
              Join the Movement for a Greener Future! Sign up now and become a
              part of BNZ Now's mission to preserve the environment and create a
              sustainable tomorrow.
            </Text>
          </Flex>
          <Flex w="100%" h="100%" direction="column" gap="0.625rem">
            <Text color="white" fontSize="1.25rem" fontWeight="700">
              {authType === "sign-in"
                ? "Want to create an Account ?"
                : "Already have an Account ?"}
            </Text>
            <GreenBtn
              onClick={() =>
                authType === "sign-in"
                  ? navigate("/auth/sign-up")
                  : navigate("/auth/sign-in")
              }
            >
              {authType === "sign-in" ? "Sign up" : "Sign in"}
            </GreenBtn>
          </Flex>
        </Flex>
      </Flex>
      <Flex
        w="55%"
        h="100vh"
        bgGradient="linear(180deg, #DDFFC9 0%, #FFF 100%)"
        padding="3.125rem"
      >
        <Routes>
          <Route path="sign-in" element={<SignIn />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="select-type" element={<SelectUserType />} />
          <Route path="forget-password" element={<ForgetPassword />} />
          <Route path="company-declaration" element={<CompanyDeclaration />} />
          <Route
            path="individual-declaration"
            element={<IndividualDeclaration />}
          />
          <Route
            path="registration-success"
            element={<RegistrationSuccess />}
          />
        </Routes>
      </Flex>
    </Flex>
  );
}
