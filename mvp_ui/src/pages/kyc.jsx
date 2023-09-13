import { Flex } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import CompanyKYC from "../components/Auth/companyKYC";
import IndividualKYC from "../components/Auth/individualKYC";
import Navbar from "../components/layouts/navbar";

export default function KYCForm() {
  return (
    <>
      <Flex
        w="100%"
        maxW="8xl"
        pt="8.75rem"
        px="6.25rem"
        alignItems="flex-start"
      >
        <Routes>
          <Route path="company-kyc" element={<CompanyKYC />} />
          <Route path="individual-kyc" element={<IndividualKYC />} />
        </Routes>
      </Flex>
    </>
  );
}
