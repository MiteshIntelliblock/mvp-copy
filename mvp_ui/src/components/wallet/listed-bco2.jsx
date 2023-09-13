import {
  Flex,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tr,
  Td,
  Link,
} from "@chakra-ui/react";
import { useState } from "react";
import ProjectOwnerDetailsBox from "./projectOwnerDetailsBox";
import CustomTable from "../layouts/customTable";
import GreenBtn from "../layouts/greenBtn";
import { ReactComponent as BackArrow } from "../../assets/back-arrow.svg";

export default function ListedBco2() {
  return (
    <Flex w="100%" alignItems="center" direction="column">
      <Text fontSize="2rem" fontWeight="500" pb="1.25rem">
        Listed BCO2
      </Text>
      <ProjectOwnerDetailsBox />
      <Tabs w="100%" mt="1.44rem">
        <TabList>
          {["Sale", "English Auction", "Dutch Auction"].map((el, index) => (
            <Tab key={index}>{el}</Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            <SaleTab />
          </TabPanel>
          <TabPanel>
            <EngAuctionTab />
          </TabPanel>
          <TabPanel>
            <DutchAuctionTab />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

function SaleTab() {
  const [viewListedCC, setViewListedCC] = useState(
    Array(tokens[0]?.listed?.length).fill(false)
  );

  function toggleList(index) {
    setViewListedCC((prevState) => {
      const newStates = prevState.map((state, i) =>
        i === index ? !state : false
      );
      return newStates;
    });
  }

  return (
    <Flex w="100%" direction="column" alignItems="flex-start" gap="0.94rem">
      <Text fontSize="1rem" fontWeight="500">
        BCo2 on sale (3)
      </Text>
      <CustomTable
        headContent={[
          "Token ID",
          "Project name",
          "Vintage year",
          "Total BCO2",
          "Available ",
          "Sold",
          "",
        ]}
      >
        {tokens.map((tkn, index) => (
          <>
            <Tr key={index}>
              <Td>{tkn.tokenId}</Td>
              <Td>{tkn.projectName}</Td>
              <Td>{tkn.vintageYr}</Td>
              <Td>{tkn.totalBco2}</Td>
              <Td>{tkn.available}</Td>
              <Td>{tkn.sold}</Td>
              <Td>
                <GreenBtn size="xs" fontSize="0.75rem" onClick={toggleList}>
                  {viewListedCC[index] ? "view less" : "view more"}
                </GreenBtn>
              </Td>
            </Tr>
            {viewListedCC[index] && (
              <Tr>
                <Td colSpan="6">
                  <Flex
                    w="100%"
                    alignItems="center"
                    direction="column"
                    gap="5px"
                  >
                    {tkn?.listed?.map((lstd, idx) => (
                      <ListedCCDetails
                        tknId={tkn.tokenId}
                        lstd={lstd}
                        key={idx}
                      />
                    ))}
                  </Flex>
                </Td>
              </Tr>
            )}
          </>
        ))}
      </CustomTable>
    </Flex>
  );
}

function EngAuctionTab() {
  const [showDetails, setShowDetails] = useState(false);
  const [proIndex, setProIndex] = useState(null);

  return (
    <Flex w="100%" alignItems="flex-start" direction="column" gap="0.94rem">
      {showDetails ? (
        <EngAucDetails proIndex={proIndex} setShowDetails={setShowDetails} />
      ) : (
        <EngAucTable
          setShowDetails={setShowDetails}
          setProIndex={setProIndex}
        />
      )}
    </Flex>
  );
}

function EngAucTable({ setShowDetails, setProIndex }) {
  function clickHandler(index) {
    setShowDetails(true);
    setProIndex(index);
  }

  return (
    <>
      <Text fontWeight="500">BCo2 on Auction (2)</Text>
      <CustomTable
        headContent={[
          "Token ID",
          "Project name",
          "Vintage year",
          "BCO2 on bid",
          "No. of bidders",
          "",
        ]}
      >
        {aucTokens.map((tkn, index) => (
          <Tr key={index}>
            <Td>{tkn.tokenId}</Td>
            <Td>{tkn.projectName}</Td>
            <Td>{tkn.vintageYr}</Td>
            <Td>{tkn.bco2OnBid}</Td>
            <Td>{tkn.bidders.length}</Td>
            <Td>
              <GreenBtn
                fontSize="0.75rem"
                size="xs"
                onClick={() => clickHandler(index)}
              >
                view more
              </GreenBtn>
            </Td>
          </Tr>
        ))}
      </CustomTable>
    </>
  );
}

function EngAucDetails({ proIndex, setShowDetails }) {
  return (
    <Flex w="100%" alignItems="flex-start" direction="column" gap="0.94rem">
      <Flex
        as={Link}
        alignItems="center"
        gap="0.31rem"
        fontWeight="500"
        _hover={{ textDecor: "none" }}
        onClick={() => setShowDetails(false)}
      >
        <BackArrow />
        Back
      </Flex>
      <CustomTable headContent={["Sr. no", "Bidder name", "Bid price", "Date"]}>
        {aucTokens[proIndex].bidders.map((bid, index) => (
          <Tr key={index}>
            <Td>{index + 1}</Td>
            <Td>{bid.bidderName}</Td>
            <Td>{bid.bidPrice}</Td>
            <Td>{bid.date}</Td>
          </Tr>
        ))}
      </CustomTable>
    </Flex>
  );
}

function DutchAuctionTab() {
  const [showDetails, setShowDetails] = useState(false);
  const [proIndex, setProIndex] = useState(null);

  return (
    <Flex w="100%" alignItems="flex-start" direction="column" gap="0.94rem">
      {showDetails ? (
        <EngAucDetails proIndex={proIndex} setShowDetails={setShowDetails} />
      ) : (
        <EngAucTable
          setShowDetails={setShowDetails}
          setProIndex={setProIndex}
        />
      )}
    </Flex>
  );
}

function ListedCCDetails({ lstd, tknId }) {
  return (
    <>
      <Flex
        w="100%"
        p="1.25rem 0.938rem"
        bgColor="#ECECEC"
        alignItems="center"
        justifyContent="space-between"
        border="1px solid #ECECEC"
        borderRadius="6px"
      >
        <Flex w="35%" direction="column" gap="5px">
          <Text fontWeight="500">Token ID</Text>
          <Text fontSize="0.875rem">{tknId}</Text>
        </Flex>
        <Flex w="12%" direction="column" gap="5px">
          <Text fontWeight="500">BCO2 on sale</Text>
          <Text fontSize="0.875rem">$ {lstd?.bco2OnSale}/BCO2</Text>
        </Flex>
        <Flex w="15%" direction="column" gap="5px">
          <Text fontWeight="500">Sold BCO2</Text>
          <Text fontSize="0.875rem">
            {lstd?.soldBco2}
            <Text as="span" color="#8A8484">
              (Avg. $3)
            </Text>
          </Text>
        </Flex>
        <Flex w="15%" direction="column" gap="5px">
          <Text fontWeight="500">Price</Text>
          <Text fontSize="0.875rem">$ {lstd?.price}/BCO2</Text>
        </Flex>
        <Flex alignItems="center" gap="0.625rem">
          <GreenBtn size="xs" fontSize="0.75rem">
            Update price
          </GreenBtn>
          <GreenBtn size="xs" fontSize="0.75rem">
            Unlist
          </GreenBtn>
        </Flex>
      </Flex>
    </>
  );
}

const tokens = [
  {
    tokenId: "3",
    projectName: "2.415 MW Bundled Solar Power Project",
    vintageYr: "2021",
    totalBco2: "1000",
    available: "200",
    sold: "15",
    listed: [
      {
        bco2OnSale: "800",
        soldBco2: "300",
        price: "2.3",
      },
      {
        bco2OnSale: "800",
        soldBco2: "300",
        price: "2.3",
      },
    ],
  },
  {
    tokenId: "3",
    projectName: "2.415 MW Bundled Solar Power Project",
    vintageYr: "2021",
    totalBco2: "1000",
    available: "200",
    sold: "15",
    listed: [
      {
        bco2OnSale: "800",
        soldBco2: "300",
        price: "2.3",
      },
      {
        bco2OnSale: "800",
        soldBco2: "300",
        price: "2.3",
      },
    ],
  },
  {
    tokenId: "3",
    projectName: "2.415 MW Bundled Solar Power Project",
    vintageYr: "2021",
    totalBco2: "1000",
    available: "200",
    sold: "15",
    listed: [
      {
        bco2OnSale: "800",
        soldBco2: "300",
        price: "2.3",
      },
      {
        bco2OnSale: "800",
        soldBco2: "300",
        price: "2.3",
      },
    ],
  },
  {
    tokenId: "3",
    projectName: "2.415 MW Bundled Solar Power Project",
    vintageYr: "2021",
    totalBco2: "1000",
    available: "200",
    sold: "15",
    listed: [
      {
        bco2OnSale: "800",
        soldBco2: "300",
        price: "2.3",
      },
      {
        bco2OnSale: "800",
        soldBco2: "300",
        price: "2.3",
      },
    ],
  },
];

const aucTokens = [
  {
    tokenId: "3",
    projectName: "2.415 MW Bundled Solar Power Project",
    vintageYr: "2021",
    bco2OnBid: "1000",
    bidders: [
      {
        bidderName: "Mitesh Virash",
        bidPrice: "10",
        date: "23/08/2023",
      },
      {
        bidderName: "Satyaprakash Nalla",
        bidPrice: "18",
        date: "07/08/2023",
      },
      {
        bidderName: "Vaishnavi Kaware",
        bidPrice: "20",
        date: "01/08/2023",
      },
      {
        bidderName: "Satyamkumar",
        bidPrice: "21",
        date: "17/07/2023",
      },
      {
        bidderName: "Balaji Mishra",
        bidPrice: "30",
        date: "03/07/2023",
      },
    ],
  },
  {
    tokenId: "6",
    projectName: "113 MW Bundled Solar Power Project",
    vintageYr: "2020",
    bco2OnBid: "1187",
    bidders: [
      {
        bidderName: "Mitesh Virash",
        bidPrice: "10",
        date: "23/08/2023",
      },
      {
        bidderName: "Satyaprakash Nalla",
        bidPrice: "18",
        date: "07/08/2023",
      },
      {
        bidderName: "Vaishnavi Kaware",
        bidPrice: "20",
        date: "01/08/2023",
      },
      {
        bidderName: "Satyamkumar",
        bidPrice: "21",
        date: "17/07/2023",
      },
      {
        bidderName: "Balaji Mishra",
        bidPrice: "30",
        date: "03/07/2023",
      },
      {
        bidderName: "Mitesh Virash",
        bidPrice: "10",
        date: "23/08/2023",
      },
      {
        bidderName: "Satyaprakash Nalla",
        bidPrice: "18",
        date: "07/08/2023",
      },
    ],
  },
];
