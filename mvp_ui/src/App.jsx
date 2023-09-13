import {
  Navigate,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import Authentication from "./pages/auth";
import { Flex } from "@chakra-ui/react";
import Wallet from "./pages/wallet";
import { useDispatch, useSelector } from "react-redux";
import Protected from "./utils/protect-routes";
import StepperPg from "./components/Auth/stepperPg";
import Navbar from "./components/layouts/navbar";
import AdminDashboard from "./pages/adminDashboard";
import Marketplace from "./pages/marketplace";
import ProjectDetails from "./components/marketplace/primary/projectDetails";
import TokenDetails from "./components/marketplace/secondary/tokenDetails";
import { useFetchUserMutation } from "./features/api/apiSlice";
import { useEffect } from "react";
import { loadUser } from "./features/auth";
import { authCheck } from "./utils/authCheck";

export default function App() {
  const location = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // const [fetchUser, { data, isError, error }] = useFetchUserMutation();

  // const token = localStorage.getItem("auth-token");

  // useEffect(() => {
  //   if (!token) {
  //     return;
  //   } else {
  //     fetchUser();
  //   }
  // }, [token]);

  // useEffect(() => {
  //   if (data) {
  //     console.log(data);
  //     dispatch(loadUser(data));
  //     authCheck({ isAuthenticated: true, user: data.user, navigate });
  //   }

  //   if (isError) {
  //     console.log(error);
  //   }
  // }, [data, isError, error]);

  return (
    <Flex
      w="100%"
      h="100%"
      alignItems="center"
      justify="center"
      color="fontColor"
    >
      {/* {!location.pathname.includes("auth") && isAuthenticated && <Navbar />} */}
      {!location.pathname.includes("auth") && <Navbar />}
      <Routes>
        {/*<Route path="/" element={<HomePage />} /> */}
        <Route path="/" element={<Navigate to="/auth/sign-in" />} />
        <Route path="auth/*" element={<Authentication />} />
        <Route
          path="user-details"
          element={
            <Protected
              isAuthenticated={isAuthenticated}
              Component={StepperPg}
            />
          }
        />
        <Route path="wallet" element={<Navigate to="/wallet/my-profile" />} />
        {/** uncomment when integration done successfully */}
        {/* <Route
          path="wallet/*"
          element={
            <Protected isAuthenticated={isAuthenticated} Component={Wallet} />
          }
        /> */}
        <Route path="wallet/*" element={<Wallet />} />
        <Route path="marketplace/*" element={<Marketplace />} />
        <Route
          path="marketplace/project-details"
          element={<ProjectDetails />}
        />
        <Route path="marketplace/token-details" element={<TokenDetails />} />
        {/** Admin Dashboard */}
        <Route path="admin-dashboard/*" element={<AdminDashboard />} />
      </Routes>
    </Flex>
  );
}
