import { Flex, Text, Input, Button } from "@chakra-ui/react";

export default function FileReader({
  loading = false,
  isRequired = false,
  variable,
  variableName,
  onChange,
}) {
  return (
    <Flex
      minW="18.125rem"
      w="100%"
      pos="relative"
      gap="0.625rem"
      alignItems="flex-start"
    >
      <Text
        w="100%"
        h="1.875rem"
        type="text"
        fontSize="0.875rem"
        border="0.75px solid #D9D9D9"
        borderRadius="6px"
        px="5px"
        py="5px"
      >
        {variable !== null ? (
          <Text color="#3a3a3a">{variable?.name}</Text>
        ) : (
          <Text color="#D9D9D9">Upload here</Text>
        )}
      </Text>
      <Input
        type="file"
        accept=" image/*, video/*"
        fontSize="0.75rem"
        border="0.75px solid #D9D9D9"
        placeholder="Select a file"
        borderRadius="3px"
        display="none"
        name={variableName}
        isRequired={isRequired}
        id={variableName}
        onChange={(e) => {
          onChange(e);
        }}
        _placeholder={{ color: "#D9D9D9" }}
      />
      <label htmlFor={variableName}>
        <Button
          pos="absolute"
          top="50%"
          transform="translateY(-50%)"
          right="15px"
          h="1.25rem"
          type="button"
          as="span"
          fontSize={{ base: "0.625rem", lg: "0.75rem" }}
          borderRadius="3px"
          color="white"
          bgColor="lightGreen"
          border="1px solid transparent"
          p="0px 5px"
          fontWeight="500"
          disabled={variable || loading}
          _hover={{
            color: "lightGreen",
            bgColor: "transparent",
            border: "1px solid #93C601",
          }}
          _active={{
            color: "lightGreen",
            bgColor: "transparent",
            border: "1px solid #93C601",
          }}
        >
          Choose file
        </Button>
      </label>
    </Flex>
  );
}
