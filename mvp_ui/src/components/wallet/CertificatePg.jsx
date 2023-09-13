import {
  ModalContent,
  Flex,
  Image,
  Text,
  Divider,
  Link,
} from "@chakra-ui/react";
import { logo, cerfBg, shield, bco2Burnt, ucr } from "../../utils/imgs";
import { ReactComponent as Redirect } from "../../assets/redirect.svg";

export default function () {
  return (
    <ModalContent>
      <Flex
        id="modal-content"
        p="3.125rem"
        w="55.25rem"
        bgImg={cerfBg}
        bgPos="center"
        pos="relative"
        bgSize="cover"
        direction="column"
      >
        <Image src={logo} pos="absolute" top="3.125rem" left="3.125rem" />
        {/* bco2 burnt section */}
        <Flex
          pos="absolute"
          top="3.125rem"
          right="3.125rem"
          alignItems="center"
        >
          <Image src={shield} h="12.313rem" />
          <Image
            src={bco2Burnt}
            h="4rem"
            top="-10%"
            left="50%"
            transform="translateX(-50%)"
            pos="absolute"
          />
          <Flex
            pos="absolute"
            alignItems="center"
            justifyContent="center"
            direction="column"
            top="25%"
            left="50%"
            transform="translateX(-50%)"
          >
            <Text
              fontFamily="rubik"
              mt="-10px"
              fontWeight="400"
              fontSize="2.5rem"
            >
              {dummyJson.bco2Amount}
            </Text>
            <Text textAlign="center" fontSize="0.625rem" fontWeight="700">
              TONNES OF <br /> BCO2 EMISSIONS{" "}
            </Text>
          </Flex>
        </Flex>
        <Text
          mt="3.125rem"
          fontSize="3.25rem"
          fontWeight="700"
          fontFamily="syne"
          textTransform="uppercase"
          letterSpacing="1.8px"
        >
          Certificate
        </Text>
        <Text
          fontFamily="syne"
          fontSize="1.875rem"
          mt="-10px"
          fontWeight="700"
          textTransform="uppercase"
        >
          of Carbon Retirement
        </Text>
        <Text fontSize="1.125rem" letterSpacing="2.7px">
          Issued on <Text as="span">{dummyJson.issuedDate}</Text>
        </Text>{" "}
        <Text
          fontSize="0.875rem"
          letterSpacing="2.4px"
          fontWeight="700"
          pt="0.938rem"
        >
          BENEFICIARY
        </Text>
        <Text
          fontSize="1.875rem"
          mt="-10px"
          fontWeight="600"
          letterSpacing="4.8px"
        >
          {dummyJson.beneficiaryAdd}
        </Text>{" "}
        <Flex
          w="100%"
          justify="space-between"
          alignItems="flex-start"
          pt="0.938rem"
        >
          <Flex w="40%" direction="column">
            <Text fontSize="0.875rem" fontWeight="700" letterSpacing="2.4px">
              Credits Issued by
            </Text>
            {/*<Image src={registryLogo} h="3.125rem" w="fit-content" />*/}
            <Image src={ucr} h="1.875rem" mt="5px" w="fit-content" />
          </Flex>
          <Flex w="60%" direction="column">
            <Text fontSize="0.875rem" fontWeight="700" letterSpacing="2.4px">
              Serial number
            </Text>
            <Text fontSize="1rem" letterSpacing="2.7px">
              {dummyJson.serialNumber}
            </Text>
          </Flex>
        </Flex>
        <Text
          pt="0.938rem"
          fontSize="0.875rem"
          fontWeight="700"
          letterSpacing="2.4px"
        >
          Retirement message
        </Text>
        <Text fontSize="1rem" pb="0.938rem">
          BNZ Now is pleased to announce that they have retired{" "}
          {dummyJson.bco2Amount} of BCO2 on {dummyJson.issuedOn}
        </Text>{" "}
        <Divider w="80%" mb="0.938rem" borderColor="#263238" />
        <Flex w="100%" alignItems="center" gap="1.25rem">
          <Flex w="100%" direction="column">
            <Text fontSize="0.875rem" fontWeight="700" letterSpacing="2.4px">
              Beneficiary
            </Text>
            <Flex align="center" gap="5px">
              <Text fontSize="1rem" letterSpacing="2.7px">
                {dummyJson.beneficiaryAdd}
              </Text>
              <Link
                href={`https://mumbai.polygonscan.com/address/${dummyJson.beneficiaryAdd}`}
                isExternal
              >
                <Redirect />
              </Link>
            </Flex>
          </Flex>
          <Flex w="100%" direction="column">
            <Text fontSize="0.875rem" fontWeight="700" letterSpacing="2.4px">
              retirement transaction
            </Text>
            <Flex align="center" gap="5px">
              <Text fontSize="1rem" letterSpacing="2.7px">
                {dummyJson.retirementTx}
              </Text>
              <Link
                href={`https://mumbai.polygonscan.com/address/${dummyJson.retirementTx}`}
                isExternal
              >
                <Redirect />
              </Link>
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </ModalContent>
  );
}

const dummyJson = {
  issuedDate: "15-JAN-2023",
  referenceId: "BNZ/2023/01",
  bco2Amount: 1000,
  registry: "ucr",
  serialNumber: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
  retirementTx: "0xbnhgajhdgjddjhsjnbnnko3494jkl",
  beneficiaryAdd: "0xhdgjd34mhj2mnnko3494jkl",
};
