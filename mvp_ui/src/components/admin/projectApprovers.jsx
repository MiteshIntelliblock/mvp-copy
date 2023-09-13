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

export default function ProjectApprovers() {
  const navigate = useNavigate();

  function viewOnClickFn() {
    navigate("details");
  }

  return (
    <Flex w="100%" direction="column" alignItems="flex-start" gap="0.62rem">
      <Text fontSize="1.5rem" fontWeight="500">
        Project Approvers
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
        </Flex>
        {/** right section */}
        <Flex alignItems="center" gap="0.62rem">
          <InputGroup w="12.1875rem" h="1.875rem">
            <InputLeftElement h="1.875rem">
              <Search />
            </InputLeftElement>
            <Input h="1.875rem" fontSize="0.875rem" placeholder="search" />
          </InputGroup>
          <Menu>
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
          <Menu>
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
                <MenuItem fontSize="0.875rem" key={index}>
                  {el.name}
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
          <Th>Sr. no.</Th>
          <Th>Full name</Th>
          <Th>Date</Th>
          <Th>Email-ID</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableContent.map((el, index) => (
          <Tr key={index}>
            <Td>
              <Flex alignItems="center" gap="0.63rem">
                <Checkbox size="sm" /> {el.srNo}
              </Flex>
            </Td>
            <Td>{el.fullName}</Td>
            <Td>{el.date}</Td>
            <Td>
              <Flex alignItems="center" gap="0.75rem">
                {el.emailId}
              </Flex>
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
  { name: "Project type" },
  { name: "Sustanability goals" },
  // { name: "Country", children: countryList },
  { name: "Registry type" },
];

const tableContent = [
  {
    srNo: 1,
    fullName: "Chaitanya Shirke",
    date: "24/08/2023",
    emailId: "Chaitanya123@gmail.com",
  },
  {
    srNo: 2,
    fullName: "Mitesh Virash",
    date: "24/08/2023",
    emailId: "MiteshV@gmail.com",
  },
  {
    srNo: 3,
    fullName: "Vaishnavi Kaware",
    date: "20/08/2023",
    emailId: "Vaishavi11@gmail.com",
  },
  {
    srNo: 4,
    fullName: "Balajee Mishra",
    date: "17/08/2023",
    emailId: "mishrabalajee@gmail.com",
  },
  {
    srNo: 5,
    fullName: "Satyam kumar",
    date: "10/08/2023",
    emailId: "skumar1999@gmail.com",
  },
];
