import { Flex, Text } from "@chakra-ui/react";
import UserTypeCard from "./userTypeCard";
import { useEffect, useState } from "react";
import GreenBtn from "../layouts/greenBtn";
import { useNavigate } from "react-router-dom";
import { loadUser } from "../../features/auth";
import { useSendUserTypeMutation } from "../../features/api/apiSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { BaseURL } from "../../utils/utils";

export default function SelectUserType() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [activeTab, setActiveTab] = useState({
    individual: true,
    company: false,
  });

  const [sendUserType, { data, isError, error }] = useSendUserTypeMutation();

  const [formData, setFormData] = useState({ userType: "individual" });

  const { userType } = formData;
  const { individual, company } = activeTab;

  const token = localStorage.getItem("auth-token");
  const headers = {
    authorization: `bearer ${token}`,
  };

  const onClickHandler = async () => {
    console.log(userType, "userrrrrrtypee  e  e  e  e ");
    sendUserType(formData);
  };

  useEffect(() => {
    if (data) {
      console.log("hello okayyyyyyyyyyyyyyyyyyyyyyyyy");
      console.log(data, "datata");
      dispatch(loadUser(data));
      console.log(data);
      console.log(data.user.userType);
      data.user?.userType && data.user?.userType === "individual"
        ? navigate("/auth/individual-declaration")
        : navigate("/auth/company-declaration");
    }

    if (isError) {
      console.log(error), "rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr";
    }
  }, [data, isError, error, userType]);

  return (
    <Flex
      w="60%"
      gap="1.25rem"
      alignItems="flex-start"
      justifyContent="center"
      direction="column"
    >
      <Text fontSize="1.25rem" fontWeight="500" pb="0.625rem">
        Please select your type
      </Text>
      <Flex w="100%" gap="1.875rem" alignItems="center">
        <UserTypeCard
          activeTab={individual}
          setActiveTab={setActiveTab}
          setFormData={setFormData}
          label={"Individual"}
        />
        <UserTypeCard
          activeTab={company}
          setActiveTab={setActiveTab}
          setFormData={setFormData}
          label={"Company"}
        />
      </Flex>
      <Flex>
        <GreenBtn onClick={onClickHandler}>Next</GreenBtn>
      </Flex>
    </Flex>
  );
}
