import { Button } from "@chakra-ui/react";

export default function GreenBtn({
  onClick,
  children,
  fontSize = "1rem",
  disabled = false,
  size = "sm",
  borderRadius = "1.25rem",
}) {
  const disableStyle = {
    backgroundColor: "rgba(217, 217, 217, 0.85)",
    color: "white",
    border: "1px solid rgba(217, 217, 217, 0.85)",
    cursor: "not-allowed",
  };

  return (
    <Button
      variant="unstyled"
      size={size}
      w="fit-content"
      onClick={onClick}
      isDisabled={disabled}
      _disabled={disableStyle}
      border="1px solid transparent"
      fontSize={fontSize}
      fontWeight="500"
      bgColor="lightGreen"
      color="white"
      px="1.25rem"
      borderRadius={borderRadius}
    >
      {children}
    </Button>
  );
}
