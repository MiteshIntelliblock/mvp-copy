import { Flex, Text } from "@chakra-ui/react";

export default function AuthWrapper({
  children,
  authType = "Sign In",
  onSubmit,
}) {
  return (
    <Flex
      w="100%"
      h="100%"
      direction="column"
      justifyContent="center"
      gap="1.25rem"
    >
      <Text
        w="fit-content"
        fontSize="2.25rem"
        fontWeight="600"
        borderBottom="3px solid darkGreen"
      >
        {authType}
      </Text>
      <form onSubmit={onSubmit}>{children}</form>
    </Flex>
  );
}
