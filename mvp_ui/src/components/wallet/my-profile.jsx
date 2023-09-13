import { Avatar, Flex, Image, Link, Text, Divider } from "@chakra-ui/react";
import GreenBtn from "../../components/layouts/greenBtn";
import { kycTick, copy } from "../../utils/imgs";
import DarkGreenBtn from "../../components/layouts/darkGreenBtn";
import { useSelector } from "react-redux";
import { ReactComponent as DocImage } from "../../assets/image.svg";
import RewardsCard from "./rewards-card";

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

export default function MyProfile() {
  const profile = useSelector((state) => state.auth.user);
  console.log(profile);

  // user profile.userType instead of isCompany
  const isCompany = true;

  return (
    <Flex w="100%" alignItems="center" direction="column">
      <Text fontSize="2rem" fontWeight="500" pb="1.25rem">
        My Profile
      </Text>
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="flex-end"
        gap="0.625rem"
        pb="1.25rem"
      >
        <Text>Want to be list your project ?</Text>
        <GreenBtn>Add Project</GreenBtn>
      </Flex>
      {/* profile container */}
      <Flex
        w="100%"
        padding="1.25rem"
        alignItems="flex-start"
        direction="column"
        gap="1.25rem"
        mb="3.75rem"
        justifyContent="space-between"
        borderRadius="6px"
        border="1px solid #D9D9D9"
      >
        {isCompany ? <CompanyDetails /> : <UserDetails profile={profile} />}
        <Divider border="1px solid #D9D9D9" />
        {
          // profile?.userType === "individual"
          isCompany ? <CompanyKycDetails /> : <IndividualKycDetails />
        }
        <Divider border="1px solid #D9D9D9" />
        <BankDetails />
      </Flex>
    </Flex>
  );
}

function UserDetails({ profile }) {
  return (
    <Flex w="100%" alignItems="flex-start" justifyContent="space-between">
      <Flex>
        {/* Avatar section */}
        <Flex
          mr="1.25rem"
          direction="column"
          gap="0.625rem"
          alignItems="center"
        >
          <Avatar w="7.5rem" h="7.5rem" />
          <Link color="#A1A1A1" fontSize="0.75rem" textDecor="underline">
            Edit photo
          </Link>
        </Flex>
        {/* user details */}
        <Flex alignItems="flex-start" direction="column" gap="0.938rem">
          <Text fontSize="1.5rem" fontWeight="500">
            {profile?.fullName ? profile.fullName : "Full Name"}
          </Text>
          <Flex alignItems="center" gap="5px">
            Email-ID :{" "}
            <Text fontWeight="500">
              {profile?.emailId ? profile.emailId : "example@gmail.com"}
            </Text>
          </Flex>
          <Text>
            Mobile :{" "}
            <Text as="span" fontWeight="600">
              {userDetails.mobileNo}
            </Text>
          </Text>
          <Text>
            Balance :{" "}
            <Text as="span" fontWeight="600">
              0
            </Text>
          </Text>
          <Flex alignItems="center" gap="5px">
            Blockchain Address :
            <Link as="span" fontWeight="500" textDecor="underline">
              AF5MCNRIEQ6OV6P
            </Link>
            <Image
              src={copy}
              _hover={{ cursor: "pointer" }}
              onClick={() => {
                navigator.clipboard.writeText(AF5MCNRIEQ6OV6P);
                alert("address copied");
              }}
            />
          </Flex>
          <Text>
            Address :{" "}
            <Text as="span" fontWeight="600">
              {userDetails.address}
            </Text>
          </Text>
        </Flex>
      </Flex>
      {/* rewards section */}
      <Flex alignItems="flex-end" direction="column" gap="0.625rem">
        <Flex gap="4px" alignItems="center">
          <DarkGreenBtn>Add Balance</DarkGreenBtn>
          {/**statically disabling the withdraw button... Need to update it dynamically on the basis of user's ballance */}
          <GreenBtn disabled={true}>Withdraw Balance</GreenBtn>
        </Flex>
        <RewardsCard />
      </Flex>
    </Flex>
  );
}

function CompanyDetails({ profile }) {
  return (
    <Flex w="100%" alignItems="flex-start" justifyContent="space-between">
      <Flex>
        {/* Avatar section */}
        <Flex
          mr="1.25rem"
          direction="column"
          gap="0.625rem"
          alignItems="center"
        >
          <Avatar w="7.5rem" h="7.5rem" />
          <Link color="#A1A1A1" fontSize="0.75rem" textDecor="underline">
            Edit photo
          </Link>
        </Flex>
        {/* user details */}
        <Flex alignItems="flex-start" direction="column" gap="0.938rem">
          <Text fontSize="1.5rem" fontWeight="500">
            {profile?.fullName ? profile.fullName : "Full Name"}
          </Text>
          <Flex alignItems="center" gap="5px">
            Email-ID :{" "}
            <Text fontWeight="500">
              {profile?.emailId ? profile.emailId : "example@gmail.com"}
            </Text>
          </Flex>
          <Text>
            Mobile :{" "}
            <Text as="span" fontWeight="600">
              {userDetails.mobileNo}
            </Text>
          </Text>
          <Text>
            Company :{" "}
            <Text as="span" fontWeight="600">
              {userDetails.company}
            </Text>
          </Text>
          <Flex w="100%" alignItems="center">
            <Text w="40%">
              Designation :{" "}
              <Text as="span" fontWeight="600">
                {userDetails.designation}
              </Text>
            </Text>
            <Text w="60%">
              Balance :{" "}
              <Text as="span" fontWeight="600">
                {userDetails.balance}
              </Text>
            </Text>
          </Flex>
          <Flex w="100%" alignItems="center">
            <Text w="40%">
              Company size :{" "}
              <Text as="span" fontWeight="600">
                {userDetails.companySize}
              </Text>
            </Text>{" "}
            <Flex w="60%" alignItems="center" gap="5px">
              Blockchain Address :
              <Link as="span" fontWeight="500" textDecor="underline">
                AF5MCNRIEQ6OV6P
              </Link>
              <Image
                src={copy}
                _hover={{ cursor: "pointer" }}
                onClick={() => {
                  navigator.clipboard.writeText(AF5MCNRIEQ6OV6P);
                  alert("address copied");
                }}
              />
            </Flex>
          </Flex>

          <Text>
            Address :{" "}
            <Text as="span" fontWeight="600">
              {userDetails.address}
            </Text>
          </Text>
        </Flex>
      </Flex>
      {/* rewards section */}
      <Flex alignItems="flex-end" direction="column" gap="0.625rem">
        <Flex gap="4px" alignItems="center">
          <DarkGreenBtn>Add Balance</DarkGreenBtn>
          {/**statically disabling the withdraw button... Need to update it dynamically on the basis of user's ballance */}
          <GreenBtn disabled={true}>Withdraw Balance</GreenBtn>
        </Flex>
        <RewardsCard />
      </Flex>
    </Flex>
  );
}

function IndividualKycDetails() {
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

  return (
    <Flex w="100%" alignItems="flex-start" direction="column" gap="0.63rem">
      <Flex w="100%" alignItems="center" gap="0.94rem">
        <Text fontSize="1.25rem" fontWeight="600">
          KYC Details
        </Text>
        {
          // profileDets?.kycStatus
          true && (
            <Flex gap="5px" alignItems="center">
              <Image src={kycTick} />
              <Text fontSize="0.875rem" fontWeight="500" color="darkGreen">
                KYC Completed
              </Text>
            </Flex>
          )
        }
      </Flex>
      {/**KYC Details */}
      <Flex
        w="100%"
        alignItems="flex-start"
        gap="1.62rem"
        justifyContent="space-between"
      >
        <Flex w="100%" direction="column" alignItems="flex-start" gap="0.63rem">
          <RowWrapper label={"PAN number"} detail={panCard} />
          <RowWrapper label={"Address Proof"} detail={addProof} />
        </Flex>
        <Flex w="100%" direction="column" alignItems="flex-start" gap="0.63rem">
          <RowWrapper label={"Aadhar number"} detail={aadhar} />
        </Flex>
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

  return (
    <Flex w="100%" alignItems="flex-start" direction="column" gap="0.63rem">
      <Flex alignItems="center" gap="0.63rem">
        <Text fontSize="1.25rem" fontWeight="600">
          KYC Details
        </Text>{" "}
        {
          // profileDets?.kycStatus
          true && (
            <Flex gap="5px" alignItems="center">
              <Image src={kycTick} />
              <Text fontSize="0.875rem" fontWeight="500" color="darkGreen">
                KYC Completed
              </Text>
            </Flex>
          )
        }
      </Flex>
      {/**KYC Details */}
      <Flex
        w="100%"
        alignItems="flex-start"
        gap=""
        justifyContent="space-between"
      >
        <Flex
          w="100%"
          alignItems="flex-start"
          direction="column"
          justifyContent="space-between"
        >
          <RowWrapper label={"PAN number"} detail={panCard} />{" "}
          <RowWrapper label={"Memorandum of Association (MOA)"} detail={moa} />{" "}
          <RowWrapper label={"Articles of Association (AOA)"} detail={aoa} />
        </Flex>
        <Flex
          w="100%"
          alignItems="flex-start"
          direction="column"
          justifyContent="space-between"
        >
          {" "}
          <RowWrapper
            label={"Board Resolution or Letter of Authorization"}
            detail={brola}
          />{" "}
          <RowWrapper
            label={
              "Certificate of Incorporation/ Company Registration Certificate"
            }
            detail={crc}
          />
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
      <Text fontSize="1.25rem" fontWeight="600">
        Bank Details
      </Text>
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

const userDetails = {
  fullName: "Chaitanya Shirke",
  mobileNo: "+91 9876543211",
  blockchainAdd: "AF5MCNRIEQ6OV6P",
  totalProjects: 13,
  emailId: "Chaitanya123@gmail.com",
  country: "India",
  balance: 20000,
  totalCreds: 7,
  company: "Intelliblock technologies",
  designation: "Manager",
  companySize: "50 - 100",
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
