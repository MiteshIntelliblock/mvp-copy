import {
  Divider,
  Flex,
  Link,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  Th,
  Thead,
} from "@chakra-ui/react";
import { ReactComponent as BackArrow } from "../../assets/back-arrow.svg";
import { ReactComponent as DocImage } from "../../assets/image.svg";
import { ReactComponent as Sdg1 } from "../../assets/sdg1.svg";
import { ReactComponent as Sdg2 } from "../../assets/sdg2.svg";
import { ReactComponent as Sdg3 } from "../../assets/sdg3.svg";
import { ReactComponent as Sdg4 } from "../../assets/sdg4.svg";
import RedBtn from "../layouts/redBtn";
import { useNavigate } from "react-router-dom";
import GreenBtn from "../layouts/greenBtn";

export default function ProjectDetails() {
  const navigate = useNavigate();
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
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Text fontSize="1.5rem" fontWeight="500" pb="0.94rem">
          Project details
        </Text>
        <GreenBtn fontSize="0.875rem">Edit details</GreenBtn>
      </Flex>
      <Flex
        w="100%"
        px="0.63rem"
        py="0.94rem"
        direction="column"
        border="1px solid #D9D9D9"
        borderRadius="0.375rem"
        mb="1.25rem"
        gap="0.94rem"
      >
        <DetailsSection />
        <Divider border="1px solid #D9D9D9" />
        <VintageTable />
        <RedBtn size="xs" fontSize="0.875rem">
          Remove project
        </RedBtn>
      </Flex>
    </Flex>
  );
}

function DetailsSection() {
  const sdgs = (
    <Flex alignItems="center" gap="0.31rem">
      {projectDetails.sdg.map((el) => el)}
    </Flex>
  );

  function RowWrapper({ label, value }) {
    return (
      <Flex w="100%" alignItems="center">
        <Text w="50%" fontSize="0.875rem" fontWeight="500">
          {label} :
        </Text>
        <Text w="50%" fontSize="0.875rem">
          {value}
        </Text>
      </Flex>
    );
  }

  return (
    <Flex w="100%" alignItems="flex-start" gap="1.62rem">
      {/**Left Section */}
      <Flex w="100%" direction="column" alignItems="flex-start" gap="0.63rem">
        <RowWrapper label={"Project ID"} value={projectDetails.projectId} />
        <RowWrapper label={"Project Type"} value={projectDetails.projectType} />
        <RowWrapper label={"Description"} value={projectDetails.description} />
        <RowWrapper
          label={"Project Duration"}
          value={projectDetails.projectDuration}
        />
        <RowWrapper
          label={"Project Host country"}
          value={projectDetails.projectHostCountry}
        />
        <RowWrapper label={"Mechanism"} value={projectDetails.mechanism} />
        <RowWrapper label={"Report"} value={projectDetails.report} />
      </Flex>
      {/**Right Section */}
      <Flex w="100%" direction="column" alignItems="flex-start" gap="0.63rem">
        <RowWrapper label={"Project name"} value={projectDetails.projectName} />
        <RowWrapper label={"Project URL"} value={projectDetails.projectUrl} />
        <RowWrapper
          label={"Proof of holding the credits on Registry"}
          value={projectDetails.proofOfHolding}
        />
        <RowWrapper
          label={"Project Holder"}
          value={projectDetails.projectHolder}
        />
        <RowWrapper
          label={"Project Location"}
          value={projectDetails.projectLocation}
        />
        <RowWrapper label={"SDG"} value={sdgs} />
        <RowWrapper label={"PDD"} value={projectDetails.pdd} />
      </Flex>
    </Flex>
  );
}

function VintageTable() {
  return (
    <>
      <Text pb="0.31rem">Vintage year details</Text>
      <Table>
        {" "}
        <Thead>
          <Tr>
            <Th>Serial number</Th>
            <Th>Vintage year</Th>
            <Th>Total Credits</Th>
            <Th>Validity of Carbon credits</Th>
          </Tr>
        </Thead>
        <Tbody>
          {vintageYrDetails.map((el, index) => (
            <Tr key={index}>
              <Td>{el.serialNu}</Td>
              <Td>{el.vintageYr}</Td>
              <Td>{el.totalCreds}</Td>
              <Td>{el.validity}</Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </>
  );
}

const projectDetails = {
  projectId: "057",
  projectName: "Chaitanya123@gmail.com",
  projectType: "Solar Energy",
  projectUrl: "cdm.unfccc.int/Projects",
  description:
    "Lorem ipsum dolor sit amet consectetur. Iaculis condimentum dignissim.Freight dolor sit amet",
  projectDuration: "01/01/2017 to 30/09/2023",
  projectHolder: "Eagle India Consulting Engineers Pvt. Ltd. ",
  projectHostCountry: "India",
  projectLocation: "Maharashtra",
  mechanism: "Avoidance",
  sdg: [<Sdg1 />, <Sdg2 />, <Sdg3 />, <Sdg4 />],
  proofOfHolding: (
    <Flex
      alignItems="center"
      fontSize="0.875rem"
      color="darkGreen"
      gap="0.3rem"
    >
      <DocImage />
      cancelcheque.jpg
    </Flex>
  ),
  report: (
    <Flex
      alignItems="center"
      fontSize="0.875rem"
      color="darkGreen"
      gap="0.3rem"
    >
      <DocImage />
      Report.jpg
    </Flex>
  ),
  pdd: (
    <Flex
      alignItems="center"
      fontSize="0.875rem"
      color="darkGreen"
      gap="0.3rem"
    >
      <DocImage />
      PDD.jpg
    </Flex>
  ),
};

const vintageYrDetails = [
  {
    serialNu: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
    vintageYr: "2021",
    totalCreds: "1,186",
    validity: "01/01/21  to  31/12/30",
  },
  {
    serialNu: "0001-012390-014266-UCR-CoU-IN-057-01012020-31122020",
    vintageYr: "2020",
    totalCreds: "1,877",
    validity: "01/01/20  to  31/12/19",
  },
  {
    serialNu: "0001-009888-012389-UCR-CoU-IN-057-01012019-31122019",
    vintageYr: "2019",
    totalCreds: "2,502",
    validity: "01/01/19  to  31/12/18",
  },
];
