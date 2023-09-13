import { Checkbox, CheckboxGroup, Flex, Text } from "@chakra-ui/react";
import AuthWrapper from "../layouts/forms/authWrapper";
import SubmitBtn from "../layouts/forms/submitBtn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function IndividualDeclaration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    opt1: false,
    opt2: false,
    opt3: false,
  });

  const { opt1, opt2, opt3 } = formData;

  function submitHandler(e) {
    e.preventDefault();
    navigate("/auth/registration-success");
  }

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  }

  return (
    <AuthWrapper authType="Sign Up" onSubmit={submitHandler}>
      <Flex
        w="100%"
        gap="0.938rem"
        alignItems="flex-start"
        direction="column"
        pb="1.875rem"
      >
        <Text fontSize="1.25rem" fontWeight="500" pb="0.625rem">
          Use of the Platform
        </Text>
        <Text>
          Buy default, all users can buy credits on the platform to offset their
          carbon credits. Please specify here in which other ways you will use
          here.
        </Text>
        <CheckboxGroup>
          <Checkbox isRequired checked={opt1} onChange={onChange} name="opt1">
            I only want to buy, sell or offset carbon credits to contribute
            other types of sustainable projects.
          </Checkbox>
          <Checkbox isRequired checked={opt2} onChange={onChange} name="opt2">
            I want to update with latest Carbon credits news and offers.
          </Checkbox>
          <Checkbox isRequired checked={opt3} onChange={onChange} name="opt3">
            I agree to{" "}
            <Text as="span" fontWeight="700">
              BNZ green terms and conditions.
            </Text>
          </Checkbox>
        </CheckboxGroup>
      </Flex>
      <SubmitBtn disabled={!opt1 || !opt3}>Sign Up</SubmitBtn>
    </AuthWrapper>
  );
}
