import { Flex, Text } from "@chakra-ui/react";
import GreenBtn from "../layouts/greenBtn";

export default function PaymentDetails() {
  return (
    <Flex
      w="100%"
      alignItems="center"
      justifyContent="center"
      py="1.563rem"
      px="3.75rem"
      border="1px solid #D9D9D9"
      borderRadius="6px"
      direction="column"
    >
      <Text fontSize="1.25rem" fontWeight="600" pb="0.75rem">
        Payment details will be sent on your Email, once your account has been
        verified & approved.
      </Text>
      <Text fontSize="1.25rem" fontWeight="500" pb="1.875rem">
        After payment process is completed by you, the account will be created
      </Text>
      <GreenBtn>Okay</GreenBtn>
    </Flex>
  );
}
