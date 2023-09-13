import { Flex } from "@chakra-ui/react";
import SideBar from "../components/layouts/sidebar";
import { Route, Routes } from "react-router-dom";
import MyProfile from "../components/wallet/my-profile";
import MyProjects from "../components/wallet/my-projects";
import ListedProjects from "../components/wallet/listed-projects";
import MyBCO2 from "../components/wallet/my-bco2";
import ListedBco2 from "../components/wallet/listed-bco2";
import MyBiddings from "../components/wallet/my-biddings";
import Bco2Retired from "../components/wallet/bco2-retired";
import MyCertificate from "../components/wallet/my-certificate";
import HelpAndSupport from "../components/wallet/help&support";

export default function Wallet() {
  return (
    <Flex w="100%">
      <Flex>
        <SideBar />
      </Flex>
      <Flex w="100%" pt="6.875rem" px="1.875rem">
        <Routes>
          <Route path="my-profile" element={<MyProfile />} />
          <Route path="my-projects" element={<MyProjects />} />
          <Route path="listed-projects" element={<ListedProjects />} />
          <Route path="my-bco2" element={<MyBCO2 />} />
          <Route path="listed-bco2" element={<ListedBco2 />} />
          <Route path="my-biddings" element={<MyBiddings />} />
          <Route path="bco2-retired" element={<Bco2Retired />} />
          <Route path="my-certificate" element={<MyCertificate />} />
          <Route path="help-support" element={<HelpAndSupport />} />
        </Routes>
      </Flex>
    </Flex>
  );
}
