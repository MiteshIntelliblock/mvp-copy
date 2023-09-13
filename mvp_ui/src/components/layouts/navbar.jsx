import {
  Flex,
  Image,
  Link,
  Menu,
  MenuList,
  MenuButton,
  Icon,
  MenuItem,
  Avatar,
  Text,
} from "@chakra-ui/react";
// import { ReactComponent as Logo } from "../../assets/BNZ-logo.svg";
import Logo from "../../assets/BNZ-logo.svg";
import GreenBtn from "./greenBtn";
import { useDispatch } from "react-redux";
import { logout } from "../../features/auth";
import { useLocation, useNavigate, NavLink } from "react-router-dom";
import { ReactComponent as Notif } from "../../assets/notif.svg";
import { ReactComponent as DownIcon } from "../../assets/downArrow.svg";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const isAdmin = location.pathname.includes("admin");
  const profilePic = null;

  const userDropDown = [
    {
      label: "My wallet",
      // icon: Wallet,
      onClick: () => navigate("/wallet/my-profile"),
    },
    {
      label: "Settings",
      // icon: Settings,
      onClick: "",
    },
    {
      label: "Privacy policy",
      // icon: Privacy,
      onClick: "",
    },
    {
      label: "Sign-out",
      // icon: Signout,
      onClick: () => {
        navigate("/auth/sign-in");
        dispatch(logout());
      },
    },
  ];

  function UserMenu() {
    return (
      <Flex
        w="100%"
        alignItems="center"
        justifyContent="flex-end"
        gap="3.75rem"
      >
        <Flex alignItems="center" gap="2.5rem">
          {navItems.map((el, index) => (
            <Link
              key={index}
              as={NavLink}
              to={el.to}
              _hover={{ textDecor: "none" }}
            >
              {el.label}
            </Link>
          ))}
        </Flex>
        <Menu>
          <MenuButton>
            <Flex alignItems="center" gap="0.56rem">
              {profilePic ? (
                <Avatar
                  w="2.187rem"
                  h="2.187rem"
                  objectFit="cover"
                  objectPosition="center"
                  src={profilePic}
                />
              ) : (
                <Avatar w="2.187rem" h="2.187rem" />
              )}
              <Text fontSize="0.75rem">
                {isAdmin ? "Admin Name" : "User Name"}
              </Text>
              <Icon as={DownIcon} w="0.5rem" h="0.25rem" />
            </Flex>
          </MenuButton>
          <MenuList minW="0" w="10rem" padding="0 !important">
            {userDropDown.map((el, index) => (
              <MenuItem
                key={index}
                px="0.625rem"
                w="100%"
                bgColor="white"
                onClick={el.onClick}
                fontSize="0.875rem"
                _hover={{ bgColor: "#F0F0F0", fontWeight: "500" }}
              >
                <Flex w="100%" alignItems="center" gap="0.625rem">
                  <Icon as={el.icon} />
                  {el.label}
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    );
  }

  function AdminMenu() {
    return (
      <Flex alignItems="center" gap="2.5rem">
        <Flex alignItems="center" position="relative">
          <Icon w="1.25rem" h="1.25rem" as={Notif} />
          <Text
            w="0.80356rem"
            h="0.80356rem"
            textAlign="center"
            pos="absolute"
            top="-5px"
            right="-3px"
            color="white"
            bgColor="#F02B0C"
            fontWeight="600"
            borderRadius="50%"
            fontSize="0.625rem"
          >
            6
          </Text>
        </Flex>
        <Menu>
          <MenuButton>
            <Flex alignItems="center" gap="0.56rem">
              {profilePic ? (
                <Avatar
                  w="2.187rem"
                  h="2.187rem"
                  objectFit="cover"
                  objectPosition="center"
                  src={profilePic}
                />
              ) : (
                <Avatar w="2.187rem" h="2.187rem" />
              )}
              <Text fontSize="0.75rem">Admin Name</Text>
              <Icon as={DownIcon} w="0.5rem" h="0.25rem" />
            </Flex>
          </MenuButton>
          <MenuList minW="0" w="10rem" padding="0 !important">
            {userDropDown.map((el, index) => (
              <MenuItem
                key={index}
                px="0.625rem"
                w="100%"
                bgColor="white"
                onClick={el.onClick}
                fontSize="0.875rem"
                _hover={{ bgColor: "#F0F0F0", fontWeight: "500" }}
              >
                <Flex w="100%" alignItems="center" gap="0.625rem">
                  <Icon as={el.icon} />
                  {el.label}
                </Flex>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </Flex>
    );
  }

  return (
    <Flex
      w="100%"
      pos="fixed"
      top="0"
      px="6.25rem"
      py="1.25rem"
      alignItems="center"
      justifyContent="space-between"
      bgColor="#fff"
      zIndex="9"
      boxShadow="0px 0px 20px rgba(0,0,0,0.15)"
    >
      <Image src={Logo} h="2.5rem" />
      {isAdmin ? <AdminMenu /> : <UserMenu />}
      {/*  <GreenBtn
        onClick={() => {
          dispatch(logout());
          navigate("/auth/sign-in");
        }}
      >
        Logout
      </GreenBtn> */}
    </Flex>
  );
}

const navItems = [
  { label: "Marketplace", to: "marketplace" },
  { label: "Shop now", to: "" },
];
