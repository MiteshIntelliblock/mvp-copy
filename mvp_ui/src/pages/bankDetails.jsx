import {
  Flex,
  FormControl,
  FormLabel,
  Input,
  Select,
  Spinner,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { countries } from "../utils/countries";
import SubmitBtn from "../components/layouts/forms/submitBtn";
import { useUploadBankDetailsMutation } from "../features/api/apiSlice";
import { useSelector } from "react-redux";
import SuccessAlert from "../components/layouts/alerts/successAlert";
import FileReader from "../components/layouts/forms/fileReader";

export default function BankDetails() {
  const [uploadBankDetails, { isLoading, isError, isSuccess, error, data }] =
    useUploadBankDetailsMutation();
  const user = useSelector((state) => state.auth.user);
  const bankDetails = user?.userKyc?.bankDetails || null;
  const [bankForm, setbankForm] = useState({
    accountHolderName: "",
    accountNo: "",
    bankName: "",
    ifscCode: "",
    swiftCode: "",
    branchName: "",
    city: "",
    country: "",
    cheque: null,
  });

  function onChange(e) {
    if (e.target.files) {
      const doc = e.target.files[0];
      setbankForm((prevState) => ({
        ...prevState,
        [e.target.name]: doc,
      }));
    } else {
      setbankForm((prevState) => ({
        ...prevState,
        [e.target.name]: e.target.value,
      }));
    }
  }

  function submitHandler(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("accountHolderName", accountHolderName);
    formData.append("accountNo", accountNo);
    formData.append("bankName", bankName);
    formData.append("ifscCode", ifscCode);
    formData.append("swiftCode", swiftCode);
    formData.append("branchName", branchName);
    formData.append("city", city);
    formData.append("country", country);
    formData.append("image", cheque);
    console.log(accountHolderName);
    uploadBankDetails(JSON.stringify(formData));
    console.log(bankForm);
  }

  useEffect(() => {
    if (data) {
      console.log(data);
    }
    if (isError) console.log(error);
  }, [data, isError, error]);

  const {
    accountHolderName,
    accountNo,
    bankName,
    ifscCode,
    swiftCode,
    branchName,
    city,
    country,
    cheque,
  } = bankForm;

  return (
    <Flex w="100%" direction="column">
      <Text fontSize="2rem" fontWeight="500" pb="1.25rem">
        Fill your Bank details
      </Text>
      {isSuccess && <SuccessAlert message={data.message} />}
      <form style={{ width: "100%" }} onSubmit={submitHandler}>
        <Flex
          w="100%"
          direction="column"
          gap="0.938rem"
          alignItems="flex-start"
          justifyContent="center"
          pb="1.875rem"
        >
          <Flex w="100%" alignItems="center" justifyContent="center" gap="1rem">
            <FormField
              label={"Account Name"}
              placeholder={"Enter your account name"}
              value={accountHolderName || bankDetails?.accountHolderName}
              name={"accountHolderName"}
              onChange={onChange}
            />
            <FormField
              label={"Account Number"}
              placeholder={"Enter your account number"}
              value={accountNo || bankDetails?.accountNo}
              name={"accountNo"}
              onChange={onChange}
            />
          </Flex>
          <Flex w="100%" alignItems="center" gap="1rem">
            <FormField
              label={"Bank Name"}
              placeholder={"Enter your bank name"}
              value={bankName || bankDetails?.bankName}
              name={"bankName"}
              onChange={onChange}
            />
            <FormField
              label={"IFSC Code"}
              placeholder={"Enter your IFSC code"}
              value={ifscCode || bankDetails?.ifscCode}
              name={"ifscCode"}
              onChange={onChange}
            />
          </Flex>
          <Flex w="100%" alignItems="center" gap="1rem">
            <FormField
              label={"Swift Code"}
              placeholder={"Enter your swift code"}
              value={swiftCode || bankDetails?.swiftCode}
              name={"swiftCode"}
              onChange={onChange}
            />
            <FormField
              label={"Branch name"}
              placeholder={"Enter your branch name"}
              value={branchName || bankDetails?.branchName}
              name={"branchName"}
              onChange={onChange}
            />
          </Flex>
          <Flex w="100%" alignItems="center" gap="1rem">
            <FormField
              label={"City"}
              placeholder={"Enter your city name"}
              value={city || bankDetails?.city}
              name={"city"}
              onChange={onChange}
            />
            <FormControl>
              <FormLabel>Country</FormLabel>
              <Select
                placeholder="Select our country"
                value={country || bankDetails?.country}
                name="country"
                color={
                  country || bankDetails?.country === "" ? "#D9D9D9" : "#3e3e3e"
                }
                onChange={onChange}
              >
                {countries.map((el, index) => (
                  <option
                    key={index}
                    value={el.text}
                    style={{ color: "#3e3e3e" }}
                  >
                    {el.text}
                  </option>
                ))}
              </Select>
            </FormControl>
          </Flex>
          <FormControl w="50%">
            <FormLabel>
              Upload cancel cheque{" "}
              <Text as="span" color="#8C8787">
                (jpeg, png, pdf)
              </Text>
            </FormLabel>
            <FileReader
              isRequire={false}
              variable={cheque}
              variableName={"cheque"}
              onChange={onChange}
            />
          </FormControl>
        </Flex>
        <SubmitBtn disabled={isLoading || isSuccess}>
          {isLoading ? <Spinner /> : "Submit"}
        </SubmitBtn>
      </form>
    </Flex>
  );
}

function FormField({
  isRequired = false,
  label,
  placeholder,
  value,
  name,
  onChange,
}) {
  return (
    <FormControl isRequired={isRequired}>
      <FormLabel>{label}</FormLabel>
      <Input
        type="text"
        fontSize="0.875rem"
        fontWeight="500"
        isRequired
        placeholder={placeholder}
        value={value}
        name={name}
        onChange={onChange}
        _placeholder={{ color: "#D9D9D9" }}
      />
    </FormControl>
  );
}
