import {
  Flex,
  Text,
  Menu,
  InputGroup,
  InputLeftElement,
  Input,
  MenuButton,
  MenuList,
  MenuItem,
  Table,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from "@chakra-ui/react";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Sort } from "../../assets/sort.svg";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Transactions() {
  const [title, setTitle] = useState();
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("payments")) {
      setTitle("Payments");
    } else if (location.pathname.includes("retirements")) {
      setTitle("Retirements");
    } else {
      setTitle("Trades");
    }
  }, [location.pathname]);

  return (
    <Flex w="100%" direction="column" gap="0.75rem">
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Text fontSize="1.5rem" fontWeight="500">
          {title}
        </Text>
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
        </Flex>
      </Flex>
      {title === "Trades" ? <TxTable /> : ""}
      {title === "Payments" ? <PaymentTable /> : ""}
      {title === "Retirements" ? <RetirementTable /> : ""}
    </Flex>
  );
}

const sortBy = ["a to b (alphabetical)", "low - high", "high - low"];

function TxTable() {
  const transactions = [
    {
      tokenId: "01",
      date: "12/08/2023  11:00 pm",
      txHash: "00XXBVHKLMY789QQ",
      qnty: "100",
      price: "1",
      amntBuyer: "105",
      amntSeller: "95",
      totalPfFee: "80",
    },
    {
      tokenId: "01",
      date: "12/08/2023  11:00 pm",
      txHash: "00XXBVHKLMY789QQ",
      qnty: "100",
      price: "1",
      amntBuyer: "105",
      amntSeller: "95",
      totalPfFee: "80",
    },
    {
      tokenId: "01",
      date: "12/08/2023  11:00 pm",
      txHash: "00XXBVHKLMY789QQ",
      qnty: "100",
      price: "1",
      amntBuyer: "105",
      amntSeller: "95",
      totalPfFee: "80",
    },
    {
      tokenId: "01",
      date: "12/08/2023  11:00 pm",
      txHash: "00XXBVHKLMY789QQ",
      qnty: "100",
      price: "1",
      amntBuyer: "105",
      amntSeller: "95",
      totalPfFee: "80",
    },
    {
      tokenId: "01",
      date: "12/08/2023  11:00 pm",
      txHash: "00XXBVHKLMY789QQ",
      qnty: "100",
      price: "1",
      amntBuyer: "105",
      amntSeller: "95",
      totalPfFee: "80",
    },
  ];
  return (
    <Table>
      <Thead>
        <Tr>
          {[
            "Date",
            "Transaction hash",
            "Token ID",
            "Quantity",
            "Price",
            "Amt. from buyer",
            "Amt. to seller",
            "Total Platform fee",
          ].map((el, index) => (
            <Th key={index}>{el}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {transactions.map((el, index) => (
          <Tr key={index}>
            <Td>{el.date}</Td>
            <Td>{el.txHash}</Td>
            <Td>{el.tokenId}</Td>
            <Td>{el.qnty}</Td>
            <Td>${el.price}</Td>
            <Td>${el.amntBuyer}</Td>
            <Td>${el.amntSeller}</Td>
            <Td>${el.totalPfFee}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function PaymentTable() {
  const payments = [
    {
      date: "20/07/2023  12:30 pm",
      txHash: "00XXKOLIUTFJJK0567",
      userName: "Mitesh Virash",
      feeType: "Onboarding fees",
      amount: "100",
      platformFee: "80",
      total: "180",
    },
    {
      date: "20/07/2023  12:30 pm",
      txHash: "00XXKOLIUTFJJK0567",
      userName: "Mitesh Virash",
      feeType: "Onboarding fees",
      amount: "100",
      platformFee: "80",
      total: "180",
    },
    {
      date: "20/07/2023  12:30 pm",
      txHash: "00XXKOLIUTFJJK0567",
      userName: "Mitesh Virash",
      feeType: "Onboarding fees",
      amount: "100",
      platformFee: "80",
      total: "180",
    },
  ];
  return (
    <Table>
      <Thead>
        <Tr>
          {[
            "Date",
            "Transaction hash",
            "Username",
            "Fee type",
            "Amount",
            "Platform fee",
            "Total",
          ].map((el, index) => (
            <Th key={index}>{el}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {payments.map((el, index) => (
          <Tr key={index}>
            <Td>{el.date}</Td>
            <Td>{el.txHash}</Td>
            <Td>{el.userName}</Td>
            <Td>{el.feeType}</Td>
            <Td>${el.amount}</Td>
            <Td>${el.platformFee}</Td>
            <Td>${el.total}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function RetirementTable() {
  const retires = [
    {
      date: "12/08/2023",
      txHash: "00XXKOLIUTFJJK0567",
      projectName: "2.415 MW Bundled Solar Power Project",
      qnty: "100",
      price: "1.50",
      pfFee: "5",
      amnt: "180",
    },
    {
      date: "12/08/2023",
      txHash: "00XXKOLIUTFJJK0567",
      projectName: "2.415 MW Bundled Solar Power Project",
      qnty: "100",
      price: "1.50",
      pfFee: "5",
      amnt: "180",
    },
    {
      date: "12/08/2023",
      txHash: "00XXKOLIUTFJJK0567",
      projectName: "2.415 MW Bundled Solar Power Project",
      qnty: "100",
      price: "1.50",
      pfFee: "5",
      amnt: "180",
    },
  ];
  return (
    <Table>
      <Thead>
        <Tr>
          {[
            "Date",
            "Transaction hash",
            "Project name",
            "Quantity",
            "Price",
            "Platform fee",
            "Amount",
          ].map((el, index) => (
            <Th key={index}>{el}</Th>
          ))}
        </Tr>
      </Thead>
      <Tbody>
        {retires.map((el, index) => (
          <Tr key={index}>
            <Td>{el.date}</Td>
            <Td>{el.txHash}</Td>
            <Td>{el.projectName}</Td>
            <Td>{el.qnty}</Td>
            <Td>{el.price}</Td>
            <Td>{el.pfFee}</Td>
            <Td>{el.amnt}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
