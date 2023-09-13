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
  MenuItemOption,
  MenuOptionGroup,
  MenuDivider,
} from "@chakra-ui/react";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Filter } from "../../assets/filter-projects.svg";
import { ReactComponent as Sort } from "../../assets/sort.svg";
import { ReactComponent as Bin } from "../../assets/bin.svg";
import { ReactComponent as DownIcon } from "../../assets/downArrow.svg";
import GreenBtn from "../layouts/greenBtn";
import { useLocation, useNavigate } from "react-router-dom";

export default function Users() {
  const navigate = useNavigate();
  const location = useLocation();

  const isExisting = location.pathname.includes("existing");

  function viewOnClickFn() {
    navigate("details");
  }

  return (
    <Flex w="100%" direction="column" alignItems="flex-start" gap="0.62rem">
      <Text fontSize="1.5rem" fontWeight="500">
        {isExisting ? "Existing Users (5)" : "Onboarding Users (5)"}
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
            {!isExisting ? <Text fontSize="0.875rem">Total users: 5</Text> : ""}
            {!isExisting ? (
              <Text fontSize="0.875rem">Active users: 3</Text>
            ) : (
              ""
            )}
            {!isExisting ? (
              <Text fontSize="0.875rem">Removed users: 2</Text>
            ) : (
              ""
            )}
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
              <MenuOptionGroup defaultValue="date" type="radio">
                <MenuItemOption value="name" fontSize="0.875rem">
                  Name
                </MenuItemOption>
                <MenuItemOption value="date" fontSize="0.875rem">
                  Date
                </MenuItemOption>
              </MenuOptionGroup>
              <MenuDivider />
              <MenuOptionGroup defaultValue="desc" type="radio">
                <MenuItemOption value="asc" fontSize="0.875rem">
                  Ascending
                </MenuItemOption>
                <MenuItemOption value="desc" fontSize="0.875rem">
                  Descending
                </MenuItemOption>
              </MenuOptionGroup>
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
              <MenuItem>
                <Checkbox size="sm">
                  <Text fontSize="0.875rem">All</Text>
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox size="sm">
                  <Text fontSize="0.875rem">KYC</Text>
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox size="sm">
                  <Text fontSize="0.875rem">Bank details</Text>
                </Checkbox>
              </MenuItem>
              <MenuItem>
                <Checkbox size="sm">
                  <Text fontSize="0.875rem">Fees</Text>
                </Checkbox>
              </MenuItem>
            </MenuList>
          </Menu>
        </Flex>
      </Flex>
      {/**table */}
      {isExisting ? (
        <UsersExistingTable onClick={viewOnClickFn} />
      ) : (
        <UsersOnboardingTable onClick={viewOnClickFn} />
      )}
    </Flex>
  );
}

function UsersOnboardingTable({ onClick }) {
  return (
    <Table border="1px solid #D9D9D9">
      <Thead>
        {" "}
        <Tr>
          <Th>Sr. no.</Th>
          <Th>Full name</Th>
          <Th>Date</Th>
          <Th>Role</Th>
          <Th>Status</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableContent.map((el, index) => (
          <Tr key={index}>
            <Td>
              <Checkbox size="sm">{el.srNo}</Checkbox>
            </Td>
            <Td>{el.fullName}</Td>
            <Td>{el.date}</Td>
            <Td>
              <Flex alignItems="center" gap="0.75rem">
                {el.role.map((r, index) => (
                  <Text
                    key={index}
                    px="0.44rem"
                    py="0.11rem"
                    textAlign="center"
                    textTransform="capitalize"
                    fontWeight="600"
                    border="1px solid"
                    borderRadius="50%"
                    borderColor={
                      (r === "user" && "#F90") ||
                      (r === "trader" && "#008D8D") ||
                      (r === "project-owner" && "#2E7800")
                    }
                    color={
                      (r === "user" && "#F90") ||
                      (r === "trader" && "#008D8D") ||
                      (r === "project-owner" && "#2E7800")
                    }
                  >
                    {r.charAt(0)}
                  </Text>
                ))}
              </Flex>
            </Td>
            <Td>
              <Flex alignItems="center" gap="0.31rem">
                {el.status.map((r, index) => (
                  <Text
                    key={index}
                    px="0.31rem"
                    textAlign="center"
                    textTransform="capitalize"
                    border="1px solid transparent"
                    borderRadius="0.125rem"
                    color="white"
                    fontSize="0.75rem"
                    fontWeight="500"
                    bgColor={r === "registered" ? "#26C106" : "#F35037"}
                  >
                    {r}
                  </Text>
                ))}
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

function UsersExistingTable({ onClick }) {
  return (
    <Table border="1px solid #D9D9D9">
      <Thead>
        {" "}
        <Tr>
          <Th>Sr. no.</Th>
          <Th>Full name</Th>
          <Th>Date</Th>
          <Th>Role</Th>
          <Th>Total credits</Th>
          <Th>Total Projects</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {tableContent.map((el, index) => (
          <Tr key={index}>
            <Td>
              <Checkbox size="sm">{el.srNo}</Checkbox>
            </Td>
            <Td>{el.fullName}</Td>
            <Td>{el.date}</Td>
            <Td>
              <Flex alignItems="center" gap="0.75rem">
                {el.role.map((r, index) => (
                  <Text
                    key={index}
                    px="0.44rem"
                    py="0.11rem"
                    textAlign="center"
                    textTransform="capitalize"
                    fontWeight="600"
                    border="1px solid"
                    borderRadius="50%"
                    borderColor={
                      (r === "user" && "#F90") ||
                      (r === "trader" && "#008D8D") ||
                      (r === "project-owner" && "#2E7800")
                    }
                    color={
                      (r === "user" && "#F90") ||
                      (r === "trader" && "#008D8D") ||
                      (r === "project-owner" && "#2E7800")
                    }
                  >
                    {r.charAt(0)}
                  </Text>
                ))}
              </Flex>
            </Td>
            <Td>{el.totalCreds}</Td>
            <Td>{el.totalProjects}</Td>
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

const tableContent = [
  {
    srNo: 1,
    fullName: "Chaitanya Shirke",
    date: "24/08/2023",
    role: ["user", "trader", "project-owner"],
    status: ["Bank details"],
    totalCreds: "200",
    totalProjects: "07",
  },
  {
    srNo: 2,
    fullName: "Mitesh Virash",
    date: "24/08/2023",
    role: ["user"],
    status: ["Kyc", "bank", "fees"],
    totalCreds: "120",
    totalProjects: "12",
  },
  {
    srNo: 3,
    fullName: "Vaishnavi Kaware",
    date: "20/08/2023",
    role: ["user"],
    status: ["Kyc", "bank", "fees"],
    totalCreds: "103",
    totalProjects: "03",
  },
  {
    srNo: 4,
    fullName: "Balajee Mishra",
    date: "17/08/2023",
    role: ["user", "trader", "project-owner"],
    status: ["Fees"],
    totalCreds: "240",
    totalProjects: "14",
  },
  {
    srNo: 5,
    fullName: "Satyam kumar",
    date: "10/08/2023",
    role: ["user", "trader"],
    status: ["KYC", "Bank details"],
    totalCreds: "159",
    totalProjects: "25",
  },
];
