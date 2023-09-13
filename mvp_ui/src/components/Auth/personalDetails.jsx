import {
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Input,
  Select,
  Text,
  useToast,
} from "@chakra-ui/react";
import { useState } from "react";
import MobileField from "../layouts/forms/mobileField";
import SubmitBtn from "../layouts/forms/submitBtn";
import axios from "axios";
import { useEffect } from "react";
import { useUserDetailsMutation } from "../../features/api/apiSlice";
import { useSelector } from "react-redux";

export default function PersonalDetails({ handleNext }) {
  const user = useSelector((state) => state.auth.user);
  const toast = useToast();
  const [countryRes, setCountryRes] = useState(null);
  const [stateRes, setStateRes] = useState(null);
  const [cityRes, setCityRes] = useState(null);
  const [userUploaded, setUserUploaded] = useState(false);
  const [userDetails, { isError, data, error }] = useUserDetailsMutation();
  const [formData, setFormData] = useState({
    fullName: "",
    companyName: "",
    companysize: "",
    mobileNo: "",
    address_one: "",
    address_two: "",
    zipcode: "",
    city: "",
    state: "",
    country: "",
  });

  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  }

  function onSubmit(e) {
    e.preventDefault();
    if (!userUploaded) {
      userDetails(formData);
    } else {
      handleNext();
    }
  }

  const {
    fullName,
    companyName,
    companysize,
    mobileNo,
    address_one,
    address_two,
    zipcode,
    city,
    state,
    country,
  } = formData;

  // function to update states
  useEffect(() => {
    const ListOfStates = countryRes
      ?.filter((cnty) => cnty.name === country)
      .map((cnty) => cnty.states);
    setStateRes(ListOfStates);
  }, [setStateRes, country]);

  // function to update cities
  useEffect(() => {
    const ListOfCities =
      stateRes &&
      stateRes[0]
        ?.filter((stateName) => stateName.name === state)
        .map((stateCity) => stateCity.cities);
    setCityRes(ListOfCities);
  }, [setCityRes, state]);

  useEffect(() => {
    async function fetchCities() {
      const res = await axios.get(
        "https://raw.githubusercontent.com/dr5hn/countries-states-cities-database/master/countries%2Bstates%2Bcities.json"
      );
      setCountryRes(res.data);
    }

    fetchCities();
  }, []);

  useEffect(() => {
    if (data) {
      console.log(data);
      toast({
        description: `${data?.message}`,
        status: "success",
        duration: 2000,
        isClosable: true,
      });
      handleNext();
    }

    if (isError) {
      console.log(error);
      toast({
        description: "Something went wrong. Please try again.",
        status: "error",
        duration: 2000,
        isClosable: true,
      });
    }

    if (user.fullName) {
      setFormData((prevState) => ({
        ...prevState,
        fullName: user.fullName,
      }));
    }
    user?.userType === "individual"
      ? user?.fullName &&
        user?.mobileNo &&
        user?.address?.address_one &&
        user?.address?.address_two &&
        user?.address?.city &&
        user?.address?.zipcode &&
        user?.address?.state &&
        user?.address?.country &&
        setUserUploaded(true)
      : user?.fullName &&
        user?.mobileNo &&
        user?.companyName &&
        user?.companysize &&
        user?.address?.address_one &&
        user?.address?.address_two &&
        user?.address?.city &&
        user?.address?.zipcode &&
        user?.address?.state &&
        user?.address?.country &&
        setUserUploaded(true);
  }, [data, user, error, isError]);

  return (
    <Flex w="100%" alignItems="flex-start" direction="column">
      <Text fontSize="1.5rem" fontWeight="500" pb="1.25rem">
        Enter your details
      </Text>
      <form onSubmit={onSubmit} style={{ width: "100%" }}>
        <Grid
          w="100%"
          gap="0.75rem"
          templateColumns="repeat(2, 1fr)"
          pb="1.25rem"
        >
          <GridItem w="100%">
            <FormControl>
              <FormLabel>Full name</FormLabel>
              <Input
                size="sm"
                fontSize="0.75rem"
                isRequired
                type="text"
                value={user?.fullName ? user?.fullName : fullName}
                name="fullName"
                onChange={onChange}
                placeholder="Enter your full name"
                _placeholder={{ color: "#D9D9D9" }}
                borderRadius="6px"
              />
            </FormControl>
          </GridItem>
          {user?.userType !== "individual" && (
            <>
              <GridItem w="100%">
                <FormControl>
                  <FormLabel>Company name</FormLabel>
                  <Input
                    size="sm"
                    fontSize="0.75rem"
                    isRequired
                    type="text"
                    value={user?.companyName ? user?.companyName : companyName}
                    name="companyName"
                    onChange={onChange}
                    placeholder="Enter your company name"
                    _placeholder={{ color: "#D9D9D9" }}
                    borderRadius="6px"
                  />
                </FormControl>
              </GridItem>
              <GridItem w="100%">
                <FormControl>
                  <FormLabel>Company size</FormLabel>
                  <Select
                    isRequired
                    fontSize="0.875rem"
                    fontWeight="500"
                    placeholder="Select your company size"
                    name="companysize"
                    value={user?.companysize ? user?.companysize : companysize}
                    color={companysize === "" ? "#D9D9D9" : "#3e3e3e"}
                    onChange={(e) => onChange(e)}
                    _placeholder={{ color: "#D9D9D9" }}
                  >
                    <option value="small" style={{ color: "#3e3e3e" }}>
                      Small (0-50 Employees)
                    </option>
                    <option value="medium" style={{ color: "#3e3e3e" }}>
                      Medium (50-200 Employees)
                    </option>
                    <option value="karge" style={{ color: "#3e3e3e" }}>
                      Large (&gt; 200 Employees)
                    </option>
                  </Select>
                </FormControl>
              </GridItem>
            </>
          )}
          <GridItem w="100%">
            <FormControl>
              <FormLabel>Mobile no.</FormLabel>
              {user?.mobileNo ? (
                <Input
                  size="sm"
                  fontSize="0.75rem"
                  type="number"
                  value={user?.mobileNo}
                  borderRadius="6px"
                />
              ) : (
                <MobileField variable={mobileNo} setFormData={setFormData} />
              )}
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <FormControl>
              <FormLabel>Enter Address line 1</FormLabel>{" "}
              <Input
                size="sm"
                fontSize="0.75rem"
                isRequired
                type="text"
                value={
                  user?.address?.address_one
                    ? user?.address?.address_one
                    : address_one
                }
                name="address_one"
                onChange={onChange}
                placeholder="Enter your address line 1"
                _placeholder={{ color: "#D9D9D9" }}
                borderRadius="6px"
              />
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <FormControl>
              <FormLabel>Enter Address line 2</FormLabel>{" "}
              <Input
                size="sm"
                fontSize="0.75rem"
                isRequired
                type="text"
                value={
                  user?.address?.address_two
                    ? user?.address?.address_two
                    : address_two
                }
                name="address_two"
                onChange={onChange}
                placeholder="Enter your address line 2"
                _placeholder={{ color: "#D9D9D9" }}
                borderRadius="6px"
              />
            </FormControl>
          </GridItem>{" "}
          <GridItem w="100%">
            <FormControl>
              <FormLabel>Enter Zipcode</FormLabel>{" "}
              <Input
                size="sm"
                fontSize="0.75rem"
                type="text"
                value={
                  user?.address?.zipcode ? user?.address?.zipcode : zipcode
                }
                isRequired
                name="zipcode"
                onChange={onChange}
                placeholder="Enter your zipcode"
                _placeholder={{ color: "#D9D9D9" }}
                borderRadius="6px"
              />
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <FormControl>
              <FormLabel>Country</FormLabel>
              {user?.address?.country ? (
                <Input
                  size="sm"
                  fontSize="0.75rem"
                  type="text"
                  value={user?.address?.country}
                  borderRadius="6px"
                />
              ) : (
                <Select
                  size="sm"
                  borderRadius="6px"
                  onChange={onChange}
                  isRequired
                  color={country === "" ? "#D9D9D9" : "fontColor"}
                  value={country}
                  name="country"
                  placeholder="Select your country"
                >
                  {countryRes &&
                    countryRes?.map((el, index) => (
                      <option
                        value={el.name}
                        key={index}
                        style={{ color: "#3e3e3e" }}
                      >
                        {el.name}
                      </option>
                    ))}
                </Select>
              )}
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <FormControl>
              <FormLabel>State</FormLabel>
              {user?.address?.state ? (
                <Input
                  size="sm"
                  fontSize="0.75rem"
                  type="text"
                  value={user?.address?.state}
                  borderRadius="6px"
                />
              ) : (
                <Select
                  size="sm"
                  borderRadius="6px"
                  onChange={onChange}
                  isRequired
                  color={state === "" ? "#D9D9D9" : "fontColor"}
                  value={state}
                  name="state"
                  placeholder={
                    country ? "Enter your State" : "Select country first"
                  }
                >
                  {stateRes &&
                    stateRes[0]?.map((state, index) => (
                      <option
                        key={index}
                        value={state.name}
                        style={{ color: "#3e3e3e" }}
                      >
                        {state.name}
                      </option>
                    ))}
                </Select>
              )}
            </FormControl>
          </GridItem>
          <GridItem w="100%">
            <FormControl>
              <FormLabel>City</FormLabel>{" "}
              {user?.address?.city ? (
                <Input
                  size="sm"
                  fontSize="0.75rem"
                  type="text"
                  value={user?.address?.city}
                  borderRadius="6px"
                />
              ) : (
                <Select
                  size="sm"
                  borderRadius="6px"
                  onChange={onChange}
                  isRequired
                  color={city === "" ? "#D9D9D9" : "fontColor"}
                  value={city}
                  name="city"
                  placeholder={
                    country ? "Enter your City" : "Select country first"
                  }
                >
                  {cityRes &&
                    cityRes[0]?.map((city, index) => (
                      <option
                        key={index}
                        value={city.name}
                        style={{ color: "#3e3e3e" }}
                      >
                        {city.name}
                      </option>
                    ))}
                </Select>
              )}
            </FormControl>
          </GridItem>
        </Grid>
        <SubmitBtn>Next</SubmitBtn>
      </form>
    </Flex>
  );
}
