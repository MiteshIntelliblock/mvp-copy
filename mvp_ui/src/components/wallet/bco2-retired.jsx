import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Td,
  Text,
  Tr,
  Modal,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import ProjectOwnerDetailsBox from "./projectOwnerDetailsBox";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Filter } from "../../assets/filter-projects.svg";
import { ReactComponent as Sort } from "../../assets/sort.svg";
import { ReactComponent as View } from "../../assets/view.svg";
import CustomTable from "../layouts/customTable";
import GreenBtn from "../layouts/greenBtn";
import CertificatePg from "./CertificatePg";

export default function Bco2Retired() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <CertificatePg />
      </Modal>
      <Flex w="100%" alignItems="center" gap="1.25rem" direction="column">
        <Text fontSize="2rem" fontWeight="500">
          RetiredBCO2
        </Text>
        <ProjectOwnerDetailsBox />
        <Flex w="100%" alignItems="flex-start" direction="column" gap="0.94rem">
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="flex-end"
            gap="0.62rem"
            pt="1.25rem"
            pb="0.69rem"
          >
            <InputGroup w="7.5rem" h="1.875rem">
              <InputLeftElement h="1.875rem">
                <Search />
              </InputLeftElement>
              <Input h="1.875rem" fontSize="0.875rem" placeholder="search" />
            </InputGroup>
            <Menu closeOnSelect={false}>
              <MenuButton
                h="1.875rem"
                px="0.625rem"
                fontSize="0.875rem"
                borderRadius="6px"
                border="1px solid #c4c4c4"
              >
                <Flex alignItems="center" gap="5px">
                  <Filter />
                  Filter
                </Flex>
              </MenuButton>
              <MenuList minW="0" w="12rem" padding="0 !important">
                <MenuItem fontSize="0.875rem">item1</MenuItem>
              </MenuList>
            </Menu>
            <Menu closeOnSelect={false}>
              <MenuButton
                h="1.875rem"
                px="0.625rem"
                fontSize="0.875rem"
                borderRadius="6px"
                border="1px solid #c4c4c4"
              >
                <Flex alignItems="center" gap="5px">
                  <Sort />
                  Sort by
                </Flex>
              </MenuButton>
              <MenuList minW="0" w="12rem" padding="0 !important">
                <MenuItem fontSize="0.875rem">item1</MenuItem>
              </MenuList>
            </Menu>
            <Menu closeOnSelect={false}>
              <MenuButton
                h="1.875rem"
                px="0.625rem"
                fontSize="0.875rem"
                borderRadius="6px"
                border="1px solid #c4c4c4"
              >
                <Flex alignItems="center" gap="5px">
                  <View />
                  view
                </Flex>
              </MenuButton>
              <MenuList minW="0" w="12rem" padding="0 !important">
                <MenuItem fontSize="0.875rem">item1</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <CustomTable
            headContent={[
              "Token ID",
              "Project name",
              "Vintage year",
              "Retired on",
              "Quantity",
              "Price",
              "",
            ]}
          >
            {retiredTokens.map((tkn, index) => (
              <Tr key={index}>
                <Td>{tkn.tokenId}</Td>
                <Td>{tkn.projectName}</Td>
                <Td>{tkn.vintageYr}</Td>
                <Td>{tkn.retiredOn}</Td>
                <Td>{tkn.qunatity}</Td>
                <Td>{tkn.price}</Td>
                <Td>
                  <GreenBtn fontSize="0.75rem" size="xs" onClick={onOpen}>
                    View Certificate
                  </GreenBtn>
                </Td>
              </Tr>
            ))}
          </CustomTable>
        </Flex>
      </Flex>
    </>
  );
}

const retiredTokens = [
  {
    tokenId: "3",
    projectName: "2.415 MW Bundled Solar Power Project",
    vintageYr: "2021",
    retiredOn: "07/08/23",
    qunatity: "12",
    price: "2.18",
  },
  {
    tokenId: "6",
    projectName: "113 MW Bundled Solar Power Project",
    vintageYr: "2020",
    retiredOn: "13/01/20",
    qunatity: "24",
    price: "3.88",
  },
  {
    tokenId: "10",
    projectName: "7 Hi-tech Amritsar Solar Power Project",
    vintageYr: "2020",
    retiredOn: "29/12/20",
    qunatity: "7",
    price: "5",
  },
];
