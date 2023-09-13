import { Flex, Text } from "@chakra-ui/react";
import { ReactComponent as Close } from "../../../assets/close.svg";

export default function ErrorAlert({ message }) {
  return (
    <Flex w="100%" py="0.625rem" gap="5px" color="#FC3314" alignItems="center">
      <Close />
      <Text fontSize="0.875rem" fontWeight="500">
        {message}
      </Text>
    </Flex>
  );
}
