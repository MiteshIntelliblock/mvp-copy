import {
  Flex,
  Tabs,
  Text,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Tr,
  Td,
  Link,
} from "@chakra-ui/react";
import ProjectOwnerDetailsBox from "./projectOwnerDetailsBox";
import CustomTable from "../layouts/customTable";
import GreenBtn from "../layouts/greenBtn";
import { useState } from "react";
import { ReactComponent as BackArrow } from "../../assets/back-arrow.svg";

export default function ListedProjects() {
  return (
    <Flex w="100%" direction="column" alignItems="flex-start" pb="3.25rem">
      <Text
        w="100%"
        textAlign="center"
        fontSize="2rem"
        fontWeight="500"
        mb="1.25rem"
      >
        Listed projects
      </Text>
      <ProjectOwnerDetailsBox />
      <Text fontSize="1.25rem" fontWeight="500" pt="1.25rem" pb="0.62rem">
        Listed Projects
      </Text>
      <Tabs w="100%">
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
          <TabPanel><DutchAuctionTab /></TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

function SaleTab() {
  const [viewListedCC, setViewListedCC] = useState(
    Array(project?.vintageData[0]?.listedData?.length).fill(false)
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
    <Flex
      w="100%"
      padding="0.94rem"
      border="1px solid #D9D9D9"
      borderRadius="0.375rem"
      direction="column"
      alignItems="flex-start"
      gap="1.25rem"
    >
      <Flex w="100%" direction="column" alignItems="flex-start" gap="0.37rem">
        <Flex alignItems="center" gap="0.94rem">
          <Text fontSize="0.875rem" fontWeight="600">
            Project name: {project.projectName}
          </Text>
          <Text
            padding="0 0.31rem"
            bgColor={project.status === "verified" ? "#26C106" : ""}
            textTransform="capitalize"
            color="white"
            fontSize="0.875rem"
            fontWeight="500"
            borderRadius="0.125rem"
          >
            {project.status}
          </Text>
        </Flex>
        <Flex w="100%" alignItems="flex-start" justifyContent="space-between">
          <Flex w="60%" alignItems="center" justifyContent="space-between">
            <Text fontSize="0.875rem" fontWeight="600">
              Project ID: {project.projectId}
            </Text>
            <Text fontSize="0.875rem" fontWeight="600">
              Date of Registration: {project.dateOfReg}
            </Text>
            <Text fontSize="0.875rem" fontWeight="600">
              Project Registry: {project.projectRegistry}
            </Text>
          </Flex>
        </Flex>
        <CustomTable
          headContent={[
            "Vintage  year",
            "Serial number",
            "Total BCO2",
            "Available",
            "Sold ",
            "",
          ]}
        >
          {project.vintageData.map((vntg, index) => (
            <>
              <Tr key={index}>
                <Td>{vntg.vintageYr}</Td>
                <Td>{vntg.serialNum}</Td>
                <Td>{vntg.totalBco2}</Td>
                <Td>{vntg.availableBco2}</Td>
                <Td>{vntg.soldBco2}</Td>
                <Td>
                  <GreenBtn
                    onClick={() => toggleList(index)}
                    size="xs"
                    fontSize="0.75rem"
                  >
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
                      {vntg?.listedData?.map((lstd, idx) => (
                        <ListedCCDetails lstd={lstd} key={idx} />
                      ))}
                    </Flex>
                  </Td>
                </Tr>
              )}
            </>
          ))}
        </CustomTable>
      </Flex>
    </Flex>
  );
}

function EngAuctionTab() {
  const [showDetails, setShowDetails] = useState(false);
  const [proIndex, setProIndex] = useState(null);

  return (
    <Flex w="100%" alignItems="flex-start" direction="column" gap="0.94rem">
      <Text>Projects on Auction (2)</Text>
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
    <CustomTable
      headContent={[
        "Serial number",
        "Project name",
        "Vintage year",
        "BCO2 on bid",
        "No. of bidders",
        "",
      ]}
    >
      {aucProjects.map((pro, index) => (
        <Tr key={index}>
          <Td>{pro.serialNum}</Td>
          <Td>{pro.projectName}</Td>
          <Td>{pro.vintageYr}</Td>
          <Td>{pro.bco2OnBid}</Td>
          <Td>{pro.bidders.length}</Td>
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
        {aucProjects[proIndex].bidders.map((bid, index) => (
          <Tr>
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
      <Text>Projects on Auction (2)</Text>
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

function ListedCCDetails({ lstd }) {
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
          <Text fontWeight="500">Serial number</Text>
          <Text fontSize="0.875rem">{lstd?.serialNum}</Text>
        </Flex>
        <Flex w="12%" direction="column" gap="5px">
          <Text fontWeight="500">BCO2 on sale</Text>
          <Text fontSize="0.875rem">$ {lstd?.bco2}/BCO2</Text>
        </Flex>
        <Flex w="15%" direction="column" gap="5px">
          <Text fontWeight="500">Sold BCO2</Text>
          <Text fontSize="0.875rem">
            {lstd?.soldBco2}{" "}
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

const project = {
  projectName: "250 kW Ground Mounted Solar Power Project",
  status: "verified",
  projectId: "118",
  dateOfReg: "07 January 2023",
  projectRegistry: "UCR",
  vintageData: [
    {
      vintageYr: "2021",
      serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
      totalBco2: "1186",
      availableBco2: "386",
      soldBco2: "200",
      listed: "600",
      listedData: [
        {
          serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
          bco2: "1000",
          soldBco2: "200",
          price: "3",
        },
        {
          serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
          bco2: "186",
          soldBco2: "140",
          price: "5",
        },
      ],
    },
    {
      vintageYr: "2020",
      serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
      totalBco2: "1186",
      availableBco2: "386",
      soldBco2: "200",
      listed: "600",
      listedData: [
        {
          serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
          bco2: "1000",
          soldBco2: "200",
          price: "3",
        },
        {
          serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
          bco2: "186",
          soldBco2: "140",
          price: "5",
        },
      ],
    },
    {
      vintageYr: "2019",
      serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
      totalBco2: "1186",
      availableBco2: "386",
      soldBco2: "200",
      listed: "600",
      listedData: [
        {
          serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
          bco2: "1000",
          soldBco2: "200",
          price: "3",
        },
        {
          serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
          bco2: "186",
          soldBco2: "140",
          price: "5",
        },
      ],
    },
    {
      vintageYr: "2018",
      serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
      totalBco2: "1186",
      availableBco2: "386",
      soldBco2: "200",
      listed: "600",
      listedData: [
        {
          serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
          bco2: "1000",
          soldBco2: "200",
          price: "3",
        },
        {
          serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
          bco2: "186",
          soldBco2: "140",
          price: "5",
        },
      ],
    },
  ],
};

const aucProjects = [
  {
    serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
    projectName: "2.415 MW Bundled Solar Power Project",
    vintageYr: "2021",
    bco2OnBid: "1000",
    bidders: [
      { bidderName: "Mitesh Virash", bidPrice: "10", date: "23/08/2023" },
      { bidderName: "Satyaprakash Nalla", bidPrice: "18", date: "07/08/2023" },
      { bidderName: "Vaishnavi Kaware", bidPrice: "20", date: "01/08/2023" },
      { bidderName: "Satyamkumar", bidPrice: "21", date: "17/07/2023" },
      { bidderName: "Balaji Mishra", bidPrice: "30", date: "03/07/2023" },
    ],
  },
  {
    serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
    projectName: "113 MW Bundled Solar Power Project",
    vintageYr: "2020",
    bco2OnBid: "1187",
    bidders: [
      { bidderName: "Mitesh Virash", bidPrice: "10", date: "23/08/2023" },
      { bidderName: "Satyaprakash Nalla", bidPrice: "18", date: "07/08/2023" },
      { bidderName: "Vaishnavi Kaware", bidPrice: "20", date: "01/08/2023" },
      { bidderName: "Satyamkumar", bidPrice: "21", date: "17/07/2023" },
      { bidderName: "Balaji Mishra", bidPrice: "30", date: "03/07/2023" },
      { bidderName: "Satyamkumar", bidPrice: "21", date: "17/07/2023" },
      { bidderName: "Balaji Mishra", bidPrice: "30", date: "03/07/2023" },
    ],
  },
];
