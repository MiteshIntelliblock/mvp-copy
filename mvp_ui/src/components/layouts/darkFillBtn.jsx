import { Button } from "@chakra-ui/react";

export default function DarkGreenBtn({
  size = "sm",
  fontSize = "1rem",
  px = "1.25rem",
  children,
  onClick,
  borderRadius = "1.25rem",
}) {
  return (
    <Button
      variant="unstyled"
      size={size}
      w="fit-content"
      onClick={onClick}
      fontSize={fontSize}
      fontWeight="500"
      bgColor="darkGreen"
      color="white"
      border="1px solid darkGreen"
      px={px}
      borderRadius={borderRadius}
    >
      {children}
    </Button>
  );
}
