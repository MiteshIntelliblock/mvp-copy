import { Checkbox, CheckboxGroup, Divider, Flex, Text } from "@chakra-ui/react";
import AuthWrapper from "../layouts/forms/authWrapper";

import SubmitBtn from "../layouts/forms/submitBtn";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function CompanyDeclaration() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    opt1: true,
    opt2: false,
    opt3: false,
    opt4: false,
    opt5: false,
  });

  const { opt1, opt2, opt3, opt4, opt5 } = formData;

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.checked,
    }));
  }

  function submitHandler(e) {
    e.preventDefault();
    navigate("/auth/registration-success");
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
          By default, all the users can buy or sell and offset the tokenized
          credits available on the platform. Please specify here in which other
          ways you will use BNZ Green: to list and sell carbon credits (as a
          project developer or a trader) or to connect to our software solutions
          (only available to companies).
        </Text>
        <CheckboxGroup>
          <Checkbox
            defaultChecked
            isRequired
            isDisabled
            checked={opt1}
            name="opt1"
            onChange={onChange}
          >
            I only want to buy, sell or offset carbon credits to contribute
            other types of sustainable projects.
          </Checkbox>
          <Divider borderColor="#D9D9D9" />
          <Checkbox isRequired checked={opt2} name="opt2" onChange={onChange}>
            I have sales rights and I want to trade and/or sell carbon credits
            on your marketplace.
          </Checkbox>
          <Checkbox isRequired checked={opt3} name="opt3" onChange={onChange}>
            I want to enable the option to connect my platform to BNZ Green
            through API or Widget.
          </Checkbox>
          <Divider borderColor="#D9D9D9" />
          <Checkbox isRequired checked={opt4} name="opt4" onChange={onChange}>
            I want to update with latest Carbon credits news and offers.
          </Checkbox>
          <Checkbox isRequired checked={opt5} name="opt5" onChange={onChange}>
            I agree to{" "}
            <Text as="span" fontWeight="700">
              BNZ green terms and conditions.
            </Text>
          </Checkbox>
        </CheckboxGroup>
      </Flex>
      <SubmitBtn disabled={!opt1 || !opt2 || !opt3 || !opt5}>Sign Up</SubmitBtn>
    </AuthWrapper>
  );
}
