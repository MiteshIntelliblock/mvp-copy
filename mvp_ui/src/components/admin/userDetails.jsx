import {
  Avatar,
  Divider,
  Flex,
  Link,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Table,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/back-arrow.svg";
import { ReactComponent as Video } from "../../assets/video.svg";
import { ReactComponent as DocImage } from "../../assets/image.svg";
import { useEffect, useState } from "react";
import GreenBtn from "../layouts/greenBtn";

function RowWrapper({ label, detail }) {
  return (
    <Flex w="100%" alignItems="flex-start">
      <Text w="50%" fontSize="0.875rem" fontWeight="500">
        {label} :
      </Text>
      <Text w="50%" fontSize="0.875rem">
        {detail}
      </Text>
    </Flex>
  );
}

export default function UserDetails() {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");

  useEffect(() => {
    if (location.pathname.includes("approvers")) {
      setTitle("Project Approvers");
    } else if (location.pathname.includes("existing")) {
      setTitle("Existing User detail");
    } else if (location.pathname.includes("onboarding")) {
      setTitle("Onboarding User detail");
    } else {
      setTitle("User Detail");
    }
  }, [location.pathname]);

  return (
    <Flex w="100%" alignItems="flex-start" direction="column" mb="3.75rem">
      <Link
        as={Flex}
        alignItems="center"
        gap="0.31rem"
        onClick={() => navigate(-1)}
        _hover={{ textDecor: "none" }}
        mb="0.63rem"
      >
        <BackArrow /> Back
      </Link>
      <Text fontSize="1.5rem" fontWeight="500" pb="0.94rem">
        {title}
      </Text>
      <Flex
        w="100%"
        direction="column"
        border="1px solid #D9D9D9"
        borderRadius=" 0.375rem"
        padding="0.94rem 0.63rem"
        mb="1.25rem"
        gap="0.94rem"
      >
        <PersonalDetails />
        <Divider border="1px solid #D9D9D9" />
        <KycDetails />
        <Divider border="1px solid #D9D9D9" />
        <BankDetails />
        {title.toLowerCase().includes("existing") && (
          <>
            <Divider border="1px solid #D9D9D9" />
            <TotalProjects />
          </>
        )}
      </Flex>
    </Flex>
  );
}

function PersonalDetails() {
  return (
    <Flex w="100%" alignItems="flex-start" direction="column" gap="0.63rem">
      <Text fontWeight="600">Personal Details</Text>
      {/**personal details */}
      <Flex w="100%" justifyContent="space-between" gap="1.62rem">
        <Flex w="100%" gap="1.56rem">
          <Avatar w="6.25rem" h="6.25rem" />
          <Flex
            w="100%"
            direction="column"
            gap="0.63rem"
            alignItems="flex-start"
          >
            <RowWrapper label={"Full name"} detail={userDetails.fullName} />
            <RowWrapper label={"Mobile no."} detail={userDetails.mobileNo} />
            <RowWrapper
              label={"Blockchain adress"}
              detail={userDetails.blockchainAdd}
            />
            <RowWrapper
              label={"Total no. of projects"}
              detail={userDetails.totalProjects}
            />{" "}
            <RowWrapper label={"Address"} detail={userDetails.address} />
          </Flex>
        </Flex>
        <Flex w="100%" direction="column" gap="0.63rem">
          <RowWrapper label={"Email-ID"} detail={userDetails.emailId} />
          <RowWrapper label={"Country"} detail={userDetails.country} />
          <RowWrapper label={"Balance"} detail={userDetails.balance} />
          <RowWrapper
            label={"Total no. of credits"}
            detail={userDetails.totalCreds}
          />
        </Flex>
      </Flex>
    </Flex>
  );
}

function KycDetails() {
  const aadhar = (
    <Flex alignItems="center" gap="0.63rem">
      {userDetails.aadharNo}
      <Flex
        alignItems="center"
        fontSize="0.875rem"
        color="darkGreen"
        gap="0.3rem"
      >
        <DocImage />
        {userDetails.aadharImg}
      </Flex>
    </Flex>
  );

  const panCard = (
    <Flex alignItems="center" gap="0.63rem">
      {userDetails.panNo}
      <Flex
        alignItems="center"
        fontSize="0.875rem"
        color="darkGreen"
        gap="0.3rem"
      >
        <DocImage />
        {userDetails.panImg}
      </Flex>
    </Flex>
  );

  const addProof = (
    <Flex
      alignItems="center"
      fontSize="0.875rem"
      color="darkGreen"
      gap="0.3rem"
    >
      <DocImage />
      {userDetails.panImg}
    </Flex>
  );

  const videoKyc = (
    <Flex
      alignItems="center"
      fontSize="0.875rem"
      color="darkGreen"
      gap="0.3rem"
    >
      <Video />
      {userDetails.videoKyc}
    </Flex>
  );

  return (
    <Flex w="100%" alignItems="flex-start" direction="column" gap="0.63rem">
      <Text fontWeight="600">KYC Details</Text>
      {/**KYC Details */}
      <Flex
        w="100%"
        alignItems="flex-start"
        gap="1.62rem"
        justifyContent="space-between"
      >
        <Flex w="100%" direction="column" alignItems="flex-start" gap="0.63rem">
          <RowWrapper label={"Status"} detail={userDetails.kycStatus} />
          <RowWrapper label={"Aadhar number"} detail={aadhar} />
          <RowWrapper label={"Video KYC"} detail={videoKyc} />
        </Flex>
        <Flex w="100%" direction="column" alignItems="flex-start" gap="0.63rem">
          <RowWrapper label={"PAN number"} detail={panCard} />
          <RowWrapper label={"Address Proof"} detail={addProof} />
        </Flex>
      </Flex>
    </Flex>
  );
}

function BankDetails() {
  const cancelCheque = (
    <Flex
      alignItems="center"
      fontSize="0.875rem"
      color="darkGreen"
      gap="0.3rem"
    >
      <DocImage />
      {userDetails.cancelCheque}
    </Flex>
  );
  return (
    <Flex w="100%" alignItems="flex-start" direction="column" gap="0.63rem">
      <Text fontWeight="600">Bank Details</Text>
      {/**Bank Details */}
      <Flex w="100%" justifyContent="space-between" gap="1.62rem">
        <Flex w="100%" direction="column" gap="0.63rem">
          <RowWrapper label={"Account name"} detail={userDetails.bankAccName} />
          <RowWrapper label={"Bank name"} detail={userDetails.bankName} />
          <RowWrapper label={"Swift code"} detail={userDetails.swiftCode} />
          <RowWrapper label={"City"} detail={userDetails.city} />
          <RowWrapper label={"Cancel cheque"} detail={cancelCheque} />
        </Flex>
        <Flex w="100%" direction="column" gap="0.63rem">
          <RowWrapper label={"Account number"} detail={userDetails.accNo} />
          <RowWrapper label={"IFSC code"} detail={userDetails.ifscCode} />
          <RowWrapper label={"Branch name"} detail={userDetails.branchName} />
          <RowWrapper label={"Country"} detail={userDetails.bankCountry} />
        </Flex>
      </Flex>
    </Flex>
  );
}

function TotalProjects() {
  return (
    <Flex
      alignItems="flex-start"
      fontSize="0.875rem"
      direction="column"
      gap="1.12rem"
    >
      <Text fontWeight="600">Total Projects</Text>
      <Tabs w="100%">
        <TabList>
          <Tab>Current holdings</Tab>
          <Tab>Payment history</Tab>
          <Tab>Activity</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <CurrentHolding />
          </TabPanel>
          <TabPanel>
            <PaymentHistory />
          </TabPanel>
          <TabPanel>
            <Activity />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  );
}

function CurrentHolding() {
  const currentHoldingDetails = [
    {
      projectId: "057",
      projectName: "2.415 MW Bundled Solar Power Project",
      serialNu: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
      vintageYr: "2021",
      country: "India",
      totalCreds: "100",
    },
    {
      projectId: "118",
      projectName: "1.34 Amritsar  Solar Power Project",
      serialNu: "0001-015080-016265-UCR-CoU-IN-118-01012020-31122020",
      vintageYr: "2020",
      country: "India",
      totalCreds: "210",
    },
    {
      projectId: "107",
      projectName: "250 kW Ground Mounted Solar Power Project",
      serialNu: "0001-015080-016265-UCR-CoU-IN-107-01012019-31122019",
      vintageYr: "2019",
      country: "India",
      totalCreds: "189",
    },
  ];

  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Project ID</Th>
          <Th>Project name</Th>
          <Th>Serial no.</Th>
          <Th>Vintage year</Th>
          <Th>Country</Th>
          <Th>Total credits</Th>
          <Th></Th>
        </Tr>
      </Thead>
      <Tbody>
        {currentHoldingDetails.map((el, index) => (
          <Tr>
            <Td>{el.projectId}</Td>
            <Td>{el.projectName}</Td>
            <Td>{el.serialNu}</Td>
            <Td>{el.vintageYr}</Td>
            <Td>{el.country}</Td>
            <Td>{el.totalCreds}</Td>
            <Td>
              <GreenBtn>view</GreenBtn>
            </Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function PaymentHistory() {
  const paymentHistoryDetails = [
    {
      date: "13/07/2023",
      action: "Buy",
      amount: "100",
      plateformFee: "25",
      tax: "7",
      totalAmount: "132",
    },
    {
      date: "07/07/2023",
      action: "Retire",
      amount: "800",
      plateformFee: "25",
      tax: "50",
      totalAmount: "875",
    },
    {
      date: "22/06/2023",
      action: "Deposit",
      amount: "200",
      plateformFee: "25",
      tax: "18",
      totalAmount: "243",
    },
  ];
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Date</Th>
          <Th>Action</Th>
          <Th>Amount</Th>
          <Th>Platform fee</Th>
          <Th>Tax</Th>
          <Th>Total amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {paymentHistoryDetails.map((el, index) => (
          <Tr key={index}>
            <Td>{el.date}</Td>
            <Td>{el.action}</Td>
            <Td>${el.amount}</Td>
            <Td>${el.plateformFee}</Td>
            <Td>${el.tax}</Td>
            <Td>${el.totalAmount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function Activity() {
  const activityDetails = [
    {
      projectId: "057",
      projectName: "2.415 MW Bundled Solar Power Project",
      date: "13/05/2023",
      quantity: "100",
      price: "1.02",
      action: "Buy",
      totalAmount: "102",
    },
    {
      projectId: "118",
      projectName: "1.34 Amritsar  Solar Power Project",
      date: "07/06/2020",
      quantity: "220",
      price: "2.2",
      action: "Sell",
      totalAmount: "200",
    },
    {
      projectId: "107",
      projectName: "250 kW Ground Mounted Solar Power Project",
      date: "24/07/2019",
      quantity: "109",
      price: "0.87",
      action: "Retire",
      totalAmount: "93",
    },
  ];
  return (
    <Table>
      <Thead>
        <Tr>
          <Th>Project ID</Th>
          <Th>Project name</Th>
          <Th>Date</Th>
          <Th>Quantity</Th>
          <Th>Price</Th>
          <Th>Action</Th>
          <Th>Total amount</Th>
        </Tr>
      </Thead>
      <Tbody>
        {activityDetails.map((el, index) => (
          <Tr key={index}>
            <Td>{el.projectId}</Td>
            <Td>{el.projectName}</Td>
            <Td>{el.date}</Td>
            <Td>{el.quantity}</Td>
            <Td>${el.price}</Td>
            <Td>{el.action}</Td>
            <Td>${el.totalAmount}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

const userDetails = {
  fullName: "Chaitanya Shirke",
  mobileNo: "+91 9876543211",
  blockchainAdd: "AF5MCNRIEQ6OV6P",
  totalProjects: 13,
  emailId: "Chaitanya123@gmail.com",
  country: "India",
  balance: 20000,
  totalCreds: 7,
  kycStatus: "completed",
  aadharNo: "2911 0807 1998",
  aadharImg: "aadharcard.jpg",
  panNo: "CSS2911Vsfl",
  panImg: "panimage.jpg",
  address:
    "The Summit Business Bay,near Western Express highway metro station, Andheri- 400001",
  videoKyc: "videokyc.mp4",
  bankAccName: "Chaitanya Shirke",
  bankName: "State Bank of India",
  swiftCode: "*******",
  city: "Mumbai",
  cancelCheque: "cancelcheque.jpg",
  accNo: "130119992911",
  ifscCode: "*******",
  branchName: "Fort",
  bankCountry: "India",
};
