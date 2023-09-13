import { AccordionButton, Flex, Text, AccordionIcon } from "@chakra-ui/react";
import { ReactComponent as Tick } from "../../../assets/tick.svg";

export default function KYCFormHeader({ formState, index, children }) {
  return (
    <AccordionButton
      minW="0"
      w="100%"
      border="1px solid #EEE"
      bgColor="#EEE"
      borderRadius="6px"
      p="0.625rem"
    >
      <Flex w="100%" justifyContent="space-between" alignItems="center">
        <Flex gap="0.625rem" alignItems="center">
          <Flex
            bgColor="#D9D9D9"
            border="0.5px solid #AFA9A9"
            w="1.25rem"
            height="1.25rem"
            borderRadius="50%"
            align="center"
            justify="center"
          >
            {formState ? <Tick /> : index}
          </Flex>
          <Text color={formState ? "#398501" : "#3e3e3e"}>{children}</Text>
        </Flex>
        <AccordionIcon />
      </Flex>
    </AccordionButton>
  );
}
