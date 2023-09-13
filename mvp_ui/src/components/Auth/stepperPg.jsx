import { Button, Flex, Icon, Text } from "@chakra-ui/react";
import React, { useState, useRef, forwardRef } from "react";
import BankDetails from "../../pages/bankDetails";
import PersonalDetails from "./personalDetails";
import PaymentDetails from "./paymentDetails";
import KYCType from "./kycType";
import { ReactComponent as UserIcon } from "../../assets/user.svg";
import { ReactComponent as KycDocIcon } from "../../assets/kycdoc.svg";
import { ReactComponent as BankIcon } from "../../assets/bank.svg";
import { ReactComponent as PaymentIcon } from "../../assets/paymentIcon.svg";

const TabContent = ({ activeIndex, handleNext }) => {
  const content = [
    <PersonalDetails handleNext={handleNext} />,
    <KYCType handleNext={handleNext} />,
    <BankDetails handleNext={handleNext} />,
    <PaymentDetails handleNext={handleNext} />,
  ];

  return <>{content[activeIndex]}</>;
};

const StepperPg = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabRefs = useRef([
    { id: 1, icon: UserIcon, label: "Personal Details" },
    { id: 2, icon: KycDocIcon, label: "KYC Verification" },
    { id: 3, icon: BankIcon, label: "Bank details" },
    { id: 4, icon: PaymentIcon, label: "Payment details" },
  ]);

  const TabBtn = forwardRef(({ label, onClick, icon, isActive }, ref) => {
    return (
      <Flex
        w="100%"
        as={Button}
        size="lg"
        ref={ref}
        variant="unstyled"
        px="5rem"
        onClick={onClick}
        color={isActive ? "white" : "fontColor"}
        bgColor={isActive ? "lightGreen" : "#D9D9D9"}
        gap="5px"
        fontWeight="600"
        fontSize="1rem"
        borderRadius="none"
        clipPath="polygon(90% 0%, 100% 50%, 90% 100%, 0% 100%, 10% 50%, 0% 0%)"
        ml="-1.875rem"
      >
        <Icon as={icon} variant="unstyled" />
        <Text>{label}</Text>
      </Flex>
    );
  });

  const handleNext = () => {
    const nextTab = activeTab + 1;
    if (nextTab < tabRefs.current.length) {
      setActiveTab(nextTab);
    }
  };

  const handleTabClick = (index) => {
    setActiveTab(index);
  };

  return (
    <Flex
      w="100%"
      maxW="8xl"
      pt="7.5rem"
      px="6.25rem"
      direction="column"
      gap="1.875rem"
    >
      <Flex
        w="100%"
        gap="0.625rem"
        alignItems="flex-start"
        ml="1.875rem"
        justifyContent="flex-start"
      >
        {tabRefs.current.map((tab, index) => (
          <TabBtn
            key={index}
            label={tab.label}
            icon={tab.icon}
            isActive={activeTab === index}
            onClick={() => handleTabClick(index)}
          />
        ))}
      </Flex>
      <TabContent activeIndex={activeTab} handleNext={handleNext} />
    </Flex>
  );
};

export default StepperPg;
