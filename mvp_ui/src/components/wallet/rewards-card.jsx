import { Flex, Text, CircularProgress, Image } from "@chakra-ui/react";
import GreenBtn from "../layouts/greenBtn";
import { gift } from "../../utils/imgs";

export default function RewardsCard() {
  const rewardDets = {
    earned: 0,
    redeemed: 0,
  };

  return (
    <Flex
      border="1px solid #B3B3B3"
      padding="0.625rem"
      alignItems="center"
      borderRadius="0.625rem"
    >
      <Flex direction="column" alignItems="flex-start" mr="1.875rem">
        {" "}
        <Text fontSize="1rem" fontWeight="500" pb="0.63rem">
          My Rewards
        </Text>
        <Text
          color="darkGreen"
          fontWeight="600"
          fontSize="0.875rem"
          pb="0.31rem"
        >
          {rewardDets.earned} Points{" "}
          <Text color="#3a3a3a" as="span" fontWeight="400" fontSize="0.75rem">
            Earned
          </Text>
        </Text>
        <Text
          color="darkGreen"
          fontWeight="600"
          fontSize="0.875rem"
          pb="0.31rem"
        >
          {rewardDets.redeemed} Points{" "}
          <Text color="#3a3a3a" as="span" fontSize="0.75rem" fontWeight="400">
            Redeemed
          </Text>
        </Text>
      </Flex>
      <Flex
        pos="relative"
        w="5rem"
        h="5rem"
        alignItems="center"
        borderRadius="50%"
        mr="5px"
      >
        <CircularProgress
          pos="relative"
          size="5rem"
          value={rewardDets.redeemed}
          color="darkGreen"
          trackColor="lightGreen"
        />
        <Image pos="absolute" src={gift} />
      </Flex>
      <GreenBtn fontSize="0.75rem" size="xs">
        View
      </GreenBtn>
    </Flex>
  );
}
