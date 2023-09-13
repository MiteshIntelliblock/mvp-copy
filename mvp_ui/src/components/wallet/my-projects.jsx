import { Flex, Td, Text, Tr } from "@chakra-ui/react";
import GreenBtn from "../layouts/greenBtn";
import ProjectOwnerDetailsBox from "./projectOwnerDetailsBox";
import CustomTable from "../layouts/customTable";

export default function MyProjects() {
  return (
    <Flex w="100%" direction="column" alignItems="flex-start" pb="3.25rem">
      <Text
        w="100%"
        textAlign="center"
        fontSize="2rem"
        fontWeight="500"
        mb="1.25rem"
      >
        my projects
      </Text>
      <Flex w="100%" justifyContent="flex-end" mb="0.94rem">
        <GreenBtn fontSize="0.875rem" size="xs">
          Add Project
        </GreenBtn>
      </Flex>
      <ProjectOwnerDetailsBox />
      <Text fontSize="1.25rem" fontWeight="500" pt="1.25rem" pb="0.62rem">
        Total Projects (2)
      </Text>
      <Flex
        w="100%"
        h="100%"
        alignItems="flex-start"
        direction="column"
        gap="0.63rem"
      >
        {projects.map((el, index) => (
          <ProjectTable key={index} project={el} />
        ))}
      </Flex>
    </Flex>
  );
}

function ProjectTable({ project }) {
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
          <GreenBtn size="xs" fontSize="0.75rem">
            List
          </GreenBtn>
        </Flex>
      </Flex>
      <CustomTable
        headContent={[
          "Vintage  year",
          "Serial number",
          "Total BCO2",
          "Available",
          "Sold",
          "Listed",
        ]}
      >
        {project.vintageData.map((vntg, index) => (
          <Tr key={index}>
            <Td>{vntg.vintageYr}</Td>
            <Td>{vntg.serialNum}</Td>
            <Td>{vntg.totalBco2}</Td>
            <Td>{vntg.availableBco2}</Td>
            <Td>{vntg.soldBco2}</Td>
            <Td>{vntg.listed}</Td>
          </Tr>
        ))}
      </CustomTable>
    </Flex>
  );
}

const projects = [
  {
    projectName: "2.415 MW Bundled Solar Power Project",
    status: "verified",
    projectId: "057",
    dateOfReg: "25 January 2023",
    projectRegistry: "UCR",
    vintageData: [
      {
        vintageYr: "2021",
        serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
        totalBco2: "1186",
        availableBco2: "386",
        soldBco2: "200",
        listed: "600",
      },
      {
        vintageYr: "2020",
        serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
        totalBco2: "1186",
        availableBco2: "386",
        soldBco2: "200",
        listed: "600",
      },
      {
        vintageYr: "2019",
        serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
        totalBco2: "1186",
        availableBco2: "386",
        soldBco2: "200",
        listed: "600",
      },
    ],
  },
  {
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
      },
      {
        vintageYr: "2020",
        serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
        totalBco2: "1186",
        availableBco2: "386",
        soldBco2: "200",
        listed: "600",
      },
      {
        vintageYr: "2019",
        serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
        totalBco2: "1186",
        availableBco2: "386",
        soldBco2: "200",
        listed: "600",
      },
      {
        vintageYr: "2018",
        serialNum: "0001-015080-016265-UCR-CoU-IN-057-01012021-31122021",
        totalBco2: "1186",
        availableBco2: "386",
        soldBco2: "200",
        listed: "600",
      },
    ],
  },
];
