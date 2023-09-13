import { useSelector } from "react-redux";
import IndividualKYC from "./individualKYC";
import CompanyKYC from "./companyKYC";

export default function KYCType({ handleNext }) {
  const user = useSelector((state) => state.auth.user);

  return user.userType === "individual" ? (
    <IndividualKYC handleNext={handleNext} />
  ) : (
    <CompanyKYC handleNext={handleNext} />
  );
}
