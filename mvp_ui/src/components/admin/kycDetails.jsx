import {
  Avatar,
  Divider,
  Flex,
  Grid,
  GridItem,
  Icon,
  Link,
  Text,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { ReactComponent as BackArrow } from "../../assets/back-arrow.svg";
import { ReactComponent as Video } from "../../assets/video.svg";
import { ReactComponent as DocImage } from "../../assets/image.svg";
import DarkFillBtn from "../layouts/darkFillBtn";
import RedBtn from "../layouts/redBtn";
import { ReactComponent as EditIcon } from "../../assets/editIcon.svg";

export default function UserDetails() {
  const navigate = useNavigate();
  const location = useLocation();

  const isCompany = location.pathname.includes("company");

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
      <Text fontSize="1.5rem" fontWeight="500" mb="0.94rem">
        {isCompany ? "Company" : "Individual"} Verification{" "}
      </Text>
      <Flex
        w="100%"
        direction="column"
        justifyContent="flex-start"
        alignItems="flex-start"
        border="1px solid #D9D9D9"
        borderRadius=" 0.375rem"
        padding="0.94rem 0.63rem"
        mb="1.25rem"
        gap="0.94rem"
      >
        {isCompany ? <CompanyPersonalDetails /> : <PersonalDetails />}
        <Divider border="1px solid #D9D9D9" />
        {isCompany ? <CompanyKycDetails /> : <KycDetails />}
      </Flex>
      <Flex gap="0.63rem">
        <DarkFillBtn fontSize="0.875rem" size="xs">
          Accept user
        </DarkFillBtn>
        <RedBtn fontSize="0.875rem" size="xs">
          Remove user
        </RedBtn>
      </Flex>
    </Flex>
  );
}

function PersonalDetails() {
  return (
    <Flex w="100%" alignItems="flex-start" direction="column" gap="0.63rem">
      <Flex alignItems="center" gap="0.63rem">
        <Text fontWeight="600">Personal Details</Text> <Icon as={EditIcon} />
      </Flex>
      {/**personal details */}
      <Flex w="100%" alignItems="flex-start" justifyContent="space-between">
        <Flex w="50%" alignItems="center" gap="1.56rem">
          <Avatar w="6.25rem" h="6.25rem" />
          <Grid templateColumns="repeat(2, 1fr)" gap="0.62rem">
            <RowWrapper label={"Full name :"} detail={userDetails.fullName} />
            <RowWrapper label={" Mobile no. :"} detail={userDetails.mobileNo} />
          </Grid>
        </Flex>
        <Grid w="50%" templateColumns="repeat(2, 1fr)" gap="0.62rem">
          <RowWrapper label={"Email-ID :"} detail={userDetails.emailId} />
          <RowWrapper label={"Country :"} detail={userDetails.country} />
        </Grid>
      </Flex>
    </Flex>
  );
}

function CompanyPersonalDetails() {
  return (
    <Flex w="100%" alignItems="flex-start" direction="column" gap="0.63rem">
      <Flex alignItems="center" gap="0.63rem">
        <Text fontWeight="600">Personal Details</Text> <Icon as={EditIcon} />
      </Flex>
      {/**personal details */}
      <Flex w="100%" alignItems="flex-start" justifyContent="space-between">
        <Flex w="48%" alignItems="center" gap="1.56rem">
          <Avatar w="6.25rem" h="6.25rem" />
          <Grid templateColumns="repeat(2, 1fr)" gap="0.62rem">
            <RowWrapper label={"Full name :"} detail={userDetails.fullName} />{" "}
            <RowWrapper label={"Email-ID :"} detail={userDetails.emailId} />
            <RowWrapper label={"Mobile no. :"} detail={userDetails.mobileNo} />
            <RowWrapper label={"Address :"} detail={userDetails.address} />
          </Grid>
        </Flex>
        <Grid w="50%" templateColumns="repeat(2,1fr)" gap="0.62rem">
          <RowWrapper
            label={"Company name :"}
            detail={userDetails.companyName}
          />
          <RowWrapper
            label={"Company size :"}
            detail={userDetails.companySize}
          />{" "}
          <RowWrapper label={"Country :"} detail={userDetails.country} />
        </Grid>
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
      <Flex w="100%" alignItems="flex-start" justifyContent="space-between">
        <Grid w="48%" templateColumns="repeat(2, 1fr)" gap="0.62rem">
          <RowWrapper label={"Status :"} detail={userDetails.kycStatus} />
          <RowWrapper label={"Aadhar number :"} detail={aadhar} />
          <RowWrapper label={"Video KYC :"} detail={videoKyc} />
        </Grid>
        <Grid w="50%" templateColumns="repeat(2, 1fr)" gap="0.62rem">
          <RowWrapper label={"PAN number :"} detail={panCard} />
          <RowWrapper label={"Address :"} detail={userDetails.address} />
        </Grid>
      </Flex>
    </Flex>
  );
}

function CompanyKycDetails() {
  const crc = (
    <Flex
      alignItems="center"
      fontSize="0.875rem"
      color="darkGreen"
      gap="0.3rem"
    >
      <DocImage />
      {userDetails.crc}
    </Flex>
  );

  const brola = (
    <Flex
      alignItems="center"
      fontSize="0.875rem"
      color="darkGreen"
      gap="0.3rem"
    >
      <DocImage />
      {userDetails.brola}
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

  const moa = (
    <Flex
      alignItems="center"
      fontSize="0.875rem"
      color="darkGreen"
      gap="0.3rem"
    >
      <DocImage />
      {userDetails.moa}
    </Flex>
  );

  const aoa = (
    <Flex
      alignItems="center"
      fontSize="0.875rem"
      color="darkGreen"
      gap="0.3rem"
    >
      <DocImage />
      {userDetails.aoa}
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
      <Flex alignItems="center" gap="0.63rem">
        <Text fontWeight="600">KYC Details</Text>
        <Icon as={EditIcon} />
      </Flex>

      {/**KYC Details */}
      <Flex w="100%" alignItems="flex-start" justifyContent="space-between">
        <Grid w="48%" templateColumns="repeat(2, 1fr)" gap="0.62rem">
          <RowWrapper label={"Status :"} detail={userDetails.kycStatus} />
          <RowWrapper
            label={
              "Certificate of Incorporation/ Company Registration Certificate :"
            }
            detail={crc}
          />
          <RowWrapper
            label={"Board Resolution or Letter of Authorization :"}
            detail={brola}
          />
          <RowWrapper label={"Video KYC :"} detail={videoKyc} />
        </Grid>
        <Grid w="50%" templateColumns="repeat(2, 1fr)" gap="0.62rem">
          <RowWrapper label={"PAN number :"} detail={panCard} />
          <RowWrapper
            label={"Memorandum of Association (MOA) :"}
            detail={moa}
          />
          <RowWrapper label={"Articles of Association (AOA) :"} detail={aoa} />
        </Grid>
      </Flex>
    </Flex>
  );
}

function RowWrapper({ label, detail }) {
  return (
    <>
      <GridItem>
        <Text fontSize="0.875rem" fontWeight="500">
          {label}
        </Text>
      </GridItem>
      <GridItem>
        <Text fontSize="0.875rem">{detail}</Text>
      </GridItem>
    </>
  );
}

const userDetails = {
  fullName: "Chaitanya Shirke",
  mobileNo: "+91 9876543211",
  blockchainAdd: "AF5MCNRIEQ6OV6P",
  companyName: "Intelliblock technologies",
  companySize: "50-100",
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
  crc: "certificate1.jpg",
  brola: "certificate3.jpg",
  moa: "certificate2.jpg",
  aoa: "certificate2.jpg",
};
