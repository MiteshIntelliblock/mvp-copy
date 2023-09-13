import { Flex, Icon, Link, Text } from "@chakra-ui/react";
import { ReactComponent as RegistrationVector } from "../../assets/registrationVector.svg";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ReactComponent as Email } from "../../assets/email.svg";
import { ReactComponent as OpenEmail } from "../../assets/openMail.svg";

export default function RegistrationSuccess() {
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate("/user-details");
    }, 1000);
  }, []);

  return (
    <Flex w="100%" direction="column" alignItems="flex-start" gap="1.875rem">
      <RegistrationVector />
      <Text fontSize="1.5rem" fontWeight="500">
        Thank you for Registering to{" "}
        <Text as="span" color="lightGreen" fontWeight="600">
          BNZ Green
        </Text>
      </Text>
      <Text mt="-0.625rem">
        The verification mail has been sent. Please check your inbox.
      </Text>
      <Flex w="100%" alignItems="center" gap="1.25rem">
        <Flex
          as={Link}
          _hover={{ textDecor: "none" }}
          p="0.5rem 0.75rem"
          border="1px solid darkGreen"
          borderRadius="6px"
          fontSize="0.875rem"
          fontWeight="500"
          alignItems="center"
          gap="5px"
          color="darkGreen"
        >
          <Icon as={Email} />
          <Text>Yes, I will check Email Inbox</Text>
        </Flex>
        <Flex
          as={Link}
          _hover={{ textDecor: "none" }}
          p="0.5rem 0.56rem"
          border="1px solid lightGreen"
          borderRadius="6px"
          fontSize="0.875rem"
          fontWeight="500"
          alignItems="center"
          gap="5px"
          color="white"
          onClick={() => navigate("/auth/sign-in")}
          bgColor="lightGreen"
        >
          <Icon as={OpenEmail} />
          <Text>No, want to try with another account</Text>
        </Flex>
      </Flex>
    </Flex>
  );
}
