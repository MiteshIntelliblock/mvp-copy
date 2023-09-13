import { Button, Flex, Text } from "@chakra-ui/react";
import { ReactComponent as IndiIcon } from "../../assets/Individual.svg";
import { ReactComponent as CompIcon } from "../../assets/Company.svg";
import { ReactComponent as Tick } from "../../assets/tick.svg";

export default function UserTypeCard({
  label,
  setFormData,
  activeTab,
  setActiveTab,
}) {
  return (
    <Button
      pos="relative"
      variant="unstyled"
      w="fit-content"
      h="fit-content"
      padding="0.938rem 2.5rem"
      border={activeTab ? "1px solid darkGreen" : "1px solid #D9D9D9"}
      borderRadius="10px"
      onClick={() => {
        setFormData((prevState) => ({
          ...prevState,
          userType: label.toString().toLowerCase(),
        }));
        label === "Individual" &&
          setActiveTab({
            individual: true,
            company: false,
          });
        label === "Company" &&
          setActiveTab({
            individual: false,
            company: true,
          });
      }}
    >
      <Flex direction="column" alignItems="center" gap="0.625rem">
        {label === "Individual" ? (
          <IndiIcon color={activeTab && "darkGreen"} />
        ) : (
          <CompIcon color={activeTab && "darkGreen"} />
        )}
        <Text fontSize="0.875rem" fontWeight="500">
          {label}
        </Text>
      </Flex>
      {activeTab && (
        <Flex
          pos="absolute"
          left="50%"
          bottom="-10px"
          transform="translateX(-50%)"
        >
          <Tick />
        </Flex>
      )}
    </Button>
  );
}
