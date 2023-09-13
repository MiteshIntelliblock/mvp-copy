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
} from "@chakra-ui/react";
import ProjectOwnerDetailsBox from "./projectOwnerDetailsBox";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Filter } from "../../assets/filter-projects.svg";
import { ReactComponent as Sort } from "../../assets/sort.svg";
import { ReactComponent as View } from "../../assets/view.svg";
import CustomTable from "../layouts/customTable";
import GreenBtn from "../layouts/greenBtn";
import DarkGreenBtn from "../layouts/darkGreenBtn";

export default function MyBCO2() {
  return (
    <Flex w="100%" alignItems="center" direction="column">
      <Text fontSize="2rem" fontWeight="500" pb="1.25rem">
        My BCO2
      </Text>
      <ProjectOwnerDetailsBox />
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
          "Total BCO2",
          "Available",
          "Sold",
          "Listed",
          "",
        ]}
      >
        {tokens.map((tkn, index) => (
          <Tr key={index}>
            <Td>{tkn.tokenId}</Td>
            <Td>{tkn.projectName}</Td>
            <Td>{tkn.vintageYr}</Td>
            <Td>{tkn.totalBco}</Td>
            <Td>{tkn.available}</Td>
            <Td>{tkn.sold}</Td>
            <Td>{tkn.listed}</Td>
            <Td>
              <Flex alignItems="center" gap="0.31rem">
                <DarkGreenBtn fontSize="0.875rem" size="xs">
                  Retire
                </DarkGreenBtn>
                <GreenBtn fontSize="0.875rem" size="xs">
                  List
                </GreenBtn>
              </Flex>
            </Td>
          </Tr>
        ))}
      </CustomTable>
    </Flex>
  );
}

const tokens = [
  {
    tokenId: "3",
    projectName: "2.415 MW Bundled Solar Power Project",
    vintageYr: "2021",
    totalBco: "1000",
    available: "400",
    sold: "13",
    listed: "0",
  },
  {
    tokenId: "6",
    projectName: "113 MW Bundled Solar Power Project",
    vintageYr: "2020",
    totalBco: "1187",
    available: "200",
    sold: "5",
    listed: "0",
  },
  {
    tokenId: "10",
    projectName: "7 Hi-tech Amritsar Solar Power Project",
    vintageYr: "2020",
    totalBco: "1090",
    available: "230",
    sold: "18",
    listed: "0",
  },
];
