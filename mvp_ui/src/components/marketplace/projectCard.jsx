import { Flex, GridItem, Text, Image } from "@chakra-ui/react";
import { ReactComponent as Location } from "../../assets/location.svg";
import { ReactComponent as SDGIcon } from "../../assets/sdgIcon.svg";
import { bco2Icon } from "../../utils/imgs";
import { useNavigate } from "react-router-dom";

export default function ProjectCard({ details }) {
  const { img, title, location, availableBco2, price, sdg } = details;
  const navigate = useNavigate();

  const isProject = false;

  const clickHandler = () => {
    isProject ? navigate("project-details") : navigate("token-details");
  };

  return (
    <GridItem w="100%" h="100%">
      <Flex
        w="100%"
        maxW="16.75rem"
        h="20rem"
        pos="relative"
        alignItems="flex-start"
        direction="column"
        bgPos="center"
        bgRepeat="no-repeat"
        bgSize="cover"
        color="white"
        bgImage={img ? img : ""}
        borderRadius="0.375rem"
        border="1px solid transparent"
        onClick={clickHandler}
      >
        {/**grey layer */}
        <Flex
          w="100%"
          maxW="16.75rem"
          h="20rem"
          pos="absolute"
          top="0"
          left="0"
          bgColor="rgba(58, 58, 58, 0.51)"
          border="1px solid transparent"
          direction="column"
          alignItems="flex-start"
          justifyContent="space-between"
          padding="0.63rem"
          borderRadius="0.375rem"
        >
          <Image
            pos="absolute"
            src={bco2Icon}
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
          />
          <Flex w="100%" direction="column" alignItems="flex-start">
            <Text fontWeight="500" mb="0.44rem">
              {title ? title : "2.415 MW Bundled Solar Power Project"}
            </Text>
            <Flex
              w="100%"
              alignItems="flex-start"
              justifyContent="space-between"
            >
              <Flex alignItems="flex-start" gap="0.62rem">
                <Flex mt="0.35rem">
                  <Location />
                </Flex>
                <Text w="85%" fontSize="0.875rem">
                  {location ? location : "Maharashtra and Tamil Nadu, India"}
                </Text>
              </Flex>
              <Flex
                w="2.875rem"
                h="1.625rem"
                padding="0.19rem 0.25rem"
                borderRadius="1.5625rem"
                bgColor="rgba(255, 255, 255, 0.26)"
                border="1px solid transparent"
                gap="0.31rem"
                alignItems="center"
                justifyContent="space-between"
              >
                <SDGIcon />
                <Text fontSize="0.875rem" fontWeight="500">
                  {sdg ? sdg : 4}
                </Text>
              </Flex>
            </Flex>
          </Flex>
          <Flex w="100%" alignItems="center" justifyContent="space-between">
            <Flex direction="column" alignItems="flex-start" gap="0.19rem">
              <Text fontSize="0.875rem" fontWeight="500">
                Available BCO2
              </Text>
              <Text fontWeight="700">
                {availableBco2 ? availableBco2 : "1000"}
              </Text>
            </Flex>
            <Text
              w="3.5625rem"
              h="1.5rem"
              fontWeight="500"
              bg="#FBFBFB"
              color="#FC3314"
              px="0.3rem"
              clipPath="polygon(0 0, 100% 0, 85% 50%, 100% 100%, 0 100%)"
            >
              $ {price ? price : 2}
            </Text>
          </Flex>
        </Flex>
      </Flex>
    </GridItem>
  );
}
