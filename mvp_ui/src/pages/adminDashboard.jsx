import { Flex } from "@chakra-ui/react";
import { Routes, Route } from "react-router-dom";
import SideBar from "../components/layouts/sidebar";
import Overview from "../components/admin/overview";
import Projects from "../components/admin/projects";
import Users from "../components/admin/users";
import IndividualKyc from "../components/admin/individualKyc";
import KycDetails from "../components/admin/kycDetails";
import ProjectApprovers from "../components/admin/projectApprovers";
import UserDetails from "../components/admin/userDetails";
import ProjectDetails from "../components/admin/projectDetails";
import Transactions from "../components/admin/Transactions";

export default function AdminDashboard() {
  return (
    <Flex w="100%">
      <Flex>
        <SideBar />
      </Flex>
      <Flex w="100%" pt="6.875rem" px="1.875rem">
        <Routes>
          <Route path="overview" element={<Overview />} />
          <Route path="projects/*" element={<Projects />} />
          <Route path="projects/details" element={<ProjectDetails />} />
          <Route path="existing-users/*" element={<Users />} />
          <Route path="onboarding-users/*" element={<Users />} />
          <Route path="existing-users/details" element={<UserDetails />} />
          <Route path="onboarding-users/details" element={<UserDetails />} />
          <Route path="individual-kyc/*" element={<IndividualKyc />} />
          <Route path="individual-kyc/details" element={<KycDetails />} />
          <Route path="company-kyc/*" element={<IndividualKyc />} />
          <Route path="company-kyc/details" element={<KycDetails />} />
          <Route path="project-approvers/*" element={<ProjectApprovers />} />
          <Route path="project-approvers/details" element={<UserDetails />} />
          <Route path="traders" element={<Transactions />} />
          <Route path="payments" element={<Transactions />} />
          <Route path="retirements" element={<Transactions />} />
        </Routes>
      </Flex>
    </Flex>
  );
}
