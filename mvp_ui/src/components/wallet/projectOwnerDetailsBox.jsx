import { Flex, Text, Image, Link } from "@chakra-ui/react";
import { ReactComponent as EditIcon } from "../../assets/editIcon.svg";
import { copy } from "../../utils/imgs";
import RewardsCard from "./rewards-card";

export default function ProjectOwnerDetailsBox() {
  return (
    <Flex
      w="100%"
      padding="1.25rem"
      border="1px solid #D9D9D9"
      borderRadius="0.375rem"
      alignItems="flex-start"
      justifyContent="space-between"
    >
      <Flex w="70%" direction="column" alignItems="flex-start">
        <Flex alignItems="center" gap="0.94rem" pb="0.62rem">
          <Text fontSize="1.5rem" fontWeight="500">
            Full Name
          </Text>
          <EditIcon />
        </Flex>
        <Flex w="100%" alignItems="center" pb="0.94rem">
          <Text w="30%">
            Balance :{" "}
            <Text as="span" fontWeight="600">
              $ 20000
            </Text>
          </Text>
          <Flex w="70%" alignItems="center" gap="5px">
            Blockchain Address :
            <Link as="span" fontWeight="500" textDecor="underline">
              AF5MCNRIEQ6OV6P
            </Link>
            <Image
              src={copy}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                navigator.clipboard.writeText(AF5MCNRIEQ6OV6P);
                alert("address copied");
              }}
            />
          </Flex>
        </Flex>
        <Text>
          Total BCO2 available :{" "}
          <Text as="span" fontWeight="600">
            1000
          </Text>
        </Text>
      </Flex>
      <RewardsCard />
    </Flex>
  );
}
