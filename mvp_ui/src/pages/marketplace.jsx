import {
  Flex,
  Tab,
  Tabs,
  TabList,
  Text,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import OptionsSideBar from "../components/marketplace/optionsSideBar";
import PrimaryMarketplace from "../components/marketplace/primary/primaryMarketplace";
import SecondaryMarketplace from "../components/marketplace/secondary/secondaryMarketplace";

export default function Marketplace() {
  return (
    <Flex
      w="100%"
      maxW="8xl"
      pt="7.5rem"
      px="7rem"
      alignItems="center"
      direction="column"
    >
      <Text fontSize="2rem" fontWeight="500" pb="1.875rem">
        marketplace
      </Text>
      <Flex w="100%" alignItems="flex-start" gap="1.25rem">
        {/**filter, sord side bar */}
        <OptionsSideBar />
        <Flex w="75%">
          <Tabs w="100%">
            <TabList>
              <Tab fontSize="1.125rem">Primary Marketplace</Tab>
              <Tab fontSize="1.125rem">Secondary Marketplace</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <PrimaryMarketplace />
              </TabPanel>
              <TabPanel>
                <SecondaryMarketplace />
              </TabPanel>
            </TabPanels>
          </Tabs>
        </Flex>
      </Flex>
    </Flex>
  );
}
