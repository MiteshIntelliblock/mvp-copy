import {
  Flex,
  Image,
  Link,
  Text,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { NavLink, useLocation } from "react-router-dom";
import {
  logo,
  profile,
  projects,
  tokens,
  payments,
  reports,
  helpSupport,
  overview,
  projectsAdmin,
  usersAdmin,
  kycAdmin,
  paymentsAdmin,
  approversAdmin,
  retire,
  rewards,
} from "../../utils/imgs";

export default function SideBar() {
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");

  function SideLink({ index, item }) {
    return (
      <Link
        display="flex"
        key={index}
        as={NavLink}
        to={item.to}
        w="16.25rem"
        style={({ isActive }) => {
          return {
            backgroundColor: isActive ? "#F4F4F4" : "",
          };
        }}
        fontSize="1rem"
        fontWeight="500"
        _hover={{ bgColor: "#F4F4F4" }}
        transition={".3s ease"}
        role="group"
        borderRadius="1.875rem"
        alignItems="center"
      >
        <Flex w="100%" alignItems="center" gap="0.625rem">
          <Flex
            as={NavLink}
            to={item?.to}
            alignItems="center"
            padding="0.625rem"
            transition={".3s ease"}
            borderRadius="50%"
            style={({ isActive }) => {
              return {
                backgroundColor: isActive ? "#D9D9D9" : "",
              };
            }}
            _groupHover={{
              bgColor: "#D9D9D9",
              borderRadius: "50%",
            }}
          >
            <Image src={item.icon} />
          </Flex>
          <Link _hover={{ textDecor: "none" }}>{item.label}</Link>
        </Flex>
      </Link>
    );
  }

  function SideChildLink({ index, item }) {
    return (
      <Accordion key={index} allowToggle border="1px solid transparent">
        <AccordionItem>
          <AccordionButton
            w="16.25rem"
            border="1px solid transparent"
            borderRadius="1.875rem"
            padding="0px 16px 0px 0px !important"
          >
            <Flex
              w="16.25rem"
              fontSize="1rem"
              fontWeight="500"
              _hover={{ bgColor: "#F4F4F4" }}
              transition={".3s ease"}
              role="group"
              borderRadius="1.875rem"
              alignItems="center"
            >
              <Flex w="100%" alignItems="center" gap="0.625rem">
                <Flex
                  alignItems="center"
                  padding="0.625rem"
                  transition={".3s ease"}
                  borderRadius="50%"
                  _groupHover={{
                    bgColor: "#D9D9D9",
                    borderRadius: "50%",
                  }}
                >
                  <Image src={item.icon} />
                </Flex>
                <Link _hover={{ textDecor: "none" }} fontWeight="500">
                  {item.label}
                </Link>
              </Flex>
            </Flex>
            <AccordionIcon />
          </AccordionButton>
          <AccordionPanel padding="0.63rem 0rem 0.63rem 3.75rem">
            <Flex alignItems="flex-start" direction="column">
              {item.children.map((child, index) => (
                <Flex alignItems="center" gap="0.63rem" fontSize="1rem">
                  <Text fontWeight="600">-</Text>
                  <Link
                    as={NavLink}
                    to={child?.to}
                    key={index}
                    fontWeight="400"
                    _hover={{ textDecor: "none", fontWeight: "600" }}
                    transition="all .1s"
                  >
                    {child?.label}
                  </Link>
                </Flex>
              ))}
            </Flex>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    );
  }

  return (
    <Flex
      h="100vh"
      direction="column"
      pos="sticky"
      top="0"
      px="1.25rem"
      py="1.875rem"
      gap="1.875rem"
      alignItems="flex-start"
      bgColor="white"
      boxShadow="0px 0px 20px rgba(0,0,0,0.05)"
      transition="3s ease"
      zIndex="99"
    >
      <Image src={logo} ml="0.625rem" h="3.125rem" />
      <Flex
        w="100%"
        alignItems="flex-start"
        pt={isAdmin ? "3.75rem" : "0"}
        direction="column"
        gap="1.25rem"
      >
        {isAdmin
          ? adminOptions.map((el, index) =>
              el.children ? (
                <SideChildLink item={el} index={index} />
              ) : (
                <SideLink item={el} index={index} />
              )
            )
          : menuOptions.map((el, index) =>
              el.children ? (
                <SideChildLink item={el} index={index} />
              ) : (
                <SideLink item={el} index={index} />
              )
            )}
      </Flex>
    </Flex>
  );
}

const menuOptions = [
  {
    label: "My Profile",
    to: "my-profile",
    icon: profile,
  },
  {
    label: "Projects",
    to: "projects",
    icon: projects,
    children: [
      {
        label: "My projects",
        to: "my-projects",
      },
      {
        label: "Listed projects",
        to: "listed-projects",
      },
    ],
  },
  {
    label: "BCO2",
    to: "tokens",
    icon: tokens,
    children: [
      {
        label: "My BCO2",
        to: "my-bco2",
      },
      {
        label: "Listed BCO2",
        to: "listed-bco2",
      },
      {
        label: "My Biddings",
        to: "my-biddings",
      },
    ],
  },
  {
    label: "Retired BCO2",
    to: "retire",
    icon: retire,
    children: [
      {
        label: "BCO2 Retired",
        to: "bco2-retired",
      },
      {
        label: "My Certificate",
        to: "my-certificate",
      },
    ],
  },
  {
    label: "My Rewards",
    to: "reward",
    icon: rewards,
  },
  {
    label: "Payments",
    to: "payments",
    icon: payments,
    children: [
      {
        label: "",
        to: "",
      },
    ],
  },
  {
    label: "Reports",
    to: "reports",
    icon: reports,
    children: [
      {
        label: "",
        to: "",
      },
    ],
  },
  {
    label: "Help & Support",
    to: "help-support",
    icon: helpSupport,
  },
];

const adminOptions = [
  {
    label: "Overview",
    to: "overview",
    icon: overview,
  },
  {
    label: "Projects",
    to: "projects",
    icon: projectsAdmin,
  },
  {
    label: "Users",
    to: "users",
    icon: usersAdmin,
    children: [
      { label: "Onboarding User", to: "onboarding-users" },
      { label: "Existing User", to: "existing-users" },
    ],
  },
  {
    label: "KYC Verification",
    icon: kycAdmin,
    children: [
      {
        label: "Individual",
        to: "individual-kyc",
      },
      {
        label: "Company",
        to: "company-kyc",
      },
    ],
  },
  {
    label: "Transactions",
    to: "transactions",
    icon: paymentsAdmin,
    children: [
      {
        label: "Trades",
        to: "traders",
      },
      {
        label: "Payments",
        to: "payments",
      },
      {
        label: "Retirements",
        to: "retirements",
      },
    ],
  },
  {
    label: "Project Approvers",
    to: "project-approvers",
    icon: approversAdmin,
  },
];
