import {
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Link,
} from "@chakra-ui/react";
import { ReactComponent as Filter } from "../../assets/filter.svg";

export default function Company({
  showPass,
  setShowPass,
  formData,
  onChange,
  setFormData,
}) {
  const { emailId, password, password2 } = formData;
  return (
    <>
      <FormControl>
        <FormLabel fontWeight="500">Email-ID</FormLabel>
        <Input
          type="text"
          isRequired
          fontSize="0.875rem"
          fontWeight="500"
          placeholder="Enter your Email-ID"
          name="emailId"
          value={emailId}
          onChange={(e) => onChange(e)}
          _placeholder={{ color: "#D9D9D9" }}
        />
      </FormControl>
      <FormControl>
        <FormLabel fontWeight="500">Enter Password</FormLabel>
        <InputGroup>
          <Input
            type={showPass}
            isRequired
            fontSize="0.875rem"
            fontWeight="500"
            placeholder="Enter your password"
            name="password"
            value={password}
            onChange={(e) => onChange(e)}
            _placeholder={{ color: "#D9D9D9" }}
          />
          <InputRightElement>
            <Link
              as={Filter}
              onClick={() =>
                showPass === "password"
                  ? setShowPass("text")
                  : setShowPass("password")
              }
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl>
        <FormLabel>Re-Enter Password</FormLabel>
        <InputGroup>
          <Input
            type={showPass}
            isRequired
            fontSize="0.875rem"
            fontWeight="500"
            placeholder="Re-Enter your password"
            name="password2"
            value={password2}
            onChange={(e) => onChange(e)}
            _placeholder={{ color: "#D9D9D9" }}
          />
          <InputRightElement>
            <Link
              as={Filter}
              onClick={() =>
                showPass === "password"
                  ? setShowPass("text")
                  : setShowPass("password")
              }
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
    </>
  );
}
