import { Button } from "@chakra-ui/react";
import { ReactComponent as Google } from "../../assets/googleLogo.svg";
import { BaseURL } from "../../utils/utils";
import { googleAuth } from "../../features/auth";
import { useNavigate } from "react-router-dom";
import { authCheck } from "../../utils/authCheck";
import { useDispatch } from "react-redux";
import { useEffect } from "react";

export default function GoogleSignInBtn() {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const onClickHandler = () => {
    const popupWindow = window.open(
      `${BaseURL}user/googleauth`,
      "_blank",
      "width=500,height=600"
    );

    const popupListener = (event) => {
      if (event.source === popupWindow) {
        console.log(event.data);
        if (event.data.googleId) {
          console.log(event.data.accessToken);
          dispatch(
            googleAuth({
              user: event.data,
              accessToken: event.data.accessToken,
            })
          );
          authCheck({ isAuthenticated: true, user: event.data, navigate });
        }
        window.removeEventListener("message", popupListener);
      }
    };
    window.addEventListener("message", popupListener);
  };
  return (
    <>
      <Button
        display="flex"
        alignItems="center"
        w="fit-content"
        variant="unstyled"
        size="sm"
        leftIcon={<Google />}
        border="0.5px solid #000"
        px="0.938rem"
        borderRadius="1.25rem"
        fontSize="0.875rem"
        fontWeight="400"
        onClick={onClickHandler}
      >
        Sign in using Google
      </Button>
    </>
  );
}

{
  /* 
      <GoogleLogin
        theme="outline"
        size="large"
        shape="circle"
        buttonText="Login with Google"
        onSuccess={successResponse}
        onFailure={errorResponse}
      ></GoogleLogin>
      */
}
