import { Button } from "@chakra-ui/react";

export default function SubmitBtn({
  disabled = false,
  children,
  fontSize = "1rem",
  size = "sm",
}) {
  return (
    <Button
      variant="unstyled"
      isDisabled={disabled}
      type="submit"
      size={size}
      textAlign="center"
      fontSize={fontSize}
      fontWeight="500"
      bgColor="lightGreen"
      color="white"
      px="1.25rem"
      borderRadius="1.25rem"
    >
      {children}
    </Button>
  );
}
