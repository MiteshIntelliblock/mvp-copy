import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import ProjectOwnerDetailsBox from "./projectOwnerDetailsBox";
import CustomTable from "../layouts/customTable";
import GreenBtn from "../layouts/greenBtn";

export default function MyBiddings() {
  return (
    <Flex w="100%" alignItems="center" direction="column" gap="1.25rem">
      <Text fontSize="2rem" fontWeight="500">
        My Biddings
      </Text>
      <ProjectOwnerDetailsBox />
      <CustomTable
        headContent={[
          "Project name",
          "Expiry date",
          "Auction type",
          "Credits",
          "Bid price",
          "",
        ]}
      >
        {myBiddings.map((bid, index) => (
          <Tr key={index}>
            <Td>{bid.projectName}</Td>
            <Td>{bid.expiryDate}</Td>
            <Td>{bid.aucType}</Td>
            <Td>{bid.credits}</Td>
            <Td>$ {bid.bidPrice}</Td>
            <Td>
              <GreenBtn fontSize="0.875rem" size="xs">
                view
              </GreenBtn>
            </Td>
          </Tr>
        ))}
      </CustomTable>
    </Flex>
  );
}

const myBiddings = [
  {
    projectName: "2.415 MW Bundled Solar Power Project",
    expiryDate: "07/09/2023",
    aucType: "English auction",
    credits: "18",
    bidPrice: "100",
  },
  {
    projectName: "250 kW Ground Mounted Solar Power Project",
    expiryDate: "13/09/2023",
    aucType: "English auction",
    credits: "07",
    bidPrice: "50",
  },
  {
    projectName: "1.26 MW Ground Mounted Solar Power Project",
    expiryDate: "20/09/2023",
    aucType: "Dutch auction",
    credits: "14",
    bidPrice: "80",
  },
  {
    projectName: "1.21 MW Bundled Solar Power Project",
    expiryDate: "29/09/2023",
    aucType: "Dutch auction",
    credits: "05",
    bidPrice: "45",
  },
];
