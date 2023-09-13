import { Flex, Link } from "@chakra-ui/react";
import { ReactComponent as BackArrow } from "../../../assets/back-arrow.svg";
import { useNavigate } from "react-router-dom";

export default function TokenDetails() {
  const navigate = useNavigate();
  return (
    <Flex
      w="100%"
      direction="column"
      alignItems="flex-start"
      pt="7.5rem"
      px="7rem"
    >
      <Link
        as={Flex}
        alignItems="center"
        gap="0.31rem"
        onClick={() => navigate(-1)}
        _hover={{ textDecor: "none" }}
        mb="0.63rem"
      >
        <BackArrow /> Back
      </Link>
      Token Details
    </Flex>
  );
}
