import {
  Flex,
  Text,
  InputGroup,
  InputLeftElement,
  Input,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  Checkbox,
  Icon,
} from "@chakra-ui/react";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Filter } from "../../assets/filter-projects.svg";
import { ReactComponent as Sort } from "../../assets/sort.svg";
import { ReactComponent as Bin } from "../../assets/bin.svg";
import { ReactComponent as DownIcon } from "../../assets/downArrow.svg";
import GreenBtn from "../layouts/greenBtn";
import { useNavigate } from "react-router-dom";

export default function Projects() {
  const navigate = useNavigate();

  function viewOnClickFn() {
    navigate("details");
  }

  return (
    <Flex w="100%" direction="column" alignItems="flex-start" gap="0.62rem">
      <Text fontSize="1.5rem" fontWeight="500">
        Projects
      </Text>
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        {/** left section */}
        <Flex alignItems="center" gap="1.25rem">
          <Flex alignItems="inherit" gap="0.37rem">
            <Flex alignItems="inherit" gap="0.12rem">
              <Checkbox size="sm" />
              <Icon w="5px" h="3px" as={DownIcon} color="#D9D9D9" />
            </Flex>
            <Bin />
          </Flex>
          <Flex alignItems="center" gap="1.56rem">
            <Text fontSize="0.875rem">All Projects : 5</Text>
            <Text fontSize="0.875rem">Active Projects : 3</Text>
            <Text fontSize="0.875rem">Listed Projects : 2</Text>
            <Text fontSize="0.875rem">Withdrawn Projects : 2</Text>
          </Flex>
        </Flex>
        {/** right section */}
        <Flex alignItems="center" gap="0.62rem">
          <InputGroup w="12.1875rem" h="1.875rem">
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
                <Sort />
                Sort by
              </Flex>
            </MenuButton>
            <MenuList minW="0" w="12rem" padding="0 !important">
              {sortBy.map((el, index) => (
                <MenuItem fontSize="0.875rem" key={index}>
                  {el}
                </MenuItem>
              ))}
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
                <Filter />
                Filter
              </Flex>
            </MenuButton>
            <MenuList minW="0" w="12rem" padding="0 !important">
              {filterBy.map((el, index) => (
                <MenuItem key={index}>
                  <Checkbox>
                    <Text fontSize="0.875rem">{el.name}</Text>
                  </Checkbox>
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {/**table */}
      <UsersTable onClick={viewOnClickFn} />
    </Flex>
  );
}

function UsersTable({ onClick }) {
  return (
    <Table border="1px solid #D9D9D9">
      <Thead>
        {" "}
        <Tr>
          <Th>Project name</Th>
          <Th>Project ID</Th>
          <Th>Serial no.</Th>
          <Th>Date</Th>
          <Th>Country</Th>
          <Th>Status</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableContent.map((el, index) => (
          <Tr key={index}>
            <Td>
              <Checkbox size="sm"> {el.projectName} </Checkbox>
            </Td>
            <Td>{el.projectId}</Td>
            <Td>{el.serialNum}</Td>
            <Td>{el.date}</Td>
            <Td>{el.country}</Td>
            <Td>
              {" "}
              <Text
                p="0 0.31rem"
                borderRadius="0.125rem"
                border="1px solid"
                borderColor={el.status === "Approved" ? "#26C106" : "#FF8616"}
                bgColor={el.status === "Approved" ? "#26C106" : "#FF8616"}
                color="white"
              >
                {el.status}
              </Text>
            </Td>
            <Td>
              <GreenBtn size="xs" fontSize="0.875rem" onClick={onClick}>
                view detail
              </GreenBtn>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

const sortBy = ["a to b (alphabetical)", "low - high", "high - low"];
const filterBy = [
  { name: "All Projects" },
  { name: "Active Projects" },
  { name: "Listed Projects" },
  { name: "Withdrawn Projects" },
];

const tableContent = [
  {
    projectName: "2.415 MW Bundled Solar Power Project",
    projectId: "057",
    serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
    date: "24/08/2023",
    country: "India",
    status: "Approved",
  },
  {
    projectName: "250 kW Ground Mounted Solar Power Project",
    projectId: "058",
    serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
    date: "24/08/2023",
    country: "India",
    status: "Withdrawn",
  },
];
