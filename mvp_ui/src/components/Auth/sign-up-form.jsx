import { Flex, Spinner, Text } from "@chakra-ui/react";
import UserTypeCard from "./userTypeCard";
import GoogleSignInBtn from "../layouts/GoogleSignInBtn";
import Company from "./companyForm";
import Individual from "./individualForm";
import SubmitBtn from "../layouts/forms/submitBtn";
import ErrorAlert from "../layouts/alerts/errorAlert";

export default function SignUpForm({
  error,
  isLoading,
  formData,
  activeTab,
  setActiveTab,
  setFormData,
  showPass,
  setShowPass,
  onChange,
}) {
  const { userType } = formData;
  const { individual, company } = activeTab;

  return (
    <Flex w="60%" gap="1.25rem" alignItems="flex-start" direction="column">
      <Text fontSize="1.25rem" fontWeight="500" pb="0.625rem">
        Please select your type
      </Text>
      <Flex w="100%" gap="1.875rem" alignItems="center">
        <UserTypeCard
          activeTab={individual}
          setActiveTab={setActiveTab}
          setFormData={setFormData}
          label={"Individual"}
        />
        <UserTypeCard
          activeTab={company}
          setActiveTab={setActiveTab}
          setFormData={setFormData}
          label={"Company"}
        />
      </Flex>
      {error && <ErrorAlert message={error.data.message} />}
      {userType === "individual" ? (
        <Individual
          showPass={showPass}
          setShowPass={setShowPass}
          formData={formData}
          setFormData={setFormData}
          onChange={onChange}
        />
      ) : (
        <Company
          setFormData={setFormData}
          showPass={showPass}
          setShowPass={setShowPass}
          formData={formData}
          onChange={onChange}
        />
      )}
      <Flex pt="5px">
        <SubmitBtn disabled={isLoading}>
          {isLoading ? <Spinner /> : "Sign Up"}
        </SubmitBtn>
      </Flex>
      <Text>Or</Text>
      <GoogleSignInBtn />
    </Flex>
  );
}
