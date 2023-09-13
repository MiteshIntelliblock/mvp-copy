import {
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Td,
  Text,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import ProjectOwnerDetailsBox from "./projectOwnerDetailsBox";
import { ReactComponent as Search } from "../../assets/search.svg";
import { ReactComponent as Filter } from "../../assets/filter-projects.svg";
import { ReactComponent as Sort } from "../../assets/sort.svg";
import { ReactComponent as View } from "../../assets/view.svg";
import CustomTable from "../layouts/customTable";
import GreenBtn from "../layouts/greenBtn";
import CertificatePg from "./CertificatePg";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function MyCertificate() {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleDownload = () => {
    const certificate = document.getElementById("modal-content");
    html2canvas(certificate).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("landscape");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("certificate.pdf");
    });
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <CertificatePg />
      </Modal>
      <Flex w="100%" alignItems="center" direction="column" gap="1.25rem">
        <Text fontSize="2rem" fontWeight="500">
          My Certificates
        </Text>
        <ProjectOwnerDetailsBox />
        <Flex w="100%" alignItems="flex-start" direction="column" gap="0.94rem">
          <Flex
            w="100%"
            alignItems="center"
            justifyContent="flex-end"
            gap="0.62rem"
            pt="1.25rem"
            pb="0.69rem"
          >
            <InputGroup w="7.5rem" h="1.875rem">
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
                  <Filter />
                  Filter
                </Flex>
              </MenuButton>
              <MenuList minW="0" w="12rem" padding="0 !important">
                <MenuItem fontSize="0.875rem">item1</MenuItem>
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
                  <Sort />
                  Sort by
                </Flex>
              </MenuButton>
              <MenuList minW="0" w="12rem" padding="0 !important">
                <MenuItem fontSize="0.875rem">item1</MenuItem>
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
                  <View />
                  view
                </Flex>
              </MenuButton>
              <MenuList minW="0" w="12rem" padding="0 !important">
                <MenuItem fontSize="0.875rem">item1</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
          <CustomTable
            headContent={[
              "Sr. no.",
              "Certificate name",
              "Certificate ID",
              "Retired on",
              "",
            ]}
          >
            {certificates.map((cerf, index) => (
              <Tr key={index}>
                <Td>{index + 1}</Td>
                <Td>{cerf.cerfName}</Td>
                <Td>{cerf.cerfId}</Td>
                <Td>{cerf.retiredOn}</Td>
                <Td>
                  <GreenBtn fontSize="0.75rem" size="xs" onClick={onOpen}>
                    Download Certificate
                  </GreenBtn>
                </Td>
              </Tr>
            ))}
          </CustomTable>
        </Flex>
      </Flex>
    </>
  );
}

const certificates = [
  {
    cerfName: "Certificate 1",
    cerfId: "BNZ/2023/01",
    retiredOn: "12/08/23",
  },
  {
    cerfName: "Certificate 2",
    cerfId: "BNZ/2023/07",
    retiredOn: "15/01/21",
  },
  {
    cerfName: "Certificate 3",
    cerfId: "BNZ/2023/13",
    retiredOn: "01/01/20",
  },
];
