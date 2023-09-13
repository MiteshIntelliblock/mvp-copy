import { Flex, Link, Text } from "@chakra-ui/react";

export default function HelpAndSupport() {
  return (
    <Flex w="100%" alignItems="center" direction="column" gap="1.25rem">
      <Text fontSize="2rem" fontWeight="500">
        Help & Support
      </Text>
      <Flex
        w="100%"
        borderRadius="0.375rem"
        border="1px solid #D9D9D9"
        alignItems="flex-start"
        direction="column"
        padding="0.94rem"
        gap="0.94rem"
      >
        <Text fontSize="1.5rem" fontWeight="500">
          Need help or support ?
        </Text>
        <Text>
          Lorem ipsum dolor sit amet consectetur. At molestie ac quisque
          pellentesque aenean duis. Penatibus dui nunc arcu quis. Congue at nibh
          lorem ridiculus magna. Non diam sed posuere sollicitudin. Sed tempus
          viverra interdum viverra suspendisse sit pellentesque gravida nunc.
        </Text>
        <Flex w="100%" direction="column" alignItems="flex-start">
          <Flex w="100%" alignItems="center">
            <Text w="15%">Email :</Text>
            <Link href="mailto:info@bnzgreen.io">info@bnzgreen.io</Link>
          </Flex>
          <Flex w="100%" alignItems="center">
            <Text w="15%">Website :</Text>
            <Link href="https://new.bnznow.com/" isExternal>
              https://new.bnznow.com/
            </Link>
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
}
